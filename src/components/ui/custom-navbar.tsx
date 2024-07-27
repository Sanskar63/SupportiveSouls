'use client';
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

function CustomNavbar() {


    return (
        <div className="h-0 overflow-visible flex items-center justify-center">
            <nav className="w-[50%] px-[10%] bg-purple-mid h-[12vh] rounded-full flex items-center justify-center fixed top-[2%] z-50">
                <Link href="/" className="m-[5%] text-xs md:text-sm lg:text-xl text-white">Home</Link>
                <div className="m-[5%] text-xs md:text-sm lg:text-xl text-white">Donate</div>
                <Link href="/roles" className="m-[5%] text-xs md:text-sm lg:text-xl text-white">Volunteer</Link>
                <div className="m-[5%] text-xs md:text-sm lg:text-xl text-white">Work</div>
                
            </nav>
        </div>
    );
}

export default CustomNavbar;
