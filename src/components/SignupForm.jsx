import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  FormHelperText,
} from "@mui/material";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({}); // 폼 제출 시 오류 초기화
    try {
      // 환경 변수를 사용하여 백엔드 주소 참조
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/user/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );
      if (response.ok) {
        // 회원가입 성공 메시지 표시 후 로그인 페이지로 이동
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        navigate("/login");
      } else {
        // 서버로부터 받은 오류 메시지 처리
        const errorData = await response.json();
        if (errorData.errors) {
          // 오류 메시지가 여러 개인 경우(예: Validation 오류)
          const formattedErrors = {};
          errorData.errors.forEach((error) => {
            formattedErrors[error.field] = error.defaultMessage;
          });
          setErrors(formattedErrors);
        } else {
          // 단일 오류 메시지 처리(예: 사용자 정의 오류 메시지)
          setErrors({ general: errorData.message });
        }
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setErrors({ general: "네트워크 오류로 회원가입에 실패했습니다." });
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
          회원가입
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="사용자 이름"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일 주소"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            회원가입
          </Button>
          {errors.general && (
            <FormHelperText error>{errors.general}</FormHelperText>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default SignupForm;
