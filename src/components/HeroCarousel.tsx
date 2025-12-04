"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
    {
        id: 1,
        image: "/images/hero-platform.png",
        title: "Master the Art of Coding",
        description: "Interactive lessons, real-time feedback, and a community of developers.",
        color: "from-blue-600 to-purple-600",
    },
    {
        id: 2,
        image: "/images/hero-js.png",
        title: "Build Modern Web Apps",
        description: "Deep dive into JavaScript, React, and the modern web ecosystem.",
        color: "from-yellow-500 to-orange-600",
    },
    {
        id: 3,
        image: "/images/hero-python.png",
        title: "Data Science & AI",
        description: "Unlock the power of Python for data analysis and machine learning.",
        color: "from-green-500 to-teal-600",
    },
];

export default function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

    return (
        <div className="relative h-[600px] w-full overflow-hidden bg-black">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <Image
                        src={SLIDES[currentSlide].image}
                        alt={SLIDES[currentSlide].title}
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                        <div className="text-center max-w-4xl px-4">
                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg"
                            >
                                {SLIDES[currentSlide].title}
                            </motion.h1>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow-md"
                            >
                                {SLIDES[currentSlide].description}
                            </motion.p>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <button className={`px-8 py-4 rounded-full bg-gradient-to-r ${SLIDES[currentSlide].color} text-white font-bold text-lg hover:scale-105 transition-transform shadow-lg`}>
                                    Start Learning Now
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
            >
                <ChevronLeft size={32} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
            >
                <ChevronRight size={32} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                {SLIDES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white w-8" : "bg-white/50 hover:bg-white/80"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
