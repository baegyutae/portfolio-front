import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, Paper, Box } from "@mui/material";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 로컬 스토리지에서 인증 토큰 가져오기
    const token = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth")).token
      : null;

    // 인증 토큰이 있는 경우에만 API 요청을 수행
    if (token) {
      fetch("http://localhost:8080/api/posts", {
        method: "GET",
        headers: {
          // 요청 헤더에 인증 토큰 추가
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => setPosts(data))
        .catch((error) => console.error("Error fetching posts:", error));
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1, margin: 4 }}>
      <Typography variant="h2" gutterBottom>
        게시글 목록
      </Typography>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography
                variant="h5"
                component={Link}
                to={`/posts/${post.id}`}
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  ":hover": { textDecoration: "underline" },
                }}
              >
                {post.title}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {post.content.substring(0, 100)}...
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PostList;
