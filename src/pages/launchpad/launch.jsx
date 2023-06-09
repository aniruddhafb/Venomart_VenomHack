import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import testNFT from "../../../public/img1.jpg";
import { MdVerified } from "react-icons/md";
import Head from "next/head";
import Loader from "@/components/Loader";

const launch = ({
    blockURL,
    collection_address_devnet,
}) => {
    const router = useRouter();
    const { slug } = router.query;

    const [loading, setLoading] = useState(false);

    return (
        <>
            <Head>
                <title>Launch - Venomart Marketplace</title>
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
                            src={testNFT}
                            width={100}
                            height={100}
                            alt="banner"
                            className="h-[18.75rem] w-[100%] object-cover"
                        />
                    </div>

                    {/* <!-- Collection Section --> */}
                    <section className="relative bg-transparent pb-6 pt-28 dark:bg-jacarta-800">
                        <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                            <div className="relative">
                                <Image
                                    src={testNFT}
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

                                <div className="mb-8">
                                    <button class="bg-transparent hover:bg-[#189C87] border border-white text-white font-bold py-2 px-4 rounded mr-6">
                                        View on Explorer
                                    </button>
                                    <button class="bg-transparent hover:bg-[#189C87] border border-whit text-white font-bold py-2 px-4 rounded">
                                        View Collection
                                    </button>
                                </div>

                                <h2 className="mb-2 mt-2 font-display text-4xl font-medium text-jacarta-700 dark:text-white">
                                    Col name
                                </h2>
                                <div className="mb-4"></div>

                                {/* desc  */}
                                <p className="mx-auto mb-14 max-w-xl text-lg dark:text-jacarta-300">
                                    Desc
                                </p>

                                {/* <div className="mb-8 inline-flex items-center justify-center rounded-xl border border-[#189C87] bg-transparent py-1.5 px-4 dark:border-jacarta-600 dark:bg-jacarta-700">
                                    <a
                                        href="#!"
                                        className="js-copy-clipboard max-w-[10rem] select-none overflow-hidden text-ellipsis whitespace-nowrap dark:text-jacarta-200"
                                    >
                                        <span>Live Now</span>
                                    </a>
                                </div> */}

                                {/* stats  */}
                                <div className="mb-8 inline-flex flex-wrap items-center justify-center rounded-xl border border-jacarta-100 bg-transparent dark:border-jacarta-600 dark:bg-jacarta-800">
                                    <a
                                        href="#"
                                        className="w-1/2 rounded-l-xl border-r border-jacarta-100 py-4 hover:shadow-md dark:border-jacarta-600 sm:w-32"
                                    >
                                        <div className="mb-1 text-base font-bold text-jacarta-700 dark:text-white">
                                            4
                                        </div>
                                        <div className="text-2xs font-medium tracking-tight dark:text-jacarta-400">
                                            Minted
                                        </div>
                                    </a>
                                    <a
                                        href="#"
                                        className="w-1/2 border-jacarta-100 py-4 hover:shadow-md dark:border-jacarta-600 sm:w-32 sm:border-r"
                                    >
                                        <div className="mb-1 text-base font-bold text-jacarta-700 dark:text-white">
                                            5555
                                        </div>
                                        <div className="text-2xs font-medium tracking-tight dark:text-jacarta-400">
                                            Items
                                        </div>
                                    </a>
                                    <a
                                        href="#"
                                        className="w-1/2 rounded-r-xl border-jacarta-100 py-4 hover:shadow-md sm:w-32"
                                    >
                                        <div className="mb-1 flex items-center justify-center text-base font-medium text-jacarta-700 dark:text-white">
                                            <span className="font-bold mr-2">2</span>
                                            <Image src={`../../venom.svg`} height={18} width={18} />
                                        </div>
                                        <div className="text-2xs font-medium tracking-tight dark:text-jacarta-400">
                                            Mint Price
                                        </div>
                                    </a>
                                </div>

                                <div className="mb-8">
                                    <button class="bg-transparent hover:bg-[#189C87] border border-white text-white font-bold py-2 px-4 rounded mr-6">
                                        Mint NFT
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default launch;
