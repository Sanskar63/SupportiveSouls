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
    const [loading, setLoading] = useState<boolean>(false);

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

    const removeWork = async (id: string) => {
        setLoading(true);
        try {
            const resp = await axios.post(`/api/Work/rm?id=${id}`);
            alert("successfully removed");
            setContent(prevContent => prevContent.filter(item => item._id !== id));
            setLoading(false);
        } catch (error) {
            console.log("----------Error in Posting Id to remove--------------------", error)
        }
    }
    console.log("---------------", content);

    return (
        <div className='w-[100%] flex flex-col items-center'>
            <CustomNavbar />
            <div className='h-[30vh]'></div>

            {
                content.map((item) => (
                    <div key={item._id} className='flex justify-center items-center bg-purple-light w-[65%] h-[50vh] my-[3vh] rounded-2xl relative'>
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

                        {loading ? (
                            <button className='h-11 p-3 flex items-center justify-center bg-gray-800 absolute top-0 right-0 rounded-full cursor-wait' onClick={() => { removeWork(item._id) }} disabled> remove </button>
                        ) :
                            (
                                <button className='h-11 p-3 flex items-center justify-center bg-black absolute top-0 right-0 rounded-full cursor-pointer' onClick={() => { removeWork(item._id) }}> remove </button>
                            )
                        }


                    </div>
                ))
            }

            <div className='h-[10vh]'></div>
            <Footer />
        </div>
    );
}

export default Work;
