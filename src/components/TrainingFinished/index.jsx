import React from 'react';
import styles from './TrainingFinished.module.scss';
import { TypewriterText } from '../TypewriterText';
import { MdSpeed } from 'react-icons/md';
import { BiTime, BiErrorCircle } from 'react-icons/bi'

export const TrainingFinished = ({ accuracy, speed, trainingTime, resetTraining, pressedKey }) => {
  return (
    <>
    <h2 className={ styles.tittle }><TypewriterText text={ 'Тренировка завершена' }/></h2>
    <h2 class="results__title">Результат:</h2>
      <div className={ styles.indicators }>
						<div className={ styles.indicator }>
              <MdSpeed className={`${ styles.logo } ${ styles.themeLogo }`}/>
							<div className={ styles.indicators__name }>Символов в минуту:</div>
							<div className={ styles.indicators__value }>{speed}</div>
						</div>
						<div className={ styles.indicator }>
              <BiTime className={`${ styles.logo } ${ styles.themeLogo }`}/>
							<div className={ styles.indicators__name }>Время тренировки:</div>
							<div className={ styles.indicators__value }>{trainingTime}</div>
						</div>
						<div className={ styles.indicator }>
              <BiErrorCircle className={`${ styles.logo } ${ styles.themeLogo }`}/>
							<div className={ styles.indicators__name }>Точность:</div>
							<div className={ styles.indicators__value }>{accuracy}%</div>
						</div>
					</div>
          <button className={ styles.btn } onClick={resetTraining}>
            <span className={ styles.themeText }>Начать заново</span>
          </button>
    </>
  );
};
