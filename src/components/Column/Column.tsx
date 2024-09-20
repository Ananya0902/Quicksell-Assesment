import React, { useMemo } from 'react';
import Card from '../Card';
import "./column.css";
import { GrAdd } from 'react-icons/gr';
import { LuMoreHorizontal } from 'react-icons/lu';
import { Ticket, User } from '../../interfaces';
import { getPriorityIcon, getStatusIcon } from '../../utils/helper';
import UserIcon from '../UserIcon';
import { useTheme } from '../../context/ThemeContext';

/**
 * Column Component
 * 
 * This component represents a column in a kanban-style interface,
 * grouping tickets based on status, priority, or user. It displays
 * the title and icon for the grouping, as well as a list of tickets.
 * 
 * @param {Object} props - Component props
 * @param {Ticket[]} props.tickets - Array of tickets to display in the column
 * @param {string} props.grouping - Current grouping criterion (status, priority, or user)
 * @param {string} props.groupBy - The specific group by which tickets are organized
 * @param {Record<string, User>} props.userIdToData - Mapping of user IDs to user data
 * 
 * @returns {JSX.Element} The rendered Column component
 */
function Column({ 
  tickets, 
  grouping, 
  groupBy, 
  userIdToData 
}: { 
  tickets: Ticket[]; 
  grouping: string; 
  groupBy: string; 
  userIdToData: Record<string, User>; 
}) {
  const { isDarkMode } = useTheme();

  // Memoized title based on grouping and groupBy criteria
  const title = useMemo(() => {
    if (grouping === "status" || grouping === "priority") return groupBy;
    if (grouping === "user") return userIdToData[groupBy].name;
  }, [grouping, groupBy, userIdToData]);

  // Memoized icon based on grouping
  const icon = useMemo(() => {
    if (grouping === "status") return getStatusIcon(groupBy);
    if (grouping === "priority") return getPriorityIcon(groupBy);
    if (grouping === "user") return <UserIcon name={userIdToData[groupBy].name} available={userIdToData[groupBy].available} />;
  }, [grouping, groupBy, userIdToData]);

  return (
    <div className={`column ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className='column-header'>
        <div className='column-header-left-container'>
          {icon}
          <div className='column-title'>
            {title}
            <span className='count'>{tickets.length}</span>
          </div>
        </div>
        <div className='column-header-right-container'>
          <GrAdd color="#797d84" size={12} />
          <LuMoreHorizontal color="#797d84" size={14} />
        </div>
      </div>
      <div className='cards-container'>
        {tickets.map((ticket: Ticket) => (
          <Card 
            key={ticket.id} 
            ticket={ticket} 
            userData={userIdToData[ticket.userId]} 
            hideStatusIcon={grouping === "status"} 
            hideProfileIcon={grouping === "user"} 
          />
        ))}
      </div>
    </div>
  );
}

export default Column;
