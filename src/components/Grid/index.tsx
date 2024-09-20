import React, { useCallback, useMemo } from 'react';
import './grid.css';
import Column from '../Column/Column';
import { Ticket, User } from '../../interfaces';
import { useTheme } from '../../context/ThemeContext';

/**
 * Grid Component
 * 
 * This component renders a grid of columns, where each column contains a list of tickets
 * grouped by a specific criterion. The component also integrates with a theme context to allow
 * switching between dark mode and light mode.
 * 
 * Props:
 * @param {Record<string, Ticket[]>} gridData - An object where keys represent group identifiers and values are arrays of tickets.
 * @param {string} grouping - The criterion by which tickets are grouped (e.g., by user, status, or priority).
 * @param {Record<string, User>} userIdToData - A mapping of user IDs to user details, which can be used to display information about users.
 */

function Grid({ gridData, grouping, userIdToData }: { gridData: Record<string, Ticket[]>, grouping: string, userIdToData: Record<string, User> }) {
    // Memoizes the keys of gridData to avoid recalculating them on every render unless gridData changes
    const keys: string[] = useMemo(() => Object.keys(gridData), [gridData]);

    // Uses theme context to get current theme mode (dark/light) and a function to toggle the theme
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        // Applies a CSS class based on the current theme (dark mode or light mode)
        <div className={`grid ${isDarkMode ? 'dark-mode' : ''}`}>
            {/* Maps over the keys of gridData and renders a Column component for each key */}
            {keys.map((k: string) => (
                <Column 
                    key={k} 
                    tickets={gridData[k] as Ticket[]} 
                    grouping={grouping} 
                    groupBy={k} 
                    userIdToData={userIdToData} 
                />
            ))}
        </div>
    );
}

export default Grid;
