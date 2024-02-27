import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Typography, Button } from "@mui/material";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((error) => console.error("Error fetching post details:", error));
  }, [postId]);

  const handleEdit = () => {
    navigate(`/posts/edit/${postId}`);
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm("이 게시글을 삭제하시겠습니까?");

    if (isConfirmed) {
      fetch(`http://localhost:8080/posts/${postId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("게시글 삭제에 실패했습니다.");
          }
          alert("게시글이 성공적으로 삭제되었습니다.");
          navigate("/");
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("삭제 과정에서 오류가 발생했습니다.");
        });
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h2">{post.title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">{post.content}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" color="primary" onClick={handleEdit}>
          수정
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" color="error" onClick={handleDelete}>
          삭제
        </Button>
      </Grid>
    </Grid>
  );
};

export default PostDetail;