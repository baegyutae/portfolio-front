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

    // FormData 객체 생성
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

    // 백엔드로 FormData 전송
    try {
      const response = await fetch("http://localhost:8080/posts", {
        method: "POST",
        body: formData,
        // Content-Type 헤더를 설정하지 않음으로써, 브라우저가 자동으로 multipart/form-data 경계를 설정할 수 있게 함
      });

      if (response.ok) {
        const responseData = await response.json();
        alert("게시글이 성공적으로 작성되었습니다.");
        // 성공적으로 게시글이 생성된 후 필요한 동작 (예: 페이지 리디렉션)
      } else {
        alert("게시글 작성에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("게시글 작성 중 오류가 발생했습니다.");
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
