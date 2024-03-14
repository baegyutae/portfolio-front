import React from "react";
import { AppBar, Toolbar, Typography, Button, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const isLoggedIn = () => !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); // 로컬 스토리지에서 token 삭제
    navigate("/login"); // 로그인 페이지로 리다이렉션
  };

  return (
    <AppBar position="static" color="primary" sx={{ padding: "0.5rem" }}>
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              첼시 팬 움짤 커뮤니티
            </Typography>
          </Grid>
          <Grid item>
            {isLoggedIn() && ( // token 기반으로 로그인 상태 판별
              <>
                <Button
                  color="inherit"
                  variant="outlined"
                  component={Link}
                  to="/postlist"
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
                <Button
                  color="inherit"
                  variant="outlined"
                  onClick={handleLogout}
                  sx={{ marginX: "0.5rem" }}
                >
                  로그아웃
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
