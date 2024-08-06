'use client';
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
    IconArrowLeft,
    IconBriefcase2,
    IconUserHeart,
    IconTrash,
    IconForms,
    IconMenu2
} from "@tabler/icons-react";

function AdminNav() {
    const [active, setActive]= useState<boolean>(false);

    return (
        <div className="h-0 overflow-visible md:flex items-center justify-center">
            <nav className=" w-[95%] md:w-[90%] lg:w-[80%] hidden md:h-[12vh] px-[15%] md:px-[10%] bg-purple-mid  rounded-full md:flex items-center justify-center fixed top-[2%] z-50">
                <Link href="/" className=" whitespace-nowrap m-[5%] text-xs md:text-sm lg:text-xl text-white"> &larr; Back to Site</Link>
                <Link href="/admin/work/add" className="nav-link m-[5%] text-xs md:text-sm lg:text-xl text-white">Add work</Link>
                <Link href="/admin/form" className="whitespace-nowrap m-[5%] text-xs md:text-sm lg:text-xl text-white">Get Forms</Link>
                <Link href="/admin/roles/add" className="whitespace-nowrap m-[5%] text-xs md:text-sm lg:text-xl text-white">Add Role</Link>
                <Link href="/admin/work/rm" className="nav-link m-[5%] text-xs md:text-sm lg:text-xl text-white">Remove work</Link>
                <Link href="/admin/roles/rm" className="whitespace-nowrap m-[5%] text-xs md:text-sm lg:text-xl text-white">Remove Role</Link>
            </nav>

            <nav className="block md:hidden w-[60%] relative">

                <IconMenu2 onClick={()=>(setActive(!active))} className="text-neutral-900 dark:text-neutral-200 h-7 w-7 flex-shrink-0 m-[2vw] fixed top-5 left-3 z-30" />

                {
                    active? (
                        <div className="w-[60%] bg-purple-light rounded-tl-none border-2 border-black z-20 h-[80vh] pl-[5%] pt-[20%] rounded-lg fixed top-0 left-0">
                    {
                        links.map((item, index)=>(
                            <div className="flex items-center h-[10%]" key={index}>
                                {item.icon}
                                <Link className="text-gray-900 active:underline underline-offset-2" href={item.href}>{item.label}</Link>
                            </div>
                        ))
                    }
                </div>
                    ) :
                    (
                        <div></div>
                    )
                }
                

            </nav>
        </div>
    );
}

const links = [
    {
        label: "Add Work",
        href: "/admin/work/add",
        icon: (
            <IconBriefcase2 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0 mr-3" />
        ),
    },
    {
        label: "Add Role",
        href: "/admin/roles/add",
        icon: (
            <IconUserHeart className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0 mr-3" />
        ),
    },
    {
        label: "Get Forms",
        href: "/admin/form",
        icon: (
            <IconForms className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0 mr-3" />
        ),
    },
    {
        label: "Remove Work",
        href: "/admin/work/rm",
        icon: (
            <IconTrash className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0 mr-3" />
        ),
    },
    {
        label: "Remove Role",
        href: "/admin/roles/rm",
        icon: (
            <IconTrash className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0 mr-3" />
        ),
    },
    {
        label: "Back to site",
        href: "/",
        icon: (
            <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0 mr-3" />
        ),
    },
];

export default AdminNav;


