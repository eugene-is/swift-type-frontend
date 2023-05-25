// import React from 'react'

// import { TrainerInput } from '../../components';
// //import styles from './Trainer.module.scss';

// export const Trainer = () => {
//   return (
// 		<>
// 			<TrainerInput/>
// 		</>
//   );
// };


import React from 'react';

import { useTrainerInput } from '../../hooks/use-trainer-input';
import { TrainingInProgress, TrainingFinished } from '../../components';

export const Trainer = () => {
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
      <h1>Тренировка слепой печати</h1>
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