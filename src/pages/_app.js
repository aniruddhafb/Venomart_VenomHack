import "@/styles/bootstrap.css";
import "@/styles/custom.css";
import "@/styles/globals.css";
import axios from "axios";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { v4 as uuidv4 } from "uuid";
import User from "../models/User";
import dbConnect from "@/lib/dbConnect";

// import { toNano } from "locklift";
// import {} from ""
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import indexAbi from "../../abi/Index.abi.json";
import nftAbi from "../../abi/Nft.abi.json";
import collectionAbi from "../../abi/Sample.abi.json";

import { Address, ProviderRpcClient } from "everscale-inpage-provider";
import { useEffect, useState } from "react";
import { initVenomConnect } from "../components/test_config";
import mongoose from "mongoose";

export default function App({ Component, pageProps }) {
  const BaseURL = "http://localhost:3000/api";
  const blockURL = "https://testnet.venomscan.com/";
  const storage = new ThirdwebStorage();

  const [venomConnect, setVenomConnect] = useState();
  const [venomProvider, setVenomProvider] = useState();
  const [signer_address, setSignerAddress] = useState();

  const [standaloneProvider, setStandAloneProvider] = useState();

  const init = async () => {
    const _venomConnect = await initVenomConnect();
    setVenomConnect(_venomConnect);
  };

  const create_user = async (data) => {
    const res = await axios({
      url: `${BaseURL}/users`,
      method: "POST",
      data: {
        wallet_id: data.wallet_id,
        user_name: "",
        bio: "",
        email: "",
        walletAddress: "",
        profileImage: "",
        coverImage: "",
      },
    });
    return res.data;
  };

  const create_nft = async (data) => {
    console.log(data);
    const ipfsUrl = "await storage.upload(data);";
    const tokenId = uuidv4().toString();
    const res = await axios({
      url: `${BaseURL}/nfts`,
      method: "POST",
      data: {
        tokenId: tokenId,
        nft_collection: `collection_address/${tokenId}`,
        ipfsURL: ipfsUrl,
        listingPrice: 0,
        isListed: false,
        owner: signer_address,
      },
    });
    console.log(res.data);
  };

  const update_profile = async (data) => {
    console.log(data);
    const profile_img = data?.profileImage
      ? await storage.upload(data.profileImage)
      : "";
    const cover_img = data?.coverImage
      ? await storage.upload(data.coverImage)
      : "";
    const res = await axios({
      url: `${BaseURL}/users`,
      method: "PUT",
      data: {
        wallet_id: data.walletAddress,
        user_name: data.user_name,
        email: data.email,
        bio: data.bio,
        profileImage: profile_img,
        coverImage: cover_img,
        socials: [data.twitter, data.instagram, data.customLink],
      },
    });
    console.log(res.data);
  };

  const create_collection = async (data) => {
    const ipfsUrl_logo = await storage.upload(data.logo);
    const ipfsUrl_cover = await storage.upload(data.image);
    const res = await axios({
      url: `${BaseURL}/collections`,
      method: "POST",
      data: {
        collection_address: uuidv4().toString(),
        coverImage: ipfsUrl_cover,
        logo: ipfsUrl_logo,
        name: data.name,
        symbol: data.symbol,
        description: data.description,
      },
    });
    console.log(res.data);
  };

  const getAddress = async (provider) => {
    const providerState = await provider?.getProviderState?.();
    return providerState?.permissions.accountInteraction?.address.toString();
  };

  const checkAuth = async (_venomConnect) => {
    const auth = await _venomConnect?.checkAuth();
    if (auth) await getAddress(_venomConnect);
  };

  const initStandalone = async () => {
    const standalone = await venomConnect?.getStandalone();
    console.log({ standalone });
    setStandAloneProvider(standalone);
    return standalone;
  };

  const onConnect = async (provider) => {
    await onProviderReady(provider);

    setVenomProvider(provider);
  };

  const onDisconnect = async () => {
    venomProvider?.disconnect();
    setSignerAddress(undefined);
  };

  const onProviderReady = async (provider) => {
    const venomWalletAddress = provider
      ? await getAddress(provider)
      : undefined;
    setSignerAddress(venomWalletAddress);
    // create_user({ wallet_id: venomWalletAddress });
    return venomWalletAddress;
  };

  const connect_wallet = async () => {
    if (!venomConnect) return;
    await venomConnect.connect();
  };

  //COLLECTION FUNCTIONS

  const collection_address_devnet =
    "0:e0503cdd6dfc9a3203b2745d2636022d94b2f11da10d3c5550c25a00bd85ee34";

  const mint_nft = async (provider) => {
    // const standalone = await venomConnect?.getStandalone("venomwallet");
    // console.log(standalone);
    const json = {
      type: "Basic NFT",
      name: "Sample Name",
      description: "Hello world!",
      preview: {
        source:
          "https://venom.network/static/media/bg-main.6b6f0965e7c3b3d9833b.jpg",
        mimetype: "image/png",
      },
      files: [
        {
          source:
            "https://venom.network/static/media/bg-main.6b6f0965e7c3b3d9833b.jpg",
          mimetype: "image/jpg",
        },
      ],
      external_url: "https://venom.network",
    };
    // if (standalone) {
    const contract = new venomProvider.Contract(
      collectionAbi,
      collection_address_devnet
    );
    const count = await contract.methods.totalSupply({ answerId: 0 }).call();

    console.log({ count });

    const outputs = await contract.methods
      .mintNft({ json: JSON.stringify(json) })
      .send({
        from: new Address(signer_address),
        amount: "1",
      });
  };

  useEffect(() => {
    init();
  }, []);

  const check_standal = async () => {
    const standalone = await venomConnect?.getStandalone("venomwallet");
    console.log({ standalone });
  };

  // connect event handler
  useEffect(() => {
    const off = venomConnect?.on("connect", onConnect);
    if (venomConnect) {
      //   console.log({ venomConnect });
      //   initStandalone();
      checkAuth(venomConnect);
    }

    return () => {
      off?.();
    };
  }, [venomConnect]);

  // functions for nft fetching
  const getNftImage = async (provider, nftAddress) => {
    const nftContract = new provider.Contract(nftAbi, nftAddress);
    // calling getJson function of NFT contract
    const getJsonAnswer = await nftContract.methods
      .getJson({ answerId: 0 })
      .call();
    const json = JSON.parse(getJsonAnswer.json ?? "{}");
    return json.preview?.source || "";
  };

  // Returns array with NFT's images urls
  const getCollectionItems = async (provider, nftAddresses) => {
    return Promise.all(
      nftAddresses.map(async (nftAddress) => {
        const imgInfo = await getNftImage(provider, nftAddress);
        return imgInfo;
      })
    );
  };

  // function CollectionItems({ standaloneProvider }: Props) {
  //   // Just a strings array. Each string is an URL of NFT image.
  //   const [collectionItems, setCollectionItem] = useState<string[] | []>([]);
  //   const [listIsEmpty, setListIsEmpty] = useState(false);
  //   // This method returns an NFT code hash by calling Collection contract. We need code hash for searching all NFTs
  //   // Returned code hash is a code hash ONLY for NFT of concrete collection
  //   const getNftCodeHash = async (provider: ProviderRpcClient): Promise<string> => {
  //     const collectionAddress = new Address(COLLECTION_ADDRESS);
  //     const contract = new provider.Contract(collectionAbi, collectionAddress);
  //     const { codeHash } = await contract.methods.nftCodeHash({ answerId: 0 } as never).call({ responsible: true });
  //     return BigInt(codeHash).toString(16);
  //   };
  //   // Method, that return NFT's addresses by single query with fetched code hash
  //   const getNftAddresses = async (codeHash) => {
  //     const addresses = await standaloneProvider?.getAccountsByCodeHash({ codeHash });
  //     return addresses?.accounts;
  //   };
  // Main method of this component.
  const loadNFTs = async (provider) => {
    setListIsEmpty(false);
    try {
      const nftCodeHash = await getNftCodeHash(provider);
      if (!nftCodeHash) {
        return;
      }
      const nftAddresses = await getNftAddresses(nftCodeHash);
      if (!nftAddresses || !nftAddresses.length) {
        if (nftAddresses && !nftAddresses.length) setListIsEmpty(true);
        return;
      }
      const nftURLs = await getCollectionItems(provider, nftAddresses);
      setCollectionItem(nftURLs);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Navbar
        theme={"dark"}
        signer_address={signer_address}
        connect_wallet={connect_wallet}
        onDisconnect={onDisconnect}
      />
      {/* <button
        onClick={async () => {
          loadNFTs();
        }}
        className="mt-52"
      >
        Press ME
      </button> */}
      <Component
        {...pageProps}
        create_user={create_user}
        update_profile={update_profile}
        create_collection={create_collection}
        create_nft={create_nft}
        mint_nft={mint_nft}
        standaloneProvider={venomProvider}
        theme={"dark"}
        signer_address={signer_address}
        blockURL={blockURL}
      />
      <Footer theme={"dark"} />
    </>
  );
}
