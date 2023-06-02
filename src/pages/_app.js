import "@/styles/bootstrap.css";
import "@/styles/custom.css";
import "@/styles/globals.css";

// import {} from ""
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import indexAbi from "../../abi/Index.abi.json";
import nftAbi from "../../abi/Nft.abi.json";
import collectionAbi from "../../abi/Sample.abi.json";

import { Address, ProviderRpcClient } from "everscale-inpage-provider";
import { useEffect, useState } from "react";
import { initVenomConnect } from "../components/configure";

export default function App({ Component, pageProps }) {
  const blockURL = "https://testnet.venomscan.com/";

  const [venomConnect, setVenomConnect] = useState();
  const [venomProvider, setVenomProvider] = useState();
  const [signer_address, setSignerAddress] = useState();

  const [standaloneProvider, setStandAloneProvider] = useState();

  const init = async () => {
    const _venomConnect = await initVenomConnect();
    setVenomConnect(_venomConnect);
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
    setVenomProvider(provider);
    await onProviderReady(provider);
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
    return venomWalletAddress;
  };

  const connect_wallet = async () => {
    if (!venomConnect) return;
    await venomConnect.connect();
  };

  //NFT FUNCTIONS
  const getNftImage = async (provider, nftAddress) => {
    const nftContract = new provider.Contract(nftAbi, nftAddress);
    // calling getJson function of NFT contract

    const getJsonAnswer = await nftContract.methods
      .getJson({ answerId: 0 })
      .call();
    const json = JSON.parse(getJsonAnswer.json ?? "{}");
    console.log(json);
    return json.preview?.source || "";
  };

  const getCollectionItems = async (provider, nftAddresses) => {
    return Promise.all(
      nftAddresses.map(async (nftAddress) => {
        const imgInfo = await getNftImage(provider, nftAddress);
        return imgInfo;
      })
    );
  };

  //COLLECTION FUNCTIONS

  const collection_address_testnet =
    "0:39835a453a55890e05894201f95e4eb101bef6d257cac86c85a40c60bc3e15ee";

  const COLLECTION_ADDRESS =
    "0:f50ca3ffcdd955757b1b7f28dc4c4b8e2ed0c95d6b6eb41f12b024dd2b09dd94";

  const getNftCodeHash = async (provider) => {
    const collectionAddress = new Address(collection_address_testnet);
    const contract = new provider.Contract(collectionAbi, collectionAddress);
    const { codeHash } = await contract.methods
      .nftCodeHash({ answerId: 0 })
      .call({ responsible: true });
    return BigInt(codeHash).toString(16);
  };

  const getNftAddresses = async (codeHash) => {
    const addresses = await standaloneProvider?.getAccountsByCodeHash({
      codeHash,
    });
    return addresses?.accounts;
  };

  const loadNFTs = async (provider) => {
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
      const nftURLs = await getCollectionItems(provider, nftAddresses);
    } catch (e) {
      console.error(e);
    }
  };

  const user_nfts = async (provider, ownerAddress) => {
    // setListIsEmpty(false);
    try {
      // Take a salted code
      const saltedCode = await saltCode(provider, ownerAddress);
      // Hash it
      const codeHash = await provider.getBocHash(saltedCode);
      if (!codeHash) {
        return;
      }
      // Fetch all Indexes by hash
      const indexesAddresses = await getAddressesFromIndex(codeHash);
      // if (!indexesAddresses || !indexesAddresses.length) {
      //   if (indexesAddresses && !indexesAddresses.length) setListIsEmpty(true);
      //   return;
      // }
      // Fetch all image URLs
      const nftURLs = await getNftsByIndexes(provider, indexesAddresses);
      console.log({ nftURLs });
      // setMyCollectionItems(nftURLs);
    } catch (e) {
      console.error(e);
    }
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
    const INDEX_BASE_64 = `te6ccgECIAEAA4IAAgE0AwEBAcACAEPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAgaK2zUfBAQkiu1TIOMDIMD/4wIgwP7jAvILHAYFHgOK7UTQ10nDAfhmifhpIds80wABn4ECANcYIPkBWPhC+RDyqN7TPwH4QyG58rQg+COBA+iogggbd0CgufK0+GPTHwHbPPI8EQ4HA3rtRNDXScMB+GYi0NMD+kAw+GmpOAD4RH9vcYIImJaAb3Jtb3Nwb3T4ZNwhxwDjAiHXDR/yvCHjAwHbPPI8GxsHAzogggujrde64wIgghAWX5bBuuMCIIIQR1ZU3LrjAhYSCARCMPhCbuMA+EbycyGT1NHQ3vpA0fhBiMjPjits1szOyds8Dh8LCQJqiCFus/LoZiBu8n/Q1PpA+kAwbBL4SfhKxwXy4GT4ACH4a/hs+kJvE9cL/5Mg+GvfMNs88gAKFwA8U2FsdCBkb2Vzbid0IGNvbnRhaW4gYW55IHZhbHVlAhjQIIs4rbNYxwWKiuIMDQEK103Q2zwNAELXTNCLL0pA1yb0BDHTCTGLL0oY1yYg10rCAZLXTZIwbeICFu1E0NdJwgGOgOMNDxoCSnDtRND0BXEhgED0Do6A34kg+Gz4a/hqgED0DvK91wv/+GJw+GMQEQECiREAQ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAD/jD4RvLgTPhCbuMA0x/4RFhvdfhk0ds8I44mJdDTAfpAMDHIz4cgznHPC2FeIMjPkll+WwbOWcjOAcjOzc3NyXCOOvhEIG8TIW8S+ElVAm8RyM+EgMoAz4RAzgH6AvQAcc8LaV4gyPhEbxXPCx/OWcjOAcjOzc3NyfhEbxTi+wAaFRMBCOMA8gAUACjtRNDT/9M/MfhDWMjL/8s/zsntVAAi+ERwb3KAQG90+GT4S/hM+EoDNjD4RvLgTPhCbuMAIZPU0dDe+kDR2zww2zzyABoYFwA6+Ez4S/hK+EP4QsjL/8s/z4POWcjOAcjOzc3J7VQBMoj4SfhKxwXy6GXIz4UIzoBvz0DJgQCg+wAZACZNZXRob2QgZm9yIE5GVCBvbmx5AELtRNDT/9M/0wAx+kDU0dD6QNTR0PpA0fhs+Gv4avhj+GIACvhG8uBMAgr0pCD0oR4dABRzb2wgMC41OC4yAAAADCD4Ye0e2Q==`;

    // Gettind a code from Index StateInit
    const tvc = await provider.splitTvc(INDEX_BASE_64);
    if (!tvc.code) throw new Error("tvc code is empty");
    const ZERO_ADDRESS =
      "0:0000000000000000000000000000000000000000000000000000000000000000";

    // Salt structure that we already know
    const saltStruct = [
      { name: "collection", type: "address" },
      { name: "owner", type: "address" },
      { name: "type", type: "fixedbytes3" }, // according on standards, each index salted with string 'nft'
    ];
    const { code: saltedCode } = await provider.setCodeSalt({
      code: tvc.code,
      salt: {
        structure: saltStruct,
        abiVersion: "2.1",
        data: {
          collection: new Address(ZERO_ADDRESS),
          owner: new Address(ownerAddress),
          type: btoa("nft"),
        },
      },
    });
    return saltedCode;
  };

  // Method, that return Index'es addresses by single query with fetched code hash
  const getAddressesFromIndex = async (codeHash) => {
    const addresses = await standaloneProvider?.getAccountsByCodeHash({
      codeHash,
    });
    return addresses?.accounts;
  };

  // const collection_contract = (provider) => {
  //   const contr = new provider.Contract(collectionAbi, COLLECTION_ADDRESS);
  //   return contr;
  // };

  const mint_nft = async (provider) => {
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

    const contr = new provider.Contract(
      collectionAbi,
      collection_address_testnet
    );

    const res = await contr.methods.mintNft({ json: json }).send({
      from: new Address(signer_address),
      amount: "2",
    });

    console.log(res);
  };

  useEffect(() => {
    init();
  }, []);

  // connect event handler
  useEffect(() => {
    const main_func = async () => {
      const off = venomConnect?.on("connect", onConnect);
      if (venomConnect) {
        const standaloneProvider = await initStandalone();
        checkAuth(venomConnect);
        if (!signer_address) return;
        user_nfts(standaloneProvider, signer_address);
      }
      return () => {
        off?.();
      };
    };

    main_func();
  }, [venomConnect, signer_address]);

  return (
    <>
      <Navbar
        theme={"dark"}
        signer_address={signer_address}
        connect_wallet={connect_wallet}
        onDisconnect={onDisconnect}
      />
      <Component
        {...pageProps}
        mint_nft={mint_nft}
        standaloneProvider={standaloneProvider}
        loadNFTs={loadNFTs}
        theme={"dark"}
        signer_address={signer_address}
        blockURL={blockURL}
      />
      <Footer theme={"dark"} />
    </>
  );
}
