import React, { useEffect, useState } from 'react';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/blogs')
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, []);

  return (  // ✅ you need return here
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {blogs.map(blog => (
        <div 
          key={blog._id} 
          className="bg-slate-800/60 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-all"
        >
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-40 object-cover" 
          />
          <div className="p-4">
            <h3 className="text-lg font-bold text-cyan-300 mb-2">{blog.title}</h3>
            <p className="text-gray-400 text-sm mb-2">By {blog.author}</p>
            <p className="text-white text-sm mb-4">{blog.excerpt}</p>
            <p className="text-white leading-relaxed">{blog.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
