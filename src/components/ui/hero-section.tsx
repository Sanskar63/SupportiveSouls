'use client'
import React from "react";

function Hero() {

    return (
        <div className="w-[100%] flex flex-col items-center p-[2%] bg-purple-light h-[80vh]">
            <div className="h-[32vh]"></div>
            <span className=" text-4xl md:text-5xl lg:text-7xl text-black font-semibold" >SupportiveSouls</span>
            <p className="w-[35%] text-black text-center text-xs md:text-sm lg:text-xl mt-[2%]">An Initiative towards humanity.</p>
        </div>
    );
}

export default Hero;