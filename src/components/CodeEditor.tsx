"use client";

import React from "react";
import Editor, { OnMount } from "@monaco-editor/react";

interface CodeEditorProps {
  initialValue?: string;
  value?: string;
  language?: string;
  onChange?: (value: string | undefined) => void;
  theme?: "vs-dark" | "light";
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue = "// Start coding here...",
  value,
  language = "javascript",
  onChange,
  theme = "vs-dark",
}) => {
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    // Configure editor settings here if needed
    monaco.editor.defineTheme("custom-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#1e1e1e",
      },
    });
  };

  return (
    <div className="h-full w-full overflow-hidden rounded-md border border-gray-700 bg-[#1e1e1e]">
      <Editor
        height="100%"
        defaultLanguage={language}
        defaultValue={initialValue}
        value={value}
        theme={theme}
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
