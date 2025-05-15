// src/components/ThemeToggle.jsx
import React from "react";

function ThemeToggle({ isDarkMode, toggleTheme }) {
  return (
    <div className="text-end mb-3">
      <button className="btn btn-sm btn-outline-secondary" onClick={toggleTheme}>
        Switch to {isDarkMode ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
}

export default ThemeToggle;
