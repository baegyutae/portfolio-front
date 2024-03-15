import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommentForm from "../components/CommentForm";
import CommentEditForm from "../components/CommentEditForm";
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
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]); // 댓글 목록을 저장할 상태
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const { postId } = useParams();
  const navigate = useNavigate();

  const fetchPostDetails = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      // 게시글 정보 로드
      const postResponse = await fetch(
        `http://localhost:8080/api/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const postData = await postResponse.json();
      if (postResponse.ok) {
        setPost(postData);
      } else {
        throw new Error("Failed to load post");
      }

      // 댓글 목록 로드
      const commentsResponse = await fetch(
        `http://localhost:8080/api/posts/${postId}/comments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const commentsData = await commentsResponse.json();
      if (commentsResponse.ok) {
        setComments(commentsData);
      } else {
        throw new Error("Failed to load comments");
      }
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const updateComment = async (commentId, updatedContent) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8080/api/comments/${commentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: updatedContent }),
        }
      );

      if (!response.ok) throw new Error("Failed to update comment.");

      fetchPostDetails(); // 댓글 수정 후 댓글 목록을 새로고침
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  useEffect(() => {
    fetchPostDetails();
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

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:8080/api/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete the post");
      }
      navigate("/postlist");
      setSnackbar({ open: true, message: "Post successfully deleted" });
    } catch (error) {
      console.error("Error:", error);
      setSnackbar({ open: true, message: error.message });
    }
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
          <Card sx={{ marginTop: 2 }}>
            <CardMedia
              component="img"
              height="194"
              image={post.imageUrl}
              alt="Post image"
            />
          </Card>
        )}
        <Grid
          container
          spacing={2}
          justifyContent="flex-end"
          sx={{ marginTop: 2 }}
        >
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

      {/* 댓글 목록 */}
      <Box sx={{ margin: "auto", maxWidth: 800, marginTop: 4 }}>
        <Typography variant="h6" gutterBottom>
          댓글
        </Typography>
        {comments.map((comment) => (
          <CommentEditForm
            key={comment.id}
            comment={comment}
            onUpdateComment={updateComment}
          />
        ))}
        <CommentForm
          postId={postId}
          onCommentPosted={() => fetchPostDetails(postId)} // 댓글 작성 후 댓글 목록을 새로고침
        />
      </Box>

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
