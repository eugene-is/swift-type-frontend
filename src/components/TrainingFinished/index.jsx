import React from 'react';
import { useEffect } from 'react';
import { MdSpeed } from 'react-icons/md';
import { BiTime, BiErrorCircle } from 'react-icons/bi';
import { VscSymbolKey } from 'react-icons/vsc';

import { TypewriterText, Btn, Statistics } from '../';
import styles from './TrainingFinished.module.scss';


import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreateTrainer } from '../../redux/slices/trainers.js'
import { isAuthSelect } from '../../redux/slices/auth'

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

export const TrainingFinished = ({ accuracy, speed, trainingTime, countSymbols, resetTraining, strictMode, language }) => {
  const currentUserData = useSelector(state => state.auth.data);

  const dispatch = useDispatch();

  const isAuth = useSelector(isAuthSelect)

	const { handleSubmit } = useForm();

	const onSubmit = async () => {
    const values = {
      charactersPerMinute: speed,
      characterCount: countSymbols,
      time: trainingTime,
      accuracy: accuracy,
      strictMode: strictMode,
      language: language,
      user: currentUserData._id,
    };

    const data = await dispatch(fetchCreateTrainer(values));
  
    if (!data.payload) {
      return alert('Не удалось создать тренировочку');
    }
  };
  
  useEffect(() => {
    if (isAuth) {
      handleSubmit(onSubmit)();
    }
  }, [isAuth]);
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
      {!isAuth ? (
        <>
          <h2 className={styles.text}>Чтобы записать тренировку необходимо быть авторизованным</h2>
        </>
      ) : (<></>
      )}
			<div className={ styles.block }>
				<Btn onclick={resetTraining} text='Начать заново'/>
			</div>
    </>
  );
};
