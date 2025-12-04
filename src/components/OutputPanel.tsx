import React from "react";
import { Terminal, Play, RotateCcw } from "lucide-react";

interface OutputPanelProps {
    output: string | null;
    isLoading?: boolean;
    onRun?: () => void;
    onClear?: () => void;
}

const OutputPanel: React.FC<OutputPanelProps> = ({
    output,
    isLoading = false,
    onRun,
    onClear,
}) => {
    return (
        <div className="flex h-full flex-col bg-white text-gray-900">
            <div className="flex-1 overflow-auto p-4 font-mono text-sm bg-gray-50">
                {output ? (
                    <pre className="whitespace-pre-wrap text-gray-800">{output}</pre>
                ) : (
                    <div className="text-gray-500 italic">
                        Output will appear here...
                    </div>
                )}
            </div>
        </div>
    );
};

export default OutputPanel;
