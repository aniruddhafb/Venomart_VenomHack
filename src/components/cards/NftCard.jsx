import React from "react";
import Image from "next/image";
import Link from "next/link";

const NftCard = ({
    ImageSrc,
    Name,
    Description,
    Address,
    tokenId,
    onClickOpen = true,
    listedBool = false,
    listingPrice,
}) => {
    return (
        <div className="relative block rounded-2.5xl border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700">
            <div className="relative">
                {onClickOpen == true ? (
                    <Link href={`/nft/${Address}/${tokenId}`}>
                        <Image
                            src={ImageSrc}
                            height={100}
                            width={100}
                            alt="item 5"
                            className="h-[220px] w-full rounded-[0.625rem]"
                            loading="lazy"
                        />
                    </Link>
                ) : (
                    <Link href="#">
                        <Image
                            src={ImageSrc}
                            height={100}
                            width={100}
                            alt="item 5"
                            className="h-[220px] w-full rounded-[0.625rem]"
                            loading="lazy"
                        />
                    </Link>
                )}
            </div>
            <div className="mt-7 flex items-center justify-between">
                <div
                    style={{
                        width: "150px",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                    }}
                >
                    {onClickOpen == true ? (
                        <Link href={`/nft/${Address}/${tokenId}`}>
                            <span className="font-display text-base text-jacarta-700 hover:text-accent dark:text-white">
                                {Name}
                            </span>
                        </Link>
                    ) : (
                        <Link href="#">
                            <span className="font-display text-base text-jacarta-700 hover:text-accent dark:text-white">
                                {Name}
                            </span>
                        </Link>
                    )}
                </div>
                {listedBool && (
                    <span className="flex items-center whitespace-nowrap rounded-md border border-jacarta-100 py-1 px-2 dark:border-jacarta-600">
                        <span className=" text-sm font-medium tracking-tight text-green">
                            {listingPrice} {" "}
                        </span>
                    </span>
                )}
            </div>
            <div
                className="mt-2 text-sm"
                style={{
                    width: "220px",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                }}
            >
                <span className="mr-1 text-jacarta-700 dark:text-jacarta-200">
                    {Description}
                </span>
            </div>
        </div>
    );
};

export default NftCard;
