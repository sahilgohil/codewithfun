export interface ExecutionResult {
    stdout: string | null;
    stderr: string | null;
    compile_output: string | null;
    message: string | null;
    status: {
        id: number;
        description: string;
    };
}

// Language IDs for Judge0
export const LANGUAGE_IDS = {
    javascript: 63,
    python: 71,
    java: 62,
    cpp: 54,
};

export const executeCode = async (
    language: keyof typeof LANGUAGE_IDS,
    code: string
): Promise<ExecutionResult> => {
    // TODO: Replace with actual RapidAPI call
    // const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", { ... });

    console.log(`Executing ${language} code via Mock Judge0...`);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (language === "python") {
        return {
            stdout: "Hello from Python (Mocked Judge0)!\n",
            stderr: null,
            compile_output: null,
            message: null,
            status: { id: 3, description: "Accepted" },
        };
    }

    return {
        stdout: null,
        stderr: "Execution for this language is not yet implemented in the mock.",
        compile_output: null,
        message: null,
        status: { id: 11, description: "Runtime Error" },
    };
};
