import React, { useState } from "react";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import Head from "next/head";

const CreateNFTCollection = ({ signer_address }) => {
    const router = useRouter();
    const [loading, set_loading] = useState(false);
    const [preview, set_preview] = useState({ logo: "", cover: "" });
    const [data, set_data] = useState({
        name: "",
        symbol: "",
        logo: "",
        image: "",
        description: "",
    });

    const handleChange = (e) => {
        set_data({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Head>
                <title>Create NFT Collection - Venomart Marketplace</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
            </Head>

            {loading ? (
                <Loader />
            ) : (
                <form onSubmit={""} className="relative py-24">
                    <div className="container">
                        <h1 className="py-16 text-center font-display text-4xl font-medium text-jacarta-700 dark:text-white">
                            Create NFT Collection
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
                                            set_data({ ...data, image: e.target.files[0] });
                                        }}
                                        type="file"
                                        name="image"
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

                            {/* symbol  */}
                            <div className="mb-6">
                                <label
                                    htmlFor="item-name"
                                    className="mb-2 block font-display text-jacarta-700 dark:text-white"
                                >
                                    Symbol<span className="text-red">*</span>
                                </label>
                                <input
                                    onChange={handleChange}
                                    name="symbol"
                                    type="text"
                                    id="item-name"
                                    className="bg-gray-300 w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-[#189C87]/10 focus:ring-[#189C87] dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-black placeholder:text-gray-800 text-black"
                                    placeholder="Eg: WILDH"
                                    required
                                />
                            </div>

                            {/* <!-- Description --> */}
                            <div className="mb-6">
                                <label
                                    htmlFor="item-description"
                                    className="mb-2 block font-display text-jacarta-700 dark:text-white"
                                >
                                    Description
                                    <span className="text-red">*</span>
                                </label>
                                <p className="mb-3 text-2xs dark:text-jacarta-300">
                                    The description will be the collection description.
                                </p>
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

                            {/* <!-- Submit nft form --> */}
                            <button
                                type="submit"
                                className="rounded-full  bg-[#189C87] py-3 px-8 text-center font-semibold text-white transition-all cursor-pointer"
                            >
                                Create Collection
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
};

export default CreateNFTCollection;
