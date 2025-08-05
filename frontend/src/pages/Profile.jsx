import React, { useEffect, useState } from "react";
import API from "../api/Api";
import PostCard from "../components/PostCard";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || token.split(".").length !== 3) {
      console.warn("Invalid or missing token. Redirecting...");
      setUser(null);
      return;
    }

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const decoded = JSON.parse(jsonPayload);
      setUser(decoded);

      API.get(`/posts/user/${decoded.userId}`).then((res) =>
        setPosts(res.data)
      );
    } catch (err) {
      console.error("Token decode error:", err);
      setUser(null);
    }
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
        <p className="text-gray-600 mb-1">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-gray-800">
          <strong>Bio:</strong> {user.bio}
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4">Your Posts</h3>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
