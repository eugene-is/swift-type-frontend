import React from 'react';

import { TrainingFinished, TrainingInProgress, TypewriterText, Keyboard } from '../../components';
import { useTrainerInput } from '../../hooks/use-trainer-input';
import styles from './Trainer.module.scss';

/**
 * Страница тренировки слепой печати
 *
 * @returns {JSX.Element} - отображаемая страница слепой печати.
*/

export const Trainer = () => {
  const {
    inputText,
    randomText,
    currentIndex,
    highlightMode,
    strictMode,
    pressedKey,
    inputRef,
    startTime,
    endTime,
    toggleLanguage,
    handleInputChange,
    handleFinishClick,
    handleCheckboxChange,
    handleHighlightModeChange,
    handleEnterPress,
    resetTraining,
    calculateAccuracy,
    calculateSpeed,
  } = useTrainerInput();

  return (
    <div className={`${ styles.container } ${ styles.themeText }`}>
      <h1 className={ styles.title }><TypewriterText text={ 'Blind Printing Training' }/></h1>
      {!endTime ? (
        <>
        <TrainingInProgress
          strictMode={strictMode}
          highlightMode={highlightMode}
          randomText={randomText}
          currentIndex={currentIndex}
          inputText={inputText}
          inputRef={inputRef}
          pressedKey={pressedKey}
          toggleLanguage={toggleLanguage}
          handleInputChange={handleInputChange}
          handleHighlightModeChange={handleHighlightModeChange}
          handleFinishClick={handleFinishClick}
          handleCheckboxChange={handleCheckboxChange}
          handleEnterPress={handleEnterPress}
        />
        <Keyboard pressedKey={pressedKey} />
        </>
      ) : (
        <TrainingFinished
          accuracy={calculateAccuracy()}
          speed={calculateSpeed()}
          countSymbols={inputText.length}
          trainingTime={(endTime - startTime) / 1000}
          resetTraining={resetTraining}
        />
      )}
    </div>
  );
};