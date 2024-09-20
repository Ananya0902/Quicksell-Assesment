import React from "react";
import { useTheme } from '../../context/ThemeContext';  // Adjust the path as necessary
import "./Toggle.css";

/**
 * Toggle Component
 * 
 * This component provides a switch to toggle between light and dark themes.
 * It uses the `useTheme` hook to access the current theme state (`isDarkMode`) 
 * and the `toggleTheme` function to switch themes.
 * 
 * @returns {JSX.Element} The rendered Toggle component.
 */

const Toggle: React.FC = () => {
  // Retrieve the current theme state and toggle function from the theme context
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="toggle-container">
      {/* The toggle switch is a checkbox that changes between checked/unchecked based on the theme */}
      <label className="toggle-switch">
        <input 
          type="checkbox" 
          checked={isDarkMode}  // If dark mode is active, the switch is checked
          onChange={toggleTheme}  // Calls toggleTheme when the user changes the switch state
          aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}  // Accessible label
        />
        <span className="slider"></span>  {/* Custom slider element for the toggle switch */}
      </label>
    </div>
  );
};

export default Toggle;
