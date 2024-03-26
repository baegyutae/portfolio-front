import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";

function CommentForm({ postId, onCommentPosted }) {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      // 환경 변수를 사용하여 백엔드 주소 참조
      const url = `${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}/comments`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: comment,
        }),
      });
      if (response.ok) {
        setComment("");
        onCommentPosted(); // 댓글 작성 후 콜백 함수 호출하여 댓글 목록 새로고침
      } else {
        console.error("댓글 작성 실패");
      }
    } catch (error) {
      console.error("댓글 작성 중 오류 발생", error);
    }
  };

  return (
    <Grid
      container
      component="form"
      onSubmit={handleSubmit}
      noValidate
      spacing={2}
    >
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="댓글 추가..."
          value={comment}
          onChange={handleCommentChange}
          multiline
          rows={4}
          variant="outlined"
        />
      </Grid>
      <Grid item>
        <Button type="submit" variant="contained" color="primary">
          댓글 작성
        </Button>
      </Grid>
    </Grid>
  );
}

export default CommentForm;
