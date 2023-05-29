import React from 'react';
import { useSelector } from 'react-redux';

import { Btn, TypewriterText } from '../../components';
import styles from './Home.module.scss';

/**
 * Главная страница приложения
 *
 * @returns {JSX.Element} - отображаемая главная страница.
 */

export const Home = () => {
	const username = useSelector((state) => state.auth.data?.username || '');

	return (
		<div className={styles.themeContainer}>
			<div className={`${styles.homepage}`}>
				<h1 className={`${styles.homepage__title} ${styles.themeText}`}>
					<TypewriterText
						text={`Добро пожаловать ${username} в SwiftType! Нажмите на кнопку "Начать" чтобы начать тренироваться`}
					/>
				</h1>
				<div className={styles.homepage__btn}>
					<Btn text='Start' className='one' link='/trainer' />
				</div>
			</div>
		</div>
	);
};
