import { useEffect, useRef, useState } from 'react';

/**
 * Хук для управления тренировкой ввода текста.
 * 
 * @returns {object} - Возвращает объект с различными функциями и значениями для управления тренировкой.
 */

export const useTrainerInput = () => {
  const [inputText, setInputText] = useState(''); // Текущий введенный текст
  const [randomText, setRandomText] = useState(''); // Случайно сгенерированный текст
  const [currentIndex, setCurrentIndex] = useState(0); // Текущий индекс символа в тексте
  const [startTime, setStartTime] = useState(null); // Время начала тренировки
  const [endTime, setEndTime] = useState(null); // Время окончания тренировки
  const [strictMode, setStrictMode] = useState(false); // Режим строгой проверки ошибок
  const [pressedKey, setPressedKey] = useState(null); // Нажатая клавиша
  const [errorCount, setErrorCount] = useState(0); // Количество ошибок
  const [errorCountStrictMode, setErrorCountStrictMode] = useState(0); // Количество ошибок в строгом режиме
  const inputRef = useRef(null); // Ссылка на поле ввода
  const [language, setLanguage] = useState('russian'); // Язык текста
  const [highlightMode, setHighlightMode] = useState(false); // Режим подсветки

  useEffect(() => {
    generateRandomText();
    inputRef.current.focus();
    document.addEventListener('keydown', handleKeyDown); // Обработчик нажатия клавиши
    document.addEventListener('keyup', handleKeyUp); // Обработчик отпускания клавиши
    return () => {
      document.removeEventListener('keydown', handleKeyDown); // Удаление обработчика нажатия клавиши
      document.removeEventListener('keyup', handleKeyUp); // Удаление обработчика отпускания клавиши
    };
    // eslint-disable-next-line
  }, []); // Пустой массив зависимостей означает, что этот эффект должен выполниться только один раз при монтировании компонента

  useEffect(() => {
    if (!endTime) {
      inputRef.current.focus();
    }
  }, [endTime]);

  /**
   * Переключение языка текста.
   */

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'russian' ? 'english' : 'russian'));
    resetTraining();
    generateRandomText();
  };
  
  /**
   * Генерация случайного текста на основе выбранного языка.
   */

  const generateRandomText = () => {
    const russianTexts = [
      'Пример случайного текста на русском языке.',
      'Еще одно предложение для тренировки печати.',
      'Третье предложение для проверки навыков.',
    ];
  
    const englishTexts = [
      'Example random text in English.',
      'Another sentence for typing practice.',
      'A third sentence to test your skills.',
    ];
  
    const texts = language === 'russian' ? russianTexts : englishTexts;

    const numberOfSentences = 5;
    const randomSentences = [];

    for (let i = 0; i < numberOfSentences; i++) {
      const randomIndex = Math.floor(Math.random() * texts.length);
      randomSentences.push(texts[randomIndex]);
    }

    const randomText = randomSentences.join(' ');
    setRandomText(randomText);
  };

  /**
   * Обработчик нажатия клавиши.
   * 
   * @param {object} event - Событие нажатия клавиши.
   */

  const handleKeyDown = (event) => {
    if (event.key === randomText[currentIndex]) {
      handleCorrectChar();
    } else if (strictMode) {
      event.preventDefault();
      setErrorCount((prevCount) => prevCount + 1);
      if (inputText.length > currentIndex) {
        setInputText(inputText.slice(0, currentIndex));
      }
    }
    setPressedKey(event.key);
  };

  /**
   * Обработчик отпускания клавиши.
   */

  const handleKeyUp = () => {
    setPressedKey(null);
  };

  /**
   * Обработчик изменения ввода текста.
   * 
   * @param {object} event - Событие изменения текста в поле ввода.
   */

  const handleInputChange = (event) => {
    const { value } = event.target;

    if (strictMode) {
      const enteredText = value.slice(inputText.length);
      if (enteredText === randomText[currentIndex]) {
        setInputText(value);
        setCurrentIndex((prevIndex) => prevIndex + 1);
        if (value.length === randomText.length) {
          finishTraining();
        }
      } else {
        setErrorCountStrictMode((prevCount) => prevCount + 1);
      }
    } else {
      setInputText(value);
      setCurrentIndex(value.length);
      if (value.length === randomText.length) {
        finishTraining();
      }
    }

    if (value.length === 1 && !startTime) {
      setStartTime(Date.now());
    }
  };

  /**
   * Обработчик правильного символа.
   */

  const handleCorrectChar = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    if (currentIndex === randomText.length - 1) {
      finishTraining();
    }
  };

  /**
   * Завершение тренировки.
   */

  const finishTraining = () => {
    if (startTime) {
      setErrorCount((prevCount) => prevCount + (randomText.length - inputText.length));
      setEndTime(Date.now());
    }
  };

  /**
   * Сброс тренировки.
   */

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

  /**
   * Расчет точности ввода.
   * 
   * @returns {string} - Точность ввода в процентах.
   */

  const calculateAccuracy = () => {
    if (strictMode) {
      const accuracy = 100 - (errorCountStrictMode / (inputText.length + errorCountStrictMode) * 100);
      return accuracy.toFixed(2);
    }
    let errorCount = 0;
    for (let i = 0; i < inputText.length; i++) {
      if (inputText[i] !== randomText[i]) {
        errorCount++;
      }
    }
    const accuracy = ((inputText.length - Math.floor(errorCount / (6 - 2))) / inputText.length) * 100;
    return accuracy.toFixed(2);
  };

  /**
   * Расчет скорости набора текста.
   * 
   * @returns {number} - Скорость набора текста в символах в минуту.
   */

  const calculateSpeed = () => {
    if (endTime && startTime) {
      const timeInSeconds = (endTime - startTime) / 1000;
      const charactersTyped = inputText.length;
      return Math.floor((charactersTyped / timeInSeconds) * 60);
    }
    return 0;
  };

  /**
   * Обработчик нажатия кнопки "Завершить".
   */

  const handleFinishClick = () => {
    finishTraining();
  };

  /**
   * Обработчик изменения значения чекбокса "Строгий режим".
   */

  const handleCheckboxChange = () => {
    resetTraining();
    setStrictMode(!strictMode);
  };

  /**
   * Обработчик изменения значения чекбокса "Режим подсветки".
   */

  const handleHighlightModeChange = () => {
    setHighlightMode(!highlightMode);
  }

  /**
   * Обработчик нажатия клавиши Enter.
   * 
   * @param {object} event - Событие нажатия клавиши.
   */

  const handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      finishTraining();
    }
  };

  return {
    toggleLanguage,
    inputText,
    randomText,
    highlightMode,
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
    handleHighlightModeChange,
    handleEnterPress,
    finishTraining,
    resetTraining,
    calculateAccuracy,
    calculateSpeed,
  };
};
