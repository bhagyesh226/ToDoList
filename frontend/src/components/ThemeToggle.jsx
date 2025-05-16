// src/components/ThemeToggle.jsx
import React from "react";

function ThemeToggle({ isDarkMode, toggleTheme }) {
  return (
  <div className="d-flex justify-content-end mb-3">
  <div className="form-check form-switch">
    <input
      className="form-check-input"
      type="checkbox"
      id="themeSwitch"
      checked={isDarkMode}
      onChange={toggleTheme}
    />
    <label className="form-check-label" htmlFor="themeSwitch">
      Switch to {isDarkMode ? "Light" : "Dark"} Mode
    </label>
  </div>
</div>
  );
}

export default ThemeToggle;
