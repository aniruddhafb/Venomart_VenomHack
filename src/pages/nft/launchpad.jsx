import React, { useEffect, useState } from "react";
import Head from "next/head";
import Loader from "@/components/Loader";
import LaunchpadCard from "@/components/cards/LaunchpadCard";

const Launchpad = ({
  fetch_launchpads,
}) => {
  const [loading, setLoading] = useState(false);
  const [launchpads, set_launchpads] = useState([]);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const launchpads = await fetch_launchpads();
      set_launchpads(launchpads.data);
      console.log(launchpads.data);
      setLoading(false);
    })();
  }, []);

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
            <h1 className="pt-16 text-center font-display text-4xl font-medium text-jacarta-700 dark:text-white">
              Launchpad
            </h1>
            <p className=" py-4 pb-16 text-center text-[18px] text-jacarta-700 dark:text-white">Exclusive NFT launchpad for your NFT collections on venomart</p>

            <div className="flex flex-wrap justify-center align-middle">
              {launchpads?.map((e, index) => {
                return (
                  e?.isActive == true &&
                  (<LaunchpadCard
                    key={index}
                    collectionAddress={e?.address}
                    cover={e?.coverImage}
                    items={e?.max_supply}
                    logo={e?.logo}
                    mintPrice={e?.mint_price}
                    name={e?.name}
                  />)
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Launchpad;
