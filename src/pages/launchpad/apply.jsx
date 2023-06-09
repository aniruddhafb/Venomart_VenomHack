import React, { useState } from "react";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import Head from "next/head";

const Apply = ({ signer_address, create_new_collection, create_launchpad }) => {
  const router = useRouter();
  const [loading, set_loading] = useState(false);
  const [preview, set_preview] = useState({ logo: "", cover: "" });
  const [data, set_data] = useState({
    logo: "",
    coverImage: "",
    name: "",
    description: "",
    address: "",
    max_supply: "",
    mint_price: "",
    json: "",
    start_date: "",
    email: "",
    isActive: false,
  });

  const handleChange = (e) => {
    set_data({ ...data, [e.target.name]: e.target.value });
  };

  const handle_submit = async (e) => {
    set_loading(true);
    e.preventDefault();
    console.log(data);
    await create_launchpad(data);
    set_loading(false);
    // router.push("/collection/exploreCollections");
  };

  return (
    <>
      <Head>
        <title>Apply for launchpad - Venomart Marketplace</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fav.png" />
      </Head>

      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handle_submit} className="relative py-24" id="heroBack">
          <div className="container">
            <h1 className="py-16 text-center font-display text-4xl font-medium text-jacarta-700 dark:text-white">
              Apply for launchpad
            </h1>
            <div className="mx-auto max-w-[48.125rem]">
              {/* <!-- Logo Upload --> */}
              <div className="mb-6">
                <label className="mb-2 block font-display text-jacarta-700 dark:text-white">
                  Logo
                  <span className="text-red">*</span>
                </label>
                <p className="mb-3 text-2xs dark:text-jacarta-300">
                  Drag or choose your file to upload
                </p>

                {/* new input  */}
                <div className="group relative flex max-w-sm max-h-[10px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-jacarta-100 bg-black py-20 px-5 text-center dark:border-jacarta-600 dark:bg-black">
                  {preview.logo ? (
                    <img src={preview.logo} className="h-24 rounded-lg" />
                  ) : (
                    <div className="relative z-10 cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="mb-4 inline-block fill-jacarta-500 dark:fill-white"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" />
                      </svg>
                      <p className="mx-auto max-w-xs text-xs dark:text-jacarta-300">
                        JPG, PNG. Max size: 15 MB
                      </p>
                    </div>
                  )}
                  {!preview.logo && (
                    <div className="absolute inset-4 cursor-pointer rounded bg-jacarta-50 opacity-0 group-hover:opacity-20 dark:bg-jacarta-600"></div>
                  )}

                  <input
                    onChange={(e) => {
                      if (!e.target.files[0]) return;
                      set_preview({
                        ...preview,
                        logo: URL.createObjectURL(e.target.files[0]),
                      });
                      set_data({ ...data, logo: e.target.files[0] });
                    }}
                    type="file"
                    name="logo"
                    accept="image/*,video/*"
                    id="file-upload"
                    className="absolute inset-0 z-20 cursor-pointer opacity-0"
                    required
                  />
                </div>
              </div>

              {/* <!-- Cover Upload --> */}
              <div className="mb-6">
                <label className="mb-2 block font-display text-jacarta-700 dark:text-white">
                  Cover Image
                  <span className="text-red">*</span>
                </label>
                <p className="mb-3 text-2xs dark:text-jacarta-300">
                  Drag or choose your file to upload
                </p>

                <div className="group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed border-jacarta-100 bg-black py-20 px-5 text-center dark:border-jacarta-600 dark:bg-jacarta-700">
                  {preview.cover ? (
                    <img src={preview.cover} className="h-44 rounded-lg " />
                  ) : (
                    <div className="relative z-10 cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="mb-4 inline-block fill-jacarta-500 dark:fill-white"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" />
                      </svg>
                      <p className="mx-auto max-w-xs text-xs dark:text-jacarta-300">
                        JPG, PNG, GIF, SVG. Max size: 40 MB
                      </p>
                    </div>
                  )}
                  {!preview.cover && (
                    <div className="absolute inset-4 cursor-pointer rounded bg-jacarta-50 opacity-0 group-hover:opacity-20 dark:bg-jacarta-600"></div>
                  )}

                  <input
                    onChange={(e) => {
                      if (!e.target.files[0]) return;
                      set_preview({
                        ...preview,
                        cover: URL.createObjectURL(e.target.files[0]),
                      });
                      set_data({ ...data, coverImage: e.target.files[0] });
                    }}
                    type="file"
                    name="coverImage"
                    accept="image/*,video/*"
                    id="file-upload"
                    className="absolute inset-0 z-20 cursor-pointer opacity-0"
                    required
                  />
                </div>
              </div>

              {/* <!-- Name --> */}
              <div className="mb-6">
                <label
                  htmlFor="item-name"
                  className="mb-2 block font-display text-jacarta-700 dark:text-white"
                >
                  Collection Name<span className="text-red">*</span>
                </label>
                <input
                  onChange={handleChange}
                  name="name"
                  type="text"
                  id="item-name"
                  className="bg-gray-300 w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-[#189C87]/10 focus:ring-[#189C87] dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-black placeholder:text-gray-800 text-black"
                  placeholder="Eg: Wild Hunters"
                  required
                />
              </div>

              {/* <!-- Description --> */}
              <div className="mb-6">
                <label
                  htmlFor="item-description"
                  className="mb-2 block font-display text-jacarta-700 dark:text-white"
                >
                  Collection Description
                  <span className="text-red">*</span>
                </label>
                <textarea
                  onChange={handleChange}
                  name="description"
                  id="item-description"
                  className="bg-gray-300 w-full rounded-lg border-jacarta-100 py-3 px-3 hover:ring-2 hover:ring-[#189C87]/10 focus:ring-[#189C87] dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-black placeholder:text-gray-800"
                  rows="4"
                  required
                  placeholder="Provide a detailed description of your collection."
                ></textarea>
              </div>

              {/* address  */}
              <div className="mb-6">
                <label
                  htmlFor="item-name"
                  className="mb-2 block font-display text-jacarta-700 dark:text-white"
                >
                  Collection Address<span className="text-red">*</span>
                </label>
                <p className="mb-3 text-2xs dark:text-jacarta-300">
                  The contract address of your collection
                </p>
                <input
                  onChange={handleChange}
                  name="address"
                  type="text"
                  id="item-name"
                  className="bg-gray-300 w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-[#189C87]/10 focus:ring-[#189C87] dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-black placeholder:text-gray-800 text-black"
                  placeholder="Eg: 0:ed149312db..."
                  required
                />
              </div>

              {/* supply  */}
              <div className="mb-6">
                <label
                  htmlFor="item-name"
                  className="mb-2 block font-display text-jacarta-700 dark:text-white"
                >
                  Max Supply <span className="text-red">*</span>
                </label>
                <p className="mb-3 text-2xs dark:text-jacarta-300">
                  enter max supply of your collection NFTs
                </p>
                <input
                  onChange={handleChange}
                  name="max_supply"
                  type="text"
                  id="item-name"
                  className="bg-gray-300 w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-[#189C87]/10 focus:ring-[#189C87] dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-black placeholder:text-gray-800 text-black"
                  placeholder="Eg - 4444"
                  required
                />
              </div>

              {/* Mint price  */}
              <div className="mb-6">
                <label
                  htmlFor="item-name"
                  className="mb-2 block font-display text-jacarta-700 dark:text-white"
                >
                  Mint Price<span className="text-red">*</span>
                </label>
                <p className="mb-3 text-2xs dark:text-jacarta-300">
                  Please enter only mint price in venom
                </p>
                <input
                  onChange={handleChange}
                  name="mint_price"
                  type="number"
                  id="item-name"
                  className="bg-gray-300 w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-[#189C87]/10 focus:ring-[#189C87] dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-black placeholder:text-gray-800 text-black"
                  placeholder="Eg - 2"
                  required
                />
              </div>

              {/* json URL  */}
              <div className="mb-6">
                <label
                  htmlFor="item-name"
                  className="mb-2 block font-display text-jacarta-700 dark:text-white"
                >
                  JSON URL<span className="text-red">*</span>
                </label>
                <p className="mb-3 text-2xs dark:text-jacarta-300">
                  Please enter your JSON url (metadata for NFTs)
                </p>
                <input
                  onChange={handleChange}
                  name="json"
                  type="text"
                  id="item-name"
                  className="bg-gray-300 w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-[#189C87]/10 focus:ring-[#189C87] dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-black placeholder:text-gray-800 text-black"
                  placeholder="Eg - ipfs.io/ipfs/QmNf1UsmdGaMbpatQ6toXSkzDpizaGmC9zfunCyoz1enD5/wilds/{id}.json"
                  required
                />
              </div>

              {/* starte date  */}
              <div className="mb-6">
                <label
                  htmlFor="item-name"
                  className="mb-2 block font-display text-jacarta-700 dark:text-white"
                >
                  Start Date<span className="text-red">*</span>
                </label>
                <input
                  onChange={handleChange}
                  name="start_date"
                  type="date"
                  id="item-name"
                  className="bg-gray-300 w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-[#189C87]/10 focus:ring-[#189C87] dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-black placeholder:text-gray-800 text-black"
                  placeholder="Enter Date"
                  required
                />
              </div>

              {/* email  */}
              <div className="mb-6">
                <label
                  htmlFor="item-name"
                  className="mb-2 block font-display text-jacarta-700 dark:text-white"
                >
                  Email<span className="text-red">*</span>
                </label>
                <p className="mb-3 text-2xs dark:text-jacarta-300">
                  you will be contacted on this email
                </p>
                <input
                  onChange={handleChange}
                  name="email"
                  type="email"
                  id="item-name"
                  className="bg-gray-300 w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-[#189C87]/10 focus:ring-[#189C87] dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-black placeholder:text-gray-800 text-black"
                  placeholder="Email ID"
                  required
                />
              </div>

              {/* note  */}
              <div className="mb-6">
                <label
                  htmlFor="item-name"
                  className="mb-2 block font-display text-jacarta-700 dark:text-white"
                >
                  Important<span className="text-red">**</span>
                </label>
                <p className="mb-3 text-2xs dark:text-jacarta-300">
                  Once you apply for the launchpad your details will be reviewed
                  and you will get contacted <br /> by our team on your
                  submitted email.
                </p>
              </div>

              {/* <!-- Submit nft form --> */}
              <button
                type="submit"
                className="rounded-full  bg-[#189C87] py-3 px-8 text-center font-semibold text-white transition-all cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default Apply;
