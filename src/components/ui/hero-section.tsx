'use client'
import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, Globe, Star } from "lucide-react";

function Hero() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const stats = [
        { icon: Heart, value: "1000+", label: "Lives Touched" },
        { icon: Users, value: "50+", label: "Active Volunteers" },
        { icon: Globe, value: "10+", label: "Communities Served" },
        { icon: Star, value: "5+", label: "Years of Impact" }
    ];

    return (
        <div className="relative min-h-screen bg-gradient-primary overflow-hidden w-full">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-mid/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
            </div>

            <div className="relative z-10 container-custom section-padding w-full pt-24 md:pt-32">
                <motion.div 
                    className="flex flex-col items-center justify-center text-center min-h-[80vh]"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Main heading */}
                    <motion.h1 
                        className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white"
                        variants={itemVariants}
                    >
                        SupportiveSouls
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p 
                        className="text-xl md:text-2xl lg:text-3xl text-white mb-8 max-w-3xl leading-relaxed font-medium"
                        variants={itemVariants}
                    >
                        An initiative towards humanity, creating positive change through compassion and community action.
                    </motion.p>

                    {/* Description */}
                    <motion.p 
                        className="text-base md:text-lg text-white/90 mb-12 max-w-2xl leading-relaxed"
                        variants={itemVariants}
                    >
                        We believe in the power of collective action to transform lives. Join us in our mission to build a more compassionate and supportive world.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div 
                        className="flex flex-col sm:flex-row gap-4 mb-16"
                        variants={itemVariants}
                    >
                        <button className="btn btn-primary text-lg px-8 py-4">
                            Get Involved
                        </button>
                        <button className="btn btn-secondary text-lg px-8 py-4">
                            Learn More
                        </button>
                    </motion.div>

                    {/* Stats Section */}
                    <motion.div 
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl"
                        variants={itemVariants}
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="text-center group"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-4 group-hover:bg-white/30 transition-all duration-300">
                                    <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-purple-mid mx-auto mb-3" />
                                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm md:text-base text-white/90 font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div 
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
                </div>
            </motion.div>
        </div>
    );
}

export default Hero;