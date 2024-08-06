'use client';
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

function CustomNavbar() {


    return (
        <div className="h-0 overflow-visible flex items-center justify-center">
            <nav className="w-[80%] md:w-[50%] h-[9vh] md:h-[12vh] px-[15%] md:px-[10%] bg-purple-mid  rounded-full flex items-center justify-center fixed top-[2%] z-50">
                <Link href="/" className="m-[5%] text-xs xs:text-sm lg:text-xl text-white">Home</Link>
                <Link href="/work" className="nav-link text-xs  m-[5%] xs:text-sm lg:text-xl text-white">Our Work</Link>
                <Link href="/donate" className="m-[5%] text-xs  xs:text-sm lg:text-xl text-white">Donate</Link>
                <Link href="/roles" className="m-[5%] text-xs  xs:text-sm lg:text-xl text-white">Volunteer</Link>
                
            </nav>
        </div>
    );
}

export default CustomNavbar;
