import React from 'react';

import styles from './Statistics.module.scss';

/**
 * Компонент визуализации статистики
 *
 * @param {string} icon - Иконка для значения.
 * @param {string} name - Наименование значения.
 * @param {string} value - Результат по значению.
 * @param {bool} first - Является ли значение первом в списке.
 * @param {bool} last - Является ли значение последнем в списке.
 * @returns {JSX.Element} - Отображаемый компонент клавиатуры.
 */

export const Statistics = ({
	icon: Icon = null,
	name = '',
	value = '',
	first = false,
	last = false,
	shortsStat = false,
}) => {
	const indicatorsClassName = `${styles.indicators} ${
		shortsStat ? styles.shortsStat : ''
	} ${first ? styles.first : ''} ${last ? styles.last : ''}`;
	const indicatorClassName = `${styles.indicator} ${
		first ? styles.first : ''
	} ${last ? styles.last : ''}`;

	return (
		<div className={indicatorsClassName}>
			<div className={indicatorClassName} key={name}>
				{Icon && <Icon className={`${styles.logo} ${styles.themeLogo}`} />}
				<div className={styles.indicators__name}>{name}</div>
				<div className={styles.indicators__value}>{value}</div>
			</div>
		</div>
	);
};
