// import { useEffect, useRef, useState } from 'react';

// export const useTrainerInput = () => {
//   const [inputText, setInputText] = useState('');
//   const [randomText, setRandomText] = useState('');
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [startTime, setStartTime] = useState(null);
//   const [endTime, setEndTime] = useState(null);
//   const [strictMode, setStrictMode] = useState(false);
//   const [pressedKey, setPressedKey] = useState(null);
//   const [errorCount, setErrorCount] = useState(0);
//   const [errorCountStrictMode, setErrorCountStrictMode] = useState(0);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     generateRandomText();
//     inputRef.current.focus();
//     document.addEventListener('keydown', handleKeyDown);
//     document.addEventListener('keyup', handleKeyUp);
//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//       document.removeEventListener('keyup', handleKeyUp);
//     };
//     // eslint-disable-next-line
//   }, []);

//   useEffect(() => {
//     if (!endTime) {
//       inputRef.current.focus();
//     }
//   }, [endTime]);

//   const generateRandomText = () => {
//     // const russianTexts = [
//     //   'Пример случайного текста на русском языке.',
//     //   'Еще одно предложение для тренировки печати.',
//     //   'Третье предложение для проверки навыков.',
//     // ];

//     const texts = [
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//       'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
//       'Nunc luctus nisi vitae nisl dictum ornare.',
//       'Nulla ac diam feugiat, sollicitudin urna ut, aliquam lectus.',
//       'Sed auctor lacus sed finibus vestibulum.',
//       'Vestibulum aliquam mauris ac metus sollicitudin, vitae aliquam mauris auctor.',
//       'In id urna vitae nulla efficitur tempus.',
//       'Mauris euismod turpis id sem scelerisque congue.',
//       'Vivamus in nulla non purus sagittis venenatis id in ex.',
//       'Aliquam consequat nunc nec bibendum vulputate.',
//     ];

//     const numberOfSentences = 5; // Указывает количество случайных предложений, которые нужно выбрать
//     const randomSentences = [];

//     for (let i = 0; i < numberOfSentences; i++) {
//       const randomIndex = Math.floor(Math.random() * texts.length);
//       randomSentences.push(texts[randomIndex]);
//     }

//     const randomText = randomSentences.join(' '); // Объединяем предложения в одну строку, разделяя их пробелами
//     setRandomText(randomText);
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === randomText[currentIndex]) {
//       handleCorrectChar();
//     } else if (strictMode) {
//       event.preventDefault();
//       setErrorCount((prevCount) => prevCount + 1);
//       if (inputText.length > currentIndex) {
//         setInputText(inputText.slice(0, currentIndex));
//       }
//     }
//     setPressedKey(event.key);
//   };

//   const handleKeyUp = () => {
//     setPressedKey(null);
//   };

//   const handleInputChange = (event) => {
//     const { value } = event.target;

//     if (strictMode) {
//       const enteredText = value.slice(inputText.length);
//       if (enteredText === randomText[currentIndex]) {
//         setInputText(value);
//         setCurrentIndex((prevIndex) => prevIndex + 1);
//         if (value.length === randomText.length) {
//           finishTraining();
//         }
//       } else {
//         setErrorCountStrictMode((prevCount) => prevCount + 1);
//       }
//     } else {
//       setInputText(value);
//       setCurrentIndex(value.length);
//       if (value.length === randomText.length) {
//         finishTraining();
//       }
//     }

//     if (value.length === 1 && !startTime) {
//       setStartTime(Date.now());
//     }
//   };

//   const handleCorrectChar = () => {
//     setCurrentIndex((prevIndex) => prevIndex + 1);
//     if (currentIndex === randomText.length - 1) {
//       finishTraining();
//     }
//   };

//   const finishTraining = () => {
//     if (startTime) {
//       setErrorCount((prevCount) => prevCount + (randomText.length - inputText.length));
//       setEndTime(Date.now());
//     }
//   };

//   const resetTraining = () => {
//     setInputText('');
//     setCurrentIndex(0);
//     setStartTime(null);
//     setEndTime(null);
//     setErrorCount(0);
//     setErrorCountStrictMode(0);
//     generateRandomText();
//     setTimeout(() => inputRef.current.focus(), 0);
//   };

//   const calculateAccuracy = () => {
//     if (strictMode) {
//       const accuracy = 100 - (errorCountStrictMode / (inputText.length + errorCountStrictMode) * 100);
//       return accuracy.toFixed(2);
//     }
//     let errorCount = 0;
//     for (let i = 0; i < inputText.length; i++) {
//       if (inputText[i] !== randomText[i]) {
//         errorCount++;
//       }
//     }
//     const accuracy = ((inputText.length - Math.floor(errorCount / (6 - 2))) / inputText.length) * 100;
//     return accuracy.toFixed(2);
//   };

//   const calculateSpeed = () => {
//     if (endTime && startTime) {
//       const timeInSeconds = (endTime - startTime) / 1000;
//       const charactersTyped = inputText.length;
//       return Math.floor((charactersTyped / timeInSeconds) * 60);
//     }
//     return 0;
//   };

//   const handleFinishClick = () => {
//     finishTraining();
//   };

//   const handleCheckboxChange = () => {
//     resetTraining();
//     setStrictMode(!strictMode);
//   };

//   const handleEnterPress = (event) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       finishTraining();
//     }
//   };

//   return {
//     inputText,
//     randomText,
//     currentIndex,
//     strictMode,
//     pressedKey,
//     errorCount,
//     errorCountStrictMode,
//     inputRef,
//     startTime,
//     endTime,
//     handleKeyDown,
//     handleKeyUp,
//     handleInputChange,
//     handleFinishClick,
//     handleCheckboxChange,
//     handleEnterPress,
//     finishTraining,
//     resetTraining,
//     calculateAccuracy,
//     calculateSpeed,
//   };
// };



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
  const [language, setLanguage] = useState('russian'); // Значение по умолчанию - русский язык


  useEffect(() => {
    generateRandomText();
    inputRef.current.focus();
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!endTime) {
      inputRef.current.focus();
    }
  }, [endTime]);

  const toggleLanguage = () => {
    console.log('switch');
    setLanguage((prevLanguage) => (prevLanguage === 'russian' ? 'english' : 'russian'));
    resetTraining();
    generateRandomText();
  };
  
  
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
    console.log(language);

    const numberOfSentences = 5; // Указывает количество случайных предложений, которые нужно выбрать
    const randomSentences = [];

    for (let i = 0; i < numberOfSentences; i++) {
      const randomIndex = Math.floor(Math.random() * texts.length);
      randomSentences.push(texts[randomIndex]);
    }

    const randomText = randomSentences.join(' '); // Объединяем предложения в одну строку, разделяя их пробелами
    setRandomText(randomText);
  };

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

  const handleKeyUp = () => {
    setPressedKey(null);
  };

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

  const handleCorrectChar = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    if (currentIndex === randomText.length - 1) {
      finishTraining();
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
      if (inputText[i] !== randomText[i]) {
        errorCount++;
      }
    }
    const accuracy = ((inputText.length - Math.floor(errorCount / (6 - 2))) / inputText.length) * 100;
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
    resetTraining();
    setStrictMode(!strictMode);
  };

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