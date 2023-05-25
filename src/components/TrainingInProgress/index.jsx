import React from 'react';
import styles from './TrainerInput.module.scss';
import { Keyboard } from '../Keyboard';
import { BsQuestionCircle } from 'react-icons/bs';

export const TrainingInProgress = ({
  strictMode,
  randomText,
  currentIndex,
  inputText,
  inputRef,
  pressedKey,
  handleInputChange,
  handleFinishClick,
  handleCheckboxChange,
  handleEnterPress,
}) => {
  return (
    <div className={ styles.label }>
      <label className={ styles.icon }>
        <input  type="checkbox" checked={strictMode} onChange={ handleCheckboxChange } />
        Строгий режим<BsQuestionCircle className={ styles.icon }/>
      </label>
      

      <div className={`${styles.container} ${styles.inputForm} ${styles.borderBottomColor}`}>
        <form action="">
          <input className={ styles.inputText }
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleEnterPress}
          />
        </form>
      </div>

      <h3>Текст для печати:</h3>
      <div className={ styles.text}>
      {randomText.split('').map((char, index) => (
        <span
          key={index} 
          className={`${index === currentIndex ? 'current' : ''}
          ${strictMode && index < currentIndex ? styles.correctChar : ''}
          ${strictMode && index === currentIndex && char !== inputText[currentIndex] ? styles.incorrectChar : ''}`}
        >
          {char}
        </span>
      ))}
      </div>

      <div>Для завершения тренировки нажмите Enter или нажмите кнопку:</div>
      <button onClick={handleFinishClick}>Завершить тренировку</button>
      <Keyboard pressedKey={pressedKey} />
    </div>
  );
};
