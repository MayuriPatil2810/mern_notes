import React, { useState, useEffect } from "react";
import axios from "axios";

function PostManager() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  const API = "http://localhost:5000/api/posts";
  const token = localStorage.getItem("token");

  // Fetch Posts
  const fetchPosts = async () => {
    try {
      const res = await axios.get(API, {
        headers: {
          Authorization: token,
        },
      });
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Add or Update Post
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(
          `${API}/${editId}`,
          { title, content },
          {
            headers: { Authorization: token },
          }
        );
        setEditId(null);
      } else {
        await axios.post(
          API,
          { title, content },
          {
            headers: { Authorization: token },
          }
        );
      }

      setTitle("");
      setContent("");
      fetchPosts();
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  // Delete Post
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: token },
      });
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Edit Post
  const handleEdit = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setEditId(post._id);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Post Manager</h2>

      {/* Add / Edit Post */}
      <div className="card shadow p-4 mb-4">
        <h5>{editId ? "Edit Post" : "Add New Post"}</h5>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            className="form-control mb-3"
            placeholder="Enter post content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <button className="btn btn-primary w-100">
            {editId ? "Update Post" : "Add Post"}
          </button>
        </form>
      </div>

      {/* Posts List */}
      <div className="row">
        {posts.map((post) => (
          <div key={post._id} className="col-md-6 mb-4">
            <div className="card shadow-sm p-3">
              <h5>{post.title}</h5>
              <p>{post.content}</p>

              <div className="d-flex justify-content-between mt-3">
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(post)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(post._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default PostManager;
