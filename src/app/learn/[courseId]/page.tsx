"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, PlayCircle, CheckCircle } from "lucide-react";
import { COURSES } from "@/data/mockData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CoursePage() {
    const params = useParams();
    const courseId = params.courseId as string;

    const course = COURSES.find((c) => c.slug === courseId);

    if (!course) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-white text-gray-900 selection:bg-green-500/30">
            <Header />

            <main className="pt-20 pb-20">
                {/* Course Header */}
                <div className="bg-gray-50 border-b border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <Link
                            href="/"
                            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                        >
                            <ArrowLeft size={20} className="mr-2" />
                            Back to Courses
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900">
                            {course.title}
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl">
                            {course.description}
                        </p>
                    </div>
                </div>

                {/* Course Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid gap-8">
                        {course.modules.map((module, moduleIndex) => (
                            <div
                                key={module.id}
                                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
                            >
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Module {moduleIndex + 1}: {module.title}
                                    </h2>
                                    <span className="text-sm text-gray-500">
                                        {module.lessons.length} Lessons
                                    </span>
                                </div>

                                <div className="divide-y divide-gray-100">
                                    {module.lessons.map((lesson, lessonIndex) => (
                                        <Link
                                            key={lesson.id}
                                            href={`/learn/${course.slug}/${lesson.slug}`}
                                            className="group flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                                                    <PlayCircle
                                                        size={20}
                                                        className="text-green-600 group-hover:scale-110 transition-transform"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="text-base font-medium text-gray-900 group-hover:text-green-700 transition-colors">
                                                        {lesson.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Lesson {moduleIndex + 1}.{lessonIndex + 1}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center text-sm font-medium text-gray-400 group-hover:text-green-600 transition-colors">
                                                Start Lesson
                                                <ArrowLeft size={16} className="ml-2 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
