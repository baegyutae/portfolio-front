import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, Paper, Box } from "@mui/material";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/posts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(data); // 게시글 목록 상태 업데이트
      } else {
        throw new Error("Network response was not ok");
      }
    };

    fetchPosts().catch((error) =>
      console.error("Error fetching posts:", error.message)
    );
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
