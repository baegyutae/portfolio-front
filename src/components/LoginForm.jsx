import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 환경 변수를 사용하여 백엔드 주소 참조
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );
      const data = await response.json(); // 응답 데이터를 JSON 형태로 파싱
      if (response.ok) {
        // 응답 바디에서 토큰 추출하여 로컬 스토리지에 저장
        const token = data.token;
        localStorage.setItem("token", `${token}`);
        navigate("/postlist"); // 로그인 성공 후 게시글 목록 페이지로 리다이렉션
      } else {
        // 로그인 실패 시 에러 메시지 표시
        throw new Error(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Login failed: " + error.message); // 사용자에게 로그인 실패 메시지 표시
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            로그인
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 1, mb: 2 }}
            onClick={() => navigate("/signup")}
          >
            회원가입
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginForm;
