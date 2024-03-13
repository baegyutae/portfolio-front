import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  Snackbar,
  Box,
  Card,
  CardMedia,
} from "@mui/material";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/api/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching post details:", error);
        setLoading(false);
      });
  }, [postId]);

  const handleEdit = () => {
    navigate(`/posts/edit/${postId}`);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = () => {
    fetch(`http://localhost:8080/api/posts/${postId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("게시글 삭제에 실패했습니다.");
        }
        setSnackbar({
          open: true,
          message: "게시글이 성공적으로 삭제되었습니다.",
        });
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
        setSnackbar({
          open: true,
          message: "삭제 과정에서 오류가 발생했습니다.",
        });
      })
      .finally(() => {
        setOpenDeleteDialog(false);
      });
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!post) {
    return <Typography variant="h5">게시글을 불러올 수 없습니다.</Typography>;
  }

  return (
    <>
      <Paper
        elevation={3}
        sx={{ padding: 3, margin: "auto", maxWidth: 800, marginTop: 4 }}
      >
        <Typography variant="h4" gutterBottom component="div">
          {post.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {post.content}
        </Typography>
        {post.imageUrl && (
          <Card>
            <CardMedia component="img" image={post.imageUrl} alt="Post image" />
          </Card>
        )}
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleEdit}>
              수정
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleOpenDeleteDialog}
            >
              삭제
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>{"이 게시글을 삭제하시겠습니까?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>취소</Button>
          <Button onClick={handleDelete} color="error">
            삭제
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </>
  );
};

export default PostDetail;
