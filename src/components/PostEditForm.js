import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, TextField, Button } from "@mui/material";

const PostEditForm = () => {
  const [post, setPost] = useState({ title: "", content: "" });
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => setPost({ title: data.title, content: data.content }))
      .catch((error) => console.error("Error:", error));
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("게시글 수정에 실패했습니다.");
        }
        alert("게시글이 성공적으로 수정되었습니다.");
        navigate(`/posts/${postId}`);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("수정 과정에서 오류가 발생했습니다.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="제목"
            name="title"
            value={post.title}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={6}
            label="내용"
            name="content"
            value={post.content}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            수정 완료
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PostEditForm;
