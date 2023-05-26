import React from 'react'
import { IoMdStats } from 'react-icons/io';
import { MdSpeed } from 'react-icons/md';
import { BiTime, BiErrorCircle } from 'react-icons/bi';
import { VscSymbolKey } from 'react-icons/vsc';

import { TypewriterText, Statistics } from '../../components';
import styles from './Rating.module.scss';

/**
 * Страница рейтинга
 *
 * @returns {JSX.Element} - отображаемая страница рейтинга пользователей.
*/

export const Rating = () => {
  return (
    <div className={`${ styles.container } ${ styles.themeText }`}>
			<div className={styles.div}>
				<IoMdStats className={ styles.logo }/>
				<h1 className={ styles.title }><TypewriterText text={ 'Rating' }/></h1>
			</div>
			<h2>Результат:</h2>
			<div className={styles.statistics}>
				<Statistics name='№' first={true}/>
				<Statistics name='Имя'/>
        <Statistics icon={MdSpeed} name='Символов в минуту:'/>
        <Statistics icon={VscSymbolKey} name='Кол-во символов:'/>
        <Statistics icon={BiTime} name='Время:'/>
        <Statistics icon={BiErrorCircle} name='Точность:' last={true}/>
      </div>
			<div className={styles.statistics}>
				<Statistics name='1' first={true}/>
				<Statistics name='evgeni'/>
        <Statistics name='123'/>
        <Statistics name='133'/>
        <Statistics name='3123'/>
        <Statistics name='100' last={true}/>
      </div>
    </div>
  );
};