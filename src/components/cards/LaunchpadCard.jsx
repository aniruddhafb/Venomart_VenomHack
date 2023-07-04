import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsArrowRight } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import testNFT from "../../../public/img1.jpg";
import venomLogo from "../../../public/venom.svg";

const LaunchpadCard = ({ cover, logo, name, items, mintPrice, collectionAddress }) => {
    return (
        <div className="rounded-2.5xl border p-[1.1875rem] transition-shadow hover:shadow-lg border-[#189C87] dark:bg-[#050505] m-[15px]">
            <Link href={`/launchpad/${collectionAddress}`} className="flex w-[300px]">
                <span className="space-x-[0.625rem]">
                    <Image
                        src={cover?.replace("ipfs://", "https://ipfs.io/ipfs/")}
                        alt="Mainvn"
                        height={100}
                        width={100}
                        className="h-[300px] w-[90%] rounded-[0.625rem] object-cover mr-6"
                        loading="lazy"
                    />
                </span>
                <span className="flex flex-col space-y-[0.325rem]">
                    <Image
                        src={logo?.replace("ipfs://", "https://ipfs.io/ipfs/")}
                        alt="item 1"
                        height={100}
                        width={100}
                        className="h-[95px] w-[150px] rounded-[0.625rem] object-cover"
                        loading="lazy"
                    />
                    <Image
                        src={logo?.replace("ipfs://", "https://ipfs.io/ipfs/")}
                        alt="item 2"
                        height={100}
                        width={100}
                        className="h-[95px] w-[150px] rounded-[0.625rem] object-cover"
                        loading="lazy"
                    />
                    <Image
                        src={logo?.replace("ipfs://", "https://ipfs.io/ipfs/")}
                        alt="item 3"
                        height={100}
                        width={100}
                        className="h-[95px] w-[150px] rounded-[0.625rem] object-cover"
                        loading="lazy"
                    />
                </span>
            </Link>

            <Link
                href={`/launchpad/${collectionAddress}`}
                className="mt-4 font-display text-[22px] text-jacarta-700 hover:text-[#189C87] dark:text-white dark:hover:text-[#189C87] flex"
            >
                {name}
                <MdVerified
                    style={{
                        color: "#189C87",
                        cursor: "pointer",
                        marginTop: "4px",
                        marginLeft: "5px",
                    }}
                    size={23}
                />
            </Link>

            <div className="mt-2 flex items-center justify-between text-sm font-medium tracking-tight">
                <div className="flex flex-wrap items-center">
                    <span className="mr-1 dark:text-jacarta-400">
                        {items} Items
                    </span>
                </div>
                <Link
                    href={`/launchpad/${collectionAddress}`}
                    className="bg-[#050505] hover:bg-[#189C87] border border-[white] text-white font-bold py-2 px-4 rounded flex"
                >
                    Mint for {mintPrice}
                    <Image
                        src={venomLogo}
                        height={100}
                        width={100}
                        style={{
                            height: "13px",
                            width: "13px",
                            marginLeft: "5px",
                            marginTop: "4px",
                        }}
                    />
                    <BsArrowRight
                        style={{
                            marginLeft: "12px",
                            marginTop: "3px",
                        }}
                    />
                </Link>
            </div>
        </div>
    )
}

export default LaunchpadCard