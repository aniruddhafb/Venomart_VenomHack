import React from "react";
import Image from "next/image";
import venomlogo from "../../public/logosm.png";
import Link from "next/link";

const Footer = ({ theme }) => {
    return (
        <div className={`${theme} w-full page-footer dark:bg-jacarta-900 bottom-0 left-0 block`}>
            <div className="container">
                <div className="grid grid-cols-6 gap-x-7 gap-y-14 pt-24 pb-12 md:grid-cols-12">
                    <div className="col-span-full sm:col-span-3 md:col-span-4">
                        <Link href="/" className="mb-4 inline-block">
                            <Image
                                src={venomlogo}
                                height={160}
                                width={180}
                                alt="NFT Marketplace"
                            />
                        </Link>
                        <p className="mb-6 dark:text-jacarta-300">
                            Create, sell and collect NFTs on VenomArt. Powered by
                            venom blockchain.
                        </p>
                        <div className="flex space-x-5">
                            <a href="https://twitter.com/venomart23" target="_blank" className="group">
                                <svg
                                    className="h-5 w-5 fill-jacarta-300 group-hover:fill-accent dark:group-hover:fill-white"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                                </svg>
                            </a>
                            <a
                                href="https://github.com/aniruddhafb/Venomart_VenomHack"
                                target="_blank"
                                className="group"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 fill-jacarta-300 group-hover:fill-accent dark:group-hover:fill-white"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="col-span-full sm:col-span-3 md:col-span-2 md:col-start-7">
                        <h3 className="mb-6 font-display text-sm text-jacarta-700 dark:text-white">
                            Marketplace
                        </h3>
                        <ul className="flex flex-col space-y-1 dark:text-jacarta-300">
                            <li>
                                <Link
                                    href="/nft/exploreNFTs"
                                    className="hover:text-accent dark:hover:text-white"
                                >
                                    Explore NFTs
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/collection/exploreCollection"
                                    className="hover:text-accent dark:hover:text-white"
                                >
                                    View Collections
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/nft/launchpad"
                                    className="hover:text-accent dark:hover:text-white"
                                >
                                    Launchpad
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-span-full sm:col-span-3 md:col-span-2">
                        <h3 className="mb-6 font-display text-sm text-jacarta-700 dark:text-white">
                            My Account
                        </h3>
                        <ul className="flex flex-col space-y-1 dark:text-jacarta-300">
                            <li>
                                <Link
                                    href="/profile/editProfile"
                                    className="hover:text-accent dark:hover:text-white"
                                >
                                    Edit Profile
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/nft/createNFT"
                                    className="hover:text-accent dark:hover:text-white"
                                >
                                    Create NFT
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/nft/createAINFT"
                                    className="hover:text-accent dark:hover:text-white"
                                >
                                    Create AI NFT
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/collection/createCollection"
                                    className="hover:text-accent dark:hover:text-white"
                                >
                                    Create Collection
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/launchpad/apply"
                                    className="hover:text-accent dark:hover:text-white"
                                >
                                    Apply for Launchpad
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between space-y-2 py-8 sm:flex-row sm:space-y-0">
                    <span className="text-sm dark:text-jacarta-400">
                        &copy; 2023 VenomArt — Built during{" "}
                        <a href="https://dorahacks.io/hackathon/venom-hackathon" target="_blank" className="text-[#189C87]">
                            Venom Hackathon
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Footer;
