import Image from "next/image";
import React from "react";
import Head from "next/head";
import shravanImage from "../../public/shravan.jpeg";
import aniruddhaImage from "../../public/aniruddha.jpg";

const About = () => {
    return (
        <>
            <Head>
                <title>About - Venomart Marketplace</title>
                <meta
                    name="description"
                    content="About rarx marketplace"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/fav.png" />
            </Head>

            <div id="heroBack">
                {/* <!-- title --> */}
                <section className="relative pt-24">
                    <div className="container">
                        <div className="mx-auto max-w-2xl py-16 text-center">
                            <h1 className="mb-8 font-display text-4xl font-medium text-jacarta-700 dark:text-white">
                                About Venomart
                            </h1>
                            <p className="text-lg leading-normal dark:text-jacarta-300">
                                Venomart is an advanced NFT marketplace with features like AI NFT Generation, Multi-collection, NFT Launchpad and many other features at one place. Our vision is to create Venomart the best NFT Marketplace on venom blockchain 💪
                            </p>
                        </div>
                    </div>
                </section>

                {/* <!-- YouTube Modal --> */}
                {/* <div
                className=" fade video-lightbox js-video-lightbox"
                tabindex="-1"
                aria-label="Youtube Modal"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="ratio ratio-16x9 before:bg-jacarta-900">
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/hJsEJF-TrtM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

                {/* <!-- Team --> */}
                <section className="py-24">
                    <div className="container">
                        <h2 className="mb-12 text-center font-display text-3xl text-jacarta-700 dark:text-white">
                            Team Behind Venomart
                        </h2>
                        <div className="flex flex-wrap justify-center align-middle">
                            <div className="rounded-2lg border border-[#189C87] bg-transparent p-8 text-center transition-shadow hover:shadow-lg dark:border-jacarta-600 dark:bg-jacarta-700 m-4 w-[270px]">
                                <Image
                                    src={shravanImage}
                                    className="mx-auto mb-6 h-[220px] w-[300px] rounded-2.5xl"
                                    alt="team"
                                    height={100}
                                    width={100}
                                />
                                <h3 className="font-display text-md text-jacarta-700 dark:text-white">
                                    Shravan Andoria
                                </h3>
                                <span className="text-2xs font-medium tracking-tight text-jacarta-400">
                                    Full Stack Developer
                                </span>

                                <div className="mt-3 flex justify-center space-x-5">
                                    <a
                                        href=""
                                        target="_blank"
                                        className="group"
                                    >
                                        <svg
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="fab"
                                            data-icon="linkedin"
                                            className="h-4 w-4 fill-jacarta-300 group-hover:fill-accent dark:group-hover:fill-white"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                        >
                                            <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://twitter.com/AndoriaShravan"
                                        target="_blank"
                                        className="group"
                                    >
                                        <svg
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="fab"
                                            data-icon="twitter"
                                            className="h-4 w-4 fill-jacarta-300 group-hover:fill-accent dark:group-hover:fill-white"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                        >
                                            <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <div className="rounded-2lg border border-[#189C87] bg-transparent p-8 text-center transition-shadow hover:shadow-lg dark:border-jacarta-600 dark:bg-jacarta-700 m-4 w-[270px]">
                                <Image
                                    src={aniruddhaImage}
                                    className="mx-auto mb-6  h-[200px] w-[auto] m-4 shadow-xl  rounded-2.5xl"
                                    alt="team"
                                    height={100}
                                    width={100}
                                />
                                <h3 className="font-display text-md text-jacarta-700 dark:text-white">
                                    Aniruddha Vikharankar
                                </h3>
                                <span className="text-2xs font-medium tracking-tight text-jacarta-400">
                                    Full Stack Developer
                                </span>

                                <div className="mt-3 flex justify-center space-x-5">
                                    <a
                                        href="https://www.linkedin.com/in/aniruddha-vikharankar-374296208/"
                                        target="_blank"
                                        className="group"
                                    >
                                        <svg
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="fab"
                                            data-icon="linkedin"
                                            className="h-4 w-4 fill-jacarta-300 group-hover:fill-accent dark:group-hover:fill-white"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                        >
                                            <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://twitter.com/Aniruddha2000"
                                        target="_blank"
                                        className="group"
                                    >
                                        <svg
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="fab"
                                            data-icon="twitter"
                                            className="h-4 w-4 fill-jacarta-300 group-hover:fill-accent dark:group-hover:fill-white"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                        >
                                            <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default About;
