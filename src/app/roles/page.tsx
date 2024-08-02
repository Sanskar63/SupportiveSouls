"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import CustomNavbar from "@/components/ui/custom-navbar";
import RolesReader from "@/components/ui/role-reader";
import Footer from "@/components/ui/footer";
import Link from "next/link";

const BackgroundBeamsDemo: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <CustomNavbar />

      <div className="h-[65vh] w-[100%] flex flex-col justify-end items-center bg-purple-light pb-[5vh]">
        <span className="text-3xl md:text-4xl lg:text-5xl text-black font-semibold w-[50%] lg:w-[35%] text-center">
          Volunteer to make a change.
        </span>
        <div className="h-[10vh]"></div>
        <span className="text-sm md:text-xl lg:text-3xl text-black font-semibold w-[70%] underline">
          Roles Available
        </span>
      </div>
      {/* <div className="h-[5vh]"></div> */}
      <RolesReader items={content} />

      <div className="h-[5vh]"></div>

      <Link href={"/form"}
      className="bg-purple-mid w-[12vw] m-[1%] h-[8vh] flex items-center justify-center rounded-full text-xl md:text-2xl font-bold"
      >
        Join Us
      </Link>

      <div className="h-[10vh]"></div>

      <Footer />

    </div>
  );
};

const content = [
  {
    designation: "Teacher",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni earum illo dolorem, corrupti pariatur molestias fugit. Sit recusandae consequuntur tempora",
  },
  {
    designation: "Website Handler",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni earum illo dolorem, corrupti pariatur molestias fugit. Sit recusandae consequuntur tempora",
  },
  {
    designation: "Distributer",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni earum illo dolorem, corrupti pariatur molestias fugit. Sit recusandae consequuntur tempora",
  },
];

export default BackgroundBeamsDemo;
