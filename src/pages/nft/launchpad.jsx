import React, { useEffect, useState } from "react";
import Head from "next/head";
import Loader from "@/components/Loader";
import testNFT from "../../../public/img1.jpg";
import Image from "next/image";
import Link from "next/link";
import venomLogo from "../../../public/venom.svg";

import { BsArrowRight } from "react-icons/bs";
import { MdVerified } from "react-icons/md";

const launchpad = ({ standaloneProvider, fetch_all_collections }) => {
    const [loading, setLoading] = useState(false);

    return (
        <>
            <Head>
                <title>Launchpad - Venomart Marketplace</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/fav.png" />
            </Head>

            {loading ? (
                <Loader />
            ) : (
                <section className="dark relative py-24" id="heroBack">
                    <div className="container">
                        <h1 className="py-16 text-center font-display text-4xl font-medium text-jacarta-700 dark:text-white">
                            Launchpad
                        </h1>

                        <div className="flex flex-wrap justify-center align-middle">
                            <div className="rounded-2.5xl border p-[1.1875rem] transition-shadow hover:shadow-lg border-[#189C87] dark:bg-[#050505] m-[15px]">

                                <Link href={""} className="flex w-[300px]">
                                    <span className="space-x-[0.625rem]">
                                        <Image
                                            src={testNFT}
                                            alt="Mainvn"
                                            className="h-[300px] rounded-[0.625rem] object-cover mr-6"
                                            loading="lazy"
                                        />
                                    </span>
                                    <span className="flex flex-col space-y-[0.325rem] ml-[10px]">
                                        <Image
                                            src={testNFT}
                                            alt="item 1"
                                            className="h-[95px] rounded-[0.625rem] object-cover"
                                            loading="lazy"
                                        />
                                        <Image
                                            src={testNFT}
                                            alt="item 2"
                                            className="h-[95px] rounded-[0.625rem] object-cover"
                                            loading="lazy"
                                        />
                                        <Image
                                            src={testNFT}
                                            alt="item 3"
                                            className="h-[95px] rounded-[0.625rem] object-cover"
                                            loading="lazy"
                                        />
                                    </span>
                                </Link>

                                <Link href={""} className="mt-4 font-display text-[22px] text-jacarta-700 hover:text-[#189C87] dark:text-white dark:hover:text-[#189C87] flex">
                                    Art Me Outside
                                    <MdVerified
                                        style={{ color: "#189C87", cursor: "pointer", marginTop: "4px", marginLeft: "5px" }}
                                        size={23}
                                    />
                                </Link>

                                <div className="mt-2 flex items-center justify-between text-sm font-medium tracking-tight">
                                    <div className="flex flex-wrap items-center">
                                        <span className="mr-1 dark:text-jacarta-400">5555 Items</span>
                                    </div>
                                    <Link href={"/launchpad/launch"} class="bg-[#050505] hover:bg-[#189C87] border border-[white] text-white font-bold py-2 px-4 rounded flex">
                                        Mint for 1
                                        <Image
                                            src={venomLogo}
                                            height={100}
                                            width={100}
                                            style={{
                                                height: "13px",
                                                width: "13px",
                                                marginLeft: "5px",
                                                marginTop: "4px"
                                            }}
                                        />
                                        <BsArrowRight
                                            style={{
                                                marginLeft: "12px",
                                                marginTop: "3px"
                                            }}
                                        />
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default launchpad;
