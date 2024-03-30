import { useState, useEffect } from "react";
import { fetchPostById, updatePost} from "../api/postApi";

export const usePostEditForm = (postId) => {
  const [post, setPost] = useState({ title: "", content: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadPostData = async () => {
      setLoading(true);
      try {
        const data = await fetchPostById(postId, token);
        setPost({ title: data.title, content: data.content });
      } catch (error) {
        console.error(error);
        setSnackbar({ open: true, message: error.message });
      } finally {
        setLoading(false);
      }
    };
    loadPostData();
  }, [postId, token]);

  const handleChange = (e) =>
    setPost({ ...post, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleSubmit = async (e, navigate) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append(
      "postUpdateDto",
      new Blob([JSON.stringify(post)], { type: "application/json" })
    );
    if (selectedFile) formData.append("file", selectedFile);

    try {
      await updatePost(postId, formData, token);
      setSnackbar({
        open: true,
        message: "게시글이 성공적으로 수정되었습니다.",
      });
      navigate(`/posts/${postId}`);
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return {
    post,
    setPost,
    selectedFile,
    loading,
    snackbar,
    handleChange,
    handleFileChange,
    handleSubmit,
    setSnackbar,
  };
};

export default usePostEditForm;
