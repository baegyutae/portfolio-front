import React, { useState } from "react";

function FileUpload() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append(
      "postCreateDto",
      new Blob([JSON.stringify({ title, content })], {
        type: "application/json",
      })
    );
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/files/upload`,
        {
          method: "POST",
          body: formData,
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      if (response.ok) {
        alert("파일 업로드 및 게시글 작성이 성공적으로 완료되었습니다.");
        // 성공 후 필요한 동작
      } else {
        alert("파일 업로드 및 게시글 작성에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("파일 업로드 및 게시글 작성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={handleContentChange}
        />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">게시글 작성</button>
      </form>
    </div>
  );
}

export default FileUpload;
