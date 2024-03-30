import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, Box, Card, CardContent } from "@mui/material";
import { fetchPosts } from "../../api/postApi";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    loadData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, margin: 4 }}>
      <Typography variant="h2" gutterBottom>
        게시글 목록
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {posts.map((post) => (
          <Grid item xs={12} key={post.id}>
            {" "}
            {/* 가로 길이 조절 */}
            <Card
              elevation={3}
              sx={{
                padding: 2,
                maxWidth: "50%",
                margin: "auto",
                margin: "auto",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component={Link}
                  to={`/posts/${post.id}`}
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                    ":hover": { textDecoration: "underline" },
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 1,
                  }}
                >
                  {post.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 1,
                  }}
                >
                  {post.content.substring(0, 100)}...
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PostList;
