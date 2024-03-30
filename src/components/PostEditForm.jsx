import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  Paper,
  Snackbar,
} from "@mui/material";
import usePostEditForm from "../hooks/usePostEditForm";

const PostEditForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const {
    post,
    setPost,
    snackbar,
    handleFileChange,
    handleSubmit,
    setSnackbar,
  } = usePostEditForm(postId, navigate);

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
