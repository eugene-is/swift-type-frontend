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