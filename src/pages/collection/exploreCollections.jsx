import React, { useEffect, useState } from "react";
import CollectionCard from "@/components/cards/CollectionCard";
import Head from "next/head";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";

const TopCollections = ({ standaloneProvider, fetch_all_collections }) => {
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentCollections = collections.slice(firstPostIndex, lastPostIndex);

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
            <div className="flex flex-wrap justify-center align-middle">
              {currentCollections?.map((e, index) => {
                return (
                  <CollectionCard
                    key={index}
                    Name={e.name}
                    Cover={e.coverImage}
                    Logo={e.logo}
                    CollectionAddress={e.collection_address}
                    OwnerAddress={e.owner.wallet_id}
                    collection_id={e._id}
                  />
                );
              })}
            </div>
            <Pagination
              totalPosts={collections.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default TopCollections;
