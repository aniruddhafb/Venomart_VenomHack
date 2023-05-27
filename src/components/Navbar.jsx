import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import venomlogo from "../../public/logosm.png";
import venomLogo from "../../public/venom.svg";
import axios from "axios";
import { ethers } from "ethers";


const Navbar = ({ signer_address, connect_wallet, onDisconnect, theme }) => {

    const router = useRouter();

    const baseURL = "https://testnet-api.venomscan.com/v1/accounts";

    const [profileDrop, setProfileDrop] = useState(false);
    const [mobieProfileDrop, setMobieProfileDrop] = useState(false);
    const [search_result, set_search_result] = useState([]);

    const [explorerLog, SetExplorerLog] = useState("");
    const [vnmBalance, setVnmBalance] = useState("");

    useEffect(() => {
        axios.post(baseURL, {
            "id": "0:6b5f10917e63eef512b1294917ffa27d2cd5f89abe3013d82ae089368519a36c"
        }).then((response) => {
            SetExplorerLog(response.data);
            const balance = parseFloat(response.data.balance / 1000000000).toFixed(2);
            setVnmBalance(balance);
        });
    })

    useEffect(() => {
        setProfileDrop(false);
        setMobieProfileDrop(false);
        set_search_result(false);
    }, [router.pathname])

    return (
        <div className={`${theme} overflow-x-hidden font-body text-jacarta-500 dark:bg-jacarta-900`}>
            <div className="js-page-header fixed top-0 z-20 w-full backdrop-blur transition-colors">
                <div className="flex items-center px-6 py-6 xl:px-24">
                    {/* icon  */}
                    <Link href="/" className="shrink-0">
                        <Image
                            src={venomlogo}
                            height={190}
                            width={190}
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
                            className="w-full rounded-2xl border border-jacarta-100 py-[0.6875rem] px-4 pl-10 text-jacarta-700 placeholder-jacarta-500 focus:ring-[#189C87] dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white"
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
                                        href="/nft/exploreNFTs"
                                        className="dropdown-toggle flex items-center justify-between py-3.5 font-display text-base text-jacarta-700 hover:text-[#189C87] focus:text-[#189C87] dark:text-white dark:hover:text-[#189C87] dark:focus:text-[#189C87] lg:px-5"
                                        id="navDropdown-1"
                                        aria-expanded="false"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                    >
                                        Explore NFTs
                                    </Link>
                                </li>
                                <li className="js-nav-dropdown group relative">
                                    <Link
                                        href="/collection/exploreCollections"
                                        className="dropdown-toggle flex items-center justify-between py-3.5 font-display text-base text-jacarta-700 hover:text-[#189C87] focus:text-[#189C87] dark:text-white dark:hover:text-[#189C87] dark:focus:text-[#189C87] lg:px-5"
                                        id="navDropdown-1"
                                        aria-expanded="false"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                    >
                                        View Collections
                                    </Link>
                                </li>
                                <li className="js-nav-dropdown group relative">
                                    <Link
                                        href="/nft/launchpad"
                                        className="dropdown-toggle flex items-center justify-between py-3.5 font-display text-base text-jacarta-700 hover:text-[#189C87] focus:text-[#189C87] dark:text-white dark:hover:text-[#189C87] dark:focus:text-[#189C87] lg:px-5"
                                        id="navDropdown-1"
                                        aria-expanded="false"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                    >
                                        Launchpad
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* pc connect wallet  */}
                        <div className="ml-8 hidden lg:flex xl:ml-12">
                            {!signer_address ? (
                                <a
                                    href="#"
                                    onClick={connect_wallet}
                                    className="js-wallet group flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-[#189C87] focus:border-transparent focus:bg-[#189C87] dark:border-transparent dark:bg-white/[.15] dark:hover:bg-[#189C87]"
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
                                            className="group ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-[#189C87] focus:border-transparent focus:bg-[#189C87] dark:border-transparent dark:bg-white/[.15] dark:hover:bg-[#189C87]"
                                            onClick={() => (
                                                setProfileDrop(!profileDrop)
                                            )}
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
                                            <div className="!-right-4 !top-[85%] !left-auto z-10 min-w-[14rem] whitespace-nowrap rounded-xl transition-all will-change-transform before:absolute before:-top-3 before:h-3 before:w-full group-dropdown-hover:opacity-100 dark:bg-[#137e6c] lg:absolute lg:grid lg:!translate-y-4 lg:py-4 lg:px-2 lg:shadow-2xl">
                                                <button
                                                    className="js-copy-clipboard my-4 flex select-none items-center whitespace-nowrap px-5 font-display leading-none text-jacarta-700 dark:text-white"
                                                    data-tippy-content="Copy"
                                                >
                                                    <span className="max-w-[10rem] overflow-hidden text-ellipsis">
                                                        {signer_address}
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
                                                        <span className="text-lg font-bold text-white" style={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
                                                            {vnmBalance}
                                                            <Image src={venomLogo} height={100} width={100} style={{ height: "18px", width: "18px", marginLeft: "7px" }} />
                                                        </span>
                                                    </div>
                                                </div>
                                                <Link
                                                    href={`/profile/${signer_address}`}
                                                    className="flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-[#189C87] focus:text-[#189C87] dark:hover:bg-[#0d5d50]"
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
                                                <Link
                                                    href={`/profile/editProfile`}
                                                    className="flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-[#189C87] focus:text-[#189C87] dark:hover:bg-[#0d5d50]"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        width="24"
                                                        height="24"
                                                        className="h-4 w-4 fill-jacarta-700 transition-colors dark:fill-white"
                                                    >
                                                        <path fill="none" d="M0 0h24v24H0z" />
                                                        <path d="M9.954 2.21a9.99 9.99 0 0 1 4.091-.002A3.993 3.993 0 0 0 16 5.07a3.993 3.993 0 0 0 3.457.261A9.99 9.99 0 0 1 21.5 8.876 3.993 3.993 0 0 0 20 12c0 1.264.586 2.391 1.502 3.124a10.043 10.043 0 0 1-2.046 3.543 3.993 3.993 0 0 0-3.456.261 3.993 3.993 0 0 0-1.954 2.86 9.99 9.99 0 0 1-4.091.004A3.993 3.993 0 0 0 8 18.927a3.993 3.993 0 0 0-3.457-.26A9.99 9.99 0 0 1 2.5 15.121 3.993 3.993 0 0 0 4 11.999a3.993 3.993 0 0 0-1.502-3.124 10.043 10.043 0 0 1 2.046-3.543A3.993 3.993 0 0 0 8 5.071a3.993 3.993 0 0 0 1.954-2.86zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                                    </svg>
                                                    <span className="mt-1 font-display text-sm text-jacarta-700 dark:text-white">
                                                        Edit Profile
                                                    </span>
                                                </Link>
                                                <Link
                                                    href={`/nft/createNFT`}
                                                    className="flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-[#189C87] focus:text-[#189C87] dark:hover:bg-[#0d5d50]"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        width="24"
                                                        height="24"
                                                        className="h-4 w-4 fill-jacarta-700 transition-colors dark:fill-white rotate-180"
                                                    >
                                                        <path fill="none" d="M0 0h24v24H0z" />
                                                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM7 11V8l-5 4 5 4v-3h8v-2H7z" />
                                                    </svg>
                                                    <span className="mt-1 font-display text-sm text-jacarta-700 dark:text-white">
                                                        Create NFT
                                                    </span>
                                                </Link>
                                                <Link
                                                    href={`/collection/createCollection`}
                                                    className="flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-[#189C87] focus:text-[#189C87] dark:hover:bg-[#0d5d50]"
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
                                                        Create Collection
                                                    </span>
                                                </Link>
                                                <Link
                                                    href="#"
                                                    onClick={onDisconnect}
                                                    className="flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-[#189C87] focus:text-[#189C87] dark:hover:bg-[#0d5d50]"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        width="24"
                                                        height="24"
                                                        className="h-4 w-4 fill-jacarta-700 transition-colors dark:fill-white"
                                                    >
                                                        <path fill="none" d="M0 0h24v24H0z" />
                                                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM7 11V8l-5 4 5 4v-3h8v-2H7z" />
                                                    </svg>
                                                    <span className="mt-1 font-display text-sm text-jacarta-700 dark:text-white">
                                                        Sign Out
                                                    </span>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* mobile connect wallet */}
                    <div className="ml-auto flex lg:hidden">
                        {!signer_address ? (
                            <a
                                href="#"
                                onClick={connect_wallet}
                                className="ml-4 js-wallet group flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-accent focus:border-transparent focus:bg-accent dark:border-transparent dark:bg-white/[.15] dark:hover:bg-accent"
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
                            <div className="relative">
                                {/* profile icon */}
                                <button
                                    className="group ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-accent focus:border-transparent focus:bg-accent dark:border-transparent dark:bg-white/[.15] dark:hover:bg-accent"
                                    onClick={() => setMobieProfileDrop(!mobieProfileDrop)}
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
                            </div>
                        )}
                    </div>
                </div>

                {/* profile dropdown  */}
                {mobieProfileDrop && (
                    <div className="!-right-4 !top-[85%] !left-auto z-10 min-w-[14rem] whitespace-nowrap rounded-xl transition-all will-change-transform before:absolute before:-top-3 before:h-3 before:w-full group-dropdown-hover:opacity-100 dark:bg-[#137e6c] lg:absolute lg:grid lg:!translate-y-4 lg:py-4 lg:px-2 lg:shadow-2xl">
                        <button
                            className="js-copy-clipboard my-4 flex select-none items-center whitespace-nowrap px-5 font-display leading-none text-jacarta-700 dark:text-white pt-8"
                            data-tippy-content="Copy"
                        >
                            <span className="max-w-[10rem] overflow-hidden text-ellipsis">
                                {signer_address}
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
                                <span className="text-lg font-bold text-white" style={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
                                    {vnmBalance}
                                    <Image src={venomLogo} height={100} width={100} style={{ height: "18px", width: "18px", marginLeft: "7px" }} />
                                </span>
                            </div>
                        </div>
                        <Link
                            href={`/profile/${signer_address}`}
                            className="flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-[#189C87] focus:text-[#189C87] dark:hover:bg-[#0d5d50]"
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
                        <Link
                            href={`/profile/editProfile`}
                            className="flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-[#189C87] focus:text-[#189C87] dark:hover:bg-[#0d5d50]"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                className="h-4 w-4 fill-jacarta-700 transition-colors dark:fill-white"
                            >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M9.954 2.21a9.99 9.99 0 0 1 4.091-.002A3.993 3.993 0 0 0 16 5.07a3.993 3.993 0 0 0 3.457.261A9.99 9.99 0 0 1 21.5 8.876 3.993 3.993 0 0 0 20 12c0 1.264.586 2.391 1.502 3.124a10.043 10.043 0 0 1-2.046 3.543 3.993 3.993 0 0 0-3.456.261 3.993 3.993 0 0 0-1.954 2.86 9.99 9.99 0 0 1-4.091.004A3.993 3.993 0 0 0 8 18.927a3.993 3.993 0 0 0-3.457-.26A9.99 9.99 0 0 1 2.5 15.121 3.993 3.993 0 0 0 4 11.999a3.993 3.993 0 0 0-1.502-3.124 10.043 10.043 0 0 1 2.046-3.543A3.993 3.993 0 0 0 8 5.071a3.993 3.993 0 0 0 1.954-2.86zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            </svg>
                            <span className="mt-1 font-display text-sm text-jacarta-700 dark:text-white">
                                Edit Profile
                            </span>
                        </Link>
                        <Link
                            href={`/nft/createNFT`}
                            className="flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-[#189C87] focus:text-[#189C87] dark:hover:bg-[#0d5d50]"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                className="h-4 w-4 fill-jacarta-700 transition-colors dark:fill-white rotate-180"
                            >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM7 11V8l-5 4 5 4v-3h8v-2H7z" />
                            </svg>
                            <span className="mt-1 font-display text-sm text-jacarta-700 dark:text-white">
                                Create NFT
                            </span>
                        </Link>
                        <Link
                            href={`/collection/createCollection`}
                            className="flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-[#189C87] focus:text-[#189C87] dark:hover:bg-[#0d5d50]"
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
                                Create Collection
                            </span>
                        </Link>
                        <Link
                            href="#"
                            onClick={onDisconnect}
                            className="flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-[#189C87] focus:text-[#189C87] dark:hover:bg-[#0d5d50]"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                className="h-4 w-4 fill-jacarta-700 transition-colors dark:fill-white"
                            >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM7 11V8l-5 4 5 4v-3h8v-2H7z" />
                            </svg>
                            <span className="mt-1 font-display text-sm text-jacarta-700 dark:text-white">
                                Sign Out
                            </span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar