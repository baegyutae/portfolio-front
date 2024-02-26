import React from "react";
import "./NavigationBar.css";

class NavigationBar extends React.Component {
  render() {
    return (
      <header className="navbar">
        <div className="container">
          <h1 className="logo">게시판</h1>
          <nav className="nav-links">
          </nav>
        </div>
      </header>
    );
  }
}

export default NavigationBar;