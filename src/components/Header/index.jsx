import React from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';
import { GiKeyboard } from 'react-icons/gi';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { Btn } from '../';
import { useTheme } from '../../hooks/useTheme';
import { isAuthSelect, logout } from '../../redux/slices/auth';
import styles from './Header.module.scss';

/**
 * Компонент шапки приложения.
 *
 * @returns {JSX.Element} - Отображаемый компонент заголовка.
 */

export const Header = () => {
	const { theme, updateTheme } = useTheme();

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		updateTheme(newTheme); // Исправленный вызов функции
	};

	const ThemeIcon = theme === 'light' ? BiMoon : BiSun;

	const dispatch = useDispatch();
	const isAuth = useSelector(isAuthSelect);

	const onClickLogout = () => {
		if (window.confirm('Вы действительно хотите выйти?')) {
			dispatch(logout());
			window.localStorage.removeItem('token');
		}
	};

	return (
		<header className={styles.header}>
			<div className={`${styles.container}`}>
				<div className={styles.header__content}>
					<nav className={styles.nav}>
						<div className={`${styles.nav__logo}`}>
							<Link className={styles.link} to='/'>
								<GiKeyboard className={`${styles.logo} ${styles.themeLogo}`} />
								<div className={styles.themeText}>SwiftType</div>
							</Link>
						</div>
						<ul className={styles.nav__list}>
							<li>
								<Link to='/trainer'>
									<span className={styles.themeText}>Тренажер</span>
								</Link>
							</li>
							<li>
								<Link to='/rating'>
									<span className={styles.themeText}>Рейтинг</span>
								</Link>
							</li>
							<li>
								{isAuth ? (
									<>
										<ul className={`${styles.nav__list} ${styles.themeText}`}>
											<li>
												<div className={styles.btnShow}>
													<Btn text='Уч.запись' className='two' link='/account' />
													<div className={styles.btnHidden}>
														<Btn onclick={onClickLogout} text='Выйти' />
													</div>
												</div>
											</li>
										</ul>
									</>
								) : (
									<>
										<ul className={`${styles.nav__list} ${styles.themeText}`}>
											<li>
												<div className={styles.btnShow}>
													<Btn text='Войти' className='two' link='/login' />
													<div className={styles.btnHidden}>
														<Btn
															text='Регистрация'
															className='one'
															link='/register'
														/>
													</div>
												</div>
											</li>
										</ul>
									</>
								)}
							</li>
							<li>
								<div className='themeIcon' onClick={toggleTheme}>
									<ThemeIcon className='themeLogo' size='2em' />
								</div>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
};
