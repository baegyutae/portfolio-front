import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div>
      <h2>게시글 목록</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </h3>
            <p>{post.content.substring(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
