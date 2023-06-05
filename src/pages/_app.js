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

import {
  Address,
  ProviderRpcClient,
  Subscriber,
} from "everscale-inpage-provider";
import { useEffect, useState } from "react";
import { initVenomConnect } from "../components/test_config";
import mongoose from "mongoose";
// import { toNano } from "locklift";

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
    // const res = await axios({
    //   url: `${BaseURL}/users`,
    //   method: "POST",
    //   data: {
    //     wallet_id: data.wallet_id,
    //     user_name: "",
    //     bio: "",
    //     email: "",
    //     walletAddress: "",
    //     profileImage: "",
    //     coverImage: "",
    //   },
    // });
    // return res.data;
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
    "0:bf51c69a34b0662a0ac14bb8655f8eeb9939553ae3c5a7ba2adc53dfb1d9a15f";
  // "0:e0503cdd6dfc9a3203b2745d2636022d94b2f11da10d3c5550c25a00bd85ee34";

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
    const { count: id } = await contract.methods
      .totalSupply({ answerId: 0 })
      .call();

    console.log({ id });

    const subscriber = new Subscriber(venomProvider);
    contract
      .events(subscriber)
      .filter((event) => event.event === "tokenCreated")
      .on(async (event) => {
        console.log({ event });
      });

    const outputs = await contract.methods
      .mintNft({ json: JSON.stringify(json) })
      .send({
        from: new Address(signer_address),
        amount: "1000000000",
      });

    const { nft: nftAddress } = await contract.methods
      .nftAddress({ answerId: 0, id: id })
      .call();

    console.log({ nftAddress });
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
    console.log({ json });
    return json.preview?.source || "";
  };

  // Returns array with NFT's images urls
  const getCollectionItems = async (provider, nftAddresses) => {
    return Promise.all(
      nftAddresses.map(async (nftAddress) => {
        const imgInfo = await getNftImage(provider, nftAddress);
        console.log({ imgInfo });
        return imgInfo;
      })
    );
  };

  const getNftCodeHash = async (provider) => {
    const collectionAddress = new Address(collection_address_devnet);
    const contract = new provider.Contract(collectionAbi, collectionAddress);
    const { codeHash } = await contract.methods
      .nftCodeHash({ answerId: 0 })
      .call({ responsible: true });
    return BigInt(codeHash).toString(16);
  };

  // Method, that return NFT's addresses by single query with fetched code hash
  const getNftAddresses = async (codeHash) => {
    console.log({ codeHash });
    const addresses = await venomProvider?.getAccountsByCodeHash({
      codeHash,
    });
    console.log({ addresses });
    return addresses?.accounts;
  };

  const getNftsByIndexes = async (provider, indexAddresses) => {
    const nftAddresses = await Promise.all(
      indexAddresses.map(async (indexAddress) => {
        const indexContract = new provider.Contract(indexAbi, indexAddress);
        const indexInfo = await indexContract.methods
          .getInfo({ answerId: 0 })
          .call();
        return indexInfo.nft;
      })
    );
    return getCollectionItems(provider, nftAddresses);
  };

  const saltCode = async (provider, ownerAddress) => {
    // Index StateInit you should take from github. It ALWAYS constant!
    const INDEX_BASE_64 =
      "te6ccgECIAEAA4IAAgE0AwEBAcACAEPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAgaK2zUfBAQkiu1TIOMDIMD/4wIgwP7jAvILHAYFHgOK7UTQ10nDAfhmifhpIds80wABn4ECANcYIPkBWPhC+RDyqN7TPwH4QyG58rQg+COBA+iogggbd0CgufK0+GPTHwHbPPI8EQ4HA3rtRNDXScMB+GYi0NMD+kAw+GmpOAD4RH9vcYIImJaAb3Jtb3Nwb3T4ZNwhxwDjAiHXDR/yvCHjAwHbPPI8GxsHAzogggujrde64wIgghAWX5bBuuMCIIIQR1ZU3LrjAhYSCARCMPhCbuMA+EbycyGT1NHQ3vpA0fhBiMjPjits1szOyds8Dh8LCQJqiCFus/LoZiBu8n/Q1PpA+kAwbBL4SfhKxwXy4GT4ACH4a/hs+kJvE9cL/5Mg+GvfMNs88gAKFwA8U2FsdCBkb2Vzbid0IGNvbnRhaW4gYW55IHZhbHVlAhjQIIs4rbNYxwWKiuIMDQEK103Q2zwNAELXTNCLL0pA1yb0BDHTCTGLL0oY1yYg10rCAZLXTZIwbeICFu1E0NdJwgGOgOMNDxoCSnDtRND0BXEhgED0Do6A34kg+Gz4a/hqgED0DvK91wv/+GJw+GMQEQECiREAQ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAD/jD4RvLgTPhCbuMA0x/4RFhvdfhk0ds8I44mJdDTAfpAMDHIz4cgznHPC2FeIMjPkll+WwbOWcjOAcjOzc3NyXCOOvhEIG8TIW8S+ElVAm8RyM+EgMoAz4RAzgH6AvQAcc8LaV4gyPhEbxXPCx/OWcjOAcjOzc3NyfhEbxTi+wAaFRMBCOMA8gAUACjtRNDT/9M/MfhDWMjL/8s/zsntVAAi+ERwb3KAQG90+GT4S/hM+EoDNjD4RvLgTPhCbuMAIZPU0dDe+kDR2zww2zzyABoYFwA6+Ez4S/hK+EP4QsjL/8s/z4POWcjOAcjOzc3J7VQBMoj4SfhKxwXy6GXIz4UIzoBvz0DJgQCg+wAZACZNZXRob2QgZm9yIE5GVCBvbmx5AELtRNDT/9M/0wAx+kDU0dD6QNTR0PpA0fhs+Gv4avhj+GIACvhG8uBMAgr0pCD0oR4dABRzb2wgMC41OC4yAAAADCD4Ye0e2Q==";
    // Gettind a code from Index StateInit
    const tvc = await provider.splitTvc(INDEX_BASE_64);
    if (!tvc.code) throw new Error("tvc code is empty");
    const ZERO_ADDRESS =
      "0:0000000000000000000000000000000000000000000000000000000000000000";

    // Salt structure that we already know
    const saltStruct = [
      { name: "zero_address", type: "address" },
      { name: "owner", type: "address" },
      { name: "type", type: "fixedbytes3" }, // according on standards, each index salted with string 'nft'
    ];
    const { code: saltedCode } = await provider.setCodeSalt({
      code: tvc.code,
      salt: {
        structure: saltStruct,
        abiVersion: "2.1",
        data: {
          zero_address: new Address(ZERO_ADDRESS),
          owner: new Address(ownerAddress),
          type: btoa("nft"),
        },
      },
    });
    return saltedCode;
  };

  const getAddressesFromIndex = async (codeHash) => {
    const addresses = await venomProvider?.getAccountsByCodeHash({
      codeHash,
    });
    return addresses?.accounts;
  };

  // const user_nfts = async () => {
  //   const provider = venomProvider;
  //   try {
  //     // Take a salted code
  //     const saltedCode = await saltCode(provider, signer_address);
  //     // Hash it
  //     const codeHash = await provider.getBocHash(saltedCode);
  //     console.log({ codeHash });
  //     if (!codeHash) {
  //       return;
  //     }
  //     // Fetch all Indexes by hash
  //     const indexesAddresses = await getAddressesFromIndex(codeHash);
  //     console.log({ indexesAddresses });
  //     // if (!indexesAddresses || !indexesAddresses.length) {
  //     //   if (indexesAddresses && !indexesAddresses.length) setListIsEmpty(true);
  //     //   return;
  //     // }
  //     // Fetch all image URLs
  //     const nftURLs = await getNftsByIndexes(provider, indexesAddresses);
  //     console.log({ nftURLs });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // Main method of this component.
  const loadNFTs = async () => {
    const provider = venomProvider;
    // setListIsEmpty(false);
    try {
      const nftCodeHash = await getNftCodeHash(provider);
      if (!nftCodeHash) {
        return;
      }
      const nftAddresses = await getNftAddresses(nftCodeHash);
      // if (!nftAddresses || !nftAddresses.length) {
      //   if (nftAddresses && !nftAddresses.length) setListIsEmpty(true);
      //   return;
      // }
      // console.log({ nftAddresses });
      const nftURLs = await getCollectionItems(provider, nftAddresses);
      console.log({ nftURLs });
      // setCollectionItem(nftURLs);
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
      <button
        onClick={async () => {
          // user_nfts();
          loadNFTs();
        }}
        className="mt-52"
      >
        Press ME
      </button>
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
