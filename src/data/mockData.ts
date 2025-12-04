export interface Lesson {
    id: string;
    title: string;
    slug: string;
    content: string; // Markdown instructions for the workspace
    initialCode: string;
    language: "javascript" | "react" | "python";
    // New fields for Lesson Page
    whyLearn?: string;
    howItWorks?: string;
    sampleCode?: string;
    codeExplanation?: string;
}

export interface Module {
    id: string;
    title: string;
    lessons: Lesson[];
}

export interface Course {
    id: string;
    title: string;
    slug: string;
    description: string;
    modules: Module[];
}

export const COURSES: Course[] = [
    {
        id: "js-basics",
        title: "JavaScript Basics",
        slug: "javascript-basics",
        description: "Learn the fundamentals of JavaScript, the language of the web.",
        modules: [
            {
                id: "module-1",
                title: "Introduction",
                lessons: [
                    {
                        id: "hello-world",
                        title: "Hello, World!",
                        slug: "hello-world",
                        language: "javascript",
                        initialCode: "// Print 'Hello, World!' to the console\n",
                        content: `
# Hello, World!

Welcome to your first JavaScript lesson! In the world of programming, it's a tradition to start by making your computer say "Hello, World!".

## Instructions
1. In the editor on the right, type \`console.log("Hello, World!");\`.
2. Click the **Run Code** button.
3. Check the console output below the editor.

## Explanation
\`console.log()\` is a function in JavaScript that prints text to the console. It's very useful for debugging and seeing what your code is doing.
            `,
                        whyLearn: "It's the first step in every programmer's journey. It verifies that your environment is set up correctly and you can run code.",
                        howItWorks: "You tell the computer to print a specific string of text to the screen. It's the simplest form of output.",
                        sampleCode: `console.log("Hello, World!");`,
                        codeExplanation: "`console` is a built-in object.\n`.log()` is a method that writes to the console.\n`\"Hello, World!\"` is the string data we want to print."
                    },
                    {
                        id: "variables",
                        title: "Variables",
                        slug: "variables",
                        language: "javascript",
                        initialCode: "// Create a variable called 'name' and assign it your name\n\n// Print the variable to the console\n",
                        content: `
# Variables

Variables are like containers for storing data values. In JavaScript, we can declare variables using \`let\`, \`const\`, or \`var\`.

## Instructions
1. Create a variable named \`name\` using the \`const\` keyword.
2. Assign it a string value (e.g., \`"Alice"\`).
3. Use \`console.log(name)\` to print the value.

## Example
\`\`\`javascript
const greeting = "Hello";
console.log(greeting);
\`\`\`
            `,
                        whyLearn: "Variables allow you to store and manipulate data. Without them, you'd have to hardcode everything.",
                        howItWorks: "Think of a variable as a labeled box. You put data in the box, and you can retrieve it later using the label.",
                        sampleCode: `const name = "Alice";\nconsole.log(name);`,
                        codeExplanation: "`const` declares a constant variable.\n`name` is the identifier.\n`=` assigns the value.\n`\"Alice\"` is the value."
                    },
                ],
            },
        ],
    },
    {
        id: "python-masterclass",
        title: "Python Masterclass",
        slug: "python-masterclass",
        description: "From Zero to Hero: The complete Python bootcamp.",
        modules: [
            {
                id: "py-beginner",
                title: "Beginner: The Foundation",
                lessons: [
                    {
                        id: "py-hello",
                        title: "Hello Python",
                        slug: "hello-python",
                        language: "python",
                        initialCode: "# Print 'Hello, Python!' to the console\n",
                        content: `
# Hello, Python!

Python is known for its readability and simplicity. Let's say hello!

## Instructions
1. Type \`print("Hello, Python!")\` in the editor.
2. Run the code.

## Note
In Python, we use the \`print()\` function to output text.
                    `,
                        whyLearn: "Python is one of the most popular languages for AI, Data Science, and Web Development. Printing text is the first step to mastering it.",
                        howItWorks: "The `print()` function takes whatever you put inside the parentheses and displays it on the screen.",
                        sampleCode: `print("Hello, Python!")`,
                        codeExplanation: "`print` is the function name.\n`()` parentheses invoke the function.\n`\"Hello, Python!\"` is the string argument passed to the function."
                    },
                    {
                        id: "py-vars",
                        title: "Variables & Data Types",
                        slug: "variables-and-types",
                        language: "python",
                        initialCode: "# Create variables for name (string) and age (integer)\n\n# Print them out\n",
                        content: `
# Variables & Data Types

Python is dynamically typed, meaning you don't need to declare the type of a variable.

## Instructions
1. Create a variable \`name\` with your name.
2. Create a variable \`age\` with your age.
3. Print both.
                        `,
                        whyLearn: "Data comes in different forms: text, numbers, lists, etc. Variables let us store this data to use it later in our program.",
                        howItWorks: "You simply type a name, an equals sign, and a value. Python figures out the type automatically (Dynamic Typing).",
                        sampleCode: `name = "Sahil"\nage = 25\nprint(name)\nprint(age)`,
                        codeExplanation: "`name` is a string variable.\n`age` is an integer variable.\nPython automatically assigns the correct type."
                    },
                    {
                        id: "py-control",
                        title: "Control Flow",
                        slug: "control-flow",
                        language: "python",
                        initialCode: "age = 18\n\n# Write an if/else statement to check if age is >= 18\n",
                        content: `
# Control Flow

Use \`if\`, \`elif\`, and \`else\` to control the flow of your program.

## Instructions
1. Check if \`age\` is greater than or equal to 18.
2. If true, print "Adult".
3. Else, print "Minor".
                        `,
                        whyLearn: "Programs need to make decisions. Control flow allows your code to execute different logic based on conditions.",
                        howItWorks: "Python evaluates a condition (True/False). If True, the indented block of code runs. If False, it skips it.",
                        sampleCode: `age = 20\nif age >= 18:\n    print("Adult")\nelse:\n    print("Minor")`,
                        codeExplanation: "`if` starts the condition.\n`age >= 18` is the condition being checked.\n`:` ends the header line.\nIndentation defines the code block."
                    }
                ]
            },
            {
                id: "py-intermediate",
                title: "Intermediate: Data Structures",
                lessons: [
                    {
                        id: "py-lists",
                        title: "Lists",
                        slug: "lists",
                        language: "python",
                        initialCode: "fruits = ['apple', 'banana']\n\n# Add 'orange' to the list\n# Print the second item\n",
                        content: `
# Lists

Lists are ordered, mutable collections of items.

## Instructions
1. Use \`.append()\` to add 'orange' to the \`fruits\` list.
2. Print the item at index 1.
                        `
                    },
                    {
                        id: "py-dicts",
                        title: "Dictionaries",
                        slug: "dictionaries",
                        language: "python",
                        initialCode: "person = {'name': 'Alice', 'age': 25}\n\n# Print the person's name\n# Add a new key 'city'\n",
                        content: `
# Dictionaries

Dictionaries store data in key-value pairs.

## Instructions
1. Access the value of 'name' using \`person['name']\`.
2. Add a new key 'city' with a value.
                        `
                    }
                ]
            },
            {
                id: "py-advanced",
                title: "Advanced: Power Features",
                lessons: [
                    {
                        id: "py-decorators",
                        title: "Decorators",
                        slug: "decorators",
                        language: "python",
                        initialCode: "def my_decorator(func):\n    def wrapper():\n        print('Before')\n        func()\n        print('After')\n    return wrapper\n\n@my_decorator\ndef say_hello():\n    print('Hello!')\n\nsay_hello()",
                        content: `
# Decorators

Decorators allow you to modify the behavior of a function or class.

## Instructions
1. Run the code to see how the decorator wraps the function.
2. Try creating your own decorator that prints "Start" and "End".
                        `
                    },
                    {
                        id: "py-generators",
                        title: "Generators",
                        slug: "generators",
                        language: "python",
                        initialCode: "def count_up_to(n):\n    count = 1\n    while count <= n:\n        yield count\n        count += 1\n\n# Use a for loop to print values from the generator\n",
                        content: `
# Generators

Generators are functions that return an iterator that yields a sequence of values one at a time.

## Instructions
1. Create a generator \`count_up_to(5)\`.
2. Iterate over it using a \`for\` loop and print each number.
                        `
                    }
                ]
            }
        ]
    }
];
