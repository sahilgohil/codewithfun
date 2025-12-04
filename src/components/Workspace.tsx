"use client";

import React, { useState, useEffect } from "react";
import CodeEditor from "./CodeEditor";
import OutputPanel from "./OutputPanel";
import SandpackPreviewClient from "./SandpackPreview";
import Auth from "./Auth";
import { Play, Code2, MonitorPlay, BookOpen, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { executeCode } from "@/lib/judge0";
import ReactMarkdown from "react-markdown";
import confetti from "canvas-confetti";

type Language = "javascript" | "react" | "python";

interface WorkspaceProps {
    initialCode?: string;
    language?: Language;
    instructions?: string;
    lessonTitle?: string;
}

const Workspace: React.FC<WorkspaceProps> = ({
    initialCode: propInitialCode,
    language: propLanguage,
    instructions,
    lessonTitle,
}) => {
    const [language, setLanguage] = useState<Language>(propLanguage || "javascript");
    const [code, setCode] = useState(propInitialCode || "// Write your JavaScript code here\nconsole.log('Hello, World!');");
    const [output, setOutput] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    // Update state when props change
    useEffect(() => {
        if (propLanguage) setLanguage(propLanguage);
        if (propInitialCode) setCode(propInitialCode);
        setOutput(null);
        setStatus("idle");
    }, [propLanguage, propInitialCode]);

    const runCode = async () => {
        if (language === "react") return;

        setIsLoading(true);
        setOutput(null);
        setStatus("idle");

        try {
            if (language === "javascript") {
                // Mock execution for JS
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

                // Simple success check logic (mock)
                // In a real app, we'd have test cases
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
        <div className="flex h-full w-full flex-col bg-black p-4 gap-4">
            {/* Header / Toolbar */}
            <div className="flex items-center justify-between rounded-xl border border-gray-800 bg-[#1e1e1e] px-6 py-3 shadow-lg">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-blue-400">
                        <Code2 size={24} />
                        <span className="font-bold text-lg">Practice Mode</span>
                    </div>
                    {lessonTitle && (
                        <span className="text-sm font-medium text-gray-400 border-l border-gray-700 pl-4">{lessonTitle}</span>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={runCode}
                        disabled={isLoading || language === "react"}
                        className={`flex items-center gap-2 rounded-lg px-6 py-2 text-sm font-bold text-white transition-all transform hover:scale-105 active:scale-95 shadow-md ${language === "react"
                                ? "bg-gray-700 opacity-50 cursor-not-allowed"
                                : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
                            }`}
                    >
                        {language === "react" ? (
                            <>
                                <MonitorPlay size={18} />
                                Live Preview
                            </>
                        ) : (
                            <>
                                <Play size={18} />
                                {isLoading ? "Running..." : "Run Code"}
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Main Workspace Grid */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">

                {/* Left Column: Instructions */}
                {instructions && (
                    <div className="flex flex-col gap-2 min-h-0 bg-[#111] rounded-xl border border-gray-800 overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-3 bg-[#1e1e1e] border-b border-gray-800">
                            <BookOpen size={18} className="text-blue-400" />
                            <h2 className="text-sm font-bold text-gray-200 uppercase tracking-wider">Practice Question</h2>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 text-gray-300 prose prose-invert prose-sm max-w-none leading-relaxed">
                            <ReactMarkdown>{instructions}</ReactMarkdown>
                        </div>
                    </div>
                )}

                {/* Right Column: Editor & Terminal */}
                <div className="flex flex-col gap-4 min-h-0">

                    {/* Editor Section */}
                    <div className="flex-1 flex flex-col min-h-0 bg-[#111] rounded-xl border border-gray-800 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 bg-[#1e1e1e] border-b border-gray-800">
                            <div className="flex items-center gap-2">
                                <Code2 size={18} className="text-yellow-400" />
                                <h2 className="text-sm font-bold text-gray-200 uppercase tracking-wider">Code Editor</h2>
                            </div>
                            <span className="text-xs font-mono text-gray-500 bg-black/50 px-2 py-1 rounded">
                                {language}
                            </span>
                        </div>
                        <div className="flex-1 relative">
                            <CodeEditor
                                initialValue={code}
                                language={language === "react" ? "javascript" : language}
                                onChange={(value) => setCode(value || "")}
                            />
                        </div>
                    </div>

                    {/* Terminal/Output Section */}
                    <div className="h-1/3 flex flex-col min-h-[200px] bg-[#111] rounded-xl border border-gray-800 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 bg-[#1e1e1e] border-b border-gray-800">
                            <h2 className="text-sm font-bold text-gray-200 uppercase tracking-wider">Terminal</h2>
                            {output && (
                                <button
                                    onClick={() => setOutput(null)}
                                    className="text-xs text-gray-500 hover:text-white flex items-center gap-1"
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
                    </div>
                </div>
            </div>

            {/* Feedback Banner */}
            {status !== "idle" && (
                <div className={`rounded-xl p-4 flex items-center gap-4 animate-in slide-in-from-bottom-4 fade-in duration-300 ${status === "success"
                        ? "bg-green-500/10 border border-green-500/20 text-green-400"
                        : "bg-red-500/10 border border-red-500/20 text-red-400"
                    }`}>
                    <div className={`p-2 rounded-full ${status === "success" ? "bg-green-500/20" : "bg-red-500/20"}`}>
                        {status === "success" ? <CheckCircle size={24} /> : <XCircle size={24} />}
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">
                            {status === "success" ? "Great Job! 🎉" : "Execution Failed"}
                        </h3>
                        <p className="text-sm opacity-90">
                            {status === "success"
                                ? "You've successfully run the code. Feel free to experiment more or move to the next lesson."
                                : "Check the error message in the terminal and try again. You got this!"}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Workspace;
