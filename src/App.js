import React from "react";
import "./App.css";
import NavigationBar from "./components/NavigationBar";

class App extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar /> {/* NavigationBar 컴포넌트 사용 */}
        {/* 다른 컴포넌트들을 여기에 추가할 수 있습니다 */}
      </div>
    );
  }
}

export default App;
