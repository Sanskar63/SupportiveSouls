"use client";
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import CustomNavbar from '@/components/ui/custom-navbar';
import Footer from '@/components/ui/footer';

function PaymentPage() {
    const [amt, setAmt] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [donorName, setName] = useState<string>("");
    const [donorEmail, setEmail] = useState<string>("");
    const [donorContact, setContact] = useState<number>();

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();  // Prevent default form submission
        setLoading(true);
        try {
            // Convert the input amount to a number
            const amount = parseFloat(amt);
            if (isNaN(amount) || amount <= 0) {
                console.error("Invalid amount");
                setLoading(false);
                return;
            }

            const res = await fetch('/api/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount, currency: 'INR' }), // Use state amount
            });

            if (!res.ok) {
                console.error(`Error: ${res.status} - ${res.statusText}`);
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            console.log("------------------------------DATA----------------------------", data)
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
                amount: data.amount,
                currency: data.currency,
                name: 'SupportiveSouls',
                description: 'Test Transaction',
                order_id: data.id,
                callback_url: "/api/payments/verification",
                prefill: {
                    name: donorName,
                    email: donorEmail,
                    contact: donorContact?.toString(), // Ensure contact is a string
                },
                notes: {
                    address: 'SupportiveSouls Corporate Office',
                },
                theme: {
                    color: '#7F50A4',
                },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col w-[100%] items-center justify-center'>
            <CustomNavbar />

            <div className='h-[15vh]'></div>

            <div className=" w-[90%] md:w-[60%] lg:w-[35%] mx-auto rounded-2xl py-6 px-4 lg:p-6 md:p-8 shadow-input bg-purple-light dark:bg-purple-mid flex flex-col gap-2 md:gap-4">
                <h2 className="font-bold text-xl md:text-2xl text-neutral-800 dark:text-neutral-200">
                    Welcome to SupportiveSouls
                </h2>
                <p className="text-neutral-600 text-sm max-w-sm dark:text-neutral-300">
                    Your contribution matters to a lot of lives out there. Every rupee donated will be used for good.
                </p>

                <form className="my-4 lg:my-8" onSubmit={handlePayment}>

                    <LabelInputContainer className=" mb-2 md:mb-4">
                        <Label htmlFor="Name">Name</Label>
                        <Input id="Name" placeholder="Name" type="text" onChange={(e) => setName(e.target.value)} />
                    </LabelInputContainer>

                    <LabelInputContainer className=" mb-2 md:mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" placeholder="abcd@gmail.com" type="email" onChange={(e) => setEmail(e.target.value)} />
                    </LabelInputContainer>
                    <LabelInputContainer className=" mb-2 md:mb-4">
                        <Label htmlFor="contact">Contact</Label>
                        <Input id="contact" placeholder="9876543210" type="number" onChange={(e) => setContact(Number(e.target.value))} />
                    </LabelInputContainer>
                    <LabelInputContainer className=" mb-6 md:mb-8">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            id="amount"
                            placeholder="Enter Amount "
                            type="text"
                            value={amt}
                            onChange={(e) => setAmt(e.target.value)}
                        />
                    </LabelInputContainer>

                    {loading ? (
                        <button
                            className="bg-purple-900 relative group/btn block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] hover:cursor-wait"
                            type="submit"
                            disabled
                        >
                            Donate &rarr;
                        </button>
                    ) : (
                        <button
                            className="bg-purple-mid relative group/btn block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] hover:cursor-pointer"
                            type="submit"
                        >
                            Donate &rarr;
                        </button>
                    )}

                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-2 md:my-6 h-[1px] w-full" />
                </form>
            </div>

            <div className='h-[10vh]'></div>

            <Footer />
        </div>
    );
}

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

export default PaymentPage;
