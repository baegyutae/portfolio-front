import React from "react";
import { AppBar, Toolbar, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item xs={8}>
            <Typography variant="h6">첼시 팬 움짤 커뮤니티</Typography>
          </Grid>
          <Grid item xs={2}>
            <Button color="inherit" component={Link} to="/">
              홈
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button color="inherit" component={Link} to="/create">
              게시글 작성
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
