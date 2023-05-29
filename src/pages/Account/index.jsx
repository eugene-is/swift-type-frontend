import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IoMdStats } from 'react-icons/io';
import { MdSpeed } from 'react-icons/md';
import { BiTime, BiErrorCircle } from 'react-icons/bi';
import { VscSymbolKey } from 'react-icons/vsc';
import { IoCloseSharp, IoCheckmarkSharp } from 'react-icons/io5'
import { HiTranslate } from 'react-icons/hi'
import { Navigate } from 'react-router-dom';
import { fetchAuthMe, isAuthSelect } from '../../redux/slices/auth'
import { AiTwotoneDelete } from 'react-icons/ai';

import { TypewriterText, Statistics, Btn } from '../../components';
import styles from './Account.module.scss';
import { fetchGetAllOneUser, fetchRemoveTrainer } from '../../redux/slices/trainers.js';

/**
 * Страница учебной записи пользователя
 *
 * @returns {JSX.Element} - отображаемая страница рейтинга пользователей.
*/

export const Account = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector(isAuthSelect);
  const { trainers } = useSelector(state => state.trainers);

  const userData = useSelector(state => state.auth.data); // Получение данных пользователя


  React.useEffect(() => {
    dispatch(fetchGetAllOneUser());
    // eslint-disable-next-line
  }, []);

  if (!isAuth){
		return <Navigate to='/'/>
	}


  let count = 1;

  const onClickRemove = (id) => {
    if(window.confirm('Вы действительно хотите выйти?')){
      console.log(id);
      dispatch(fetchRemoveTrainer(id));
    }
  };

  return (
    <div className={`${ styles.container } ${ styles.themeText }`}>
			<div className={styles.div}>
				<IoMdStats className={ styles.logo }/>
				<h1 className={ styles.title }><TypewriterText text={ 'Your account' }/></h1>
        <h2>Ваше имя: {userData.username}</h2>
        <h2>Ваш email: {userData.email}</h2>
        <h2>Ваш email: {userData.createdAt}</h2>
			</div>
			<h2>Ваши тренировки:</h2>
			<div className={styles.statistics}>
        <Statistics icon={AiTwotoneDelete} shortsStat={true} first={true}/>
        <Statistics name='№' shortsStat={true}/>
				<Statistics name='Дата'/>
        <Statistics icon={MdSpeed} name='Символов в минуту:'/>
        <Statistics icon={VscSymbolKey} name='Кол-во символов:'/>
        <Statistics icon={HiTranslate} name='Язык:'/>
        <Statistics name='Строгий режим:' shortsStat={true}/>
        <Statistics icon={BiTime} name='Время:'/>
        <Statistics icon={BiErrorCircle} name='Точность:' last={true}/>
      </div>
      {Array.isArray(trainers.items) &&
        trainers.items.map((obj, index) => (
      <div className={styles.statistics}>
          <Btn icon={AiTwotoneDelete} onclick={() => onClickRemove(obj._id)}/>
          {/* <button onClick={() => onClickRemove(obj._id)}>Delete</button> */}
          <Statistics name={count++} shortsStat={true}/>
          <Statistics name={obj.createdAt}/>
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
