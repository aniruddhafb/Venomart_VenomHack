import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import NftCard from "@/components/cards/NftCard";
import { MdVerified } from "react-icons/md";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import Head from "next/head";
import Loader from "@/components/Loader";

const Collection = ({ get_nfts_by_collection, get_collection_info_by_id, blockURL, collection_address_devnet }) => {

  const router = useRouter();
  const { slug } = router.query;

  const [loading, setLoading] = useState(false);
  const [collection_data, set_collection_data] = useState();
  const [nft_data, set_nft_data] = useState();

  useEffect(() => {
    (async () => {
      if (!slug) return;
      setLoading(true);
      const collection_info = await get_collection_info_by_id(slug);
      set_collection_data(collection_info.data);

      const nfts = await get_nfts_by_collection(collection_info.data.name);
      set_nft_data(nfts.data);
      console.log(nfts.data)
      setLoading(false);
    })();
  }, [slug]);

  return (
    <>
      <Head>
        <title>Collection Page - Venomart Marketplace</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fav.png" />
      </Head>

      {loading ? (
        <Loader />
      ) : (
        <>
          {/* <!-- Banner IMG--> */}
          <div className="relative mt-24">
            <Image
              src={collection_data?.coverImage?.replace(
                "ipfs://",
                "https://gateway.ipfscdn.io/ipfs/"
              )}
              width={100}
              height={100}
              alt="banner"
              className="h-[18.75rem] w-[100%] object-cover"
            />
          </div>

          {/* <!-- Collection Section --> */}
          <section className="relative bg-transparent pb-12 pt-28 dark:bg-jacarta-800">
            <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
              <div className="relative">
                <Image
                  src={collection_data?.logo?.replace(
                    "ipfs://",
                    "https://gateway.ipfscdn.io/ipfs/"
                  )}
                  width={100}
                  height={100}
                  alt="collection avatar"
                  className="rounded-xl border-[5px] border-white dark:border-jacarta-600 h-[130px] w-[auto]"
                />
                <div className="absolute -right-3 bottom-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-white dark:border-jacarta-600">
                  <MdVerified
                    style={{ color: "#4f87ff", cursor: "pointer" }}
                    size={30}
                  />
                </div>
              </div>
            </div>

            <div className="container">
              <div className="text-center">
                <div className="mb-6 inline-flex items-center justify-center rounded-full border border-jacarta-100 bg-transparent py-1.5 px-4 dark:border-jacarta-600 dark:bg-jacarta-700">
                  <a
                    href={`${blockURL}accounts/${collection_data?.collection_address}`}
                    target="_blank"
                    className="js-copy-clipboard max-w-[10rem] select-none overflow-hidden text-ellipsis whitespace-nowrap dark:text-jacarta-200"
                  >
                    <span>{collection_data?.collection_address}</span>
                  </a>
                </div>
                <h2 className="mb-2 mt-2 font-display text-4xl font-medium text-jacarta-700 dark:text-white">
                  {collection_data?.name}
                </h2>
                <div className="mb-4"></div>

                {/* desc  */}
                <p className="mx-auto mb-14 max-w-xl text-lg dark:text-jacarta-300">
                  {collection_data?.description}
                </p>

                {/* stats  */}
                <div className="mb-8 inline-flex flex-wrap items-center justify-center rounded-xl border border-jacarta-100 bg-transparent dark:border-jacarta-600 dark:bg-jacarta-800">
                  <a
                    href="#"
                    className="w-1/2 rounded-l-xl border-r border-jacarta-100 py-4 hover:shadow-md dark:border-jacarta-600 sm:w-32"
                  >
                    <div className="mb-1 text-base font-bold text-jacarta-700 dark:text-white">
                      {nft_data?.length}
                    </div>
                    <div className="text-2xs font-medium tracking-tight dark:text-jacarta-400">
                      Items
                    </div>
                  </a>
                  <a
                    href="#"
                    className="w-1/2 border-jacarta-100 py-4 hover:shadow-md dark:border-jacarta-600 sm:w-32 sm:border-r"
                  >
                    <div className="mb-1 text-base font-bold text-jacarta-700 dark:text-white">
                      1
                    </div>
                    <div className="text-2xs font-medium tracking-tight dark:text-jacarta-400">
                      Owners
                    </div>
                  </a>
                  <a
                    href="#"
                    className="w-1/2 border-r border-jacarta-100 py-4 hover:shadow-md dark:border-jacarta-600 sm:w-32"
                  >
                    <div className="mb-1 flex items-center justify-center text-base font-medium text-jacarta-700 dark:text-white">
                      <span className="font-bold mr-2">0</span>
                      <Image src={`../../venom.svg`} height={18} width={18} />
                    </div>
                    <div className="text-2xs font-medium tracking-tight dark:text-jacarta-400">
                      Floor Price
                    </div>
                  </a>
                  <a
                    href="#"
                    className="w-1/2 rounded-r-xl border-jacarta-100 py-4 hover:shadow-md sm:w-32"
                  >
                    <div className="mb-1 flex items-center justify-center text-base font-medium text-jacarta-700 dark:text-white">
                      <span className="font-bold mr-2">0</span>
                      <Image src={`../../venom.svg`} height={18} width={18} />
                    </div>
                    <div className="text-2xs font-medium tracking-tight dark:text-jacarta-400">
                      Volume Traded
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* nft section  */}
          <section className="relative py-24 pt-20" style={{ backgroundColor: "#080808" }}>
            <div className="container">
              <div className="tab-content">
                <div
                  className="tab-pane fade show active"
                  id="on-sale"
                  role="tabpanel"
                  aria-labelledby="on-sale-tab"
                >
                  <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
                    {nft_data?.map((e, index) => {
                      const nft_info = JSON.parse(e.json);
                      return (
                        <NftCard
                          key={index}
                          ImageSrc={nft_info.nft_image?.replace(
                            "ipfs://",
                            "https://gateway.ipfscdn.io/ipfs/"
                          )}
                          Name={nft_info?.name}
                          Description={nft_info?.description}
                          Address={nft_info?.nft_collection}
                          tokenId={e?.tokenId}
                          listedBool={e?.isListed}
                          listingPrice={"0.2"}
                          collection_address_devnet={collection_address_devnet}
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-center">
                    {nft_data?.length <= 0 &&
                      <h2 className="text-xl font-display font-thin">
                        This collection has no NFTs !!
                      </h2>
                    }
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Collection;
