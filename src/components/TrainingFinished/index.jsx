import React from 'react';
import { MdSpeed } from 'react-icons/md';
import { BiTime, BiErrorCircle } from 'react-icons/bi';
import { VscSymbolKey } from 'react-icons/vsc';

import { TypewriterText, Btn } from '../';
import styles from './TrainingFinished.module.scss';

/**
 * Компонент отображающий статистику пользователя после тренировки.
 * 
 * @param {number} accuracy - Процент точности.
 * @param {number} speed - Количество символов в минуту
 * @param {string} trainingTime - Время тренировки
 * @param {function} resetTraining - Функция для сброса тренировки.
 * @param {number} countSymbols - Количество символов.
 * @param {string} pressedKey - Нажатая клавиша.
 * @returns {JSX.Element} - Отрисованный обучающий завершенный компонент.
 */

export const TrainingFinished = ({ accuracy, speed, trainingTime, resetTraining, countSymbols }) => {
  return (
    <>
      <h2 className={styles.title}><TypewriterText text={'Тренировка завершена'} /></h2>
      
      <h2 className={styles.result__title}>Результат:</h2>
      <div className={styles.indicators}>
        <div className={styles.indicator}>
          <MdSpeed className={`${styles.logo} ${styles.themeLogo}`} />
          <div className={styles.indicators__name}>Символов в минуту:</div>
          <div className={styles.indicators__value}>{speed}</div>
        </div>
        <div className={styles.indicator}>
          <VscSymbolKey className={`${styles.logo} ${styles.themeLogo}`} />
          <div className={styles.indicators__name}>Кол-во символов:</div>
          <div className={styles.indicators__value}>{countSymbols}</div>
        </div>
        <div className={styles.indicator}>
          <BiTime className={`${styles.logo} ${styles.themeLogo}`} />
          <div className={styles.indicators__name}>Время:</div>
          <div className={styles.indicators__value}>{trainingTime}</div>
        </div>
        <div className={styles.indicator}>
          <BiErrorCircle className={`${styles.logo} ${styles.themeLogo}`} />
          <div className={styles.indicators__name}>Точность:</div>
          <div className={styles.indicators__value}>{accuracy}%</div>
        </div>
      </div>
			<div className={ styles.block }>
				<Btn onclick={resetTraining} text='Начать заново'/>
			</div>
    </>
  );
};
