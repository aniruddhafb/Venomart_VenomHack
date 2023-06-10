import CollectionCard from "@/components/cards/CollectionCard";
import Head from "next/head";
import Link from "next/link";
import NftCard from "@/components/cards/NftCard";
import { useEffect, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
export default function Home({
  fetch_nfts,
  loadNFTs,
  standaloneProvider,
  collection_address_devnet,
  fetch_all_collections,
}) {
  const [nfts, set_nfts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState("");

  useEffect(() => {
    (async () => {

      setLoading(true);
      const nfts = await fetch_nfts();
      const collections = await fetch_all_collections();
      setLoading(false);

      if (!nfts) return;
      set_nfts(nfts.data);
      setCollections(collections);

      if (!standaloneProvider) return;
      loadNFTs();
    })();
  }, [standaloneProvider]);
  return (
    <>
      <Head>
        <title>
          Venomart Marketplace - Trusted NFT Marketplace on Venom Blockchain
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fav.png" />
      </Head>

      {/* hero section */}
      <section
        className="relative pb-10 pt-20 md:pt-32 lg:h-[88vh]"
        id="heroBack"
      >
        <div className="container h-full">
          <div className="grid h-full items-center gap-4 md:grid-cols-12">
            <div className="col-span-6 flex h-full flex-col items-center justify-center py-10 md:items-start md:py-20 xl:col-span-4">
              <h1 className="mb-6 text-center font-display text-5xl text-jacarta-700 dark:text-white md:text-left lg:text-6xl xl:text-7xl">
                Buy, sell and collect NFTs.
              </h1>
              <p className="mb-8 text-center text-lg dark:text-jacarta-200 md:text-left">
                Collect you favourite NFTs on venom blockchain <br /> Trade NFTs
                for free on venomart..
              </p>
              <div className="flex space-x-4">
                <Link
                  href="/nft/createNFT"
                  className="w-36 rounded-full bg-[#189C87] py-3 px-8 text-center font-semibold text-white transition-all hover:bg-[#087160]"
                >
                  Create
                </Link>
                <Link
                  href="/nft/exploreNFTs"
                  className="w-36 rounded-full bg-white py-3 px-8 text-center font-semibold text-[#189C87] transition-all hover:bg-[#087160] hover:text-white"
                >
                  Explore
                </Link>
              </div>
            </div>

            <div className="col-span-6 xl:col-span-8">
              <div className="relative text-center md:pl-8 md:text-right">
                <img
                  src="../../1.png"
                  alt="Hero"
                  className="customHeroImg mt-8 inline-block w-72 rotate-[8deg] sm:w-[90%] lg:w-[21rem] xl:w-[28rem]"
                  style={{ borderRadius: "12%" }}
                />
                <img
                  src="../../3D_elements.png"
                  alt="3D"
                  className="absolute top-[-20px] animate-fly md:-right-[13%] sm:w-full lg:w-[30rem] xl:w-[44rem]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newly minted  */}
      <div className="py-24">
        <div className="container">
          <h2 className="mb-8 text-center font-display text-3xl text-jacarta-700 dark:text-white">
            <span className="mr-1 inline-block h-6 w-6 bg-contain bg-center text-xl"></span>
            Trending NFTs
          </h2>

          {loading ?
            <div className="flex flex-wrap justify-center align-middle">
              <BiLoaderAlt className="h-48 w-[60px] animate-spin" />
            </div>
            :
            <div className="flex flex-wrap justify-center align-middle">
              {nfts.map((e, index) => {
                const nft_info = JSON.parse(e.json);
                return index < 8 && (
                  <NftCard
                    key={index}
                    ImageSrc={nft_info.nft_image?.replace(
                      "ipfs://",
                      "https://gateway.ipfscdn.io/ipfs/"
                    )}
                    Name={nft_info?.name}
                    Description={nft_info?.description}
                    Address={nft_info?.collection}
                    tokenId={e?.tokenId}
                    listedBool={e?.isListed}
                    listingPrice={e?.listingPrice}
                    collection_address_devnet={collection_address_devnet}
                  />
                );
              })}
            </div>
          }
        </div>
      </div>

      {/* latest collections  */}
      <div className="relative py-24 dark:bg-jacarta-800">
        <div className="container">
          <div className="mb-12 text-center font-display text-3xl text-jacarta-700 dark:text-white">
            <h2 className="inline">Latest NFT Collections </h2>
          </div>
          {loading ?
            <div className="flex flex-wrap justify-center align-middle">
              <BiLoaderAlt className="h-48 w-[60px] animate-spin" />
            </div>
            :
            <div className="flex flex-wrap justify-center align-middle">
              {collections?.map((e, index) => {
                return index < 6 && (
                  <CollectionCard
                    key={index}
                    Name={e.name}
                    Cover={e.coverImage}
                    Logo={e.logo}
                    CollectionAddress={e.collection_address}
                    OwnerAddress={e.owner.wallet_id}
                    collection_id={e._id}
                  />
                );
              })}
            </div>
          }

          <div className="mt-10 text-center">
            <Link
              href="/collection/exploreCollections"
              className="inline-block rounded-full bg-[#189C87] py-3 px-8 text-center font-semibold text-white shadow-[#189C87] transition-all hover:bg-[#087160]"
            >
              Explore all collections
            </Link>
          </div>
        </div>
      </div>

      {/* features*/}
      <div className="relative py-24 dark:bg-jacarta-800">
        <div className="container">
          <h2 className="mb-24 text-center font-display text-3xl text-jacarta-700 dark:text-white">
            Features which venomart offers
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 text-center">
            <div className="text-center">
              <div className="mb-6 inline-flex rounded-full bg-[#CDBCFF] p-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-5 w-5 fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M17.409 19c-.776-2.399-2.277-3.885-4.266-5.602A10.954 10.954 0 0 1 20 11V3h1.008c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3H6V1h2v4H4v7c5.22 0 9.662 2.462 11.313 7h2.096zM18 1v4h-8V3h6V1h2zm-1.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-4 font-display text-lg text-jacarta-700 dark:text-white">
                1. Mint NFTs
              </h3>
              <p className="dark:text-jacarta-300">
                Mint on-chain NFTs on venom blockchain via venomart marketplace.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-6 inline-flex rounded-full bg-[#C4F2E3] p-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-5 w-5 fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-4 font-display text-lg text-jacarta-700 dark:text-white">
                2. Create AI NFTs
              </h3>
              <p className="dark:text-jacarta-300">
                Generate AI NFTS by writing some information about a situation
                or condition
              </p>
            </div>
            <div className="text-center">
              <div className="mb-6 inline-flex rounded-full bg-[#CDDFFB] p-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-5 w-5 fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M22 6h-7a6 6 0 1 0 0 12h7v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2zm-7 2h8v8h-8a4 4 0 1 1 0-8zm0 3v2h3v-2h-3z" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-4 font-display text-lg text-jacarta-700 dark:text-white">
                3. Create Collections
              </h3>
              <p className="dark:text-jacarta-300">
                Create your own NFT collections via Venomart on venom chain.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-6 inline-flex rounded-full bg-[#C4F2E3] p-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-5 w-5 fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-4 font-display text-lg text-jacarta-700 dark:text-white">
                4. Launch Your NFTs
              </h3>
              <p className="dark:text-jacarta-300">
                Launch your NFT collections via venomart's exclusive NFT
                launchpad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
