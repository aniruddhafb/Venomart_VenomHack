import React, { useEffect, useState } from "react";
import NftCard from "@/components/cards/NftCard";
import Head from "next/head";
import Loader from "@/components/Loader";

const Marketplace = ({ fetch_nfts, collection_address_devnet }) => {
  const [loading, setLoading] = useState(false);
  const [nfts, set_nfts] = useState([]);
  const [notListedNFts, setNotListedNFts] = useState([]);

  const [propShow, setPropShow] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const nfts = await fetch_nfts();
      set_nfts(nfts.data);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Marketplace - Venomart Marketplace</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fav.png" />
      </Head>

      {loading ? (
        <Loader />
      ) : (
        <section className="relative py-24" id="heroBack">
          <div className="container">
            <h1 className="py-16 text-center font-display text-4xl font-medium text-jacarta-700 dark:text-white">
              Explore NFTs
            </h1>

            {/* <!-- Filters --> */}
            <div className="mb-8 flex flex-wrap items-center justify-between">
              <ul className="flex flex-wrap items-center">
                <li className="my-1 mr-2.5" onClick={() => setPropShow(true)}>
                  <a
                    href="#"
                    className={`${propShow && "border-transparent bg-[#189C87] text-white"
                      } ${!propShow && "bg-white"
                      } group flex h-9 items-center rounded-lg border border-jacarta-100 px-4 font-display text-sm font-semibold text-jacarta-500 transition-colors `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="mr-1 h-4 w-4 fill-jacarta-700"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 2c5.522 0 10 3.978 10 8.889a5.558 5.558 0 0 1-5.556 5.555h-1.966c-.922 0-1.667.745-1.667 1.667 0 .422.167.811.422 1.1.267.3.434.689.434 1.122C13.667 21.256 12.9 22 12 22 6.478 22 2 17.522 2 12S6.478 2 12 2zm-1.189 16.111a3.664 3.664 0 0 1 3.667-3.667h1.966A3.558 3.558 0 0 0 20 10.89C20 7.139 16.468 4 12 4a8 8 0 0 0-.676 15.972 3.648 3.648 0 0 1-.513-1.86zM7.5 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM12 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                    </svg>
                    <span>All NFTs</span>
                  </a>
                </li>
                <li className="my-1 mr-2.5" onClick={() => setPropShow(false)}>
                  <a
                    href="#"
                    className={`${!propShow && "border-transparent bg-[#189C87] text-white"
                      } ${propShow && "bg-white"
                      } group flex h-9 items-center rounded-lg border border-jacarta-100 px-4 font-display text-sm font-semibold text-jacarta-500 transition-colors `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="mr-1 h-4 w-4 fill-jacarta-700"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 2c5.522 0 10 3.978 10 8.889a5.558 5.558 0 0 1-5.556 5.555h-1.966c-.922 0-1.667.745-1.667 1.667 0 .422.167.811.422 1.1.267.3.434.689.434 1.122C13.667 21.256 12.9 22 12 22 6.478 22 2 17.522 2 12S6.478 2 12 2zm-1.189 16.111a3.664 3.664 0 0 1 3.667-3.667h1.966A3.558 3.558 0 0 0 20 10.89C20 7.139 16.468 4 12 4a8 8 0 0 0-.676 15.972 3.648 3.648 0 0 1-.513-1.86zM7.5 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM12 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                    </svg>
                    <span>Listed NFTs</span>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="container">
                {propShow ? (
                  <div className="flex flex-wrap justify-start align-middle">
                    {nfts.map((e, index) => {
                      const nft_info = JSON.parse(e.json);
                      return (
                        <NftCard
                          key={index}
                          ImageSrc={nft_info.nft_image?.replace(
                            "ipfs://",
                            "https://ipfs.io/ipfs/"
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
                ) : (
                  <div className="flex flex-wrap justify-start align-middle">
                    {nfts.map((e, index) => {
                      const nft_info = JSON.parse(e.json);
                      return (
                        e?.isListed == true &&
                        <NftCard
                          key={index}
                          ImageSrc={nft_info.nft_image?.replace(
                            "ipfs://",
                            "https://ipfs.io/ipfs/"
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
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Marketplace;
