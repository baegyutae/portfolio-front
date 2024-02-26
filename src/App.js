import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

let examplePosts = [
];

function App() {
  const [posts, setPosts] = useState(examplePosts);
  const [open, setOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    setPosts([...posts, { id: Date.now(), ...newPost }]);
    handleClose();
  };

  const handleEdit = (post) => {
  };

  const handleDelete = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  return (
    <>

      <Button variant="contained" color="primary" onClick={handleOpen}>
        게시글 생성
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>새 게시글</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="제목"
            type="text"
            fullWidth
            variant="standard"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <TextField
            margin="dense"
            id="content"
            label="내용"
            type="text"
            fullWidth
            multiline
            variant="standard"
            value={newPost.content}
            onChange={(e) =>
              setNewPost({ ...newPost, content: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleCreate}>생성</Button>
        </DialogActions>
      </Dialog>

      <List>
        {posts.map((post) => (
          <ListItem key={post.id}>
            <ListItemText primary={post.title} secondary={post.content} />
            <Button onClick={() => handleEdit(post)}>수정</Button>
            <Button onClick={() => handleDelete(post.id)}>삭제</Button>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default App;
