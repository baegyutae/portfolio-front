import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          첼시 팬 움짤 커뮤니티
        </Typography>
        <Button color="inherit" component={Link} to="/">
          홈
        </Button>
        <Button color="inherit" component={Link} to="/create">
          게시글 작성
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
