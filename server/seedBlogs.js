import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Blog from './models/Blog.js';

dotenv.config();

const blogs = [
  {
    id: 1,
    title: 'Mastering React Hooks',
    author: 'Jane Doe',
    excerpt: 'Learn how to supercharge your React apps with custom hooks and best practices.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    title: 'JavaScript ES2025: What’s New?',
    author: 'John Smith',
    excerpt: 'A sneak peek into the upcoming features of JavaScript and how to use them today.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    title: 'CSS Grid vs Flexbox',
    author: 'Emily Chen',
    excerpt: 'Which layout system should you use for your next project? Let’s compare.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 4,
    title: 'Node.js Performance Tips',
    author: 'Alex Turner',
    excerpt: 'Optimize your backend with these proven Node.js performance strategies.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 5,
    title: 'TypeScript for Beginners',
    author: 'Sara Lee',
    excerpt: 'Get started with TypeScript and add type safety to your JavaScript projects.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80'
  },
  {
  id: 6,
  title: 'Debugging Like a Pro',
  author: 'Michael Brown',
  excerpt: 'Tips and tools to help you debug your code efficiently and effectively.',
  image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80'
}
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codecrafters');
  await Blog.deleteMany({});
  await Blog.insertMany(blogs);
  console.log('Blogs seeded!');
  process.exit();
}

seed();