// На его основе был сделан hook use-trainer-input, components TrainingFished, TrainingProgress.
// А сейчас я перенес этот компонент в pages trainer
// import React, { useEffect, useRef, useState } from 'react'
// import styles from './TrainerInput.module.scss'

// import { Keyboard } from '../Keyboard'

// export const TrainerInput = () => {
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
//   }, []);

//   useEffect(() => {
//     if (!endTime) {
//       inputRef.current.focus();
//     }
//   }, [endTime]);

//   const generateRandomText = () => {
//     const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
//     setRandomText(text);
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === 'Escape') {
//       finishTraining();
//     } else if (event.key === randomText[currentIndex]) {
//       handleCorrectChar();
//     } else if (strictMode) {
//       event.preventDefault();
//       setErrorCount((prevCount) => prevCount + 1);
//       console.log(errorCount);
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
//       console.log(`${enteredText}`);
//       if (enteredText === randomText[currentIndex]) {
//         setInputText(value);
//         setCurrentIndex((prevIndex) => prevIndex + 1);
//       } else {
//         console.log(errorCount);
//         setErrorCountStrictMode((prevCount) => prevCount + 1);
//       }
//     } else {
//       setInputText(value);
//       setCurrentIndex(value.length);
//     }
//     if (value.length === 1 && !startTime) {
//       setStartTime(Date.now());
//     }
//   };

//   const handleCorrectChar = () => {
//     setCurrentIndex((prevIndex) => prevIndex + 1);
//     if (currentIndex === randomText.length - 1) {
//       setTimeout(finishTraining, 0); // Вызов finishTraining после обновления состояния currentIndex
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
//     if (strictMode){
//       const accuracy = 100 - (errorCountStrictMode / (inputText.length + errorCountStrictMode) * 100);
//       return accuracy.toFixed(2);
//     }
//     let errorCount = 0;
//     for (let i = 0; i < inputText.length; i++) {
//       if (inputText[i] !== randomText[i] && (strictMode || inputText[i] !== ' ')) {
//         errorCount++;
//       }
//     }
    
//     const accuracy = ((inputText.length - errorCount) / inputText.length) * 100;
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
//     setStrictMode(!strictMode);
//   };

//   const handleEnterPress = (event) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       finishTraining();
//     }
//   };

//   return (
//     <div>
//       <h2>Тренировка слепой печати</h2>
//       {!endTime ? (
//         <div>
//           <label>
//             <input type="checkbox" checked={strictMode} onChange={handleCheckboxChange} />
//             Строгий режим
//           </label>
//           <p>Текст для печати:</p>
//           <p>
//             {randomText.split('').map((char, index) => (
//               <span key={index} className={index === currentIndex ? 'current' : ''}>
//                 {char}
//               </span>
//             ))}
//           </p>

//           <div className={`${styles.container} ${styles.inputForm}`}>
//             <form action="">
//               <input
//                 ref={inputRef}
//                 type="text"
//                 value={inputText}
//                 onChange={handleInputChange}
//                 onKeyDown={handleEnterPress}
//               />
//             </form>
//           </div>

//           <p>Для завершения тренировки нажмите ESC или нажмите кнопку:</p>
//           <button onClick={handleFinishClick}>Завершить тренировку</button>
//           <Keyboard pressedKey={pressedKey} />
//         </div>
//       ) : (
//         <div>
//           <p>Тренировка завершена!</p>
//           <p>Точность: {calculateAccuracy()}%</p>
//           <p>Скорость: {calculateSpeed()} символов в минуту</p>
//           <p>Время тренировки: {(endTime - startTime) / 1000} секунд</p>
//           <button onClick={resetTraining}>Начать новую тренировку</button>
//           <Keyboard pressedKey={pressedKey} />
//         </div>
//       )}
//     </div>
//   );
// };




import React from 'react';

import { useTrainerInput } from '../../hooks/use-trainer-input';
import { TrainingInProgress } from '../';
import { TrainingFinished } from '../';

export const TrainerInput = () => {
  const {
    inputText,
    randomText,
    currentIndex,
    strictMode,
    pressedKey,
    inputRef,
    startTime,
    endTime,
    handleInputChange,
    handleFinishClick,
    handleCheckboxChange,
    handleEnterPress,
    resetTraining,
    calculateAccuracy,
    calculateSpeed,
  } = useTrainerInput();

  return (
    <div>
      <h2>Тренировка слепой печати</h2>
      {!endTime ? (
        <TrainingInProgress
          strictMode={strictMode}
          randomText={randomText}
          currentIndex={currentIndex}
          inputText={inputText}
          inputRef={inputRef}
          pressedKey={pressedKey}
          handleInputChange={handleInputChange}
          handleFinishClick={handleFinishClick}
          handleCheckboxChange={handleCheckboxChange}
          handleEnterPress={handleEnterPress}
        />
      ) : (
        <TrainingFinished
          accuracy={calculateAccuracy()}
          speed={calculateSpeed()}
          trainingTime={(endTime - startTime) / 1000}
          resetTraining={resetTraining}
          pressedKey={pressedKey}
        />
      )}
    </div>
  );
};