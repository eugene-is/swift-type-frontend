import React from 'react';

import styles from './Home.module.scss';
import { Btn, TypewriterText } from '../../components';


export const Home = () => {
  return (
		<div className={ styles.themeContainer }>
			<div className={`${ styles.welcome }`}>
				<h1 className={`${ styles.welcome__title } ${ styles.themeText }`}><TypewriterText text={ 'Добро пожаловать в SwiftType! Нажмите на кнопку "Начать" чтобы начать тренироваться' }/></h1>
				<div className={ styles.welcome__btn }><Btn text="Start" className="one" link="/trainer" /></div>
			</div>
		</div>
  );
};