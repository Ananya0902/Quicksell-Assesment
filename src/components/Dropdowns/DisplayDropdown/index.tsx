import React, { useCallback, useEffect, useRef, useState, ChangeEvent } from 'react';
import './displayDropdown.css';
import { LuSettings2 } from "react-icons/lu";
import { BiChevronDown } from "react-icons/bi";
import { useTheme } from '../../../context/ThemeContext';

interface DisplayDropdownProps {
  grouping: string;
  setGrouping: (grouping: string) => void;
  ordering: string;
  setOrdering: (ordering: string) => void;
}

/**
 * DisplayDropdown Component
 * 
 * This component provides dropdowns for grouping and ordering options.
 * It allows the user to select how to display items in the application.
 * 
 * @param {string} grouping - The current grouping method.
 * @param {(grouping: string) => void} setGrouping - Function to set the grouping method.
 * @param {string} ordering - The current ordering method.
 * @param {(ordering: string) => void} setOrdering - Function to set the ordering method.
 * @returns {JSX.Element} The rendered DisplayDropdown component.
 */

function DisplayDropdown({ grouping, setGrouping, ordering, setOrdering }: DisplayDropdownProps) {
  const [visible, setVisible] = useState(false);
  const componentRef = useRef<HTMLDivElement | null>(null);
  const { isDarkMode } = useTheme();

  const openDropdown = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
      setVisible(false);
    }
  }, []);

  const onGroupingChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setGrouping(e.target.value);
    setVisible(false); // Close dropdown on selection
  }, [setGrouping]);

  const onOrderingChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setOrdering(e.target.value);
    setVisible(false); // Close dropdown on selection
  }, [setOrdering]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className={`display-dropdown ${isDarkMode ? 'dark-mode' : ''}`} ref={componentRef}>
      <div className='dropdown-label-container' onClick={openDropdown}>
        <LuSettings2 color='#6b6f76' />
        <div className='dropdown-label'>Display</div>
        <BiChevronDown color='#6b6f76' />
      </div>
      <div className={`dropdown-content-container ${visible ? "visible" : ""}`}>
        <div className='dropdown-content-row'>
          <div className='dropdown-content-label'>Grouping</div>
          <select name="grouping" id="grouping" value={grouping} onChange={onGroupingChange}>
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        <div className='dropdown-content-row'>
          <div className='dropdown-content-label'>Ordering</div>
          <select name="ordering" id="ordering" value={ordering} onChange={onOrderingChange}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default DisplayDropdown;
