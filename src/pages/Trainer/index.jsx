import React from 'react'

import { TrainingFinished, TrainingInProgress, TypewriterText } from '../../components'
import { useTrainerInput } from '../../hooks/use-trainer-input'

import styles from './Trainer.module.scss'


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
    toggleLanguage,
    handleInputChange,
    handleFinishClick,
    handleCheckboxChange,
    handleEnterPress,
    resetTraining,
    calculateAccuracy,
    calculateSpeed,
  } = useTrainerInput();

  return (
    <div className={`${ styles.container } ${ styles.themeText }`}>
      <h1 className={ styles.title }><TypewriterText text={ 'Blind Printing Training' }/></h1>
      {!endTime ? (
        <TrainingInProgress
          strictMode={strictMode}
          randomText={randomText}
          currentIndex={currentIndex}
          inputText={inputText}
          inputRef={inputRef}
          pressedKey={pressedKey}
          toggleLanguage={toggleLanguage}
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