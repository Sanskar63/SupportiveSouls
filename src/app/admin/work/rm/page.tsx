"use client"
import Carousel from '@/components/ui/carousel'; // Ensure correct import path
import CustomNavbar from '@/components/ui/custom-navbar';
import AdminNav from '@/components/ui/custom-navbar Admin';
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
    const [isAvail, setAvail] = useState<boolean>(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/Work/get");
                setContent(response.data);
                if (response.data.length !== 0) setAvail(true);
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
        <>
            <div className='w-[100%] flex flex-col items-center'>
                <AdminNav />
                <div className='h-[15vh] lg:h-[25vh]'></div>

                {
                    isAvail ? (
                        content.map((item) => (
                            <div key={item._id} className='flex flex-col md:flex-row justify-center items-center bg-purple-light w-[90%] md:w-[65%] h-[75vh] md:h-[50vh] my-[3vh] rounded-2xl relative'>
                                <div className='bg-purple-mid w-[80%] md:w-[45%] h-[50%] md:h-[85%] rounded-2xl my-[5%] md:my-[0%] md:mr-[5%]'>
                                    <Carousel data={item} />
                                </div>

                                <div className='w-[95%] md:w-[45%] h-[40%] md:h-[85%] rounded-2xl flex flex-col items-center justify-center'>
                                    <span className="text-xl md:text-2xl lg:text-3xl text-black font-semibold underline underline-offset-4">
                                        {item.heading}
                                    </span>
                                    <div className='h-[5%]'></div>
                                    <p className="text-sm lg:xl text-black text-center">{item.description}</p>
                                </div>

                                {loading ? (
                                    <button className='h-11 p-3 flex items-center justify-center bg-gray-800 absolute -top-2 -right-2 rounded-full cursor-wait' onClick={() => { removeWork(item._id) }} disabled> removing </button>
                                ) :
                                    (
                                        <button className='h-11 p-3 flex items-center justify-center bg-black absolute -top-2 -right-2 rounded-full cursor-pointer' onClick={() => { removeWork(item._id) }}> remove </button>
                                    )
                                }


                            </div>
                        ))
                    ) :
                        (
                            <p className="text-xl md:text-2xl lg:text-3xl text-black font-semibold w-[50%] lg:w-[35%] text-center">No Work Available</p>
                        )
                }

                <div className='h-[10vh]'></div>
                <Footer />
            </div>

        </>
    );
}

export default Work;
