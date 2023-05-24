import React, { useState, useEffect, useRef } from 'react';
import styles from './TrainerInput.module.scss';

// Компонент для визуализации клавиатуры
const Keyboard = ({ pressedKey }) => {
  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  return (
    <div className={styles.keyboard}>
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.btn}>
          {row.map((key) => (
            <div
              key={key}
              className={`${styles.key} ${pressedKey === key.toLowerCase() ? styles.active : ''} ${pressedKey === key ? styles.active : ''}`}
            >
              {key}
              <sup>{key.toLowerCase()}</sup>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const TrainerInput = () => {
  const [inputText, setInputText] = useState('');
  const [randomText, setRandomText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [strictMode, setStrictMode] = useState(false);
  const [pressedKey, setPressedKey] = useState(null); // Клавиша, нажатая на физической клавиатуре
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
    // Здесь можно использовать любой механизм для генерации случайного текста
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
      if (inputText.length > currentIndex) {
        setInputText(inputText.slice(0, currentIndex));
      }
    }
    setPressedKey(event.key); // Записываем нажатую клавишу
  };

  const handleKeyUp = () => {
    setPressedKey(null); // Сбрасываем нажатую клавишу
  };

  const handleCorrectChar = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    if (!startTime) {
      setStartTime(Date.now());
    }
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputText(inputValue);
    const lastInputChar = inputValue[inputValue.length - 1];
    if (lastInputChar === randomText[currentIndex]) {
      handleCorrectChar();
    } else if (strictMode) {
      setInputText(inputValue.slice(0, -1)); // Удаляем последний неправильный символ
    }
  };

  const finishTraining = () => {
    if (startTime) {
      setEndTime(Date.now());
    }
  };

  const resetTraining = () => {
    setInputText('');
    setCurrentIndex(0);
    setStartTime(null);
    setEndTime(null);
    generateRandomText();
    setTimeout(() => inputRef.current.focus(), 0); // Устанавливаем фокус после обновления компонента
  };

  const calculateAccuracy = () => {
    const errorCount = Array.from(inputText).reduce((count, char, index) => {
      if (char !== randomText[index] && (strictMode || inputText[index] !== ' ')) {
        return count + 1;
      }
      return count;
    }, 0);

    const accuracy = ((inputText.length - errorCount) / inputText.length) * 100;
    return accuracy.toFixed(2); // Округляем точность до двух знаков после запятой
  };

  const calculateSpeed = () => {
    const timeInSeconds = (endTime - startTime) / 1000;
    const charactersTyped = inputText.length;
    return Math.floor((charactersTyped / timeInSeconds) * 60);
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

  return (
    <div>
      <h2>Тренировка слепой печати</h2>
      {!endTime ? (
        <div>
          <label>
            <input type="checkbox" checked={strictMode} onChange={handleCheckboxChange} />
            Строгий режим
          </label>
          <p>Текст для печати:</p>
          <p>
            {randomText.split('').map((char, index) => (
              <span key={index} className={index === currentIndex ? 'current' : ''}>
                {char}
              </span>
            ))}
          </p>
          <Keyboard pressedKey={pressedKey} /> {/* Визуализация клавиатуры */}
          <div className={`${styles.container} ${styles.inputForm}`}>
            <form action="">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={handleEnterPress}
              />
            </form>
          </div>

          <p>Для завершения тренировки нажмите ESC или нажмите кнопку:</p>
          <button onClick={handleFinishClick}>Завершить тренировку</button>
        </div>
      ) : (
        <div>
          <p>Тренировка завершена!</p>
          <p>Точность: {calculateAccuracy()}%</p>
          <p>Скорость: {calculateSpeed()} символов в минуту</p>
          <button onClick={resetTraining}>Начать новую тренировку</button>
        </div>
      )}
      <div className={`${styles.container} ${styles.text}`} id="textExample"></div>
    </div>
  );
};
