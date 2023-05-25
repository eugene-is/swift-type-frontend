import React from 'react';
import styles from './TrainerInput.module.scss';
import { Keyboard } from '../Keyboard';
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
      <Keyboard pressedKey={pressedKey} />
    </div>
  );
};