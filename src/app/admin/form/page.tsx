"use client"
import Carousel from '@/components/ui/carousel'; // Ensure correct import path
import CustomNavbar from '@/components/ui/custom-navbar';
import AdminNav from '@/components/ui/custom-navbar Admin';
import Footer from '@/components/ui/footer';
import axios from 'axios';
import React, { useEffect, useState } from 'react';



interface ContentItem {
    _id: string;
    name: string;
    email: string;
    contact: number;
    role: string;
    hours: number;
    aadhar: number;
    about: string;
    __v?: number;
}

function Form() {
    const [content, setContent] = useState<ContentItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isAvail, setAvail] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/Form/get");
                if(response.data.length !=0) setAvail(true);
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
            const resp = await axios.post(`/api/Form/rm?id=${id}`);
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
            <AdminNav />
            <div className='h-[30vh]'></div>

        

            { isAvail? (
                content.map((item) => (
                    <div key={item._id} className='flex justify-center items-center bg-purple-light w-[80%] lg:w-[65%] h-[35vh] lg:h-[50vh] my-[3vh] rounded-2xl relative'>
                        <div className=' w-[80%] h-[70%] rounded-2xl flex flex-col items-center'>
                            <span className="text-sm md:text-xl lg:text-3xl text-black font-semibold underline">
                                {item.name}
                            </span>
                            <div className='h-[5%]'></div>
                            {/* <span className="text-sm md:text-xl text-black text-center">{item.role}</span> */}
                            <span className='text-gray-800 text-xs md:text-sm lg:text-xl'>Contact: {item.contact}</span>
                            <span className='text-gray-800 text-xs md:text-sm lg:text-xl'>Email: {item.email}</span>
                            <span className='text-gray-800 text-xs md:text-sm lg:text-xl'>Role: {item.role}</span>
                            <span className='text-gray-800 text-xs md:text-sm lg:text-xl'>Aadhar Number: {item.aadhar}</span>
                            <span className='text-gray-800 text-xs md:text-sm lg:text-xl'>Hours: {item.hours}</span>
                            <span className='text-gray-800 text-xs md:text-sm lg:text-xl'>About: {item.about}</span>
                        </div>

                        {loading ? (
                            <button className='h-9 lg:h-11 p-3 flex items-center justify-center bg-gray-800 absolute -top-2 -right-2 rounded-full cursor-wait' onClick={() => { removeWork(item._id) }} disabled> remove </button>
                        ) :
                            (
                                <button className='h-9 lg:h-11 p-3 flex items-center justify-center bg-black absolute -top-2 -right-2 rounded-full cursor-pointer' onClick={() => { removeWork(item._id) }}> remove </button>
                            )
                        }


                    </div>
                )) ) : (
                    <div>
                        <span className='text-black text-2xl'>No Forms Available</span>
                    </div>
                )
            }

            <div className='h-[10vh]'></div>
            <Footer />
        </div>
    );
}

export default Form;
