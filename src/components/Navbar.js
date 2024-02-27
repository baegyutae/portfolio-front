import React from "react";
import { AppBar, Toolbar, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" color="primary" sx={{ padding: "0.5rem" }}>
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Typography variant="h5" component="div">
                첼시 팬 움짤 커뮤니티
              </Typography>
            </Link>
          </Grid>
          <Grid item>
            <Button
              color="inherit"
              variant="outlined"
              component={Link}
              to="/"
              sx={{ marginX: "0.5rem" }}
            >
              홈
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              component={Link}
              to="/create"
              sx={{ marginX: "0.5rem" }}
            >
              게시글 작성
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
