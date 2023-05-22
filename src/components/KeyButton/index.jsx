import React from 'react';

import styles from './KeyButton.module.scss';
import { CiGlobe } from 'react-icons/ci';
import { RiBrush2Fill } from 'react-icons/ri';

export const KeyButton = ({ id, letters, sup = '', spec = '', icon = ''}) => {
  console.log(spec)
  let keyButtonClass = `${styles.keyButton}`;
  switch (spec) {
    case 'space':
      keyButtonClass += ` ${styles.space} ${styles.specialLetters}`;
      break;
    case 'shift':
      keyButtonClass += ` ${styles.shift} ${styles.specialLetters}`;
      break;
    case 'alt':
      keyButtonClass += ` ${styles.alt} ${styles.specialLetters}`;
      break;
    case 'enter':
      keyButtonClass += ` ${styles.enter} ${styles.specialLetters}`;
      break;
    case 'backspace':
      keyButtonClass += ` ${styles.backspace} ${styles.specialLetters}`;
      break;
    case 'tab':
      keyButtonClass += ` ${styles.tab} ${styles.specialLetters}`;
      break;
    case 'capslock':
      keyButtonClass += ` ${styles.caps} ${styles.specialLetters}`;
      break;
    default:
      keyButtonClass += ``;
  }

  if(sup){
    return (
      <div className={keyButtonClass} id={id} data-letters={letters}>
        {letters} <sup>{sup}</sup>
      </div>
    );
  } else if (spec){
    return (
      <div className={keyButtonClass} id={id} data-spec={letters}>
        {letters} <sup>{spec}</sup>
      </div>
    );
  } else if (icon == 'globus'){
    keyButtonClass += ` ${ styles.icon } `;
    return (
      <div className={keyButtonClass} id={id} data-spec={letters}>
        <CiGlobe className={ styles.icon }/>
      </div>
    );
  } else if (icon == 'fill'){
    keyButtonClass += ` ${ styles.icon }`;
    return (
      <div className={keyButtonClass} id={id} data-spec={letters}>
        <RiBrush2Fill/>
      </div>
    );
  }
};