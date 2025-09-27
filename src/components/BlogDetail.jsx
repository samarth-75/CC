import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/blogs/${id}`)
      .then(res => res.json())
      .then(data => {
        setBlog(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (!blog) return <p className="text-red-400 text-center">Blog not found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-slate-800/70 rounded-xl shadow-lg p-6">
        <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded-lg mb-6" />
        <h1 className="text-3xl font-bold text-cyan-300 mb-4">{blog.title}</h1>
        <p className="text-gray-400 mb-4">By {blog.author}</p>
        <p className="text-white text-sm mb-4">{blog.excerpt}</p>
        <p className="text-white leading-relaxed">{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogDetail;
