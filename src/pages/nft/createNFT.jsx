import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import Head from "next/head";

const CreateNFT = ({
  collection_address_devnet,
  create_nft,
  get_collections_by_owner,
  signer_address,
}) => {
  const router = useRouter();
  const [loading, set_loading] = useState(false);
  const [propModel, setPropModel] = useState(false);
  const [preview, set_preview] = useState("");
  const [user_collections, set_user_collections] = useState([]);

  const [properties, set_properties] = useState([{ type: "", value: "" }]);

  const [data, set_data] = useState({
    image: "",
    name: "",
    description: "",
    collection: collection_address_devnet,
    properties: [{ type: "", value: "" }],
  });

  const handle_submit = async (e) => {
    e.preventDefault();
    set_loading(true);
    await create_nft(data);
    set_data({
      image: "",
      name: "",
      description: "",
      collection: collection_address_devnet,
      properties: [{ type: "", value: "" }],
    });
    set_loading(false);
    router.push(`/profile/${signer_address}`);
  };

  const handleChange = (e) => {
    set_data({ ...data, [e.target.name]: e.target.value });
  };

  const handle_change_input = (index, e) => {
    const values = [...data.properties];
    values[index][e.target.name] = e.target.value;
    set_data({ ...data, properties: values });
  };

  const handle_add_field = () => {
    set_data({
      ...data,
      properties: [...data.properties, { type: "", value: "" }],
    });
  };

  const handle_remove_field = (index) => {
    const values = [...data.properties];
    values.splice(index, 1);
    set_data({ ...data, properties: values });
  };

  useEffect(() => {
    (async () => {
      if (!signer_address) return;
      const collections = await get_collections_by_owner(signer_address);
      console.log(collections);
      set_user_collections(collections);
    })();
  }, [signer_address]);

  return (
    <>
      <Head>
        <title>Create NFT - Venomart Marketplace</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fav.png" />
      </Head>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handle_submit} className="relative py-24" id="heroBack">
          <div className="container">
            <h1 className="py-16 text-center font-display text-4xl font-medium text-jacarta-700 dark:text-white">
              Create NFT
            </h1>
            <div className="mx-auto max-w-[48.125rem]">
              {/* <!-- File Upload --> */}
              <div className="mb-6">
                <label className="mb-2 block font-display text-jacarta-700 dark:text-white">
                  Select Image Or Video
                  <span className="text-red">*</span>
                </label>
                <p className="mb-3 text-2xs dark:text-jacarta-300">
                  Drag or choose your file to upload
                </p>

                {preview ? (
                  <>
                    <div>
                      <img
                        src={preview}
                        alt=""
                        className="h-44 rounded-lg border-2 border-gray-500"
                      />
                    </div>
                  </>
                ) : (
                  <div className="group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed border-jacarta-100  py-20 px-5 text-center dark:border-jacarta-600 dark:bg-jacarta-700">
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
                        JPG, PNG, GIF, SVG. Max size: 100 MB
                      </p>
                    </div>
                    <div className="absolute inset-4 cursor-pointer rounded bg-jacarta-50 opacity-0 group-hover:opacity-20 dark:bg-jacarta-600"></div>
                    <input
                      onChange={(e) => {
                        set_preview(URL.createObjectURL(e.target.files[0]));
                        set_data({ ...data, image: e.target.files[0] });
                      }}
                      type="file"
                      name="image"
                      accept="image/*,video/*,audio/*,webgl/*,.glb,.gltf"
                      id="file-upload"
                      className="absolute inset-0 z-20 cursor-pointer opacity-0"
                      required
                    />
                  </div>
                )}
              </div>

              {/* <!-- Name --> */}
              <div className="mb-6">
                <label
                  htmlFor="item-name"
                  className="mb-2 block font-display text-jacarta-700 dark:text-white"
                >
                  Name<span className="text-red">*</span>
                </label>
                <input
                  onChange={handleChange}
                  name="name"
                  type="text"
                  id="item-name"
                  className="bg-gray-300 w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-[#189C87]/10 focus:ring-[#189C87] dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-black placeholder:text-gray-800 text-black"
                  placeholder="Item name"
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
                  The description will be included on the nft detail page.
                </p>
                <textarea
                  onChange={handleChange}
                  name="description"
                  id="item-description"
                  className="bg-gray-300 w-full rounded-lg border-jacarta-100 py-3 px-3 hover:ring-2 hover:ring-[#189C87]/10 focus:ring-[#189C87] dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-black placeholder:text-gray-800"
                  rows="4"
                  required
                  placeholder="Provide a detailed description of your item."
                ></textarea>
              </div>

              {/* select collection  */}
              <div className="relative">
                <div>
                  <label className="mb-2 block font-display text-jacarta-700 dark:text-white">
                    Collection
                  </label>
                  <div className="mb-3 flex items-center space-x-2">
                    <p className="text-2xs dark:text-jacarta-300">
                      This is the collection where your nft will appear.{" "}
                      <Link
                        href="/collection/createCollection"
                        className="underline"
                      >
                        Create a new collection{" "}
                      </Link>
                    </p>
                  </div>
                </div>
                <select
                  name="collection"
                  value={data.collection}
                  onChange={handleChange}
                  className="dropdown my-1 cursor-pointer w-[100%] text-black p-3 bg-gray-300"
                  required
                >
                  <option>Select Collection</option>
                  <option value={collection_address_devnet}>
                    Default Marketplace Collection
                  </option>
                  {user_collections?.data?.map((e, index) => {
                    return (
                      <option key={index} value={e.name}>
                        {e.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* <!-- Properties --> */}
              <div className="relative border-b border-jacarta-100 py-6 dark:border-jacarta-600 mb-6 mt-8">
                <div className="flex items-center justify-between">
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="mr-2 mt-px h-4 w-4 shrink-0 fill-jacarta-700 dark:fill-white"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" />
                    </svg>

                    <div>
                      <label className="block font-display text-jacarta-700 dark:text-white">
                        Properties
                      </label>
                      <p className="dark:text-jacarta-300">
                        Textual traits that show up as rectangles.
                      </p>
                    </div>
                  </div>
                  <button
                    className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#189C87] bg-white hover:border-transparent hover:bg-[#189C87] dark:bg-jacarta-700"
                    type="button"
                    id="item-properties"
                    data-bs-toggle="modal"
                    data-bs-target="#propertiesModal"
                    onClick={() => setPropModel(!propModel)}
                  >
                    {!propModel ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="fill-[#189C87] group-hover:fill-white"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="h-6 w-6 fill-jacarta-500 group-hover:fill-white"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* <!-- Properties Modal --> */}
              {propModel && (
                <div>
                  <div className="max-w-2xl mb-4">
                    <div className="modal-content bg-transparent">
                      <div className="modal-body p-6">
                        {data.properties.map((e, index) => (
                          <div
                            key={index}
                            className="relative my-3 flex items-center"
                          >
                            <button
                              type="button"
                              onClick={() => handle_remove_field(index)}
                              className="flex h-12 w-12 shrink-0 items-center justify-center self-end rounded-l-lg border border-r-0 border-jacarta-100 bg-jacarta-50 hover:bg-jacarta-100 dark:border-jacarta-600 dark:bg-white"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                className="h-6 w-6 fill-jacarta-500 dark:fill-jacarta-300"
                              >
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
                              </svg>
                            </button>

                            <div className="flex-1">
                              <input
                                onChange={(e) => handle_change_input(index, e)}
                                value={data.properties[index].type}
                                name="type"
                                type="text"
                                className="h-12 w-full border border-r-0 border-jacarta-100 focus:ring-inset focus:ring-[#189C87] dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-black dark:placeholder-jacarta-300"
                                placeholder="Type"
                              />
                            </div>

                            <div className="flex-1">
                              <input
                                onChange={(e) => handle_change_input(index, e)}
                                value={data.properties[index].value}
                                name="value"
                                type="text"
                                className="h-12 w-full rounded-r-lg border border-jacarta-100 focus:ring-inset focus:ring-[#189C87] dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-black dark:placeholder-jacarta-300"
                                placeholder="Value"
                              />
                            </div>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={handle_add_field}
                          className="mt-2 rounded-full border-2 border-[#189C87] py-2 px-8 text-center text-sm font-semibold text-[#189C87] transition-all hover:bg-[#189C87] hover:text-white"
                        >
                          Add More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* <!-- Submit nft form --> */}
              <button
                type="submit"
                className="rounded-full bg-[#189C87] py-3 px-8 text-center font-semibold text-white transition-all cursor-pointer"
              >
                Create NFT
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default CreateNFT;
