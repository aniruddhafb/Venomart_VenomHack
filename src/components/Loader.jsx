import React from "react";
import { BiLoaderAlt } from "react-icons/bi";
const Loader = () => {
    return (
        <div className="absolute h-full w-full flex justify-center items-center bg-black ">
            <BiLoaderAlt className="h-52 w-[70px] animate-spin" />
        </div>
    );
};

export default Loader;
