// src/App.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserData from "./components/UserData";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const themeClass = isDarkMode ? "bg-dark text-light" : "bg-light text-dark";

  return (
    <div className={`min-vh-100 ${themeClass}`}>
      <div className="container py-5">
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <UserData isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}

export default App;
