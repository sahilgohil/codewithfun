"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    ChevronDown,
    ChevronRight,
    PlayCircle,
    Menu,
    X,
    ArrowLeft,
    Play,
    RotateCcw,
    Code2
} from "lucide-react";
import { Course, Lesson } from "@/data/mockData";
import CodeEditor from "./CodeEditor";
import OutputPanel from "./OutputPanel";
import SandpackPreviewClient from "./SandpackPreview";
import { executeCode } from "@/lib/judge0";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ReactMarkdown from "react-markdown";
import confetti from "canvas-confetti";

interface LessonViewProps {
    course: Course;
    lesson: Lesson;
    currentModuleId: string;
}

type Language = "javascript" | "react" | "python";

export default function LessonView({ course, lesson, currentModuleId }: LessonViewProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [expandedModuleId, setExpandedModuleId] = useState<string | null>(currentModuleId);
    const [activeTab, setActiveTab] = useState<"description" | "submissions">("description");

    // Code execution state
    const [language, setLanguage] = useState<Language>(lesson.language || "javascript");
    const [code, setCode] = useState(lesson.initialCode || "console.log('Hello, World!');");
    const [output, setOutput] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleModule = (moduleId: string) => {
        setExpandedModuleId(expandedModuleId === moduleId ? null : moduleId);
    };

    const runCode = async () => {
        if (language === "react") return;

        setIsLoading(true);
        setOutput(null);
        setStatus("idle");

        try {
            if (language === "javascript") {
                await new Promise((resolve) => setTimeout(resolve, 500));

                const logs: string[] = [];
                const originalLog = console.log;
                console.log = (...args) => {
                    logs.push(args.map(arg => String(arg)).join(" "));
                    originalLog(...args);
                };

                // eslint-disable-next-line no-new-func
                new Function(code)();

                console.log = originalLog;
                const result = logs.length > 0 ? logs.join("\n") : "Code executed successfully (no output).";
                setOutput(result);
                setStatus("success");
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });

            } else if (language === "python") {
                const result = await executeCode("python", code);
                if (result.stderr) {
                    setOutput(`Error: ${result.stderr}`);
                    setStatus("error");
                } else {
                    setOutput(result.stdout || "No output");
                    setStatus("success");
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                }
            }
        } catch (error: any) {
            setOutput(`Error: ${error.message}`);
            setStatus("error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex h-[calc(100vh-48px)] bg-[#F5F5F5] text-gray-900 overflow-hidden">
            {/* Sidebar - Table of Contents */}
            <aside
                className={`${isSidebarOpen ? "w-64" : "w-0"
                    } bg-white border-r border-gray-300 transition-all duration-300 flex flex-col relative overflow-hidden shadow-sm`}
            >
                <div className="p-3 border-b border-gray-300 flex items-center justify-between shrink-0">
                    <Link href={`/learn/${course.slug}`} className="text-gray-600 hover:text-gray-900 transition-colors">
                        <ArrowLeft size={18} />
                    </Link>
                    <h2 className="font-semibold text-sm text-gray-700">{course.title}</h2>
                    <button onClick={toggleSidebar} className="p-1 hover:bg-gray-100 rounded">
                        <X size={16} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                    {course.modules.map((module) => (
                        <div key={module.id} className="space-y-1">
                            <button
                                onClick={() => toggleModule(module.id)}
                                className="w-full flex items-center justify-between text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <span>{module.title}</span>
                                {expandedModuleId === module.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </button>

                            {expandedModuleId === module.id && (
                                <div className="pl-2 space-y-1">
                                    {module.lessons.map((l) => (
                                        <Link
                                            key={l.id}
                                            href={`/learn/${course.slug}/${l.slug}`}
                                            className={`block px-2 py-1.5 rounded text-xs transition-colors ${l.id === lesson.id
                                                ? "bg-green-50 text-green-700 border border-green-200 font-medium"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                {l.id === lesson.id ? <PlayCircle size={12} /> : <div className="w-3 h-3 rounded-full border border-gray-400" />}
                                                {l.title}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </aside>



            {/* Main Panel Group */}
            <PanelGroup direction="horizontal" className="flex-1">
                {/* Left Panel - Description */}
                <Panel defaultSize={35} minSize={20} className="flex flex-col bg-white">
                    <div className="border-b border-gray-300 bg-white shadow-sm">
                        <div className="flex items-center px-4 h-10">
                            {!isSidebarOpen && (
                                <button
                                    onClick={toggleSidebar}
                                    className="mr-3 p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                                    title="Open Sidebar"
                                >
                                    <Menu size={18} />
                                </button>
                            )}
                            <button
                                onClick={() => setActiveTab("description")}
                                className={`text-sm font-medium transition-colors pb-2 border-b-2 ${activeTab === "description"
                                    ? "text-gray-900 border-green-600"
                                    : "text-gray-500 border-transparent hover:text-gray-700"
                                    }`}
                            >
                                Description
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-6">
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
                        </div>

                        {/* Why Learn */}
                        {lesson.whyLearn && (
                            <section className="space-y-2">
                                <h3 className="text-sm font-semibold text-green-700">Why should I learn this?</h3>
                                <div className="text-sm text-gray-700 leading-relaxed">
                                    {lesson.whyLearn}
                                </div>
                            </section>
                        )}

                        {/* How it Works */}
                        {lesson.howItWorks && (
                            <section className="space-y-2">
                                <h3 className="text-sm font-semibold text-gray-900">How this works intuitively</h3>
                                <div className="text-sm text-gray-700 leading-relaxed">
                                    {lesson.howItWorks}
                                </div>
                            </section>
                        )}

                        {/* Sample Code */}
                        {lesson.sampleCode && (
                            <section className="space-y-2">
                                <h3 className="text-sm font-semibold text-gray-900">Sample Code</h3>
                                <div className="bg-gray-50 border border-gray-300 rounded p-3 font-mono text-xs overflow-x-auto">
                                    <pre className="text-gray-800">{lesson.sampleCode}</pre>
                                </div>
                                {lesson.codeExplanation && (
                                    <div className="text-xs text-gray-600 leading-relaxed prose prose-sm max-w-none">
                                        <ReactMarkdown>{lesson.codeExplanation}</ReactMarkdown>
                                    </div>
                                )}
                            </section>
                        )}
                    </div>
                </Panel>

                <PanelResizeHandle className="w-1 bg-gray-300 hover:bg-green-500 transition-colors" />

                {/* Right Panel Group - Code & Terminal */}
                <Panel defaultSize={65} className="flex flex-col">
                    <PanelGroup direction="vertical">
                        {/* Code Editor Panel */}
                        <Panel defaultSize={60} minSize={30} className="flex flex-col bg-white">
                            <div className="border-b border-gray-300 bg-white flex items-center justify-between px-4 h-10 shrink-0 shadow-sm">
                                <div className="flex items-center gap-2">
                                    <Code2 size={16} className="text-gray-600" />
                                    <span className="text-sm font-medium text-gray-700">Code</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded border border-gray-300">
                                        {language}
                                    </span>
                                    <button
                                        onClick={runCode}
                                        disabled={isLoading || language === "react"}
                                        className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-semibold text-white transition-all ${language === "react"
                                            ? "bg-gray-400 opacity-50 cursor-not-allowed"
                                            : "bg-green-600 hover:bg-green-700"
                                            }`}
                                    >
                                        <Play size={14} />
                                        {isLoading ? "Running..." : "Run"}
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <CodeEditor
                                    initialValue={code}
                                    language={language === "react" ? "javascript" : language}
                                    onChange={(value) => setCode(value || "")}
                                />
                            </div>
                        </Panel>

                        <PanelResizeHandle className="h-1 bg-gray-300 hover:bg-green-500 transition-colors" />

                        {/* Terminal/Output Panel */}
                        <Panel defaultSize={40} minSize={20} className="flex flex-col bg-white">
                            <div className="border-b border-gray-300 bg-white flex items-center justify-between px-4 h-10 shrink-0 shadow-sm">
                                <span className="text-sm font-medium text-gray-700">Terminal</span>
                                {output && (
                                    <button
                                        onClick={() => setOutput(null)}
                                        className="text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1"
                                    >
                                        <RotateCcw size={12} /> Clear
                                    </button>
                                )}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                {language === "react" ? (
                                    <SandpackPreviewClient code={code} />
                                ) : (
                                    <OutputPanel
                                        output={output}
                                        isLoading={isLoading}
                                        onRun={runCode}
                                        onClear={() => setOutput(null)}
                                    />
                                )}
                            </div>
                        </Panel>
                    </PanelGroup>
                </Panel>
            </PanelGroup>
        </div>
    );
}
