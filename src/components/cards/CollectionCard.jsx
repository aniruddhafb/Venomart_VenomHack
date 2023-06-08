import Link from "next/link";
import React from "react";
import Image from "next/image";

const CollectionCard = ({
    Cover,
    Logo,
    Name,
    OwnerAddress,
    CollectionAddress
}) => {
    return (
        <div className="relative rounded-2.5xl border border-[#189C87] bg-transparent p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700 h-[290px] overflow-hidden">
            <Link
                href={`/collection/${CollectionAddress}`}
                className="relative flex space-x-[0.625rem]"
            >
                <span className="w-[100%] h-[150px]">
                    <Image
                        src={Cover?.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/")}
                        alt="Cover Image"
                        className="h-full w-[100%] rounded-[0.625rem] object-cover"
                        loading="lazy"
                        height={100}
                        width={100}
                    />
                </span>
                <span className="absolute bottom-[-25px] right-28">
                    <Image
                        src={Logo?.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/")}
                        alt="Logo"
                        className="h-[75px] w-[75px] rounded-[100%] border b-4 border-black shadow-lg"
                        loading="lazy"
                        height={100}
                        width={100}
                    />
                </span>
            </Link>

            <div className="flex">
                <Link
                    href={`/collection/${CollectionAddress}`}
                    className=" mt-8 font-display text-[22px] text-jacarta-700 hover:text-[#189C87] dark:text-white dark:hover:text-accent"
                    style={{
                        width: "180px",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                    }}
                >
                    {Name}
                </Link>
            </div>

            <div className="mt-2 flex items-center justify-between text-sm font-medium tracking-tight">
                <div className="flex flex-wrap items-center">
                    <span className="mr-1 dark:text-jacarta-400">by</span>
                    {!OwnerAddress == "" ? (
                        <Link href={`/profile/${OwnerAddress}`} className="text-[#189C87]">
                            <span>
                                {OwnerAddress.slice(0, 5) + "..." + OwnerAddress.slice(38)}
                            </span>
                        </Link>
                    ) : (
                        <Link href="#" className="text-[#189C87]">
                            <span>you</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CollectionCard;
