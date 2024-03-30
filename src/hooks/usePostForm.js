import { useState } from "react";
import { createPost, updatePost } from "../api/postApi";

const usePostForm = (postId) => {
  const [post, setPost] = useState({ title: "", content: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const handleChange = (e) =>
    setPost({ ...post, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleSubmit = async (e, navigate) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "postCreateDto",
      new Blob(
        [
          JSON.stringify({
            title: post.title,
            content: post.content,
          }),
        ],
        { type: "application/json" }
      )
    );
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    try {
      const response = postId
        ? await updatePost(postId, formData)
        : await createPost(formData);
      setSnackbar({
        open: true,
        message: `게시글이 성공적으로 ${postId ? "수정" : "생성"}되었습니다.`,
      });
      navigate(`/posts/${response.id || postId}`);
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return {
    post,
    selectedFile,
    loading,
    snackbar,
    handleChange,
    handleFileChange,
    handleSubmit,
    setSnackbar,
  };
};

export default usePostForm;
