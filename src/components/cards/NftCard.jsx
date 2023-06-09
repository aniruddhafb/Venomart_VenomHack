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
  collection_address_devnet,
}) => {
  return (
    <div
      className="relative block rounded-2.5xl border border-[#189C87] bg-transparent p-[1.1875rem] transition-shadow hover:shadow-lg"
      style={{ maxWidth: "300px", margin: "20px", height: "auto", width: "350px", overflow: "hidden" }}
    >
      <div className="relative">
        {onClickOpen == true ? (
          <Link href={`/nft/${collection_address_devnet}/${tokenId}`}>
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
            <Link href={`/nft/${collection_address_devnet}/${tokenId}`}>
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
              {listingPrice}{" "}
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
        <span className="mr-1 text-[#f9f9f9]">{Description}</span>
      </div>
    </div>
  );
};

export default NftCard;
