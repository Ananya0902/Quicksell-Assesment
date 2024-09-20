import React from 'react';
import './card.css'
import UserIcon from '../UserIcon';
import { LuMoreHorizontal } from 'react-icons/lu';
import { Ticket, User } from '../../interfaces';
import { getStatusIcon } from '../../utils/helper';
import { useTheme } from '../../context/ThemeContext';

/**
 * Card Component
 * 
 * This component displays a ticket card, showing its details such as ID, title,
 * status, tags, and associated user information. It supports dark mode theming.
 * 
 * @param {Object} props - Component props
 * @param {Ticket} props.ticket - The ticket object containing ticket details
 * @param {User} props.userData - The user object associated with the ticket
 * @param {boolean} props.hideStatusIcon - Flag to hide the status icon
 * @param {boolean} props.hideProfileIcon - Flag to hide the profile icon
 * 
 * @returns {JSX.Element} The rendered Card component
 */

function Card({ ticket, userData, hideStatusIcon, hideProfileIcon }: { ticket: Ticket, userData: User, hideStatusIcon: boolean, hideProfileIcon: boolean }) {
  const {isDarkMode , toggleTheme} =useTheme();


  return (
    <div className={`card ${isDarkMode? 'dark-mode' : ''}`}> 

      <div className='top-container'>
        <div className='ticket-id'>{ticket.id}</div>
        {hideProfileIcon ? null : <UserIcon name={userData.name} available={userData.available} />}
      </div>
      <div className='middle-container'>
        {hideStatusIcon ? null : getStatusIcon(ticket.status)}
        <div className='title'>{ticket.title}</div>
      </div>
      <div className='bottom-container'>
        <div className='more-icon-container'>
          <LuMoreHorizontal color="#797d84" />
        </div>
        {ticket.tag.map((t: string) => (
          <div key={t} className='tag-container'>
            <div className='tag-icon'></div>
            <div className='tag-text'>{t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
