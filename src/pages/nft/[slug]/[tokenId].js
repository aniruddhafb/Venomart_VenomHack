import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import testNFT from "../../../../public/img1.jpg";
import Image from "next/image";
import Head from "next/head";
import Loader from "@/components/Loader";
import Link from "next/link";
import { MdVerified } from "react-icons/md";

const NFTPage = ({
  signer_address,
  chainIdMain,
  get_nft_by_tokenId,
  blockURL,
  sell_nft,
  buy_nft,
}) => {
  const router = useRouter();
  const { slug, tokenId } = router.query;

  const [pageLoading, setPageLoading] = useState(false);
  const [loading, set_loading] = useState(false);

  const [listSale, setListSale] = useState(false);
  const [propShow, setPropShow] = useState(true);
  const [listingPrice, set_listing_price] = useState(0);
  const [nft, set_nft_info] = useState({});

  const balance = parseFloat(nft?.listingPrice / 1000000000).toFixed(2);

  const sell_user_nft = async (e) => {
    e.preventDefault();
    set_loading(true);
    if (listingPrice < 0) alert("Please give a valid listing price");
    await sell_nft(nft.nft_address, tokenId, listingPrice);
    set_loading(false);
    setTimeout(() => {
      router.reload();
    }, 1000);
  };

  const purchase_nft = async (tokenId) => {
    set_loading(true);
    await buy_nft(tokenId, nft?.listingPrice);
    set_loading(false);
    router.reload();
  };

  useEffect(() => {
    if (!tokenId) return;
    (async () => {
      setPageLoading(true);
      const nft_data = await get_nft_by_tokenId(tokenId);
      console.log({ nft_data: nft_data });
      set_nft_info(nft_data);
      setPageLoading(false);
    })();
  }, [tokenId]);

  return (
    <>
      <Head>
        <title>NFT Item - Venomart Marketplace</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fav.png" />
      </Head>

      {/* modal background  */}
      {listSale && (
        <div className="backdrop-blur-lg absolute w-[100%] h-[100%] z-10"></div>
      )}

      {pageLoading ? (
        <Loader />
      ) : (
        <section
          className="relative pt-12 pb-24 lg:py-24"
          style={{ paddingTop: "160px" }}
          id="heroBack"
        >
          <div className="container">
            <div className="md:flex md:flex-wrap">
              <div
                className="relative mb-8 md:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto lg:w-1/2"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={nft?.nft_image?.replace(
                    "ipfs://",
                    "https://gateway.ipfscdn.io/ipfs/"
                  )}
                  width={80}
                  height={80}
                  alt="item"
                  className="cursor-pointer rounded-2.5xl h-[500px] w-[auto]"
                />
              </div>

              {/* <!-- Details --> */}
              <div className="md:w-3/5 md:basis-auto md:pl-8 lg:w-1/2 lg:pl-[3.75rem]">
                <div className="mb-3 flex">
                  {/* <!-- Collection --> */}
                  <div className="flex items-center">
                    <Link
                      href={`/collection/${nft?.nft_collection}`}
                      className="mr-2 text-sm font-bold text-[#189C87]"
                    >
                      View Collection
                    </Link>
                    <MdVerified
                      style={{ color: "#4f87ff", marginLeft: "-4px" }}
                      size={16}
                    />
                  </div>
                </div>

                {/* nft title  */}
                <h1 className="mb-4 font-display text-4xl font-semibold text-jacarta-700 dark:text-white">
                  {nft?.name}
                </h1>

                {/* nnft desc  */}
                <p className="mb-10 dark:text-jacarta-300">
                  {nft?.description}
                </p>

                {/* <!-- Owner --> */}
                <div className="mb-8 flex flex-wrap">
                  <div className="mb-4 flex">
                    <figure className="mr-4 shrink-0">
                      <a className="relative block">
                        <Image
                          src={
                            nft?.owner?.profileImage
                              ? nft?.owner?.profileImage.replace(
                                  "ipfs://",
                                  "https://gateway.ipfscdn.io/ipfs/"
                                )
                              : testNFT
                          }
                          height={40}
                          width={40}
                          alt="avatar 1"
                          className="rounded-2lg "
                          loading="lazy"
                        />
                        <div
                          className="absolute -right-3 top-[60%] flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green dark:border-jacarta-600"
                          data-tippy-content="Verified Collection"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="h-[.875rem] w-[.875rem] fill-white"
                          >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                          </svg>
                        </div>
                      </a>
                    </figure>
                    <div className="flex flex-col justify-center">
                      <span className="block text-sm text-jacarta-400 dark:text-white">
                        Owned by
                      </span>
                      <Link
                        href={`/profile/${nft?.owner?.wallet_id}`}
                        className="block text-[#189C87]"
                      >
                        <span className="text-sm font-bold">
                          {nft?.owner?.user_name}
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* -------------------------- all action buttons start ------------------------  */}
                {/* <!-- list nft --> */}
                {listSale == false ? (
                  nft?.isListed == false &&
                  nft?.owner?.wallet_id == signer_address && (
                    <div className="rounded-2lg  border-jacarta-100 bg-transparent p-8 dark:border-jacarta-600 dark:bg-jacarta-700">
                      <button
                        onClick={() => setListSale(true)}
                        href="#"
                        type="button"
                        className="inline-block w-full rounded-full bg-[#189C87] py-3 px-8 text-center font-semibold text-white shadow-[#189C87]-volume transition-all hover:bg-[#189C87]-dark"
                      >
                        List For Sale
                      </button>
                    </div>
                  )
                ) : (
                  <div className="absolute top-[30%] right-[40%] w-[500px] z-20 ">
                    <form
                      className="modal-dialog max-w-2xl"
                      onSubmit={sell_user_nft}
                    >
                      <div
                        className="modal-content shadow-2xl"
                        style={{ backgroundColor: "#f5f5f5" }}
                      >
                        <div className="modal-header">
                          <h5 className="modal-title" id="placeBidLabel">
                            List For Sale
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => setListSale(false)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              className="h-6 w-6 fill-jacarta-700"
                            >
                              <path fill="none" d="M0 0h24v24H0z" />
                              <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                            </svg>
                          </button>
                        </div>

                        <div className="modal-body p-6">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="font-display text-sm font-semibold text-jacarta-700 ">
                              Price
                            </span>
                          </div>

                          <div className="relative mb-2 flex items-center overflow-hidden rounded-lg border border-jacarta-100 dark:border-jacarta-600">
                            <div className="flex flex-1 items-center self-stretch border-r border-jacarta-100 bg-jacarta-50 px-2">
                              <span className="font-display text-sm text-jacarta-700">
                                VENOM
                              </span>
                            </div>
                            {loading ? (
                              <input
                                disabled
                                required
                                type="text"
                                className="h-12 w-full flex-[3] border-0 focus:ring-inset focus:ring-[#189C87] text-black"
                                placeholder="Amount"
                              />
                            ) : (
                              <input
                                required
                                type="text"
                                onChange={(e) =>
                                  set_listing_price(e.target.value)
                                }
                                className="h-12 w-full flex-[3] border-0 focus:ring-inset focus:ring-[#189C87] text-black"
                                placeholder="Amount"
                              />
                            )}
                          </div>
                        </div>

                        <div className="modal-footer">
                          <div className="flex items-center justify-center space-x-4">
                            {loading ? (
                              <button
                                disabled
                                type="button"
                                className="rounded-full bg-[#189C87] py-3 px-8 text-center font-semibold text-white shadow-[#189C87]-volume transition-all hover:bg-[#189C87]-dark"
                              >
                                Listing{" "}
                                <svg
                                  aria-hidden="true"
                                  className="inline w-6 h-6 ml-3 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                  viewBox="0 0 100 101"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                  />
                                </svg>
                              </button>
                            ) : (
                              <button
                                type="submit"
                                className="rounded-full bg-[#189C87] py-3 px-8 text-center font-semibold text-white shadow-[#189C87]-volume transition-all hover:bg-[#189C87]-dark"
                              >
                                List Now
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {/* buy now section  */}
                {nft?.isListed == true &&
                  nft?.owner?.wallet_id !== signer_address && (
                    <div className="rounded-2lg border-jacarta-100 bg-transparent p-8 dark:border-jacarta-600 dark:bg-jacarta-700">
                      <div className="mb-8 sm:flex sm:flex-wrap">
                        <div className="sm:w-1/2 sm:pr-4 lg:pr-8">
                          <div className="block overflow-hidden text-ellipsis whitespace-nowrap">
                            <span className="text-sm text-jacarta-400 dark:text-jacarta-300">
                              Price
                            </span>
                          </div>
                          <div className="mt-3 flex">
                            <div>
                              <div className="flex items-center whitespace-nowrap">
                                <span className="text-lg font-medium leading-tight tracking-tight text-green">
                                  {nft?.listingPrice ? balance : "0.00"}{" "}
                                </span>
                                <span className="text-[19px] text-white ml-2">
                                  {nft?.chain_symbol
                                    ? nft?.chain_symbol
                                    : "DVENOM"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {loading ? (
                        <button
                          type="button"
                          className="inline-block w-full rounded-full bg-[#189C87] py-3 px-8 text-center font-semibold text-white shadow-[#189C87]-volume transition-all hover:bg-[#189C87]-dark"
                        >
                          Proccessing{" "}
                          <svg
                            aria-hidden="true"
                            className="inline w-6 h-6 ml-3 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                        </button>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => purchase_nft(tokenId)}
                            className="inline-block w-full rounded-full bg-[#189C87] py-3 px-8 text-center font-semibold text-white shadow-[#189C87]-volume transition-all hover:bg-[#189C87]-dark"
                          >
                            Buy Now
                          </button>
                        </>
                      )}
                    </div>
                  )}

                {/* <!-- cancel nft sale --> */}
                {nft?.owner?.wallet_id == signer_address &&
                  nft?.isListed == true && (
                    <div className="rounded-2lg  border-jacarta-100 bg-transparent p-8 dark:border-jacarta-600 dark:bg-jacarta-700">
                      <button
                        type="button"
                        // onClick={() => cancelListingToken(slug, tokenId)}
                        onClick={() =>
                          alert(
                            "Currently you dont have the permission to cancel sale!!"
                          )
                        }
                        className="inline-block w-full rounded-full bg-[#189C87] py-3 px-8 text-center font-semibold text-white shadow-[#189C87]-volume transition-all hover:bg-[#189C87]-dark"
                      >
                        Cancel Sale
                      </button>
                    </div>
                  )}

                {/* <!-- not listed --> */}
                {nft?.owner?.wallet_id !== signer_address &&
                  nft?.isListed == false && (
                    <div className="rounded-2lg  border-jacarta-100 bg-transparent p-8 dark:border-jacarta-600 dark:bg-jacarta-700">
                      <button
                        type="button"
                        className="inline-block w-full rounded-full bg-[#189C87] py-3 px-8 text-center font-semibold text-white  transition-all hover:bg-[#189C87]"
                      >
                        Not Listed
                      </button>
                    </div>
                  )}

                {/* -------------------------- all action buttons end ------------------------  */}
              </div>
            </div>

            {/* <!-- other detail Tabs --> */}
            <div className="scrollbar-custom mt-14 overflow-x-auto rounded-lg">
              <div className="min-w-fit">
                <ul className="nav nav-tabs flex items-center" role="tablist">
                  {/* <!-- Properties --> */}
                  <li
                    className="nav-item"
                    role="presentation"
                    onClick={() => setPropShow(true)}
                  >
                    <button
                      className={` ${
                        propShow &&
                        "text-[#189C87] active relative border-b-2 border-b-[#189C87]"
                      } flex items-center whitespace-nowrap py-3 px-6  hover:text-jacarta-200`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="mr-1 h-5 w-5 fill-current"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M6.17 18a3.001 3.001 0 0 1 5.66 0H22v2H11.83a3.001 3.001 0 0 1-5.66 0H2v-2h4.17zm6-7a3.001 3.001 0 0 1 5.66 0H22v2h-4.17a3.001 3.001 0 0 1-5.66 0H2v-2h10.17zm-6-7a3.001 3.001 0 0 1 5.66 0H22v2H11.83a3.001 3.001 0 0 1-5.66 0H2V4h4.17z" />
                      </svg>
                      <span className="font-display text-base font-medium">
                        Properties
                      </span>
                    </button>
                  </li>

                  {/* <!-- Details --> */}
                  <li
                    className="nav-item"
                    role="presentation"
                    onClick={() => setPropShow(false)}
                  >
                    <button
                      className={`${
                        !propShow &&
                        "text-[#189C87] active relative border-b-2 border-b-[#189C87]"
                      } flex items-center whitespace-nowrap py-3 px-6 text-jacarta-200`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="mr-1 h-5 w-5 fill-current"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M20 22H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zm-1-2V4H5v16h14zM7 6h4v4H7V6zm0 6h10v2H7v-2zm0 4h10v2H7v-2zm6-9h4v2h-4V7z" />
                      </svg>
                      <span className="font-display text-base font-medium">
                        Details
                      </span>
                    </button>
                  </li>
                </ul>

                {/* <!-- Tab Content --> */}
                <div className="tab-content">
                  {propShow ? (
                    <div>
                      <div className="rounded-t-2lg rounded-b-2lg rounded-tl-none border border-[#189C87] bg-transparent p-6">
                        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
                          {nft?.attributes?.map((e, index) => {
                            return (
                              <a
                                key={index}
                                className="flex flex-col space-y-2 rounded-2lg shadow-sm shadow-[#189C87] p-5 text-center transition-shadow hover:shadow-lg"
                              >
                                <span className="text-sm uppercase text-[#189C87]">
                                  {e.type}
                                </span>
                                <span className="text-base text-white">
                                  {e.value}
                                </span>
                              </a>
                            );
                          })}
                          {nft?.attributes == "" && <p>No Properties</p>}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="rounded-t-2lg rounded-b-2lg rounded-tl-none border border-[#189C87] bg-transparent p-6 dark:border-jacarta-600 dark:bg-jacarta-700 md:p-10">
                        <div className="mb-2 flex items-center">
                          <span className="mr-2 min-w-[9rem]">
                            Collection Address:
                          </span>
                          <a
                            href={`${blockURL}accounts/${slug}`}
                            target="_blank"
                            className="text-[#189C87] hover:text-[#189C87]"
                          >
                            {slug.slice(0, 7) + "..." + slug.slice(58)}
                          </a>
                        </div>
                        <div className="mb-2 flex items-center">
                          <span className="mr-2 min-w-[9rem] dark:text-jacarta-300">
                            NFT Address:
                          </span>
                          <a
                            href={`${blockURL}accounts/${nft?.nft_address}`}
                            target="_blank"
                            className="text-[#189C87] hover:text-[#189C87]"
                          >
                            {nft?.nft_address.slice(0, 7) +
                              "..." +
                              nft?.nft_address.slice(58)}
                          </a>
                        </div>
                        <div className="mb-2 flex items-center">
                          <span className="mr-2 min-w-[9rem] dark:text-jacarta-300">
                            Token Standard:
                          </span>
                          <span className="text-jacarta-700 dark:text-white">
                            TIP-4
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2 min-w-[9rem] dark:text-jacarta-300">
                            Blockchain:
                          </span>
                          <span className="text-jacarta-700 dark:text-white">
                            Venom Devnet
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default NFTPage;
