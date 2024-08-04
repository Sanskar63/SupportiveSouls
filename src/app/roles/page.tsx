"use client";
import React, { useEffect, useState } from "react";
import CustomNavbar from "@/components/ui/custom-navbar";
import RolesReader from "@/components/ui/role-reader";
import Footer from "@/components/ui/footer";
import Link from "next/link";
import axios from "axios";

interface content {
  _id: string,
  description: string,
  designation: string,
  __v: number
}

const Roles: React.FC = () => {
  const [data, setData] = useState<content[]>([]);
  const [isAvail, setAvail] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/Role/get");
        setData(response.data);
        if (response.data.length !== 0) setAvail(true);
      } catch (error) {
        console.log("-----------------Error in fetchin roles---------------------------")
      }
    }

    fetchData();
  }, [])

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
      <div className="h-[5vh]"></div>
      {
        isAvail ? (
          <RolesReader items={data} />
        ) :
          (
            <p className="text-xl md:text-2xl lg:text-3xl text-black font-semibold w-[50%] lg:w-[35%] text-center">No Roles Available</p>
          )
      }

      {/* <div className="h-[2vh]"></div> */}

      {isAvail ?
        (
          <Link href={"/form"}
            className="bg-purple-mid w-[12vw] m-[1%] h-[8vh] flex items-center justify-center rounded-full text-xl md:text-2xl font-bold"
          >
            Join Us
          </Link>
        ) : (
          <div></div>
        )}


      <div className="h-[10vh]"></div>

      <Footer />

    </div>
  );
};

export default Roles;
