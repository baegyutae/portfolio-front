import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostDetail from "./components/PostDetail";
import PostEditForm from "./components/PostEditForm";
import FileUpload from "./components/FileUpload";
import LoginForm from "./pages/LoginPage/LoginForm";
import SignupForm from "./pages/SignupPage/SignupForm";
import PrivateRoute from "./routes/PrivateRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route index element={<PostList />} />
              <Route path="create" element={<PostForm />} />
              <Route path="posts/:postId" element={<PostDetail />} />
              <Route path="posts/edit/:postId" element={<PostEditForm />} />
              <Route path="upload" element={<FileUpload />} />
              <Route path="postlist" element={<PostList />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
