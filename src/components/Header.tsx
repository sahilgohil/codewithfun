"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Code2, ChevronDown, User, LogOut, Menu, X } from "lucide-react";
import { COURSES } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const { data: session } = useSession();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen
                ? "bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-12">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-green-600/10 rounded-lg group-hover:bg-green-600/20 transition-colors">
                            <Code2 className="text-green-600 w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold text-gray-900 tracking-tight">
                            CodePlatform
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {/* Topics Dropdown */}
                        <div
                            className="relative group"
                            onMouseEnter={() => setActiveDropdown("topics")}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900 font-medium transition-colors py-2">
                                Topics
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform duration-200 ${activeDropdown === "topics" ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            <AnimatePresence>
                                {activeDropdown === "topics" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 w-64 pt-2"
                                    >
                                        <div className="bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden p-2">
                                            {COURSES.map((course) => (
                                                <Link
                                                    key={course.id}
                                                    href={`/learn/${course.slug}`} // Assuming course page exists or linking to first lesson
                                                    className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                                                >
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {course.title}
                                                    </div>
                                                    <div className="text-xs text-gray-500 mt-0.5 truncate">
                                                        {course.description}
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link
                            href="/pricing"
                            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/about"
                            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                        >
                            About
                        </Link>
                    </nav>

                    {/* Auth Section */}
                    <div className="hidden md:flex items-center gap-4">
                        {session?.user ? (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                                    <div className="text-right hidden lg:block">
                                        <div className="text-sm font-medium text-gray-900">
                                            {session.user.name || "User"}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {session.user.email}
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold shadow-sm">
                                        {session.user.name?.[0]?.toUpperCase() ||
                                            session.user.email?.[0]?.toUpperCase()}
                                    </div>
                                    <button
                                        onClick={() => signOut()}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                        title="Sign Out"
                                    >
                                        <LogOut size={20} />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/login"
                                    className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/signup"
                                    className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                                >
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-600 hover:text-gray-900"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-200 overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-4">
                            <div className="space-y-2">
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                    Topics
                                </div>
                                {COURSES.map((course) => (
                                    <Link
                                        key={course.id}
                                        href={`/learn/${course.slug}`}
                                        className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {course.title}
                                    </Link>
                                ))}
                            </div>
                            <div className="border-t border-gray-200 pt-4 space-y-2">
                                {session?.user ? (
                                    <>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                                                {session.user.name?.[0]?.toUpperCase() || "U"}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {session.user.email}
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => signOut()}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                        >
                                            <LogOut size={18} />
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4">
                                        <Link
                                            href="/login"
                                            className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href="/signup"
                                            className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Sign up
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
