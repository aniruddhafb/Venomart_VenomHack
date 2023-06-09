import React, { useState, useEffect } from "react";
import Link from "next/link";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import sample from "lodash/sample";
import Head from "next/head";


const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const CreateAINFT = ({ collection_address_devnet, create_nft, get_collections_by_owner, signer_address }) => {

    const randomAIText = [
        "highly detailed wide portrait young woman anime, by atey ghailan, by greg rutkowski, by greg tocchini, by james gilleard, by joe fenton, by kaethe butcher, gradient light blue, brown, blonde cream and white color scheme, grunge aesthetic, 8 k, optimistic",
        "Dystopian World: In this futuristic scenario, the world has been taken over by machines and humans are forced to live in underground cities to avoid detection. The surface of the planet is barren and lifeless, with machines patrolling the landscape to prevent any human uprising. The underground cities are dark and cramped, with only artificial light to guide the way. People are constantly living in fear of being discovered by the machines and are forced to work in mines or factories to maintain the machines' functionality.",
        "A dystopian world where machines have taken over and humans are forced to live in underground cities",
        "A utopian society where humans have achieved immortality and can travel to other planets at will",
        "Utopian Society: In this futuristic scenario, humanity has achieved immortality and can travel to other planets at will. People are free to explore the galaxy and live their lives without fear of death. There are no more wars or conflicts, and society has evolved to a state of true harmony. The visual for this scenario would be a bright and colorful universe, with humans traveling to different planets and experiencing new cultures. The atmosphere would be joyful and peaceful, with a sense of wonder and curiosity permeating the scene.",
        "hyperrealism photography hyperrealism concept art of highly detailed farm and traditional ghibli house with highly detailed futuristic ( cyberpunk ) windmills towers aircrafts by wes anderson and hasui kawase and scott listfield sci - fi style hyperrealism rendered in blender and octane render volumetric natural light",
        "Cyberpunk Cityscape: In this futuristic scenario, crime is rampant and corporations hold all the power. The cityscape is dominated by skyscrapers and neon lights, with the streets patrolled by corporate security forces. The underground economy is thriving, with hackers and criminals using advanced technology to carry out their schemes. The visual for this scenario would be a dark and moody cityscape, with neon lights and advanced technology filling the scene. The atmosphere would be tense and dangerous, with a feeling of constant surveillance and control",
        "In this futuristic scenario, humans have developed advanced technology to manipulate time and space, causing reality to constantly shift and change. The world is a dizzying array of shapes and colors, with people able to alter their surroundings at will. The visual for this scenario would be a trippy and surreal landscape, with constantly shifting colors and shapes. The atmosphere would be dreamlike and otherworldly, with a sense of unpredictability and wonder permeating the scene"
    ]

    const [randomPrompt, setRandomPrompt] = useState(sample(randomAIText));
    const [randomShow, setRandomShow] = useState(false);

    const router = useRouter();
    const [prediction, setPrediction] = useState(null);
    const [predictionOutput, setPredictionOutput] = useState(null);
    const [predictionReady, setPredictionReady] = useState(false);
    const [error, setError] = useState(null);
    const [user_collections, set_user_collections] = useState([]);

    const [showMintForm, setShowMintForm] = useState(false);
    const [loading, set_loading] = useState(false);
    const [loadingPrediction, set_loadingPrediction] = useState(false);
    const [propModel, setPropModel] = useState(false);

    const [properties, set_properties] = useState([{ type: "", value: "" }]);
    const [data, set_data] = useState({
        image: "",
        name: "",
        description: "",
        collection: collection_address_devnet,
        properties: [{ type: "", value: "" }],
    });

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

    const handle_submit = async (e) => {
        set_loading(true);
        e.preventDefault();
        await create_nft(data);
        setTimeout(() => {
            router.push("/nft/exploreNFTs");
        }, 2000);
        set_loading(false);
    };

    const handleAISubmit = async (e) => {
        e.preventDefault();
        set_loadingPrediction(true);

        try {
            const response = await fetch("/api/predictions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: e.target.prompt.value,
                }),
            });

            let prediction = await response.json();
            if (response.status !== 201) {
                setError(prediction.detail);
                return;
            }
            setPrediction(prediction);

            while (
                prediction.status !== "succeeded" &&
                prediction.status !== "failed"
            ) {
                await sleep(1000);
                const response = await fetch("/api/predictions/" + prediction.id);
                prediction = await response.json();
                if (response.status !== 200) {
                    setError(prediction.detail);
                    return;
                }
                setPrediction(prediction);
                if (prediction.output) {
                    setPredictionOutput(prediction.output[prediction.output.length - 1]);
                    setPredictionReady(true);
                    set_loadingPrediction(false);
                }
            }
        } catch (error) {
            console.log({ GenError: error })
        }

    };

    useEffect(() => {
        set_data({ ...data, image: predictionOutput });
        (async () => {
            if (!signer_address) return;
            const collections = await get_collections_by_owner(signer_address);
            console.log(collections);
            set_user_collections(collections);
        })();
    }, [predictionOutput, randomPrompt, signer_address]);

    return (
        <>
            <Head>
                <title>Create AI NFT - Venomart Marketplace</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/fav.png" />
            </Head>

            {loading ? (
                <Loader />
            ) : (
                <>
                    {!showMintForm && (
                        <form onSubmit={handleAISubmit} className="relative py-24" id="heroBack">
                            <div className="container">
                                <h1 className="pt-16 text-center font-display text-4xl font-medium text-white ">
                                    Create AI NFT
                                </h1>
                                <p className="mb-14 mt-4 text-center text-2xs dark:text-jacarta-300">
                                    Write some information about a situation or condition and{" "}
                                    <br /> AI will generate a random NFT for you
                                </p>
                                <div className=" flex flex-col justify-center align-middle text-center">
                                    <div className="mb-6 flex justify-center">
                                        {/* nft prediction response here  */}
                                        {predictionOutput ? (
                                            <>
                                                <div className="flex items-center justify-center">
                                                    <img
                                                        src={predictionOutput}
                                                        alt="predictionOutput"
                                                        className="h-[300px] w-[auto] rounded-lg border-2 border-gray-500"
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <div className="group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed border-jacarta-100 bg-transparent py-20 px-5 text-center dark:border-jacarta-600 dark:bg-jacarta-700 w-[400px]">
                                                {loadingPrediction == true ? (
                                                    <svg
                                                        aria-hidden="true"
                                                        className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                                        viewBox="0 0 100 101"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                            fill="currentColor"
                                                        />
                                                        <path
                                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                            fill="currentFill"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <div className="relative z-10">
                                                        <p className="mx-auto max-w-xs text-xs dark:text-jacarta-300">
                                                            Generate prediction to view image
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    {/* nft prediction text  */}
                                    <div className="mb-6">
                                        {randomShow ?
                                            <textarea
                                                defaultValue={randomPrompt}
                                                name="prompt"
                                                id="prompt"
                                                className="w-[400px] rounded-lg border-jacarta-100 py-3 px-3 hover:ring-2 hover:ring-[#189C87]/10 focus:ring-[#189C87] border-jacarta-600 bg-transparent  placeholder:text-jacarta-300"
                                                rows="4"
                                                required
                                                placeholder="Provide a detailed description of a NFT Image you want to generate, the more you detail the more high quaility image you get"
                                            ></textarea>
                                            :
                                            <textarea
                                                name="prompt"
                                                id="prompt"
                                                className="w-[400px] rounded-lg border-jacarta-100 py-3 px-3 hover:ring-2 hover:ring-[#189C87]/10 focus:ring-[#189C87] border-jacarta-600 bg-transparent placeholder:text-jacarta-300"
                                                rows="4"
                                                required
                                                placeholder="Provide a detailed description of a NFT Image you want to generate, the more you detail the more high quaility image you get"
                                            ></textarea>
                                        }
                                        {loadingPrediction == false &&
                                            <button onClick={() => (setRandomPrompt(sample(randomAIText)), setRandomShow(!randomShow))} type="button" className="absolute ml-2 mt-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style={{ fill: "white" }}><path d="M5 18c4.667 4.667 12 1.833 12-4.042h-3l5-6 5 6h-3c-1.125 7.98-11.594 11.104-16 4.042zm14-11.984c-4.667-4.667-12-1.834-12 4.041h3l-5 6-5-6h3c1.125-7.979 11.594-11.104 16-4.041z" /></svg>
                                            </button>
                                        }
                                    </div>
                                    <div className="flex justify-center">
                                        {loadingPrediction == true ? (
                                            <button
                                                disabled
                                                type="button"
                                                className="rounded-full bg-[#189C87] py-3 px-8 text-center font-semibold text-white transition-all w-[250px]"
                                            >
                                                Generating{" "}
                                                <svg
                                                    aria-hidden="true"
                                                    className="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                                                    viewBox="0 0 100 101"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                        fill="currentFill"
                                                    />
                                                </svg>
                                            </button>
                                        ) : (
                                            <button
                                                type="submit"
                                                className="rounded-full bg-[#189C87] py-3 px-8 text-center font-semibold text-white transition-all cursor-pointer w-[250px]"
                                            >
                                                Generate Prediction
                                            </button>
                                        )}

                                        {predictionReady && (
                                            <button
                                                onClick={() => setShowMintForm(true)}
                                                type="button"
                                                className="rounded-full bg-[#189C87] py-3 px-8 text-center font-semibold text-white transition-all cursor-pointer ml-4 w-[250px]"
                                            >
                                                Mint NFT
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}

                    {/* minting form  */}
                    {showMintForm && (
                        <form onSubmit={handle_submit} className="relative py-24" id="heroBack">
                            <div className="container">
                                <h1 className="py-16 text-center font-display text-4xl font-medium text-white">
                                    Create AI NFT
                                </h1>
                                <div className="mx-auto max-w-[48.125rem]">
                                    {/* <!-- File Upload --> */}
                                    <div className="mb-6">
                                        <p className="mb-3 text-2xs dark:text-jacarta-300">
                                            Your generated nft prediction will appear here
                                        </p>

                                        {/* nft prediction response here  */}
                                        {predictionOutput ? (
                                            <>
                                                <div>
                                                    <img
                                                        src={predictionOutput}
                                                        alt="predictionOutput"
                                                        className="h-44 rounded-lg border-2 border-gray-500"
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <div className="group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed border-jacarta-100 bg-transparent py-20 px-5 text-center dark:border-jacarta-600 dark:bg-jacarta-700">
                                                <div className="relative z-10 cursor-pointer">
                                                    <p className="mx-auto max-w-xs text-xs dark:text-jacarta-300">
                                                        Generate to view image
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <label
                                        htmlFor="item-name"
                                        className="mb-2 block font-display text-white  mt-6"
                                    >
                                        <span className="text-red">* </span> Please Fill The Below
                                        Form To Mint The NFT<span className="text-red"> *</span>
                                    </label>

                                    {/* <!-- Name --> */}
                                    <div className="mb-6 mt-6">
                                        <label
                                            htmlFor="item-name"
                                            className="mb-2 block font-display text-white "
                                        >
                                            Name<span className="text-red">*</span>
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            name="name"
                                            type="text"
                                            id="item-name"
                                            className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-[#189C87]/10 focus:ring-[#189C87] dark:border-jacarta-600 dark:bg-jacarta-700  dark:placeholder:text-jacarta-300 text-black"
                                            placeholder="Item name"
                                            required
                                        />
                                    </div>

                                    {/* <!-- Description --> */}
                                    <div className="mb-6">
                                        <label
                                            htmlFor="item-description"
                                            className="mb-2 block font-display text-white "
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
                                            className="w-full rounded-lg text-black border-jacarta-100 py-3 px-3 hover:ring-2 hover:ring-[#189C87]/10 focus:ring-[#189C87] dark:border-jacarta-600 dark:bg-jacarta-700  dark:placeholder:text-jacarta-300"
                                            rows="4"
                                            required
                                            placeholder="Provide a detailed description of your item."
                                        ></textarea>
                                    </div>

                                    {/* select collection  */}
                                    <div className="relative">
                                        <div>
                                            <label className="mb-2 block font-display text-white ">
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
                                            className="dropdown my-1 cursor-pointer w-[100%] text-black p-2"
                                        >
                                            <option value={collection_address_devnet}>
                                                Venomart Marketplace Collection
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
                                                    <label className="block font-display text-white ">
                                                        Properties
                                                    </label>
                                                    <p className="dark:text-jacarta-300">
                                                        Textual traits that show up as rectangles.
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#189C87] bg-transparent hover:border-transparent hover:bg-[#189C87] dark:bg-jacarta-700"
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
                                            <div className="max-w-2xl mb-4 bg-transparent">
                                                <div className="modal-content bg-transparent">
                                                    <div className="modal-body p-6 bg-transparent">
                                                        {data.properties.map((e, index) => (
                                                            <div className="relative my-3 flex items-center">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handle_remove_field(index)}
                                                                    className="flex h-12 w-12 shrink-0 items-center justify-center self-end rounded-l-lg border border-r-0 border-jacarta-100 hover:bg-jacarta-100 dark:border-jacarta-600 bg-gray-300"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 24 24"
                                                                        width="24"
                                                                        height="24"
                                                                        className="h-6 w-6 fill-jacarta-500"
                                                                    >
                                                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                                                        <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
                                                                    </svg>
                                                                </button>

                                                                <div className="flex-1">
                                                                    <input
                                                                        onChange={(e) => handle_change_input(index, e)}
                                                                        name="type"
                                                                        type="text"
                                                                        className="h-12 w-full border border-r-0 border-jacarta-100 text-black focus:ring-inset focus:ring-[#189C87] dark:border-jacarta-600 dark:bg-jacarta-700 dark:placeholder-jacarta-300"
                                                                        placeholder="Type"
                                                                    />
                                                                </div>

                                                                <div className="flex-1">
                                                                    <input
                                                                        onChange={(e) => handle_change_input(index, e)}
                                                                        name="value"
                                                                        type="text"
                                                                        className="h-12 w-full rounded-r-lg border border-jacarta-100 text-black focus:ring-inset focus:ring-[#189C87] dark:border-jacarta-600 dark:bg-jacarta-700  dark:placeholder-jacarta-300"
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
            )}
        </>
    );
};

export default CreateAINFT;
