"use client"
import Carousel from '@/components/ui/carousel';
import CustomNavbar from '@/components/ui/custom-navbar';
import Footer from '@/components/ui/footer';
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Users, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    const [isAvail, setAvail] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

    // Cleanup effect to restore body scroll when component unmounts
    useEffect(() => {
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Handle escape key to close modal
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isModalOpen) {
                closeModal();
            }
        };

        if (isModalOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isModalOpen]);

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
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        exit: { 
            opacity: 0, 
            scale: 0.8,
            transition: {
                duration: 0.2
            }
        }
    };

    const handleLearnMore = (item: ContentItem) => {
        setSelectedItem(item);
        setIsModalOpen(true);
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
        // Restore body scroll when modal is closed
        document.body.style.overflow = 'unset';
    };

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
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1 
                        className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
                        variants={itemVariants}
                    >
                        Our Work
                    </motion.h1>
                    <motion.p 
                        className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
                        variants={itemVariants}
                    >
                        Discover the impact we&apos;re making in communities through our various initiatives and projects.
                    </motion.p>
                </motion.div>
            </section>

            {/* Work Content */}
            <section className="py-20">
                <div className="container-custom">
                    {isAvail ? (
                        <motion.div 
                            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {content.map((item, index) => (
                                <motion.div 
                                    key={item._id} 
                                    className="card card-hover h-[600px] flex flex-col"
                                    variants={itemVariants}
                                    whileHover={{ y: -5 }}
                                >
                                    {/* Image Carousel */}
                                    <div className="relative h-64 overflow-hidden rounded-t-2xl">
                                        <div className="bg-gradient-primary h-full">
                                            <Carousel data={item} />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 p-6 flex flex-col">
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-bold text-neutral-800 mb-3 line-clamp-2">
                                                {item.heading}
                                            </h2>
                                            <div className="flex items-center space-x-4 text-sm text-neutral-600 mb-4">
                                                <div className="flex items-center space-x-2">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>Recent Project</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>Local Community</span>
                                                </div>
                                            </div>
                                            
                                            <p className="text-neutral-700 leading-relaxed line-clamp-3 mb-4">
                                                {item.description}
                                            </p>
                                        </div>
                                        
                                        <div className="flex items-center space-x-3 pt-4 border-t border-neutral-100">
                                            <Button 
                                                variant="primary" 
                                                size="sm"
                                                onClick={() => handleLearnMore(item)}
                                                className="flex-1"
                                            >
                                                Learn More
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                            {/* <Button 
                                                variant="outline" 
                                                size="sm"
                                                className="flex-1"
                                            >
                                                View Gallery
                                                <ExternalLink className="w-4 h-4 ml-2" />
                                            </Button> */}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div 
                            className="text-center py-20"
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="max-w-md mx-auto">
                                <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Users className="w-12 h-12 text-white" />
                                </div>
                                <h2 className="text-3xl font-bold text-neutral-800 mb-4">
                                    No Work Available
                                </h2>
                                <p className="text-lg text-neutral-600 mb-8">
                                    We&apos;re currently updating our work portfolio. Check back soon for our latest projects and initiatives.
                                </p>
                                <Button variant="primary">
                                    Get Involved
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Modal for Full Content */}
            <AnimatePresence>
                {isModalOpen && selectedItem && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                    >
                        <motion.div
                            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                                <h2 className="text-2xl font-bold text-neutral-800">
                                    {selectedItem.heading}
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                                >
                                    <X className="w-6 h-6 text-neutral-600" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Image Carousel */}
                                    <div className="relative h-80 overflow-hidden rounded-2xl">
                                        <div className="bg-gradient-primary h-full">
                                            <Carousel data={selectedItem} />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-6 text-sm text-neutral-600">
                                                <div className="flex items-center space-x-2">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>Recent Project</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>Local Community</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Users className="w-4 h-4" />
                                                    <span>Team Effort</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <h3 className="text-xl font-semibold text-neutral-800">Project Overview</h3>
                                            <p className="text-neutral-700 leading-relaxed text-lg">
                                                {selectedItem.description}
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="text-xl font-semibold text-neutral-800">Impact & Results</h3>
                                            <p className="text-neutral-700 leading-relaxed">
                                                This project has made a significant impact on the local community, 
                                                providing essential support and resources to those in need. 
                                                Through collaborative efforts and dedicated volunteers, 
                                                we&apos;ve been able to create lasting positive change.
                                            </p>
                                        </div>

                                        {/* <div className="flex items-center space-x-4 pt-4">
                                            <Button variant="primary">
                                                Get Involved
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                            <Button variant="outline">
                                                Share Project
                                            </Button>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
}

export default Work;
