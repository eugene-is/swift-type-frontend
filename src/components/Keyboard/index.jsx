import React, { useState } from 'react';
import styles from './Keyboard.module.scss';

/**
 * Компонент визуализации клавиатуры.
 *
 * @param {string} pressedKey - Нажатая в данный момент клавиша.
 * @returns {JSX.Element} - Отображаемый компонент клавиатуры.
 */

export const Keyboard = ({ pressedKey }) => {
  const keys = [
    ['Ё~', '1!', '2@', '3#', '4$', '5%', '6^', '7&', '8*', '9(', '0)', '-_', '=+', ['Backspace']],
    [['Tab'], 'QЙ', 'WЦ', 'EУ', 'RК', 'TЕ', 'YН', 'UГ', 'IШ', 'OЩ', 'PЗ', '{Х', '}Ъ', '|\\'],
    [['CapsLock'], 'AФ', 'SЫ', 'DВ', 'FА', 'GП', 'HР', 'JО', 'KЛ', 'LД', ':Ж', '"Э', ['Enter']],
    [['Shift'], 'ZЯ', 'XЧ', 'CС', 'VМ', 'BИ', 'NТ', 'MЬ', '<Б', '>Ю', '?.', ['Left Shift']],
    [['Alt'], [' ']],
  ];
  
  const [filledKeyboard, setfilledKeyboard] = useState(false);

  /**
   * Проверка - является ли ключ специальным символом.
   *
   * @param {string} key - Ключ для проверки.
   * @returns {boolean} - Возвращает значение true, если ключ является специальным символом, в противном случае значение false.
   */

  const isSpecialSymbol = (key) => {
    const specialSymbols = ['Tab', 'Backspace', 'CapsLock', 'Enter', 'Shift', 'Left Shift', 'Alt', ' '];
    return specialSymbols.includes(key);
  };

  /**
   * Генерация случайного цвета в формате HEX.
   *
   * @returns {string} - Сгенерированный случайный цвет в формате HEX.
   */
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  /**
   * Обработчик изменения состояния чекбокса.
   * Меняет состояние filledKeyboard на противоположное.
   */
  const handleCheckboxChange = () => {
    setfilledKeyboard(!filledKeyboard);
  };

  const isOrangeKey = (key) => {
    const orangeKey = ['3#', 'EУ', 'DВ', 'CС', '8*', 'IШ', 'KЛ', '<Б'];
    return orangeKey.includes(key);
  };

  const isPurpleKey = (key) => {
    const purpleKey = ['Ё~', '1!', 'QЙ', 'AФ', 'ZЯ', '0)', '-_', '=+', 'PЗ', '{Х', '}Ъ', '|\\', ':Ж', '"Э', '?.'];
    return purpleKey.includes(key);
  };

  const isBlueKey = (key) => {
    const orangeKey = ['4$', '5%', '6^', 'RК', 'TЕ', 'FА', 'GП', 'VМ', 'BИ',];
    return orangeKey.includes(key);
  };

  const isSteelBlueKey = (key) => {
    const greenKey = ['7&', 'YН', 'UГ', 'HР', 'JО', 'NТ', 'MЬ',];
    return greenKey.includes(key);
  };

  const isGreenKey = (key) => {
    const greenKey = ['2@', 'WЦ', 'SЫ', 'XЧ', '9(', 'OЩ', 'LД', '>Ю'];
    return greenKey.includes(key);
  };
  
  return (
    <div>
      <label>
        <input type="checkbox" checked={filledKeyboard} onChange={handleCheckboxChange} />
        Random Colors
      </label>
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.keyboard}>
          {row.map((key) => (
            <div
              key={key}
              className={`${styles.key}
                ${pressedKey === key[0].toLowerCase() ? styles.active : ''}
                ${!isSpecialSymbol(key[0]) ? (pressedKey === key[1].toLowerCase() ? styles.active : '') : ''}
                ${key.includes(pressedKey) ? styles.active : ''}
                ${isSpecialSymbol(key[0]) ? styles[key[0].toLowerCase()] : ''}
                ${isSpecialSymbol(key[0]) ? styles.specialLetters : ''}
                ${key[0] === 'Left Shift' ? styles.leftShift : ''}
                ${key[0] === ' ' ? styles.space : ''}
                ${isPurpleKey(key) && filledKeyboard ? styles.purpleKey : ''}
                ${isOrangeKey(key) && filledKeyboard ? styles.orangeKey : ''}
                ${isBlueKey(key) && filledKeyboard ? styles.blueKey : ''}
                ${key[0] === ' ' && filledKeyboard ? styles.darkPurple : ''}
                ${isSteelBlueKey(key) && filledKeyboard ? styles.steelBlueKey : ''}
                ${isGreenKey(key) && filledKeyboard ? styles.greenKey : ''}`}
            >
              {key[0]}
              <sup> {key[1]}</sup>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
