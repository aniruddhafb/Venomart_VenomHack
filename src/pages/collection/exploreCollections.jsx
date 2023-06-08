import React, { useEffect, useState } from "react";
import CollectionCard from "@/components/cards/CollectionCard";
import Head from "next/head";
import Loader from "@/components/Loader";

const TopCollections = ({ standaloneProvider, fetch_all_collections }) => {
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const collections = await fetch_all_collections();
      console.log(collections);
      setCollections(collections);
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
              {collections?.map((e, index) => {
                return (
                  <CollectionCard
                    key={index}
                    Name={e.name}
                    Cover={e.coverImage}
                    Logo={e.logo}
                    CollectionAddress={e.collection_address}
                    OwnerAddress={e.owner}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default TopCollections;
