"use client";

import React from "react";
import {
    SandpackProvider,
    SandpackLayout,
    SandpackPreview,
    SandpackFileExplorer,
} from "@codesandbox/sandpack-react";

interface SandpackPreviewClientProps {
    code: string;
    template?: "react" | "vanilla" | "static";
}

const SandpackPreviewClient: React.FC<SandpackPreviewClientProps> = ({
    code,
    template = "react",
}) => {
    // We sync the code from our Monaco editor to Sandpack's main file
    const files = {
        "/App.js": {
            code: code,
            active: true,
        },
    };

    return (
        <div className="h-full w-full border border-gray-700 rounded-md overflow-hidden">
            <SandpackProvider
                template={template}
                theme="dark"
                files={files}
                options={{
                    externalResources: ["https://cdn.tailwindcss.com"],
                }}
            >
                <SandpackLayout style={{ height: "100%" }}>
                    {/* We hide the code editor since we use Monaco, but we keep the preview */}
                    <SandpackPreview
                        style={{ height: "100%" }}
                        showOpenInCodeSandbox={false}
                        showRefreshButton={true}
                    />
                </SandpackLayout>
            </SandpackProvider>
        </div>
    );
};

export default SandpackPreviewClient;
