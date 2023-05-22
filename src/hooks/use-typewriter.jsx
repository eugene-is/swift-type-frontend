import { useEffect, useState } from 'react';

export const useTypewriter = (text, speed = 100) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      } else if (currentIndex === text.length) {
        setShowCursor(false);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }
    }, speed);

    return () => {
      clearTimeout(timer);
    };
  }, [currentIndex, speed, text]);

  useEffect(() => {
    if (currentIndex > text.length) {
      setShowCursor(false);
    }
  }, [currentIndex, text]);

  return displayText + (showCursor ? '|' : '');
};
