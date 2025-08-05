import React, { useEffect, useState } from "react";
import API from "../api/Api";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  const fetchPosts = async () => {
    const res = await API.get("/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token || token.split(".").length !== 3) {
      alert("You must be logged in to post.");
      return;
    }

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join("")
      );
      const user = JSON.parse(jsonPayload);

      await API.post("/posts/create", { content, userId: user.userId });
      setContent("");
      fetchPosts();
    } catch (err) {
      console.error("Post creation failed:", err);
      alert("Something went wrong while creating the post.");
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-lg">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full border border-gray-300 rounded p-3 mb-3 resize-none"
          rows={3}
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded">
          Post
        </button>
      </form>

      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
