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
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // 입력 필드 변경 시 유효성 검사를 수행하고 오류 상태를 업데이트하는 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));

    // 유효성 검사 로직
    let error = "";
    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "올바른 이메일 형식이 아닙니다.";
    } else if (name === "username" && !value.trim()) {
      error = "사용자 이름은 필수입니다.";
    } else if (
      name === "password" &&
      !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/.test(value)
    ) {
      error =
        "비밀번호는 숫자, 소문자, 대문자, 특수문자를 포함하여 8자 이상이어야 합니다.";
    } else {
      error = ""; // 유효성 검사를 통과했다면 오류 메시지를 비웁니다.
    }

    setErrors((prevState) => ({ ...prevState, [name]: error }));
  };

  const validateForm = () => {
    const formIsValid = Object.values(errors).every((x) => x === "");
    return formIsValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      alert("양식을 올바르게 채워주세요.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/user/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        navigate("/login");
      } else {
        const errorData = await response.json();
        setErrors({ general: errorData.message || "회원가입 실패" });
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
            value={formData.username}
            onChange={handleChange}
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
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email || "예: user@example.com"}
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
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={
              errors.password || "숫자, 대소문자, 특수문자 포함 8자 이상"
            }
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
