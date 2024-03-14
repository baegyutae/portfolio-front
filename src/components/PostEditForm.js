import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  Paper,
  Box,
  CircularProgress,
  Snackbar,
} from "@mui/material";

const PostEditForm = () => {
  const [post, setPost] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // 여기에서 token을 정의합니다.
    setLoading(true);
    fetch(`http://localhost:8080/api/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // 인증 토큰 포함
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPost({ title: data.title, content: data.content });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
        setSnackbar({
          open: true,
          message: "게시글 정보를 불러오는 데 실패했습니다.",
        });
      });
  }, [postId]); // token을 의존성 배열에서 제거합니다.

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // 여기에서도 token을 정의합니다.
    setLoading(true);
    fetch(`http://localhost:8080/api/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 인증 토큰 포함
      },
      body: JSON.stringify(post),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("게시글 수정에 실패했습니다.");
        }
        setSnackbar({
          open: true,
          message: "게시글이 성공적으로 수정되었습니다.",
        });
        navigate(`/posts/${postId}`);
      })
      .catch((error) => {
        console.error("Error:", error);
        setSnackbar({
          open: true,
          message: "수정 과정에서 오류가 발생했습니다.",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Paper elevation={3} sx={{ p: 4, margin: "auto", maxWidth: 600, mt: 4 }}>
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
            <Button type="submit" variant="contained" color="primary" fullWidth>
              수정 완료
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Paper>
  );
};

export default PostEditForm;
