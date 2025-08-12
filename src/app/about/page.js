"use client";

import React from 'react';
import Navbarcomponent from '@/components/navbar/Navbar';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faCode, faServer, faDatabase, faCloud, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden pt-20 pb-16">
      <Navbarcomponent />
      <div className="absolute inset-0 bg-black"></div>
      
      <div className="relative z-20 max-w-5xl mx-auto px-4 md:px-8 space-y-12">
        {/* Header with Netflix-style back button */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300 mb-8">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            <span>Back to Home</span>
          </Link>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-2"
          >
            About ANINEST
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 48 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-[#ff9650] mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl"
          >
            Welcome to ANINEST, your premier destination for anime streaming. 
            We're dedicated to providing high-quality anime content with both subbed and dubbed options, 
            ensuring an exceptional viewing experience for all anime enthusiasts.
          </motion.p>
        </div>

        {/* The Creator Section - Netflix Style */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-medium text-white mb-6">
            The Creator
          </h2>

          <div className="bg-gray-900/80 rounded overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="md:w-1/3 relative overflow-hidden"
              >
                <img 
                  src="/chaste.jpg" 
                  alt="ANINEST Creator" 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 md:opacity-0"></div>
              </motion.div>
              
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="text-lg text-gray-300 leading-relaxed mb-8"
                >
                  "A passionate developer who created this platform to share the love of anime with the world. 
                  Driven by a dedication to quality and user experience, we continue to expand our collection 
                  and enhance our services for anime fans everywhere."
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="flex gap-6"
                >
                  {[
                    { icon: faGithub, url: "https://github.com/chaste-djaziri", label: "GitHub" },
                    { icon: faInstagram, url: "https://www.instagram.com/chaste_djaziri", label: "Instagram" }
                  ].map((item, index) => (
                    <a 
                      key={index}
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 text-gray-400 hover:text-[#ff9650] transition-colors duration-300"
                    >
                      <FontAwesomeIcon icon={item.icon} />
                      <span>{item.label}</span>
                    </a>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Technologies Section - Netflix Style */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-medium text-white mb-6">
            Technologies
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { 
                icon: faCode, 
                title: "Frontend Development", 
                description: "Next.js, React, TailwindCSS, and custom animations to create an immersive experience."
              },
              { 
                icon: faServer, 
                title: "Backend Services", 
                description: "Node.js, Next.js API routes, and various APIs to power the platform's capabilities."
              },
              { 
                icon: faDatabase, 
                title: "Data Management", 
                description: "MongoDB and efficient data storage systems for seamless content delivery."
              },
              { 
                icon: faCloud, 
                title: "Cloud Infrastructure", 
                description: "Robust cloud services and CDN integration for optimal performance."
              }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                className="bg-gray-900/80 p-5 rounded hover:bg-gray-800/90 transition-colors duration-300 group"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-[#ff9650]">
                    <FontAwesomeIcon icon={tech.icon} className="text-xl" />
                  </div>
                  <h3 className="text-lg font-medium text-white">
                    {tech.title}
                  </h3>
                </div>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Netflix-style FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.0 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-medium text-white mb-6">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {[
              { 
                question: "Is ANINEST free to use?", 
                answer: "Yes, ANINEST is completely free to use. We offer premium subscriptions with additional features, but our core content is available to all users."
              },
              { 
                question: "How often is new content added?", 
                answer: "We update our library regularly with new releases and classics. New episodes of seasonal anime are typically added within 24 hours of their original broadcast."
              },
              // { 
              //   question: "Can I download anime for offline viewing?", 
              //   answer: "Premium subscribers can download select titles for offline viewing on our mobile applications."
              // }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.2 + index * 0.1 }}
                className="bg-gray-900/80 rounded overflow-hidden"
              >
                <div className="p-5 border-b border-gray-800">
                  <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                </div>
                <div className="p-5">
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
