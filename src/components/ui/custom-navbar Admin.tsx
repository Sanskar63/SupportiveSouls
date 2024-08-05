'use client';
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

function AdminNav() {


    return (
        <div className="h-0 overflow-visible flex items-center justify-center">
            <nav className="w-[80%] h-[9vh] md:h-[12vh] px-[15%] md:px-[10%] bg-purple-mid  rounded-full flex items-center justify-center fixed top-[2%] z-50">
                <Link href="/" className=" whitespace-nowrap m-[5%] text-xs md:text-sm lg:text-xl text-white"> &larr; Back to Site</Link>
                <Link href="/admin/work/add" className="nav-link m-[5%] text-xs md:text-sm lg:text-xl text-white">Add work</Link>
                <Link href="/admin/form" className="whitespace-nowrap m-[5%] text-xs md:text-sm lg:text-xl text-white">Get Forms</Link>
                <Link href="/admin/roles/add" className="whitespace-nowrap m-[5%] text-xs md:text-sm lg:text-xl text-white">Add Role</Link>

                <Link href="/admin/work/rm" className="nav-link m-[5%] text-xs md:text-sm lg:text-xl text-white">Remove work</Link>
                {/* <Link href="/Form/rm" className="whitespace-nowrap m-[5%] text-xs md:text-sm lg:text-xl text-white">Remove Form</Link> */}
                <Link href="/admin/roles/rm" className="whitespace-nowrap m-[5%] text-xs md:text-sm lg:text-xl text-white">Remove Role</Link>
                
            </nav>
        </div>
    );
}

export default AdminNav;
