import React from "react";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostDetail from "./components/PostDetail";
import PostEditForm from "./components/PostEditForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/create" element={<PostForm />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
        <Route path="/posts/edit/:postId" element={<PostEditForm />} />
      </Routes>
    </Router>
  );
}

export default App;
