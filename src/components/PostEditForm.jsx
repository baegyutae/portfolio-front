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
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);
    // 환경 변수를 사용하여 백엔드 주소 참조
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
  }, [postId]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setLoading(true);

    const formData = new FormData();
    formData.append(
      "postUpdateDto",
      new Blob(
        [
          JSON.stringify({
            title: post.title,
            content: post.content,
            imageUrl: post.imageUrl, // 이 부분은 기존 이미지 URL을 유지하려면 서버로부터 받아와야 합니다.
          }),
        ],
        {
          type: "application/json",
        }
      )
    );
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    // 환경 변수를 사용하여 백엔드 주소 참조
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="제목"
              name="title"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
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
              onChange={(e) => setPost({ ...post, content: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <input type="file" onChange={handleFileChange} />
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
