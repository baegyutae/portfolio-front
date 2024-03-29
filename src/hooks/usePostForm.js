import { useState } from "react";
import { submitPost } from "../api/postApi";

const usePostForm = () => {
  const [post, setPost] = useState({ title: "", content: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e, navigate) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "postCreateDto",
      new Blob([JSON.stringify(post)], { type: "application/json" })
    );
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      await submitPost(formData, localStorage.getItem("token"));
      setSnackbar({
        open: true,
        message: "게시글이 성공적으로 작성되었습니다.",
      });
      navigate("/postlist");
    } catch (error) {
      console.error("Error:", error);
      setSnackbar({
        open: true,
        message: "게시글 작성 과정에서 오류가 발생했습니다.",
      });
    }
  };

  return {
    post,
    selectedFile,
    snackbar,
    handleChange,
    handleFileChange,
    handleSubmit,
    setSnackbar,
  };
};

export default usePostForm;
