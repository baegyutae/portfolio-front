import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostForm = () => {
  const [post, setPost] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        제목:
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
        />
      </label>
      <label>
        내용:
        <textarea name="content" value={post.content} onChange={handleChange} />
      </label>
      <button type="submit">게시글 작성</button>
    </form>
  );
};

export default PostForm;
