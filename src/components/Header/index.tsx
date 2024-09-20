import React from 'react';
import './header.css';
import DisplayDropdown from '../Dropdowns/DisplayDropdown';
import { useTheme } from '../../context/ThemeContext';
import Toggle from '../Toggle';

/**
 * Header Component
 * 
 * This component renders a header section that includes a dropdown for selecting display options
 * (grouping and ordering) and a toggle switch for changing the theme (light/dark mode).
 * 
 * Props:
 * @param {string} grouping - The current grouping criterion (e.g., by user, status, etc.).
 * @param {(grouping: string) => void} setGrouping - A function to set the new grouping criterion.
 * @param {string} ordering - The current ordering criterion (e.g., ascending, descending).
 * @param {(ordering: string) => void} setOrdering - A function to set the new ordering criterion.
 */

function Header({ grouping, setGrouping, ordering, setOrdering }: { grouping: string, setGrouping: (grouping: string) => void, ordering: string, setOrdering: (ordering: string) => void }) {
    // Uses theme context to get current theme mode (dark/light) and a function to toggle the theme
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        // Applies a CSS class to the header based on the current theme (dark mode or light mode)
        <header className={`header ${isDarkMode ? 'dark-mode' : ''}`}>
            
            {/* Dropdown component to select grouping and ordering options */}
            <DisplayDropdown 
                grouping={grouping} 
                setGrouping={setGrouping} 
                ordering={ordering} 
                setOrdering={setOrdering} 
            />
            
            {/* Toggle switch for switching between dark mode and light mode */}
            <Toggle />
        </header>
    );
}

export default Header;
