import "@/styles/bootstrap.css";
import "@/styles/custom.css";
import "@/styles/globals.css";
import axios from "axios";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { v4 as uuidv4 } from "uuid";
import User from "../models/User";
import dbConnect from "@/lib/dbConnect";
// import { toNano } from "locklift";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import indexAbi from "../../abi/Index.abi.json";
import nftAbi from "../../abi/Nft.abi.json";
import collectionAbi from "../../abi/Sample.abi.json";
import collectionFactory from "../../abi/CollectionFactory.abi.json";

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
  // const BaseURL = "https://venomart.space/api";
  const BaseURL = "http://localhost:3000/api";

  const blockURL = "https://devnet.venomscan.com/";
  const storage = new ThirdwebStorage();

  const [venomConnect, setVenomConnect] = useState();
  const [venomProvider, setVenomProvider] = useState();
  const [signer_address, setSignerAddress] = useState();

  const [standaloneProvider, setStandAloneProvider] = useState();

  const collection_address_devnet =
    "0:ed149312db64ae4f123785fce15cde133c388d37a943c01736fcf1e36e48c9a3";

  const collection_factory_address =
    "0:88b78baad2ac1e959ce5ad7e83f7a39bc0ecb4c2cbc119a84fc381d990d508fb";

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
        isArtist: false,
      },
    });
    return res.data;
  };

  const create_nft = async (data) => {
    console.log(data);
    try {
      const ipfs_image = await storage.upload(data.image);
      const nft_json = JSON.stringify({
        nft_image: ipfs_image,
        name: data.name,
        description: data.description,
        collection_name: data.collection,
        properties: data.properties.filter((e) => e.type.length > 0),
      });
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
          const res = await axios({
            url: `${BaseURL}/nfts`,
            method: "POST",
            data: {
              tokenId: event.data.tokenId,
              collection_name: data.collection,
              json: nft_json,
              owner: signer_address,
            },
          });

          console.log(res.data);
        });
      const outputs = await contract.methods
        .mintNft({ json: JSON.stringify(nft_json) })
        .send({
          from: new Address(signer_address),
          amount: "1000000000",
        });

      const { nft: nftAddress } = await contract.methods
        .nftAddress({ answerId: 0, id: id })
        .call();
      console.log({ nftAddress });
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const fetch_nfts = async (data) => {
    try {
      const res = await axios({
        url: `${BaseURL}/nfts`,
        method: "GET",
      });
      if (!res.data.data) return;
      return res.data;
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const get_nft_by_tokenId = async (tokenId) => {
    try {
      const res = await axios({
        url: `${BaseURL}/get_nft_tokenId`,
        method: "POST",
        data: {
          tokenId,
        },
      });

      const obj = {
        ...res.data.data[0],
        ...JSON.parse(res.data.data[0].json),
      };

      return obj;
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const get_nfts_by_collection = async (collection_name) => {
    try {
      const nfts = await axios({
        url: `${BaseURL}/get_nft_by_collection`,
        method: "POST",
        data: {
          collection_name,
        },
      });

      return nfts.data;
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const update_profile = async (data) => {
    console.log(data.isArtist);
    const profile_img = data?.profileImage
      ? await storage.upload(data.profileImage)
      : data.profileImage;
    const cover_img = data?.coverImage
      ? await storage.upload(data.coverImage)
      : data.coverImage;
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
        isArtist: data.isArtist,
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
        collection_address: collection_address_devnet,
        coverImage: ipfsUrl_cover,
        logo: ipfsUrl_logo,
        name: data.name,
        symbol: data.symbol,
        description: data.description,
      },
    });
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

  const mint_nft = async (provider) => {
    // const standalone = await venomConnect?.getStandalone("venomwallet");
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
  };

  useEffect(() => {
    init();
    //fetch all collection
    fetch_all_collections();
  }, []);

  // connect event handler
  useEffect(() => {
    const off = venomConnect?.on("connect", onConnect);
    if (venomConnect) {
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
    return json;
  };

  // Returns array with NFT's images urls
  const getCollectionItems = async (provider, nftAddresses) => {
    return Promise.all(
      nftAddresses.map(async (nftAddress) => {
        const imgInfo = await getNftImage(provider, nftAddress);
        return JSON.parse(imgInfo);
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
    const addresses = await venomProvider?.getAccountsByCodeHash({
      codeHash,
    });
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

  // Main method of this component.
  const loadNFTs = async () => {
    const provider = venomProvider;
    try {
      const nftCodeHash = await getNftCodeHash(provider);
      if (!nftCodeHash) {
        return;
      }
      const nftAddresses = await getNftAddresses(nftCodeHash);
      if (!nftAddresses || !nftAddresses.length) {
        // if (nftAddresses && !nftAddresses.length) setListIsEmpty(true);
        return;
      }
      const nftURLs = await getCollectionItems(provider, nftAddresses);
    } catch (e) {
      console.error(e);
    }
  };

  const fetch_artists = async () => {
    try {
      const artists = await axios({
        url: `${BaseURL}/fetch_artists`,
        method: "GET",
      });
      console.log(artists.data);
      return artists.data;
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const fetch_collection_by_name = async (collection_id) => {
    try {
      const res = await axios({
        url: `${BaseURL}/get_collection_by_name`,
        method: "POST",
        data: {
          collection_id,
        },
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const get_nfts_by_owner = async (wallet_id) => {
    try {
      const res = await axios({
        url: `${BaseURL}/get_nft_owner`,
        method: "POST",
        data: {
          wallet_id,
        },
      });

      return res.data;
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  //COLLECTION FACTORY
  const create_new_collection = async (data) => {
    const contract = new venomProvider.Contract(
      collectionFactory,
      collection_factory_address
    );

    const cover_ips = await storage.upload(data.image);
    const logo_ipfs = await storage.upload(data.logo);

    const res = await axios({
      url: `${BaseURL}/collections`,
      method: "POST",
      data: {
        collection_address: collection_address_devnet,
        user_wallet: signer_address,
        cover_image: cover_ips,
        logo: logo_ipfs,
        name: data.name,
        symbol: data.symbol,
        description: data.description,
      },
    });
  };

  const get_collection_info_by_id = async (user_id) => {
    try {
      const res = await axios({
        url: `${BaseURL}/get_collection_owner`,
        method: "POST",
        data: {
          wallet_address: user_id,
        },
      });
      return res.data;
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const get_collections_by_owner = async (signer_address) => {
    try {
      const res = await axios({
        url: `${BaseURL}/get_collection_owner`,
        method: "POST",
        data: {
          wallet_address: signer_address,
        },
      });
      return res.data;
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const fetch_all_collections = async () => {
    try {
      const res = await axios({
        url: `${BaseURL}/get_all_collections`,
        method: "GET",
      });
      return res.data.data;
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  // SELL NFTS
  const NFT_ADDRESS = new Address(
    "0:f5a48f12fc9d3208d5b885b8d839834faff4c36fd653e5812e48cfb6ed187d60"
  );
  const AUCTION_ADDRESS = new Address(
    "0:6bdbcd439ba96f803cba9477ab27ffdea2c82db5467d9af35ba05ad9f4585b86"
  );

  const sell_nft = async (nft_address, tokenId, price) => {
    try {
      const nft_contract = new venomProvider.Contract(nftAbi, nft_address);
      const txn = await nft_contract.methods
        .transfer({
          to: AUCTION_ADDRESS,
          sendGasTo: signer_address,
          callbacks: [[AUCTION_ADDRESS, { value: "100000000", payload: "" }]],
        })
        .send({
          from: signer_address,
          amount: "2000000000",
        });
      console.log({ txn });
      const res = await axios({
        url: `${BaseURL}/list_nft`,
        method: "POST",
        data: {
          signer_address: signer_address,
          tokenId,
          listingPrice: (Number(price) * 1000000000).toString(),
        },
      });

      console.log(res.data);
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const buy_nft = async (nft_address) => {
    await tokenWalletInstance.methods
      .transfer({
        amount: "1000000000", // with decimals
        recipient: AUCTION_ADDRESS, // because it got it's own wallet
        deployWalletValue: 0, // we know, that auction wallet deployed already
        remainingGasTo: signer_address,
        notify: true, // IMPORTANT to set it "true" for onAcceptTokensTransfer to be called
        payload: "",
      })
      .send({
        from: someAccount.address,
        amount: toNano(2),
      });
  };

  return (
    <>
      <Navbar
        theme={"dark"}
        signer_address={signer_address}
        connect_wallet={connect_wallet}
        onDisconnect={onDisconnect}
      />
      {/* <button className="mt-52" onClick={sell_nft}>
        Press{" "}
      </button> */}
      <Component
        {...pageProps}
        sell_nft={sell_nft}
        fetch_collection_by_name={fetch_collection_by_name}
        get_nfts_by_collection={get_nfts_by_collection}
        get_nft_by_tokenId={get_nft_by_tokenId}
        get_nfts_by_owner={get_nfts_by_owner}
        fetch_all_collections={fetch_all_collections}
        get_collections_by_owner={get_collections_by_owner}
        get_collection_info_by_id={get_collection_info_by_id}
        create_new_collection={create_new_collection}
        fetch_nfts={fetch_nfts}
        loadNFTs={loadNFTs}
        create_user={create_user}
        update_profile={update_profile}
        create_collection={create_collection}
        create_nft={create_nft}
        mint_nft={mint_nft}
        standaloneProvider={venomProvider}
        theme={"dark"}
        signer_address={signer_address}
        blockURL={blockURL}
        collection_address_devnet={collection_address_devnet}
      />
      <Footer theme={"dark"} />
    </>
  );
}
