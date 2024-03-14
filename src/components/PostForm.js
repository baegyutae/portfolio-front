import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  Paper,
  Box,
  Typography,
  Snackbar,
} from "@mui/material";

const PostForm = () => {
  const [post, setPost] = useState({ title: "", content: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // 수정된 부분: 토큰을 localStorage에서 직접 가져옴

    const formData = new FormData();
    formData.append(
      "postCreateDto",
      new Blob([JSON.stringify({ title: post.title, content: post.content })], {
        type: "application/json",
      })
    );
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      const response = await fetch("http://localhost:8080/api/posts", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`, // 수정된 부분: 요청 헤더에 인증 토큰 추가
        },
      });

      if (response.ok) {
        setSnackbar({
          open: true,
          message: "게시글이 성공적으로 작성되었습니다.",
        });
        navigate("/postlist");
      } else {
        throw new Error("게시글 작성 실패");
      }
    } catch (error) {
      console.error("Error:", error);
      setSnackbar({
        open: true,
        message: "게시글 작성 과정에서 오류가 발생했습니다.",
      });
    }
  };

  return (
    <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 600 }}>
        <Typography variant="h6" gutterBottom component="div">
          새 게시글 작성
        </Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
              <input type="file" onChange={handleFileChange} />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                게시글 작성
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
    </Box>
  );
};

export default PostForm;
