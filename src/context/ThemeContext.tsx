import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * ThemeContextType Interface
 * 
 * This defines the structure of the theme context, containing:
 * - `isDarkMode`: A boolean indicating if dark mode is active.
 * - `toggleTheme`: A function to toggle between dark and light themes.
 */
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// Create the ThemeContext with an undefined initial value to enforce usage within the provider
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;  // Children elements to be wrapped by the provider
}

/**
 * ThemeProvider Component
 * 
 * This component provides the theme state (dark mode or light mode) and a function to toggle it
 * to its children via context. It also persists the theme in localStorage and updates the body 
 * class to reflect the current theme.
 * 
 * @param {ReactNode} children - The components that will have access to the theme context.
 * @returns {JSX.Element} The ThemeProvider component that wraps around its children.
 */
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize the theme based on localStorage, defaulting to light mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem("theme");
    return savedMode === "dark";
  });

  // Effect to update the body class and localStorage whenever isDarkMode changes
  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Function to toggle between dark and light mode
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    // Provide the theme state and toggle function to children via context
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * useTheme Hook
 * 
 * This custom hook allows components to access the current theme state and toggle function.
 * 
 * @returns {ThemeContextType} The current theme state and toggle function.
 * @throws Will throw an error if used outside of a ThemeProvider.
 */
const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeProvider, useTheme };
