"use client";
import React, { useEffect, useState } from "react";
import CustomNavbar from "@/components/ui/custom-navbar";
import Footer from "@/components/ui/footer";
import axios from "axios";

interface content {
    _id: string,
    description: string,
    designation: string,
    __v: number
}

const Roles: React.FC = () => {
    const [data, setData] = useState<content[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/Role/get");
                setData(response.data);
            } catch (error) {
                console.log("-----------------Error in fetchin roles---------------------------")
            }
        }

        fetchData();
    }, [])

    const removeRole = async (id:string)=>{
        setLoading(true);
        try {
            const res = await axios.post(`/api/Role/rm?id=${id}`);
            alert("Removed");
            setLoading(false);
            setData(prevContent => prevContent.filter(item => item._id !== id));
        } catch (error) {
            console.log("-----------couldn't remove-------------" , error)
            setLoading(false);
        }
    }
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

            <div className="w-[65%]">
                {data.map((item, index) => (
                    <div key={index} className="text-black my-[5%] relative border-black border-2 rounded-2xl p-4">
                        {
                            loading?(
                                <button className="bg-gray-800 text-white font-bold w-9 h-9 absolute -top-2 -right-2 rounded-full cursor-wait" 
                                    disabled

                                >X</button>
                            ): (
                                <button className="bg-black text-white font-bold w-9 h-9 absolute -top-2 -right-2 rounded-full cursor-pointer"
                                onClick={()=>{removeRole(item._id)}} >X</button>
                            )
                        }
                        <h3 className="md:text-3xl font-bold mb-2">{item.designation}</h3>
                        <p className="text-sm md:text-xl">{item.description}</p>
                    </div>
                ))}
            </div>

            <div className="h-[5vh]"></div>

            <Footer />

        </div>
    );
};

export default Roles;
