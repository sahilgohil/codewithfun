// Type definition for Pyodide
interface PyodideInterface {
    runPython: (code: string) => any;
    loadPackagesFromImports: (code: string) => Promise<void>;
    globals: any;
}

// Extend Window interface to include loadPyodide
declare global {
    interface Window {
        loadPyodide?: (config: { indexURL: string }) => Promise<PyodideInterface>;
    }
}

let pyodideInstance: PyodideInterface | null = null;
let pyodideLoadingPromise: Promise<PyodideInterface> | null = null;

/**
 * Load Pyodide SDK from CDN (singleton pattern to avoid multiple loads)
 */
export async function loadPyodideSDK(): Promise<PyodideInterface> {
    if (pyodideInstance) {
        return pyodideInstance;
    }

    if (pyodideLoadingPromise) {
        return pyodideLoadingPromise;
    }

    pyodideLoadingPromise = (async () => {
        // Load Pyodide script from CDN
        if (!window.loadPyodide) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
            document.head.appendChild(script);

            // Wait for script to load
            await new Promise<void>((resolve, reject) => {
                script.onload = () => resolve();
                script.onerror = () => reject(new Error('Failed to load Pyodide'));
            });
        }

        // Load Pyodide
        if (!window.loadPyodide) {
            throw new Error('Pyodide failed to load');
        }

        const pyodide = await window.loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
        });

        pyodideInstance = pyodide;
        return pyodide;
    })();

    return pyodideLoadingPromise;
}

/**
 * Execute Python code and capture stdout
 */
export async function runPythonCode(code: string): Promise<{ stdout: string; stderr: string | null }> {
    try {
        const pyodide = await loadPyodideSDK();

        // Redirect stdout to capture prints
        const stdoutCapture = `
import sys
from io import StringIO
sys.stdout = StringIO()
`;

        const stdoutRetrieve = `
output = sys.stdout.getvalue()
output
`;

        // Execute setup
        pyodide.runPython(stdoutCapture);

        // Execute user code
        pyodide.runPython(code);

        // Retrieve output
        const output = pyodide.runPython(stdoutRetrieve) as string;

        return {
            stdout: output || "",
            stderr: null,
        };
    } catch (error: any) {
        return {
            stdout: "",
            stderr: error.message || "Unknown error occurred",
        };
    }
}
