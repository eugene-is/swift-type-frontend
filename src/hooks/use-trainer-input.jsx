import { useEffect, useRef, useState } from 'react';

export const useTrainerInput = () => {
  const [inputText, setInputText] = useState('');
  const [randomText, setRandomText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [strictMode, setStrictMode] = useState(false);
  const [pressedKey, setPressedKey] = useState(null);
  const [errorCount, setErrorCount] = useState(0);
  const [errorCountStrictMode, setErrorCountStrictMode] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    generateRandomText();
    inputRef.current.focus();
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (!endTime) {
      inputRef.current.focus();
    }
  }, [endTime]);

  const generateRandomText = () => {
    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    setRandomText(text);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      finishTraining();
    } else if (event.key === randomText[currentIndex]) {
      handleCorrectChar();
    } else if (strictMode) {
      event.preventDefault();
      setErrorCount((prevCount) => prevCount + 1);
      console.log(errorCount);
      if (inputText.length > currentIndex) {
        setInputText(inputText.slice(0, currentIndex));
      }
    }
    setPressedKey(event.key);
  };

  const handleKeyUp = () => {
    setPressedKey(null);
  };

  const handleInputChange = (event) => {
    const { value } = event.target;

    if (strictMode) {
      const enteredText = value.slice(inputText.length);
      console.log(`${enteredText}`);
      if (enteredText === randomText[currentIndex]) {
        setInputText(value);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        console.log(errorCount);
        setErrorCountStrictMode((prevCount) => prevCount + 1);
      }
    } else {
      setInputText(value);
      setCurrentIndex(value.length);
    }
    if (value.length === 1 && !startTime) {
      setStartTime(Date.now());
    }
  };

  const handleCorrectChar = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    if (currentIndex === randomText.length - 1) {
      setTimeout(finishTraining, 0); // Вызов finishTraining после обновления состояния currentIndex
    }
  };

  const finishTraining = () => {
    if (startTime) {
      setErrorCount((prevCount) => prevCount + (randomText.length - inputText.length));
      setEndTime(Date.now());
    }
  };

  const resetTraining = () => {
    setInputText('');
    setCurrentIndex(0);
    setStartTime(null);
    setEndTime(null);
    setErrorCount(0);
    setErrorCountStrictMode(0);
    generateRandomText();
    setTimeout(() => inputRef.current.focus(), 0);
  };

  const calculateAccuracy = () => {
    if (strictMode) {
      const accuracy = 100 - (errorCountStrictMode / (inputText.length + errorCountStrictMode) * 100);
      return accuracy.toFixed(2);
    }
    let errorCount = 0;
    for (let i = 0; i < inputText.length; i++) {
      if (inputText[i] !== randomText[i] && (strictMode || inputText[i] !== ' ')) {
        errorCount++;
      }
    }

    const accuracy = ((inputText.length - errorCount) / inputText.length) * 100;
    return accuracy.toFixed(2);
  };

  const calculateSpeed = () => {
    if (endTime && startTime) {
      const timeInSeconds = (endTime - startTime) / 1000;
      const charactersTyped = inputText.length;
      return Math.floor((charactersTyped / timeInSeconds) * 60);
    }
    return 0;
  };

  const handleFinishClick = () => {
    finishTraining();
  };

  const handleCheckboxChange = () => {
    setStrictMode(!strictMode);
  };

  const handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      finishTraining();
    }
  };

  return {
    inputText,
    randomText,
    currentIndex,
    strictMode,
    pressedKey,
    errorCount,
    errorCountStrictMode,
    inputRef,
    startTime,
    endTime,
    handleKeyDown,
    handleKeyUp,
    handleInputChange,
    handleFinishClick,
    handleCheckboxChange,
    handleEnterPress,
    finishTraining,
    resetTraining,
    calculateAccuracy,
    calculateSpeed,
  };
};
