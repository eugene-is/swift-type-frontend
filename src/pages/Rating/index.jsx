import React from 'react';
import { BiErrorCircle, BiTime } from 'react-icons/bi';
import { HiTranslate } from 'react-icons/hi';
import { IoMdStats } from 'react-icons/io';
import { IoCheckmarkSharp, IoCloseSharp } from 'react-icons/io5';
import { MdSpeed } from 'react-icons/md';
import { VscSymbolKey } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';

import { Statistics, TypewriterText } from '../../components';
import { fetchAllTrainers } from '../../redux/slices/trainers.js';
import styles from './Rating.module.scss';

/**
 * Страница рейтинга
 *
 * @returns {JSX.Element} - отображаемая страница рейтинга пользователей.
 */

export const Rating = () => {
	const dispatch = useDispatch();

	const { trainers } = useSelector((state) => state.trainers);

	React.useEffect(() => {
		dispatch(fetchAllTrainers());
		// eslint-disable-next-line
	}, []);

	const weights = {
		'Символов в минуту': 0.4,
		'Кол-во символов': 0.3,
		Время: 0.2,
		Точность: 0.1,
	};

	const sortedTrainers = trainers.items
		.map((obj) => {
			const score =
				obj.charactersPerMinute * weights['Символов в минуту'] +
				obj.characterCount * weights['Кол-во символов'] +
				obj.time * weights['Время'] +
				obj.accuracy * weights['Точность'];
			return {
				...obj,
				score,
			};
		})
		.sort((a, b) => b.score - a.score);

	let count = 1;

	console.log(trainers);

	return (
		<div className={`${styles.container} ${styles.themeText}`}>
			<div className={styles.div}>
				<IoMdStats className={styles.logo} />
				<h1 className={styles.title}>
					<TypewriterText text={'Рейтинг'} />
				</h1>
			</div>
			<div className={styles.statistics}>
				<Statistics name='№' shortsStat={true} first={true} />
				<Statistics name='Имя' />
				<Statistics icon={MdSpeed} name='Символов в минуту:' />
				<Statistics icon={VscSymbolKey} name='Кол-во символов:' />
				<Statistics icon={HiTranslate} name='Язык:' />
				<Statistics name='Строгий режим:' shortsStat={true} />
				<Statistics icon={BiTime} name='Время:' />
				<Statistics icon={BiErrorCircle} name='Точность:' last={true} />
			</div>
			{sortedTrainers.map((obj, index) => (
				<div className={styles.statistics} key={index}>
					<Statistics name={count++} shortsStat={true} first={true} />
					<Statistics name={obj.user.username} />
					<Statistics name={`${obj.charactersPerMinute} сим/м`} />
					<Statistics name={`${obj.characterCount} сим.`} />
					<Statistics name={obj.language} />
					<Statistics
						icon={obj.strictMode === 'true' ? IoCheckmarkSharp : IoCloseSharp}
						shortsStat={true}
					/>
					<Statistics name={`${obj.time} сек.`} />
					<Statistics name={`${obj.accuracy}%`} last={true} />
				</div>
			))}
		</div>
	);
};
