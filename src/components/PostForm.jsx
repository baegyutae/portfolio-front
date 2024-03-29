import React from "react";
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
import usePostForm from "../hooks/usePostForm";

const PostForm = () => {
  const navigate = useNavigate();
  const {
    post,
    selectedFile,
    snackbar,
    handleChange,
    handleFileChange,
    handleSubmit,
    setSnackbar,
  } = usePostForm();

  return (
    <Paper elevation={3} sx={{ p: 4, margin: "auto", maxWidth: 600, mt: 4 }}>
      <form
        onSubmit={(e) => handleSubmit(e, navigate)}
        encType="multipart/form-data"
      >
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
            <Button type="submit" variant="contained" color="primary" fullWidth>
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
  );
};

export default PostForm;
