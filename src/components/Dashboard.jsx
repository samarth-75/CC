//import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const quote = "Code is like humor. When you have to explain it, it’s bad. — Cory House";

const Dashboard = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/blogs/trending')
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Greeting & Quote */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-cyan-300 text-lg italic">{quote}</p>
        </div>

        {/* Trending Blogs */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Trending Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.slice(0, 6).map(blog => (
              <div key={blog._id} className="bg-slate-800/60 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-all">
                <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-cyan-300 mb-2">{blog.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">By {blog.author}</p>
                  <p className="text-white text-sm mb-4">{blog.excerpt}</p>
                  <button
                      onClick={() => navigate(`/blogs/${blog._id}`)}
                      className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-cyan-700 transition"
                    >
                      Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explore More Button */}
        <div className="flex justify-center mt-6">
          <button
              className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-cyan-700 transition"
              onClick={() => navigate('/blogs')}
            >
              Explore more...
            </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;