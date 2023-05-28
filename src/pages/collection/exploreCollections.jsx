import React, { useEffect, useState } from "react";
import CollectionCard from "@/components/cards/CollectionCard";
import Head from "next/head";

const TopCollections = ({
  all_collections,
  loadNFTs,
  standaloneProvider,
  mint_nft,
}) => {
  useEffect(() => {
    if (standaloneProvider) loadNFTs(standaloneProvider);
  }, [standaloneProvider]);

  return (
    <>
      <Head>
        <title>Top Collections - Venomart Marketplace</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fav.png" />
      </Head>

      <section className="relative py-24" id="heroBack">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img
            src="img/gradient_light.jpg"
            alt="gradient"
            className="h-full w-full"
          />
        </picture>
        <div className="container">
          <h1 className="py-16 text-center font-display text-4xl font-medium text-jacarta-700 dark:text-white">
            Explore Collections
          </h1>
          <button onClick={() => mint_nft(standaloneProvider)}>Mint NFT</button>

          {/* loop collections here  */}
          <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-3 lg:grid-cols-4">
            {/* {all_collections?.map((e) => (
                            <CollectionCard
                                Cover={e.coverImage}
                                Logo={e.logo}
                                Name={e.name}
                                Description={e.description}
                                OwnerAddress={e.owner.id}
                                CollectionAddress={e.id}
                                collectionId={e.collectionId}
                                chain_image={e.chain_image}
                                isCollectionVerified={e.isCollectionVerified}
                                chainImgPre={"../"}
                            />
                        ))} */}
          </div>
        </div>
      </section>
    </>
  );
};

export default TopCollections;
