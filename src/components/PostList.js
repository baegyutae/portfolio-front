import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div>
      <Typography variant="h2">게시글 목록</Typography>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} key={post.id}>
            <Typography variant="h3">
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </Typography>
            <Typography variant="body1">
              {post.content.substring(0, 100)}...
            </Typography>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PostList;
