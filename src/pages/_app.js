import "@/styles/bootstrap.css";
import "@/styles/custom.css";
import "@/styles/globals.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

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
    console.log({ _venomConnect: _venomConnect });
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

  const COLLECTION_ADDRESS =
    "0:077a77605777883de614c5ef9fe3c24ca5d980ac3059126569c0f3d765824f47";
  // "0:d0fb0d10639c4a14009a08682ab06dd6b990a5f8d7d22f10b6da6c6b65c3df37";
  const getNftCodeHash = async (provider) => {
    const collectionAddress = new Address(COLLECTION_ADDRESS);
    const contract = new provider.Contract(collectionAbi, collectionAddress);
    const { codeHash } = await contract.methods
      .nftCodeHash({ answerId: 0 })
      .call({ responsible: true });
    console.log(codeHash);
    return BigInt(codeHash).toString(16);
  };

  const getNftAddresses = async (codeHash) => {
    const addresses = await standaloneProvider?.getAccountsByCodeHash({
      codeHash,
    });
    console.log(addresses);
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
      console.log({ nftURLs });
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
    const INDEX_BASE_64 = "";
    // Gettind a code from Index StateInit
    const tvc = await provider.splitTvc(INDEX_BASE_64);
    if (!tvc.code) throw new Error("tvc code is empty");
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
          collection: new Address(COLLECTION_ADDRESS),
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

  useEffect(() => {
    init();
  }, []);

  // connect event handler
  useEffect(() => {
    const off = venomConnect?.on("connect", onConnect);
    if (venomConnect) {
      initStandalone();
      checkAuth(venomConnect);
    }
    return () => {
      off?.();
    };
  }, [venomConnect]);

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
