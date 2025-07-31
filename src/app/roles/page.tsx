"use client";
import React, { useEffect, useState } from "react";
import CustomNavbar from "@/components/ui/custom-navbar";
import RolesReader from "@/components/ui/role-reader";
import Footer from "@/components/ui/footer";
import { motion } from "framer-motion";
import { Users, Heart, Target, Calendar, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";

interface content {
  _id: string,
  description: string,
  designation: string,
  __v: number
}

const Roles: React.FC = () => {
  const [data, setData] = useState<content[]>([]);
  const [isAvail, setAvail] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/Role/get");
        setData(response.data);
        if (response.data.length !== 0) setAvail(true);
      } catch (error) {
        console.log("-----------------Error in fetchin roles---------------------------")
      }
    }

    fetchData();
  }, [])

  const volunteerBenefits = [
    "Make a real difference in communities",
    "Gain valuable experience and skills",
    "Join a passionate team of changemakers",
    "Flexible time commitment options"
  ];

  const volunteerStats = [
    { icon: Users, value: "50+", label: "Active Volunteers" },
    { icon: Heart, value: "1000+", label: "Lives Touched" },
    { icon: Target, value: "25+", label: "Projects Completed" }
  ];

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

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
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
          <motion.div 
            className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"
            variants={itemVariants}
          >
            <Users className="w-12 h-12 text-white" />
          </motion.div>
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            variants={itemVariants}
          >
            Volunteer to Make a Change
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Join our team of dedicated volunteers and help us create positive change in communities. Every volunteer makes a difference.
          </motion.p>
        </motion.div>
      </section>

      {/* Volunteer Stats */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {volunteerStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group"
                variants={itemVariants}
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

      {/* Roles Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient"
              variants={itemVariants}
            >
              Available Roles
            </motion.h2>

            {isAvail ? (
              <motion.div variants={itemVariants}>
                <RolesReader items={data} />
              </motion.div>
            ) : (
              <motion.div 
                className="text-center py-20"
                variants={itemVariants}
              >
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Star className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-neutral-800 mb-4">
                    No Roles Available
                  </h3>
                  <p className="text-lg text-neutral-600 mb-8">
                    We're currently updating our volunteer opportunities. Check back soon for new roles and positions.
                  </p>
                  <Button variant="primary">
                    Contact Us
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-secondary-50 to-secondary-100">
        <div className="container-custom">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-bold text-neutral-800 mb-6">
                Why Volunteer With Us?
              </h2>
              <div className="space-y-4">
                {volunteerBenefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-2 h-2 bg-purple-mid rounded-full"></div>
                    <span className="text-lg text-neutral-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="card p-8 bg-white"
              variants={itemVariants}
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-8 h-8 text-purple-mid" />
                  <h3 className="text-2xl font-bold text-neutral-800">Ready to Join?</h3>
                </div>
                <p className="text-neutral-600 leading-relaxed">
                  Take the first step towards making a difference. Join our volunteer team and help us create positive change in communities.
                </p>
                {isAvail && (
                  <Button 
                    size="lg" 
                    className="w-full"
                    asChild
                  >
                    <Link href="/form">
                      Join Us Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Roles;
