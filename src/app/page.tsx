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

  useEffect(()=>{
    FetchEvents();
  },[]);


  const FetchEvents = async()=>{
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

      <div className="h-[7vh]"></div>
      {/*Here Goes quotes from founders  */}
      <InfiniteMovingCards items={testimonials} direction="left" speed="slow" />
      <div className="h-[7vh]"></div>

      <span className="sm:text-2xl lg:text-5xl text-black font-semibold text-center">Moments</span>
      <div className="h-screen w-full bg-purple-light my-[2%]">
        <LayoutGrid cards={cards} />
      </div>

      <div className="h-[5vh]"></div>

      <span className="sm:text-2xl lg:text-5xl text-black font-semibold text-center">Upcoming Events</span>
      <div className="h-[3vh]"></div>

      <InfiniteMovingCards items={testimonials} direction="left" speed="fast" />

      <div className="h-[7vh]"></div>

      <div className="h-[70vh] w-[100%] bg-purple-light flex flex-col justify-center items-center">
        <span className="text-xl md:text-3xl lg:text-5xl text-black font-semibold w-[50%] text-center">
          Contribute to make good change.
        </span>

        <div className="w-[100%] flex items-center justify-center mt-[2vh]">
          <Link href={"/donate"} className="bg-purple-mid w-[10vw] m-[1%] h-[8vh] rounded-full text-sm md:text-xl flex items-center justify-center font-semibold">
            Donate
          </Link>
          <Link href={"/form"} className="bg-purple-mid w-[10vw] m-[1%] h-[8vh] rounded-full text-sm md:text-xl flex items-center justify-center font-semibold">
            Join Us
          </Link>
        </div>

      </div>


      <div className="h-[10vh]"></div>

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

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
];

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">House in the woods</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        A serene and tranquil retreat, this house in the woods offers a peaceful escape from the hustle and bustle of city life.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">House above the clouds</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Perched high above the world, this house offers breathtaking views and a unique living experience. It's a place where the sky meets home, and tranquility is a way of life.
      </p>
    </div>
  );
};

const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">Greens all over</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        A house surrounded by greenery and nature's beauty. It's the perfect place to relax, unwind, and enjoy life.
      </p>
    </div>
  );
};

const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">Rivers are serene</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        A house by the river is a place of peace and tranquility. It's the perfect place to relax, unwind, and enjoy life.
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
