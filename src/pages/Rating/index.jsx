import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IoMdStats } from 'react-icons/io';
import { MdSpeed } from 'react-icons/md';
import { BiTime, BiErrorCircle } from 'react-icons/bi';
import { VscSymbolKey } from 'react-icons/vsc';

//import axios from '../../axios';

import { TypewriterText, Statistics } from '../../components';
import styles from './Rating.module.scss';
import { fetchTrainers } from '../../redux/slices/trainers.js';

/**
 * Страница рейтинга
 *
 * @returns {JSX.Element} - отображаемая страница рейтинга пользователей.
*/

export const Rating = () => {
  const dispatch = useDispatch();
  const { trainers } = useSelector(state => state.trainers);

  const isTrainersLoading = trainers === 'loading';

  React.useEffect(() => {
    dispatch(fetchTrainers());
  }, []);


  let count = 1;

  console.log(trainers);

  return (
    <div className={`${ styles.container } ${ styles.themeText }`}>
			<div className={styles.div}>
				<IoMdStats className={ styles.logo }/>
				<h1 className={ styles.title }><TypewriterText text={ 'Rating' }/></h1>
			</div>
			<h2>Результат:</h2>
			<div className={styles.statistics}>
				<Statistics name='№' numbers={true} first={true}/>
				<Statistics name='Имя'/>
        <Statistics icon={MdSpeed} name='Символов в минуту:'/>
        <Statistics icon={VscSymbolKey} name='Кол-во символов:'/>
        <Statistics icon={BiTime} name='Время:'/>
        <Statistics icon={BiErrorCircle} name='Точность:' last={true}/>
      </div>
      {(isTrainersLoading ? [...Array(100)] : trainers.items).map((obj, index) => isTrainersLoading ? (
        <h2>Loading</h2>
      ) : 
      <div className={styles.statistics}>
				<Statistics name={count++} numbers={true} first={true}/>
				<Statistics name={obj.user.fullName}/>
        <Statistics name={obj.charactersPerMinute}/>
        <Statistics name={obj.characterCount}/>
        <Statistics name={obj.time}/>
        <Statistics name={obj.accuracy} last={true}/>
      </div>
      )}
    </div>
  );
};