'use client';
import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { LayoutGrid } from "@/components/ui/layout-grid";
import Hero from "@/components/ui/hero-section";
import CustomNavbar from "@/components/ui/custom-navbar";
import Footer from "@/components/ui/footer";
import Link from "next/link";
import { InfiniteUpcoming } from "@/components/ui/infinite-Upcoming_Events";
import axios from "axios";
import Image from "next/image";

interface content {
  _id: string;
  description: string;
  heading: string;
  date: string;
  banner: {
    url: string;
    public_id: string;
    _id: string;
  }[]
};
export default function NavbarDemo() {
  const [Upcoming, setUpcoming] = useState<content[]>([]);

  useEffect(() => {
    FetchEvents();
  }, []);


  const FetchEvents = async () => {
    try {
      const res = await axios.get("/api/Events/get");
      setUpcoming(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("Error---------------------------", error)
    }
  }

  return (
    <div className="relative w-full flex flex-col justify-center items-center">


      <CustomNavbar />
      <Hero />

      <div className=" h-[4vh] lg:h-[7vh]"></div>
      {/*Here Goes quotes from founders  */}
      <InfiniteMovingCards items={Quotes} direction="left" speed="slow" />
      <div className=" h-[4vh] lg:h-[7vh]"></div>

      <span className="text-2xl lg:text-5xl text-black font-semibold text-center">Moments</span>
      <div className="h-screen w-full bg-purple-light my-[2%]">
        <LayoutGrid cards={cards} />
      </div>

      <div className=" h-[4vh] lg:h-[7vh]"></div>

      <span className="text-2xl lg:text-5xl text-black font-semibold text-center">Our Goals</span>
      <div className=" w-full bg-purple-light my-[2%] px-[5%] flex flex-wrap items-center justify-center">

        <div className="flex my-[2vw]">

          <div className="flex flex-col items-center justify-center mx-[8vw] md:m-[4vw]">
            <Image alt="Healthcare" width={"800"} height={"600"} className=" w-14 md:w-20 lg:w-28" src={"/healthcare.png"} />
            <span className="text-sm lg:text-xl text-black font-semibold text-center">Health</span>
          </div>

          <div className="flex flex-col items-center justify-center mx-[8vw] md:m-[4vw]">
            <Image alt="Education" width={"800"} height={"600"} className=" w-14 md:w-20 lg:w-28" src={"/homework.png"} />
            <span className="text-sm lg:text-xl text-black font-semibold text-center">Education</span>
          </div>
        </div>

        <div className="flex my-[2vw]">


          <div className="flex flex-col items-center justify-center mx-[8vw] md:m-[4vw]">
            <Image alt="Plant" width={"800"} height={"600"} className=" w-14 md:w-20 lg:w-28" src={"/plant.png"} />
            <span className="text-sm lg:text-xl text-black font-semibold text-center">Environment</span>
          </div>

          <div className="flex flex-col items-center justify-center mx-[8vw] md:m-[4vw]">
            <Image alt="Pets" width={"800"} height={"600"} className=" w-14 md:w-20 lg:w-28" src={"/pets.png"} />
            <span className="text-sm lg:text-xl text-black font-semibold text-center">Animal</span>
          </div>
        </div>

      </div>

      <div className=" h-[4vh] lg:h-[7vh]"></div>

      <span className="text-2xl lg:text-5xl text-black font-semibold text-center">Our Impact</span>
      <div className=" py-[4vw] w-full bg-purple-light my-[2%] px-[5%] flex flex-wrap items-start justify-center">

          <div className="flex flex-col items-center justify-center w-[28%]">
            <span className="text-2xl lg:text-8xl text-black font-semibold text-center">40+</span>
            <span className="text-xs lg:text-xl text-black font-light w-[20vw] text-center">Students are benifiting from offline classes. </span>
          </div>

          <div className="flex flex-col items-center justify-center  w-[28%]">
            <span className="text-2xl lg:text-8xl text-black font-semibold text-center">100+</span>
            <span className="text-xs lg:text-xl text-black font-light w-[20vw] text-center">Plants have been planted. </span>
          </div>

          <div className="flex flex-col items-center justify-center w-[28%]">
            <span className="text-2xl lg:text-8xl text-black font-semibold text-center">10+</span>
            <span className="text-xs lg:text-xl text-black font-light w-[20vw] text-center">Animals have been rescued and been given proper treatment.</span>
          </div>


      </div>

      {/* 
      <div className="h-[5vh]"></div>

      <span className="sm:text-2xl lg:text-5xl text-black font-semibold text-center">Upcoming Events</span>
      <div className="h-[3vh]"></div>

      <InfiniteMovingCards items={testimonials} direction="left" speed="slow" /> */}

      <div className=" h-[4vh] lg:h-[7vh]"></div>

      <div className=" h-[40vh] lg:h-[70vh] w-[100%] bg-purple-light flex flex-col justify-center items-center">
        <span className="text-xl md:text-3xl lg:text-5xl text-black font-semibold w-[50%] text-center">
          Contribute to make good change.
        </span>

        <div className="w-[100%] flex items-center justify-center mt-[2vh]">
          <Link href={"/donate"} className="bg-purple-mid w-[22vw] lg:w-[10vw] m-[1%] h-[5vh] lg:h-[8vh] rounded-full text-sm md:text-xl flex items-center justify-center font-semibold">
            Donate
          </Link>
          <Link href={"/roles"} className="bg-purple-mid w-[22vw] lg:w-[10vw] m-[1%] h-[5vh] lg:h-[8vh] rounded-full text-sm md:text-xl flex items-center justify-center font-semibold">
            Join Us
          </Link>
        </div>

      </div>


      <div className=" h-[5vh] lg:h-[10vh]"></div>

      <Footer />
    </div>
  );
}




// const Upcoming = [
//   {
//     "_id": "669e2321a1be76ad23bac61e",
//     "banner": [
//         {
//             "url": "https://res.cloudinary.com/dt3o6uwwn/image/upload/v1721639713/pixyv7bikylshowzu9fo.jpg",
//             "public_id": "pixyv7bikylshowzu9fo",
//             "_id": "669e2321a1be76ad23bac61f"
//         }
//     ],
//     "description": "Donation of water cooler to near orphanage.",
//     "date": "2024-07-29T00:00:00.000Z",
//     "heading": "Water Cooler Donation",
//     "createdAt": "2024-07-22T09:15:13.519Z",
//     "updatedAt": "2024-07-22T09:15:13.519Z",
//     "__v": 0
//   },
//   {
//     "_id": "669e2321a1be76ad23bac61e",
//     "banner": [
//         {
//             "url": "https://res.cloudinary.com/dt3o6uwwn/image/upload/v1721639713/pixyv7bikylshowzu9fo.jpg",
//             "public_id": "pixyv7bikylshowzu9fo",
//             "_id": "669e2321a1be76ad23bac61f"
//         }
//     ],
//     "description": "Donation of water cooler to near orphanage.",
//     "date": "2024-07-29T00:00:00.000Z",
//     "heading": "Water Cooler Donation",
//     "createdAt": "2024-07-22T09:15:13.519Z",
//     "updatedAt": "2024-07-22T09:15:13.519Z",
//     "__v": 0
//   }
// ]

const Quotes = [
  {
    quote:
      "If you want to devote for a good cause, don't wait for others to start first.",
    name: "Sanskriti Gupta",
    title: "Founder",
  },
  {
    quote:
      "Don't hesitate to do the right thing.",
    name: "Rohan Mishra",
    title: "Co-Founder",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Simran Maurya",
    title: "Core Member",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Astha Srivastava",
    title: "Core Member",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Daisy Chauhan",
    title: "Core Member",
  },

];

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">Cooler Donation</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Due to the recent heat waves the temperature has risen above 45 deg Celsius. The heat has become unbearable. Thus SupportiveSouls Society has donated 2 big sized coolers to Cawnpore Hindu Orphanage.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">Book Donation</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Our NGO recently organized a book donation drive, providing essential educational resources to students in need. This initiative aims to promote literacy and support academic success, thanks to the generous contributions of our donors and volunteers.
      </p>
    </div>
  );
};

const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">Planting and Ploughing</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Our NGO recently conducted a plantation and ploughing initiative, focusing on environmental sustainability and agricultural support. By planting trees and preparing land for cultivation, we aim to enhance ecological balance and support local farmers in their agricultural efforts.
      </p>
    </div>
  );
};

const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">Teaching</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        SupportiveSouls society provides regular educational sessions for students, aiming to enhance their knowledge and skills. Our dedicated team ensures consistent learning opportunities, fostering academic growth and personal development in a supportive environment.
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail: "/cooler.jpeg",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "/book.jpeg",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "/planting.jpeg",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "/teach.jpeg",
  },
];
