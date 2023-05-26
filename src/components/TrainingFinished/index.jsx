import React from 'react';
import { MdSpeed } from 'react-icons/md';
import { BiTime, BiErrorCircle } from 'react-icons/bi';
import { VscSymbolKey } from 'react-icons/vsc';

import { TypewriterText, Btn, Statistics } from '../';
import styles from './TrainingFinished.module.scss';

/**
 * Компонент отображающий статистику пользователя после тренировки.
 * 
 * @param {number} accuracy - Процент точности.
 * @param {number} speed - Количество символов в минуту
 * @param {string} trainingTime - Время тренировки
 * @param {function} resetTraining - Функция для сброса тренировки.
 * @param {number} countSymbols - Количество символов.
 * @returns {JSX.Element} - Отрисованный обучающий завершенный компонент.
 */

export const TrainingFinished = ({ accuracy, speed, trainingTime, resetTraining, countSymbols }) => {
  return (
    <>
      <h2 className={styles.title}><TypewriterText text={'Тренировка завершена'} /></h2>
      
      <h2>Результат:</h2>
      <div className={styles.statistics}>
        <Statistics icon={MdSpeed} name='Символов в минуту:' value={speed} first={true}/>
        <Statistics icon={VscSymbolKey} name='Кол-во символов:' value={countSymbols}/>
        <Statistics icon={BiTime} name='Время:' value={trainingTime}/>
        <Statistics icon={BiErrorCircle} name='Точность:' value={accuracy} last={true}/>
      </div>
			<div className={ styles.block }>
				<Btn onclick={resetTraining} text='Начать заново'/>
			</div>
    </>
  );
};
