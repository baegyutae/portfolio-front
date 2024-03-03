import React, { useState } from "react";

function FileUploadComponent() {
  // 파일 상태 관리
  const [selectedFile, setSelectedFile] = useState(null);

  // 파일 선택 이벤트 핸들러
  const handleFileChange = (event) => {
    // 사용자가 파일을 선택한 경우, 선택된 파일 정보를 상태로 설정
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // 백엔드로부터 프리사인드 URL 요청
  const requestPresignedUrl = async (fileName) => {
    try {
      const response = await fetch("/api/upload/presigned-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName }),
      });
      const data = await response.json();
      return data.presignedUrl;
    } catch (error) {
      console.error("프리사인드 URL 요청 실패:", error);
      throw error;
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("파일을 선택해 주세요.");
      return;
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {selectedFile && <div>Selected file: {selectedFile.name}</div>}
    </div>
  );
}

export default FileUploadComponent;
