"use client";
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import CustomNavbar from '@/components/ui/custom-navbar';
import Footer from '@/components/ui/footer';
import { motion } from "framer-motion";
import { Heart, Gift, Users, Target, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

function PaymentPage() {
    const [amt, setAmt] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [donorName, setName] = useState<string>("");
    const [donorEmail, setEmail] = useState<string>("");
    const [donorContact, setContact] = useState<number>();

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
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
                body: JSON.stringify({ amount, currency: 'INR' }),
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
                    contact: donorContact?.toString(),
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

    const impactStats = [
        { icon: Users, value: "1000+", label: "Lives Impacted" },
        { icon: Target, value: "50+", label: "Projects Completed" },
        { icon: Heart, value: "₹5L+", label: "Funds Raised" }
    ];

    const donationBenefits = [
        "Tax-deductible donations",
        "Transparent fund usage",
        "Regular impact reports",
        "Direct community support"
    ];

    return (
        <div className='w-full min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100'>
            <CustomNavbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-primary relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                </div>
                
                <motion.div 
                    className="container-custom relative z-10 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div 
                        className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                    >
                        <Heart className="w-12 h-12 text-white" />
                    </motion.div>
                    <motion.h1 
                        className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Make a Difference
                    </motion.h1>
                    <motion.p 
                        className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Your contribution matters to countless lives. Every rupee donated creates positive change in communities.
                    </motion.p>
                </motion.div>
            </section>

            {/* Impact Stats */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, staggerChildren: 0.1 }}
                    >
                        {impactStats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="text-center group"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                            >
                                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <stat.icon className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-neutral-800 mb-2">{stat.value}</div>
                                <div className="text-neutral-600">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Donation Form */}
            <section className="py-20">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Form */}
                        <motion.div 
                            className="card p-8 md:p-12"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-3xl font-bold text-neutral-800 mb-2">
                                        Donate Now
                                    </h2>
                                    <p className="text-neutral-600">
                                        Fill in your details to make a secure donation
                                    </p>
                                </div>

                                <form onSubmit={handlePayment} className="space-y-6">
                                    <LabelInputContainer>
                                        <Label htmlFor="Name">Full Name</Label>
                                        <Input 
                                            id="Name" 
                                            placeholder="Enter your full name" 
                                            type="text" 
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </LabelInputContainer>

                                    <LabelInputContainer>
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input 
                                            id="email" 
                                            placeholder="your.email@example.com" 
                                            type="email" 
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </LabelInputContainer>

                                    <LabelInputContainer>
                                        <Label htmlFor="contact">Contact Number</Label>
                                        <Input 
                                            id="contact" 
                                            placeholder="9876543210" 
                                            type="tel" 
                                            onChange={(e) => setContact(Number(e.target.value))}
                                            required
                                        />
                                    </LabelInputContainer>

                                    <LabelInputContainer>
                                        <Label htmlFor="amount">Donation Amount (₹)</Label>
                                        <Input
                                            id="amount"
                                            placeholder="Enter amount in rupees"
                                            type="number"
                                            value={amt}
                                            onChange={(e) => setAmt(e.target.value)}
                                            required
                                        />
                                    </LabelInputContainer>

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        size="lg"
                                        disabled={loading}
                                        loading={loading}
                                    >
                                        {loading ? "Processing..." : "Donate Now"}
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </form>
                            </div>
                        </motion.div>

                        {/* Benefits */}
                        <motion.div 
                            className="space-y-8"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <div>
                                <h3 className="text-2xl font-bold text-neutral-800 mb-6">
                                    Why Donate to SupportiveSouls?
                                </h3>
                                <div className="space-y-4">
                                    {donationBenefits.map((benefit, index) => (
                                        <motion.div
                                            key={benefit}
                                            className="flex items-center space-x-3"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.9 + index * 0.1 }}
                                        >
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            <span className="text-neutral-700">{benefit}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="card p-6 bg-gradient-primary text-white">
                                <div className="flex items-center space-x-3 mb-4">
                                    <Gift className="w-8 h-8" />
                                    <h4 className="text-xl font-semibold">Your Impact</h4>
                                </div>
                                <p className="text-white/90 leading-relaxed">
                                    Every donation directly supports our community initiatives, helping us create lasting positive change in the lives of those who need it most.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

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
