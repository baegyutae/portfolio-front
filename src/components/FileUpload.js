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

  // 파일 업로드 로직 (추후 구현)
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("파일을 선택해 주세요.");
      return;
    }
    // 프리사인드 URL 요청 및 파일 업로드 로직 구현 예정
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
