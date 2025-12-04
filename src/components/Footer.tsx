import React from "react";
import { Code2, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#0a0a0a] border-t border-gray-800 text-gray-400 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="p-1.5 bg-blue-600/20 rounded-lg">
                                <Code2 className="text-blue-500 w-5 h-5" />
                            </div>
                            <span className="text-lg font-bold text-white tracking-tight">
                                CodePlatform
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed">
                            Empowering the next generation of developers with interactive learning and real-world projects.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Platform</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/courses" className="hover:text-white transition-colors">Browse Courses</Link></li>
                            <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link href="/enterprise" className="hover:text-white transition-colors">Enterprise</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                            <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                            <li><Link href="/community" className="hover:text-white transition-colors">Community</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Connect</h3>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white transition-colors"><Github size={20} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p>&copy; {new Date().getFullYear()} CodePlatform. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
