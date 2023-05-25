import React from 'react';

import styles from './Keyboard.module.scss';

export const Keyboard = ({ pressedKey }) => {
  const keys = [
    ['Ё~', '1!', '2@', '3#', '4$', '5%', '6^', '7&', '8*', '9(', '0)', '-_', '=+', ['Backspace']],
    [['Tab'], 'QЙ', 'WЦ', 'EУ', 'RК', 'TЕ', 'YН', 'UГ', 'IШ', 'OЩ', 'PЗ', '{Х', '}Ъ', '|\\'],
    [['CapsLock'], 'AФ', 'SЫ', 'DВ', 'FА', 'GП', 'HР', 'JО', 'KЛ', 'LД', ':Ж', '"Э', ['Enter']],
    [['Shift'], 'ZЯ', 'XЧ', 'CС', 'VМ', 'BИ', 'NТ', 'MЬ', '<Б', '>Ю', '?.', ['Left Shift']],
    [['Alt'], [' ']],
  ];
  

  const isSpecialSymbol = (key) => {
    const specialSymbols = ['Tab', 'Backspace','CapsLock', 'Enter','Shift', 'Left Shift', 'Alt', ' '];
    return specialSymbols.includes(key);
  };

  return (
    <div>
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.keyboard}>
          {row.map((key) => (
            <div
              key={key}
              className={`${styles.key}

                ${pressedKey === key[0].toLowerCase() ? styles.active : ''} 

                ${!isSpecialSymbol(key[0]) ? (pressedKey === key[1].toLowerCase() ? styles.active : '') : ''}

                ${ key.includes(pressedKey) ? styles.active : '' }

                ${isSpecialSymbol(key[0]) ? styles[key[0].toLowerCase()] : ''}
                ${isSpecialSymbol(key[0]) ? styles.specialLetters : ''}

                ${key[0] === 'Left Shift' ? styles.leftShift : ''}
                ${key[0] === ' ' ? styles.space : ''}`}
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
