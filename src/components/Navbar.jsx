import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { useRouter } from "next/router";
import venomlogo from "../../public/logosm.png";


const Navbar = () => {

    const router = useRouter();
    const signer_address = "";
    const [profileDrop, setProfileDrop] = useState(false);
    const [mobieProfileDrop, setMobieProfileDrop] = useState(false);
    const [search_result, set_search_result] = useState([]);

    return (
        <div className="overflow-x-hidden font-body text-jacarta-500 dark:bg-jacarta-900">
            <div className="js-page-header fixed top-0 z-20 w-full backdrop-blur transition-colors">
                <div className="flex items-center px-6 py-6 xl:px-24">
                    {/* icon  */}
                    <Link href="/" className="shrink-0">
                        <Image
                            src={venomlogo}
                            height={160}
                            width={160}
                            alt="NFT Marketplace"
                        />
                    </Link>

                    {/* search form  */}
                    <form
                        action="search"
                        className="relative ml-12 mr-8 basis-3/12 xl:ml-[8%]"
                        id="searchInp"
                    >
                        <input
                            type="search"
                            // onFocus={() => set_search_result([])}
                            // onChange={find_nft}
                            className="w-full rounded-2xl border border-jacarta-100 py-[0.6875rem] px-4 pl-10 text-jacarta-700 placeholder-jacarta-500 focus:ring-accent dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white"
                            placeholder="Search"
                        />
                        <span className="absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-2xl">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                className="h-4 w-4 fill-jacarta-500 dark:fill-white"
                            >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" />
                            </svg>
                        </span>

                        {/* SEARCH FUNCTIONALITY */}
                        {/* <div
                            className="w-full rounded-2xl bg-[#F6F1F8] absolute mt-2 border-r-4"
                            onClick={() => set_search_result([])}
                        >
                            {search_result?.map((e, index) => (
                                <Link
                                    key={index}
                                    href={`/nft/${e.ipfsData.collection}/${e.tokenId}`}
                                    className="rounded-2xl"
                                >
                                    <div className="w-full rounded-2xl border-gray-200 border-b-2 p-4 hover:bg-[#f5f5f5]">
                                        {e?.nft_name}
                                    </div>
                                </Link>
                            ))}
                        </div> */}
                    </form>

                    <div className="js-mobile-menu invisible lg:visible fixed inset-0 z-10 ml-auto items-center bg-white opacity-0 dark:bg-jacarta-800 lg:relative lg:inset-auto lg:flex lg:bg-transparent lg:opacity-100 dark:lg:bg-transparent">
                        {/* menu links  */}
                        <div className="navbar w-full">
                            <ul className="flex flex-col lg:flex-row">
                                <li className="js-nav-dropdown group relative">
                                    <Link
                                        href="/explore"
                                        className="dropdown-toggle flex items-center justify-between py-3.5 font-display text-base text-jacarta-700 hover:text-accent focus:text-accent dark:text-white dark:hover:text-accent dark:focus:text-accent lg:px-5"
                                        id="navDropdown-1"
                                        aria-expanded="false"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                    >
                                        Explore
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* pc connect wallet  */}
                        <div className="ml-8 hidden lg:flex xl:ml-12">
                            {!signer_address ? (
                                <a
                                    href="#"
                                    // onClick={connectToWallet}
                                    className="js-wallet group flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-accent focus:border-transparent focus:bg-accent dark:border-transparent dark:bg-white/[.15] dark:hover:bg-accent"
                                    data-bs-toggle="modal"
                                    data-bs-target="#walletModal"
                                    aria-label="wallet"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        className="h-4 w-4 fill-jacarta-700 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white"
                                    >
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M22 6h-7a6 6 0 1 0 0 12h7v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2zm-7 2h8v8h-8a4 4 0 1 1 0-8zm0 3v2h3v-2h-3z" />
                                    </svg>
                                </a>
                            ) : (
                                <>
                                    <div className="relative">
                                        {/* profile icon */}
                                        <button
                                            className="group ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-accent focus:border-transparent focus:bg-accent dark:border-transparent dark:bg-white/[.15] dark:hover:bg-accent"
                                        // onClick={() => (
                                        //     setProfileDrop(!profileDrop),
                                        //     SetShowNotifications(false),
                                        //     setShowNetworkPopup(false)
                                        // )}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                width="24"
                                                height="24"
                                                className="h-4 w-4 fill-jacarta-700 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white"
                                            >
                                                <path fill="none" d="M0 0h24v24H0z" />
                                                <path d="M11 14.062V20h2v-5.938c3.946.492 7 3.858 7 7.938H4a8.001 8.001 0 0 1 7-7.938zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6z" />
                                            </svg>
                                        </button>

                                        {/* profile dropdown  */}
                                        {profileDrop && (
                                            <div className="!-right-4 !top-[85%] !left-auto z-10 min-w-[14rem] whitespace-nowrap rounded-xl bg-white transition-all will-change-transform before:absolute before:-top-3 before:h-3 before:w-full group-dropdown-hover:opacity-100 dark:bg-jacarta-800 lg:absolute lg:grid lg:!translate-y-4 lg:py-4 lg:px-2 lg:shadow-2xl">
                                                <button
                                                    className="js-copy-clipboard my-4 flex select-none items-center whitespace-nowrap px-5 font-display leading-none text-jacarta-700 dark:text-white"
                                                    data-tippy-content="Copy"
                                                >
                                                    <span className="max-w-[10rem] overflow-hidden text-ellipsis">
                                                        {/* {signer_address} */}
                                                    </span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        width="24"
                                                        height="24"
                                                        className="ml-1 mb-px h-4 w-4 fill-jacarta-500 dark:fill-jacarta-300"
                                                    >
                                                        <path fill="none" d="M0 0h24v24H0z" />
                                                        <path d="M7 7V3a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-4v3.993c0 .556-.449 1.007-1.007 1.007H3.007A1.006 1.006 0 0 1 2 20.993l.003-12.986C2.003 7.451 2.452 7 3.01 7H7zm2 0h6.993C16.549 7 17 7.449 17 8.007V15h3V4H9v3zM4.003 9L4 20h11V9H4.003z" />
                                                    </svg>
                                                </button>

                                                <div className="mx-5 mb-6 rounded-lg border border-jacarta-100 p-4 dark:border-jacarta-600">
                                                    <span className="text-sm font-medium tracking-tight dark:text-jacarta-200">
                                                        Balance
                                                    </span>
                                                    <div className="flex items-center">
                                                        <span className="text-lg font-bold text-green">
                                                            {/* {signer_bal} {"  "} {symbol} */}
                                                        </span>
                                                    </div>
                                                </div>
                                                <Link
                                                    href={`/profile/${signer_address}`}
                                                    className="flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-accent focus:text-accent dark:hover:bg-jacarta-600"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        width="24"
                                                        height="24"
                                                        className="h-4 w-4 fill-jacarta-700 transition-colors dark:fill-white"
                                                    >
                                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                                        <path d="M11 14.062V20h2v-5.938c3.946.492 7 3.858 7 7.938H4a8.001 8.001 0 0 1 7-7.938zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6z"></path>
                                                    </svg>
                                                    <span className="mt-1 font-display text-sm text-jacarta-700 dark:text-white">
                                                        My Profile
                                                    </span>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* profile dropdown  */}
                {mobieProfileDrop && (
                    <div className="!-right-4 !top-[85%] !left-auto z-10 min-w-[14rem] whitespace-nowrap rounded-xl bg-white transition-all will-change-transform before:absolute before:-top-3 before:h-3 before:w-full group-dropdown-hover:opacity-100 dark:bg-jacarta-800 lg:absolute lg:grid lg:!translate-y-4 lg:py-4 lg:px-2 lg:shadow-2xl py-6">
                        <button
                            className="js-copy-clipboard my-4 flex select-none items-center whitespace-nowrap px-5 font-display leading-none text-jacarta-700 dark:text-white"
                            data-tippy-content="Copy"
                        >
                            <span className="max-w-[10rem] overflow-hidden text-ellipsis">
                                {/* {signer_address} */}
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                className="ml-1 mb-px h-4 w-4 fill-jacarta-500 dark:fill-jacarta-300"
                            >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M7 7V3a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-4v3.993c0 .556-.449 1.007-1.007 1.007H3.007A1.006 1.006 0 0 1 2 20.993l.003-12.986C2.003 7.451 2.452 7 3.01 7H7zm2 0h6.993C16.549 7 17 7.449 17 8.007V15h3V4H9v3zM4.003 9L4 20h11V9H4.003z" />
                            </svg>
                        </button>

                        <div className="mx-5 mb-6 rounded-lg border border-jacarta-100 p-4 dark:border-jacarta-600">
                            <span className="text-sm font-medium tracking-tight dark:text-jacarta-200">
                                Balance
                            </span>
                            {/* <div className="flex items-center">
                                <span className="text-lg font-bold text-green">
                                    {signer_bal ? signer_bal : "0.00"} {"  "}{" "}
                                    {symbol ? symbol : "ETH"}
                                </span>
                            </div> */}
                        </div>
                        <Link
                            // href={`/profile/${signer_address}`}
                            className="flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-accent focus:text-accent dark:hover:bg-jacarta-600"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                className="h-4 w-4 fill-jacarta-700 transition-colors dark:fill-white"
                            >
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M11 14.062V20h2v-5.938c3.946.492 7 3.858 7 7.938H4a8.001 8.001 0 0 1 7-7.938zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6z"></path>
                            </svg>
                            <span className="mt-1 font-display text-sm text-jacarta-700 dark:text-white">
                                My Profile
                            </span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar