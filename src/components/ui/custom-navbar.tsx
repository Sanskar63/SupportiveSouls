'use client';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

function CustomNavbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/work", label: "Our Work" },
        { href: "/donate", label: "Donate" },
        { href: "/roles", label: "Volunteer" },
    ];

    return (
        <>
            {/* Desktop Navigation */}
            <motion.nav 
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled ? 'py-2' : 'py-4'
                }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <div className="container-custom">
                    <div className={`glass-effect rounded-2xl px-6 py-3 transition-all duration-300 ${
                        isScrolled ? 'shadow-medium' : 'shadow-soft'
                    }`}>
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <Link href="/" className="flex items-center space-x-2 group">
                                <div className="w-10 h-10 bg-purple-mid rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                    <span className="text-white font-bold text-lg">S</span>
                                </div>
                                <span className="text-xl font-bold text-gradient hidden sm:block">
                                    SupportiveSouls
                                </span>
                            </Link>

                            {/* Desktop Menu */}
                            <div className="hidden md:flex items-center space-x-8">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link 
                                            href={item.href} 
                                            className="nav-link text-neutral-700 hover:text-purple-mid font-medium transition-colors duration-200 relative group"
                                        >
                                            {item.label}
                                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-mid transition-all duration-300 group-hover:w-full"></span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors duration-200"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? (
                                    <X className="w-6 h-6 text-neutral-700" />
                                ) : (
                                    <Menu className="w-6 h-6 text-neutral-700" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Backdrop */}
                        <div 
                            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        
                        {/* Menu Content */}
                        <motion.div
                            className="absolute top-20 left-4 right-4 glass-effect rounded-2xl p-6"
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex flex-col space-y-4">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className="block py-3 px-4 text-neutral-700 hover:text-purple-mid hover:bg-white/20 rounded-lg transition-all duration-200 font-medium"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default CustomNavbar;
