import React from "react";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";

function App() {
  let posts = [
    {
      id: 1,
      title: "첫 번째 게시글",
      content: "이것은 첫 번째 게시글의 내용입니다.",
      createdAt: "2024-02-26",
    },
    {
      id: 2,
      title: "두 번째 게시글",
      content: "여기에는 두 번째 게시글에 대한 내용이 들어갑니다.",
      createdAt: "2024-02-27",
    },
  ];

  return (
    <Container maxWidth="lg">
      <AppBar position="static" style={{ background: "black", color: "white" }}>
        <Toolbar>
          <Typography variant="h6">게시판</Typography>
        </Toolbar>
      </AppBar>
      <Paper style={{ margin: "24px", padding: "24px" }}>
        <List>
          {posts.map((post) => (
            <ListItem button key={post.id} onClick={() => alert("게시글 클릭")}>
              <ListItemText primary={post.title} secondary={post.content} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default App;
