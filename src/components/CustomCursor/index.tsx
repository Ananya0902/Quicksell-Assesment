import React, { useState, useEffect } from 'react';
import './CustomCursor.css'; // Import the custom CSS for the cursor

/**
 * CustomCursor Component
 * 
 * This component renders a custom cursor that follows the mouse position 
 * with a trailing effect. It also changes appearance when hovering over 
 * specific elements like links and buttons.
 * 
 * @returns {JSX.Element} The rendered CustomCursor component
 */
const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [trailingPosition, setTrailingPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hovering, setHovering] = useState<boolean>(false);

  // Update the actual mouse position on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Add a trailing effect to the cursor
  useEffect(() => {
    const trailCursor = () => {
      setTrailingPosition((prevPos) => {
        const deltaX = position.x - prevPos.x;
        const deltaY = position.y - prevPos.y;
        return {
          x: prevPos.x + deltaX * 0.1, // Adjust the multiplier for smoother trailing
          y: prevPos.y + deltaY * 0.1,
        };
      });
    };

    const animationFrameId = requestAnimationFrame(trailCursor);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  // Handle hover states for specific elements
  useEffect(() => {
    const elementsToHover = document.querySelectorAll('a, button, .hover-element');

    const handleMouseEnter = () => setHovering(true);
    const handleMouseLeave = () => setHovering(false);

    elementsToHover.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      elementsToHover.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        className={`custom-cursor ${hovering ? 'custom-cursor--hover' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      {/* Trailing cursor */}
      <div
        className="cursor-trail"
        style={{ left: `${trailingPosition.x}px`, top: `${trailingPosition.y}px` }}
      />
    </>
  );
};

export default CustomCursor;
