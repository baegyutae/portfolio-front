import React, { useState } from "react";
import { TextField, Button, Typography, Card, Grid } from "@mui/material";

function CommentEditForm({ comment, onUpdateComment }) {
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isEditing, setIsEditing] = useState(false);

  const handleContentChange = (event) => {
    setEditedContent(event.target.value);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = () => {
    onUpdateComment(comment.id, editedContent);
    setIsEditing(false);
  };

  return (
    <Card sx={{ mb: 5, overflow: "visible" }}>
      <Grid container spacing={2} alignItems="center" sx={{ p: 2 }}>
        <Grid item xs={12} sm={isEditing ? 8 : 10}>
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            {comment.username}
          </Typography>
          {isEditing ? (
            <TextField
              fullWidth
              variant="outlined"
              value={editedContent}
              onChange={handleContentChange}
              multiline
              rows={2}
              margin="normal"
            />
          ) : (
            <Typography variant="body2">{comment.content}</Typography>
          )}
        </Grid>
        {isEditing ? (
          <Grid item xs={12} sm={4} container spacing={1}>
            <Grid item>
              <Button size="small" color="primary" onClick={handleUpdate}>
                저장
              </Button>
            </Grid>
            <Grid item>
              <Button size="small" onClick={handleEditToggle}>
                취소
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={12} sm={2} textAlign="right">
            <Button size="small" onClick={handleEditToggle}>
              수정
            </Button>
          </Grid>
        )}
      </Grid>
    </Card>
  );
}

export default CommentEditForm;
