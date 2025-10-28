import React, { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number; 
  onComplete?: () => void;
}

const TypingText: React.FC<TypingTextProps> = ({ text, speed = 50, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index === text.length) {
        clearInterval(interval);
        onComplete && onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return <span>{displayedText}</span>;
};

export default TypingText;
