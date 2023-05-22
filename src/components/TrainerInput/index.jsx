import React from 'react';
import styles from './TrainerInput.module.scss';

export const TrainerInput = () => {
  return (
    <>
      <div className={`${styles. container} ${styles.inputForm}`}>
        <form action="">
          <input
            id="input"
            type="text"
            class=""
            placeholder="Поле для ввода текста (Нажмите ESC для остановки)"
            autocomplete="off"
          />
        </form>
        
      </div>
      <div class={`${ styles.container } ${ styles.text }`} id="textExample"></div>
    </>
  );
}







