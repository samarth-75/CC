import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // ✅ get logged-in user

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    excerpt: '',
    content: '',
    image: ''
  });

  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ assume user context has { username }

  useEffect(() => {
    fetch('http://localhost:5000/api/blogs')
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  // Submit new blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = { ...newBlog, author: user?.username };

    const res = await fetch('http://localhost:5000/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogData)
    });

    if (res.ok) {
      const created = await res.json();
      setBlogs([created, ...blogs]); // add new blog at top
      setShowForm(false);
      setNewBlog({ title: '', excerpt: '', content: '', image: '', author: '' });
    } else {
      alert('Error creating blog');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            All Blogs
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-bold hover:from-purple-700 hover:to-cyan-700 transition"
          >
            Create a Blog
          </button>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Create Blog Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-lg shadow-xl relative">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">Create a Blog</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={newBlog.title}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
              <input
                type="text"
                name="author"
                value={user?.username || 'Anonymous'}
                disabled
                className="w-full p-3 rounded-lg bg-slate-700 text-gray-400 cursor-not-allowed"
              />
              <input
                type="text"
                name="excerpt"
                placeholder="Excerpt"
                value={newBlog.excerpt}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
              <textarea
                name="content"
                placeholder="Content"
                value={newBlog.content}
                onChange={handleChange}
                className="w-full p-3 h-32 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={newBlog.image}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />

              {/* Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg font-bold bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
