import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPostById } from "../api/postApi";
import {
  fetchCommentsByPostId,
  createComment,
  updateComment,
  deleteComment,
} from "../api/commentApi";

export const usePostDetail = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { postId } = useParams();
  const navigate = useNavigate();

  const loadData = async () => {
    setLoading(true);
    try {
      const postData = await fetchPostById(postId);
      setPost(postData);

      const commentsData = await fetchCommentsByPostId(postId, currentPage - 1); // currentPage를 0 기반 인덱스로 변환
      setComments(commentsData.content);
      setTotalPages(commentsData.totalPages);
    } catch (error) {
      console.error("Failed to load post or comments:", error);
      setSnackbar({ open: true, message: error.toString() });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [postId, currentPage]);

  const handleCreateComment = async (content) => {
    try {
      await createComment(postId, content);
      await loadData();
      setSnackbar({ open: true, message: "댓글이 성공적으로 추가되었습니다." });
    } catch (error) {
      console.error("댓글 생성 실패:", error);
      setSnackbar({ open: true, message: error.toString() });
    }
  };

  const handleUpdateComment = async (commentId, content) => {
    try {
      await updateComment(postId, commentId, content);
      await loadData();
      setSnackbar({
        open: true,
        message: "댓글이 성공적으로 업데이트되었습니다.",
      });
    } catch (error) {
      console.error("댓글 업데이트 실패:", error);
      setSnackbar({ open: true, message: error.toString() });
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(postId, commentId);
      await loadData();
      setSnackbar({ open: true, message: "댓글이 성공적으로 삭제되었습니다." });
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      setSnackbar({ open: true, message: error.toString() });
    }
  };

  return {
    post,
    comments,
    loading,
    snackbar,
    currentPage,
    totalPages,
    setCurrentPage,
    navigate,
    handleCreateComment,
    handleUpdateComment,
    handleDeleteComment,
    setSnackbar,
  };
};
