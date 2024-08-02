"use client"
import Carousel from '@/components/ui/carousel'; // Ensure correct import path
import CustomNavbar from '@/components/ui/custom-navbar';
import Footer from '@/components/ui/footer';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface ImageItem {
    url: string,
}

interface ContentItem {
    _id: string;
    description: string;
    images: ImageItem[];
    heading: string;
    __v?: number;
}

function Work() {
    const [content, setContent] = useState<ContentItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/Work/get");
                setContent(response.data);
            } catch (error) {
                console.log("problem in fetching data", error);
            }
        }
        
        fetchData();
    }, [])

    console.log("---------------", content);

    return (
        <div className='w-[100%] flex flex-col items-center'>
            <CustomNavbar />
            <div className='h-[30vh]'></div>
            
            {
                content.map((item) => (
                    <div key={item._id} className='flex justify-center items-center bg-purple-light w-[65%] h-[50vh] my-[3vh] rounded-2xl'>
                        <div className='bg-slate-600 w-[45%] h-[85%] rounded-2xl mr-[5%]'>
                            <Carousel data={item} />
                        </div>

                        <div className='w-[45%] h-[70%] rounded-2xl flex flex-col items-center'>
                            <span className="text-sm md:text-xl lg:text-3xl text-black font-semibold underline">
                                {item.heading}
                            </span>
                            <div className='h-[5%]'></div>
                            <p className="text-sm md:text-xl text-black text-center">{item.description}</p>
                        </div>
                    </div>
                ))
            }

            <div className='h-[10vh]'></div>
            <Footer />
        </div>
    );
}

export default Work;
