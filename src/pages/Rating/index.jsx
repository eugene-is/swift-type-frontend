// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { IoMdStats } from 'react-icons/io';
// import { MdSpeed } from 'react-icons/md';
// import { BiTime, BiErrorCircle } from 'react-icons/bi';
// import { VscSymbolKey } from 'react-icons/vsc';

// //import axios from '../../axios';

// import { TypewriterText, Statistics } from '../../components';
// import styles from './Rating.module.scss';
// import { fetchAllTrainers } from '../../redux/slices/trainers.js';

// /**
//  * Страница рейтинга
//  *
//  * @returns {JSX.Element} - отображаемая страница рейтинга пользователей.
// */

// export const Rating = () => {
//   const dispatch = useDispatch();
//   const { trainers } = useSelector(state => state.trainers);

//   React.useEffect(() => {
//     dispatch(fetchAllTrainers());
//     // eslint-disable-next-line
//   }, []);


//   let count = 1;

//   console.log(trainers);

//   return (
//     <div className={`${ styles.container } ${ styles.themeText }`}>
// 			<div className={styles.div}>
// 				<IoMdStats className={ styles.logo }/>
// 				<h1 className={ styles.title }><TypewriterText text={ 'Rating' }/></h1>
// 			</div>
// 			<h2>Результат:</h2>
// 			<div className={styles.statistics}>
// 				<Statistics name='№' numbers={true} first={true}/>
// 				<Statistics name='Имя'/>
//         <Statistics icon={MdSpeed} name='Символов в минуту:'/>
//         <Statistics icon={VscSymbolKey} name='Кол-во символов:'/>
//         <Statistics icon={BiTime} name='Время:'/>
//         <Statistics icon={BiErrorCircle} name='Точность:' last={true}/>
//       </div>
//       {/* {(isTrainersLoading ? [...Array(100)] : trainers.items).map((obj, index) => isTrainersLoading ? (
//         <h2>Loading</h2>
//       ) : 
//       <div className={styles.statistics}>
// 				<Statistics name={count++} numbers={true} first={true}/>
// 				<Statistics name={obj.user.fullName}/>
//         <Statistics name={obj.charactersPerMinute}/>
//         <Statistics name={obj.characterCount}/>
//         <Statistics name={obj.time}/>
//         <Statistics name={obj.accuracy} last={true}/>
//       </div>
//       )} */}
//       {Array.isArray(trainers.items) &&
//         trainers.items.map((obj, index) => (
//       <div className={styles.statistics}>
// 				<Statistics name={count++} numbers={true} first={true}/>
// 				<Statistics name={obj.user.fullName}/>
//         <Statistics name={obj.charactersPerMinute}/>
//         <Statistics name={obj.characterCount}/>
//         <Statistics name={obj.time}/>
//         <Statistics name={obj.accuracy} last={true}/>
//       </div>
//       ))}
//     </div>
//   );
// };















import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IoMdStats } from 'react-icons/io';
import { MdSpeed } from 'react-icons/md';
import { BiTime, BiErrorCircle } from 'react-icons/bi';
import { VscSymbolKey } from 'react-icons/vsc';
import { IoCloseSharp, IoCheckmarkSharp } from 'react-icons/io5'
import { HiTranslate } from 'react-icons/hi'

//import axios from '../../axios';

import { TypewriterText, Statistics } from '../../components';
import styles from './Rating.module.scss';
import { fetchAllTrainers } from '../../redux/slices/trainers.js';

/**
 * Страница рейтинга
 *
 * @returns {JSX.Element} - отображаемая страница рейтинга пользователей.
*/

export const Rating = () => {
  const dispatch = useDispatch();
  
  const { trainers } = useSelector(state => state.trainers);

  React.useEffect(() => {
    dispatch(fetchAllTrainers());
    // eslint-disable-next-line
  }, []);

  const weights = {
    'Символов в минуту': 0.4,
    'Кол-во символов': 0.3,
    'Время': 0.2,
    'Точность': 0.1
  };
  
  const sortedTrainers = trainers.items.map((obj) => {
    const score =
      obj.charactersPerMinute * weights['Символов в минуту'] +
      obj.characterCount * weights['Кол-во символов'] +
      obj.time * weights['Время'] +
      obj.accuracy * weights['Точность'];
    return {
      ...obj,
      score
    };
  }).sort((a, b) => b.score - a.score);

  let count = 1;

  console.log(trainers);

  return (
    <div className={`${ styles.container } ${ styles.themeText }`}>
			<div className={styles.div}>
				<IoMdStats className={ styles.logo }/>
				<h1 className={ styles.title }><TypewriterText text={ 'Rating' }/></h1>
			</div>
			<h2>ТОП 100</h2>
			<div className={styles.statistics}>
				<Statistics name='№' shortsStat={true} first={true}/>
				<Statistics name='Имя'/>
        <Statistics icon={MdSpeed} name='Символов в минуту:'/>
        <Statistics icon={VscSymbolKey} name='Кол-во символов:'/>
        <Statistics icon={HiTranslate} name='Язык:'/>
        <Statistics name='Строгий режим:' shortsStat={true}/>
        <Statistics icon={BiTime} name='Время:'/>
        <Statistics icon={BiErrorCircle} name='Точность:' last={true}/>
      </div>
      {sortedTrainers.map((obj, index) => (
        <div className={styles.statistics} key={index}>
          <Statistics name={count++} shortsStat={true} first={true}/>
          <Statistics name={obj.user.fullName}/>
          <Statistics name={`${obj.charactersPerMinute} сим/м`}/>
          <Statistics name={`${obj.characterCount} сим.`}/>
          <Statistics name={obj.language}/>
          <Statistics
            icon={obj.strictMode === 'true' ? IoCheckmarkSharp : IoCloseSharp}
            shortsStat={true}
          />
          <Statistics name={`${obj.time} сек.`}/>
          <Statistics name={`${obj.accuracy}%`} last={true}/>
        </div>
      ))}
    </div>
  );
};