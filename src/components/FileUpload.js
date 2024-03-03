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

  // 프리사인드 URL을 사용하여 파일을 S3에 업로드
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("파일을 선택해 주세요.");
      return;
    }

    try {
      const presignedUrl = await requestPresignedUrl(selectedFile.name);
      const uploadResponse = await fetch(presignedUrl, {
        method: "PUT",
        body: selectedFile,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (uploadResponse.ok) {
        alert("파일 업로드 성공!");
      } else {
        alert("파일 업로드 실패.");
      }
    } catch (error) {
      console.error("파일 업로드 중 오류 발생:", error);
      alert("파일 업로드 실패.");
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

export default FileUpload;