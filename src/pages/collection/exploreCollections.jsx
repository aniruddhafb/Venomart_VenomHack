import React, { useEffect, useState } from "react";
import CollectionCard from "@/components/cards/CollectionCard";
import Head from "next/head";
import Loader from "@/components/Loader";

const TopCollections = ({
  standaloneProvider,
  fetch_all_collections,
}) => {

  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const collections = await fetch_all_collections();
      setCollections(collections.data);
      console.log({ collections });
      setLoading(false);
    })();
  }, [standaloneProvider]);

  return (
    <>
      <Head>
        <title>Top Collections - Venomart Marketplace</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fav.png" />
      </Head>

      {loading ? (
        <Loader />
      ) : (
        <section className="relative py-24" id="heroBack">
          <div className="container">
            <h1 className="py-16 text-center font-display text-4xl font-medium text-jacarta-700 dark:text-white">
              Explore Collections
            </h1>

            {/* loop collections here  */}
            <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-3 lg:grid-cols-4">
              {/* {collections?.map((e, index) => {
                const collection_info = JSON.parse(e.json);
                return (
                  <CollectionCard
                    key={index}
                    Name={collection_info.name}
                    Cover={collection_info.coverImage}
                    Logo={collection_info.logo}
                    CollectionAddress={collection_info.collection_address}
                    OwnerAddress={collection_info.owner}
                  />
                );
              })} */}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default TopCollections;
