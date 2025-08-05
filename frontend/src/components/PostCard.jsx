import React from "react";

export default function PostCard({ post }) {
  return (
    <div className="border p-4 mb-4 rounded">
      <div className="text-sm text-gray-600">
        {post.author.name} • {new Date(post.createdAt).toLocaleString()}
      </div>
      <p className="mt-2 text-lg">{post.content}</p>
    </div>
  );
}
