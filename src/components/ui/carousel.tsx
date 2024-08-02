"use client"
import React, { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";


interface ImageItem {
  url: string;
  alt?: string; // Optional alt text for the image
}

interface Items {
    _id: string;
    description: string;
    images: ImageItem[];
    heading: string;
    __v?: number;
}

interface ContentReaderProps {
    data: Items
}

const Carousel: React.FC<ContentReaderProps> = ({ data }) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === data.images.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.images.length - 1 : slide - 1);
  };

  return (
    <div className="relative flex justify-center items-center w-[100%] h-[100%]">
      <BsArrowLeftCircleFill onClick={prevSlide} className="absolute left-4 filter drop-shadow-[0px_0px_5px_#555] w-8 h-8 text-white hover:cursor-pointer" />
      {data.images.map((item, idx) => {
        return (
          <img
            src={item.url}
            // alt={item.alt}
            key={idx}
            className={`${slide === idx ? 'block' : 'hidden'} rounded-lg shadow-md w-full h-full`}
          />
        );
      })}
      <BsArrowRightCircleFill onClick={nextSlide} className="absolute right-4 filter drop-shadow-[0px_0px_5px_#555] w-8 h-8 text-white hover:cursor-pointer" />
      <span className="flex absolute bottom-4">
        {data.images.map((_, idx) => {
          return (
            <button
              key={idx}
              className={`${slide === idx ? 'bg-white' : 'bg-gray-400'} h-2 w-2 rounded-full border-none outline-none shadow-md m-1 cursor-pointer`}
              onClick={() => setSlide(idx)}
            ></button>
          );
        })}
      </span>
    </div>
  );
};

export default Carousel ;