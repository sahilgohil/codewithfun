import React from "react";
import { COURSES } from "@/data/mockData";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import LessonView from "@/components/LessonView";

interface LessonPageProps {
    params: Promise<{
        courseId: string;
        lessonId: string;
    }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
    const { courseId, lessonId } = await params;

    const course = COURSES.find((c) => c.slug === courseId);
    if (!course) notFound();

    let lesson = null;
    let currentModuleId = "";

    for (const module of course.modules) {
        const foundLesson = module.lessons.find((l) => l.slug === lessonId);
        if (foundLesson) {
            lesson = foundLesson;
            currentModuleId = module.id;
            break;
        }
    }

    if (!lesson) notFound();

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 pt-12">
                <LessonView
                    course={course}
                    lesson={lesson}
                    currentModuleId={currentModuleId}
                />
            </div>
        </div>
    );
}
