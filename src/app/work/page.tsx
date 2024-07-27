"use client"
import Carousel from '@/components/ui/carousel'; // Ensure correct import path
import CustomNavbar from '@/components/ui/custom-navbar';
import Footer from '@/components/ui/footer';
import React from 'react';

const content = [
    {
        _id: "669c0db374d955886f702438",
        description: "Hello World ---",
        images: [
            "https://media.istockphoto.com/id/583809524/photo/alberta-wilderness-near-banff.webp?b=1&s=170667a&w=0&k=20&c=Blnw8daEMo_-6yXT5ZDO-mWe37U1zlqEne7Ifg2OTd0=",
            "https://media.istockphoto.com/id/583809524/photo/alberta-wilderness-near-banff.webp?b=1&s=170667a&w=0&k=20&c=Blnw8daEMo_-6yXT5ZDO-mWe37U1zlqEne7Ifg2OTd0=",
            "https://media.istockphoto.com/id/583809524/photo/alberta-wilderness-near-banff.webp?b=1&s=170667a&w=0&k=20&c=Blnw8daEMo_-6yXT5ZDO-mWe37U1zlqEne7Ifg2OTd0=",
            "https://res.cloudinary.com/dt3o6uwwn/image/upload/v1721503154/aenccym4fwoltcwj9pyg.jpg"
        ],
        heading: "Hello ---",
        __v: 0
    },
    {
        _id: "669c0db374d955886f7438",
        description: "Hello World ---",
        images: [
            "https://media.istockphoto.com/id/583809524/photo/alberta-wilderness-near-banff.webp?b=1&s=170667a&w=0&k=20&c=Blnw8daEMo_-6yXT5ZDO-mWe37U1zlqEne7Ifg2OTd0=",
            "https://res.cloudinary.com/dt3o6uwwn/image/upload/v1721503154/aenccym4fwoltcwj9pyg.jpg"
        ],
        heading: "Hello ---",
        __v: 0
    },
    {
        _id: "669c0db374d955886f02438",
        description: "Hello World ---",
        images: [
            "https://res.cloudinary.com/dt3o6uwwn/image/upload/v1721503153/rpnyvjxyovewxo0m0e96.jpg",
            "https://res.cloudinary.com/dt3o6uwwn/image/upload/v1721503154/aenccym4fwoltcwj9pyg.jpg"
        ],
        heading: "Hello ---",
        __v: 0
    },
    {
        _id: "669c0db374d9558702438",
        description: "Hello World ---",
        images: [
            "https://media.istockphoto.com/id/1350993173/photo/winding-coast-road-in-corsica.webp?b=1&s=170667a&w=0&k=20&c=ysJU3NQUzj_GgVmwtCVvwa8XzzWPfnF3OSh3i4MxLIQ=",
            "https://res.cloudinary.com/dt3o6uwwn/image/upload/v1721503154/aenccym4fwoltcwj9pyg.jpg"
        ],
        heading: "Hello ---",
        __v: 0
    },

];

function Work() {
    return (
        <div className='w-[100%] flex flex-col items-center'>

            <CustomNavbar />
            <div className='h-[30vh]'></div>
            {
                content.map((item, idx) => (
                    <div key={item._id} className='flex justify-center items-center bg-purple-light w-[65%] h-[50vh] my-[3vh] rounded-2xl'>
                        <div className='bg-slate-600 w-[45%] h-[85%] rounded-2xl mr-[5%]'>
                            <Carousel data={item} />
                        </div>


                        <div className=' w-[45%] h-[70%] rounded-2xl flex flex-col items-center '>
                            <span className="text-sm md:text-xl lg:text-3xl text-black font-semibold underline">
                                {content[0].heading}
                            </span>
                            <div className='h-[5%]'></div>
                            <p className="text-sm md:text-xl text-black text-center">{content[0].description}</p>
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
