import React from "react";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostList />} />
      </Routes>
    </Router>
  );
}

export default App;
