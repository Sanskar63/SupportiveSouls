'use client';
import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { LayoutGrid } from "@/components/ui/layout-grid";
import Hero from "@/components/ui/hero-section";
import CustomNavbar from "@/components/ui/custom-navbar";
import Footer from "@/components/ui/footer";
import Link from "next/link";
import { InfiniteUpcoming } from "@/components/ui/infinite-Upcoming_Events";
import axios from "axios";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, BookOpen, Leaf, PawPrint, ArrowRight, Users, Target, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionDivider from "@/components/ui/section-divider";

interface content {
  _id: string;
  description: string;
  heading: string;
  date: string;
  banner: {
    url: string;
    public_id: string;
    _id: string;
  }[]
};

export default function NavbarDemo() {
  const [Upcoming, setUpcoming] = useState<content[]>([]);

  useEffect(() => {
    FetchEvents();
  }, []);

  const FetchEvents = async () => {
    try {
      const res = await axios.get("/api/Events/get");
      setUpcoming(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("Error---------------------------", error)
    }
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const goals = [
    { icon: Heart, title: "Health", description: "Promoting healthcare access and wellness" },
    { icon: BookOpen, title: "Education", description: "Empowering through knowledge and learning" },
    { icon: Leaf, title: "Environment", description: "Protecting and preserving our planet" },
    { icon: PawPrint, title: "Animal", description: "Caring for our furry friends" }
  ];

  const impactStats = [
    { number: "40+", label: "Students benefiting from offline classes", icon: Users },
    { number: "100+", label: "Plants have been planted", icon: Leaf },
    { number: "10+", label: "Animals have been rescued and treated", icon: PawPrint }
  ];

  return (
    <div className="relative w-full flex flex-col justify-center items-center">
      <CustomNavbar />
      <Hero />

      {/* Quotes Section */}
      <section className="w-full py-16 bg-gradient-to-br from-secondary-50 to-secondary-100">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <InfiniteMovingCards items={Quotes} direction="left" speed="slow" />
        </motion.div>
      </section>

      <SectionDivider variant="decorative" />

      {/* Moments Section */}
      <section className="w-full py-20 bg-white">
        <motion.div
          className="container-custom"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 text-gradient"
            variants={itemVariants}
          >
            Our Moments
          </motion.h2>
          <motion.div 
            className="h-screen w-full"
            variants={itemVariants}
          >
            <LayoutGrid cards={cards} />
          </motion.div>
        </motion.div>
      </section>

      <SectionDivider variant="gradient" />

      {/* Goals Section */}
      <section className="w-full py-20 bg-gradient-to-br from-secondary-50 to-secondary-100">
        <motion.div
          className="container-custom"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 text-gradient"
            variants={itemVariants}
          >
            Our Goals
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={itemVariants}
          >
            {goals.map((goal, index) => (
              <motion.div
                key={goal.title}
                className="card card-hover p-8 text-center group"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <goal.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-neutral-800">{goal.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{goal.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <SectionDivider variant="decorative" />

      {/* Impact Section */}
      <section className="w-full py-20 bg-white">
        <motion.div
          className="container-custom"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 text-gradient"
            variants={itemVariants}
          >
            Our Impact
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={itemVariants}
          >
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="card card-hover p-8 text-center group"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-mid mb-4">
                  {stat.number}
                </div>
                <p className="text-neutral-600 leading-relaxed text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <SectionDivider variant="simple" />

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-br from-purple-mid via-primary-600 to-primary-700 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <motion.div
          className="container-custom relative z-10"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
              Contribute to make good change.
            </h2>
            <p className="text-xl text-white/90 mb-12 leading-relaxed">
              Every action counts. Join us in creating a better world through compassion and community action.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                variant="accent" 
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                asChild
              >
                <Link href="/donate">
                  Donate Now
                </Link>
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                icon={<Users className="w-5 h-5" />}
                asChild
              >
                <Link href="/roles">
                  Join Us
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}




// const Upcoming = [
//   {
//     "_id": "669e2321a1be76ad23bac61e",
//     "banner": [
//         {
//             "url": "https://res.cloudinary.com/dt3o6uwwn/image/upload/v1721639713/pixyv7bikylshowzu9fo.jpg",
//             "public_id": "pixyv7bikylshowzu9fo",
//             "_id": "669e2321a1be76ad23bac61f"
//         }
//     ],
//     "description": "Donation of water cooler to near orphanage.",
//     "date": "2024-07-29T00:00:00.000Z",
//     "heading": "Water Cooler Donation",
//     "createdAt": "2024-07-22T09:15:13.519Z",
//     "updatedAt": "2024-07-22T09:15:13.519Z",
//     "__v": 0
//   },
//   {
//     "_id": "669e2321a1be76ad23bac61e",
//     "banner": [
//         {
//             "url": "https://res.cloudinary.com/dt3o6uwwn/image/upload/v1721639713/pixyv7bikylshowzu9fo.jpg",
//             "public_id": "pixyv7bikylshowzu9fo",
//             "_id": "669e2321a1be76ad23bac61f"
//         }
//     ],
//     "description": "Donation of water cooler to near orphanage.",
//     "date": "2024-07-29T00:00:00.000Z",
//     "heading": "Water Cooler Donation",
//     "createdAt": "2024-07-22T09:15:13.519Z",
//     "updatedAt": "2024-07-22T09:15:13.519Z",
//     "__v": 0
//   }
// ]

const Quotes = [
  {
    quote:
      "If you want to devote for a good cause, don't wait for others to start first.",
    name: "Sanskriti Gupta",
    title: "Founder",
  },
  // {
  //   quote:
  //     "Don't hesitate to do the right thing.",
  //   name: "",
  //   title: "Co-Founder",
  // },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Simran Maurya",
    title: "Core Member",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Astha Srivastava",
    title: "Core Member",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Daisy Chauhan",
    title: "Core Member",
  },

];

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">Cooler Donation</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Due to the recent heat waves the temperature has risen above 45 deg Celsius. The heat has become unbearable. Thus SupportiveSouls Society has donated 2 big sized coolers to Cawnpore Hindu Orphanage.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">Book Donation</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Our NGO recently organized a book donation drive, providing essential educational resources to students in need. This initiative aims to promote literacy and support academic success, thanks to the generous contributions of our donors and volunteers.
      </p>
    </div>
  );
};

const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">Planting and Ploughing</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Our NGO recently conducted a plantation and ploughing initiative, focusing on environmental sustainability and agricultural support. By planting trees and preparing land for cultivation, we aim to enhance ecological balance and support local farmers in their agricultural efforts.
      </p>
    </div>
  );
};

const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">Teaching</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        SupportiveSouls society provides regular educational sessions for students, aiming to enhance their knowledge and skills. Our dedicated team ensures consistent learning opportunities, fostering academic growth and personal development in a supportive environment.
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail: "/cooler.jpeg",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "/book.jpeg",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "/planting.jpeg",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "/teach.jpeg",
  },
];
