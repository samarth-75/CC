import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Challenge from './models/Challenge.js';

dotenv.config();

const challenges = [
  {
    title: 'JavaScript Fundamentals',
    description: 'Master the basics of JavaScript programming',
    difficulty: 'Beginner',
    xpReward: 50,
    questions: [
      {
        question: 'What is the output of 2 + "2" in JavaScript?',
        options: ['4', '"4"', '"22"', 'NaN'],
        correctAnswer: 2,
      },
      {
        question: 'Which keyword declares a variable in JavaScript?',
        options: ['var', 'let', 'const', 'All of the above'],
        correctAnswer: 3,
      },
      {
        question: 'Which of the following is NOT a JavaScript data type?',
        options: ['Number', 'String', 'Boolean', 'Character'],
        correctAnswer: 3,
      },
      {
        question: 'How do you write a single-line comment in JavaScript?',
        options: ['<!-- comment -->', '// comment', '/* comment */', '# comment'],
        correctAnswer: 1,
      },
      {
        question: 'What is the correct way to define a function in JavaScript?',
        options: [
          'function myFunc() {}',
          'def myFunc() {}',
          'func myFunc() {}',
          'function:myFunc() {}'
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    title: 'React Component Mastery',
    description: 'Build dynamic user interfaces with React components',
    difficulty: 'Intermediate',
    xpReward: 100,
    questions: [
      {
        question: 'What hook is used for state in functional components?',
        options: ['useState', 'useEffect', 'useContext', 'useRef'],
        correctAnswer: 0,
      },
      {
        question: 'What does JSX stand for?',
        options: [
          'JavaScript XML',
          'Java Syntax Extension',
          'JavaScript Extension',
          'Java XML Syntax'
        ],
        correctAnswer: 0,
      },
      {
        question: 'How do you pass data from parent to child component?',
        options: ['Using state', 'Using props', 'Using context', 'Using refs'],
        correctAnswer: 1,
      },
      {
        question: 'Which hook is used for side effects?',
        options: ['useState', 'useEffect', 'useReducer', 'useMemo'],
        correctAnswer: 1,
      },
      {
        question: 'What is the default export of a React component file?',
        options: [
          'The component itself',
          'A function',
          'An object',
          'A string'
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    title: 'Algorithm Optimization',
    description: 'Solve complex algorithmic problems efficiently',
    difficulty: 'Advanced',
    xpReward: 200,
    questions: [
      {
        question: 'What is the time complexity of binary search?',
        options: ['O(n)', 'O(log n)', 'O(n^2)', 'O(1)'],
        correctAnswer: 1,
      },
      {
        question: 'Which sorting algorithm is NOT comparison-based?',
        options: ['Merge Sort', 'Quick Sort', 'Counting Sort', 'Heap Sort'],
        correctAnswer: 2,
      },
      {
        question: 'What does "dynamic programming" optimize?',
        options: [
          'Space complexity',
          'Time complexity by storing subproblem results',
          'Sorting speed',
          'Recursion depth'
        ],
        correctAnswer: 1,
      },
      {
        question: 'Which of the following is the fastest sorting algorithm on average?',
        options: ['Bubble Sort', 'Selection Sort', 'Quick Sort', 'Insertion Sort'],
        correctAnswer: 2,
      },
      {
        question: 'What is the Big O of linear search?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
        correctAnswer: 2,
      },
    ],
  },
  {
    title: 'CSS Grid & Flexbox',
    description: 'Create responsive layouts with modern CSS',
    difficulty: 'Intermediate',
    xpReward: 75,
    questions: [
      {
        question: 'Which CSS property enables Flexbox layout?',
        options: ['display: flex', 'flex-direction', 'justify-content', 'align-items'],
        correctAnswer: 0,
      },
      {
        question: 'Which property sets the number of columns in CSS Grid?',
        options: [
          'grid-template-rows',
          'grid-template-columns',
          'grid-column',
          'grid-row'
        ],
        correctAnswer: 1,
      },
      {
        question: 'How do you make a flex item grow to fill available space?',
        options: ['flex-grow', 'flex-shrink', 'flex-basis', 'align-self'],
        correctAnswer: 0,
      },
      {
        question: 'Which media query targets screens smaller than 600px?',
        options: [
          '@media (max-width: 600px)',
          '@media (min-width: 600px)',
          '@media (width: 600px)',
          '@media (height: 600px)'
        ],
        correctAnswer: 0,
      },
      {
        question: 'What is the default flex-direction?',
        options: ['row', 'column', 'row-reverse', 'column-reverse'],
        correctAnswer: 0,
      },
    ],
  },
  {
    title: 'Node.js Backend Development',
    description: 'Build scalable server-side applications',
    difficulty: 'Intermediate',
    xpReward: 125,
    questions: [
      {
        question: 'Which command initializes a new Node.js project?',
        options: ['npm start', 'npm init', 'node init', 'npm install'],
        correctAnswer: 1,
      },
      {
        question: 'Which framework is commonly used for Node.js web servers?',
        options: ['Django', 'Flask', 'Express', 'Spring'],
        correctAnswer: 2,
      },
      {
        question: 'How do you import a module in Node.js (CommonJS)?',
        options: [
          'import module from "module"',
          'require("module")',
          'include "module"',
          'use module'
        ],
        correctAnswer: 1,
      },
      {
        question: 'Which database is commonly used with Node.js?',
        options: ['MongoDB', 'MySQL', 'PostgreSQL', 'All of the above'],
        correctAnswer: 3,
      },
      {
        question: 'What is the default port for Express apps?',
        options: ['3000', '8080', '5000', '80'],
        correctAnswer: 0,
      },
    ],
  },
  {
    title: 'TypeScript Mastery',
    description: 'Add type safety to your JavaScript applications',
    difficulty: 'Advanced',
    xpReward: 150,
    questions: [
      {
        question: 'What is TypeScript?',
        options: [
          'A superset of JavaScript',
          'A CSS framework',
          'A database',
          'A build tool'
        ],
        correctAnswer: 0,
      },
      {
        question: 'How do you define a variable with a type in TypeScript?',
        options: [
          'let x: number = 5;',
          'let x = number 5;',
          'let x := 5;',
          'number x = 5;'
        ],
        correctAnswer: 0,
      },
      {
        question: 'Which keyword is used to define an interface?',
        options: ['type', 'interface', 'struct', 'class'],
        correctAnswer: 1,
      },
      {
        question: 'What are generics used for in TypeScript?',
        options: [
          'To create reusable components',
          'To define CSS styles',
          'To connect to databases',
          'To handle HTTP requests'
        ],
        correctAnswer: 0,
      },
      {
        question: 'Which file extension is used for TypeScript files?',
        options: ['.js', '.ts', '.tsx', '.ts and .tsx'],
        correctAnswer: 3,
      },
    ],
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codecrafters');
    await Challenge.deleteMany({});
    await Challenge.insertMany(challenges);
    console.log('Challenges seeded!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();