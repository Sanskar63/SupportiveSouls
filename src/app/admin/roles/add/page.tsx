"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import CustomNavbar from "@/components/ui/custom-navbar";
import Footer from "@/components/ui/footer";
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminNav from "@/components/ui/custom-navbar Admin";

export default function SignupFormDemo() {
    const [designation, setDesignation] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();
        console.log("Form submitted");

        try {
            const res = await axios.post("/api/Role/add", {
                designation,
                description
            });
            alert("Submitted");
            toast.success("Submitted");
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error("Could't Submit");
            console.error("Error submitting the Role-----------------------:", error);
        }
    };

    return (
        <div className="w-[100%]">
            <AdminNav />

            <div className="h-[20vh]"></div>

            <div className="w-[90vw] md:w-[60vw] lg:w-[40vw] mx-auto rounded-xl md:rounded-2xl p-4 md:p-8 shadow-input bg-purple-light">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    Welcome to SupportiveSouls
                </h2>
                <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Fill the fields to add a Role.
                </p>

                <form className="my-8" onSubmit={handleSubmit}>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="Designation">Designation</Label>
                        <Input id="Designation" placeholder="Designation" type="text" onChange={(e) => setDesignation(e.target.value)} />
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="desc">Description</Label>
                        <Input id="desc" placeholder="Tell something about Role" type="text" onChange={(e) => setDescription(e.target.value)} />
                    </LabelInputContainer>

                    {loading ? (
                        <button
                            className="bg-purple-900 relative group/btn block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] hover:cursor-wait"
                            type="submit"
                            disabled
                        >
                            Submit &rarr;
                            <BottomGradient />
                        </button>
                    ) : (
                        <button
                            className="bg-purple-mid relative group/btn block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] hover:cursor-pointer"
                            type="submit"
                        >
                            Submit &rarr;
                            <BottomGradient />
                        </button>
                    )}

                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                </form>
            </div>

            <div className="h-[10vh]"></div>

            <Footer />
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
