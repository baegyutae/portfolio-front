import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../actions/userActions";

export const useAuthForm = () => {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      // 로그인 요청 로직
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formState.username,
            password: formState.password,
          }),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error?.message || "로그인 실패");
      }

      const { data } = await response.json();
      dispatch(loginSuccess(data));
      localStorage.setItem("token", data.token);
      navigate("/postlist");
    } catch (error) {
      console.error("Login error:", error);
      alert("로그인 실패: " + error.message);
    }
  };

  return {
    formState,
    handleInputChange,
    handleLoginSubmit,
  };
};
