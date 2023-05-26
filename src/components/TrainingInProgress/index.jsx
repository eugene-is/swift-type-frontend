import React from 'react';
import { BsQuestionCircle } from 'react-icons/bs';

import { Btn } from '../';
import styles from './TrainerInput.module.scss';

/**
 * Компонент отображающий настройку индивидуальной тренировки, форму ввода текста и сам текст.
 * 
 * @param {boolean} highlightMode - Режим подсветки текста.
 * @param {boolean} strictMode - Строгий режим.
 * @param {string} randomText - Случайный текст для тренировки.
 * @param {number} currentIndex - Индекс текущего символа в тренировке.
 * @param {string} inputText - Введенный текст пользователем.
 * @param {React.RefObject} inputRef - Ссылка на элемент ввода текста.
 * @param {function} handleInputChange - Обработчик изменения введенного текста.
 * @param {function} handleCheckboxChange - Обработчик изменения состояния чекбокса.
 * @param {function} handleEnterPress - Обработчик нажатия клавиши Enter.
 * @param {function} handleHighlightModeChange - Обработчик изменения режима подсветки текста.
 * @param {function} toggleLanguage - Функция переключения языка.
 * @returns {JSX.Element} - Возвращаемый отображаемый компонент тренировки в процессе.
 */

export const TrainingInProgress = ({
  highlightMode,
  strictMode,
  randomText,
  currentIndex,
  inputText,
  inputRef,
  handleInputChange,
  handleCheckboxChange,
  handleEnterPress,
  handleHighlightModeChange,
  toggleLanguage,
}) => {
  return (
    <div>
      <div className={styles.settings}>
        <label className={styles.icon}>
          <input type="checkbox" checked={strictMode} onChange={handleCheckboxChange} />
          Строгий режим<BsQuestionCircle className={styles.icon} />
        </label>
        <label>
          <input type="checkbox" checked={highlightMode} onChange={handleHighlightModeChange} />
          Подсветка текста
        </label>
        <Btn onclick={toggleLanguage} text="Переключить язык" />
      </div>

      <div className={`${styles.container} ${styles.inputForm} ${styles.borderBottomColor}`}>
        <form action="">
          <input
            className={styles.inputText}
            ref={inputRef}
            type="text"
            value={inputText}
            placeholder="Для завершения тренировки нажмите Enter или введите весь текст."
            onChange={handleInputChange}
            onKeyDown={handleEnterPress}
          />
        </form>
      </div>

      <div className={styles.text}>
        {randomText.split('').map((char, index) => (
          <span
            key={index}
            className={`${index === currentIndex ? 'current' : ''}
            ${highlightMode && index < currentIndex ? styles.correctChar : ''}
            ${highlightMode && index === currentIndex && char !== inputText[currentIndex] ? styles.incorrectChar : ''}`}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};