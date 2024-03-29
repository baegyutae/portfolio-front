import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  const location = useLocation(); // 현재 위치 정보를 가져옴

  return token ? (
    <Outlet />
  ) : (
    // 로그인 페이지로 리다이렉션하면서 현재 경로 정보를 state로 전달
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
