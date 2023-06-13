import React, { useState } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BiErrorCircle, BiTime } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { HiTranslate } from 'react-icons/hi';
import { IoCheckmarkSharp, IoCloseSharp } from 'react-icons/io5';
import { MdSpeed } from 'react-icons/md';
import { VscSymbolKey } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Btn, FormInput, Statistics, TypewriterText } from '../../components';
import { fetchUpdate, isAuthSelect } from '../../redux/slices/auth';
import {
	fetchGetAllOneUser,
	fetchRemoveTrainer,
	fetchRemoveTrainersAll,
} from '../../redux/slices/trainers.js';
import styles from './Account.module.scss';

/**
 * Страница учебной записи пользователя
 *
 * @returns {JSX.Element} - отображаемая страница рейтинга пользователей.
 */

export const Account = () => {
	const dispatch = useDispatch();
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [oldPassword, setOldPassword] = useState('');
	const [usernameInputVisible, setUsernameInputVisible] = useState(false);
	const [emailInputVisible, setEmailInputVisible] = useState(false);
	const [passwordInputVisible, setPasswordInputVisible] = useState(false);

	const [errorName, setErrorName] = useState('');

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleOldPasswordChange = (event) => {
		setOldPassword(event.target.value);
	};

	const handleUsernameButtonClick = () => {
		setUsernameInputVisible(!usernameInputVisible);
		setEmailInputVisible(false);
		setPasswordInputVisible(false);
	};

	const handleEmailButtonClick = () => {
		setEmailInputVisible(!emailInputVisible);
		setUsernameInputVisible(false);
		setPasswordInputVisible(false);
	};

	const handlePasswordButtonClick = () => {
		setPasswordInputVisible(!passwordInputVisible);
		setUsernameInputVisible(false);
		setEmailInputVisible(false);
	};

	const handleSaveChanges = () => {
		if (username) {
			if (username.length < 2) {
				return setErrorName('Укажите корректное имя');
			}
			dispatch(fetchUpdate({ id: userData._id, username }));
		}
		if (email) {
			const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
			if (emailRegex.test(email)){
				dispatch(fetchUpdate({ id: userData._id, email }));
			} else {
				return setErrorName('Введите корректную почту');
			}
		}
		if (password) {
			if (oldPassword !== password) {
				return setErrorName('Пароли не совпадают');
			}
			// Проверка старого пароля перед изменением пароля
			if (oldPassword === userData.password || userData) {
				dispatch(fetchUpdate({ id: userData._id, password }));
			}
		}
		setUsername('');
		setEmail('');
		setPassword('');
		setOldPassword('');
	};

	let showhidden = false;

	const isAuth = useSelector(isAuthSelect);
	const { trainers } = useSelector((state) => state.trainers);

	const userData = useSelector((state) => state.auth.data); // Получение данных пользователя

	React.useEffect(() => {
		dispatch(fetchGetAllOneUser());
		// eslint-disable-next-line
	}, []);

	if (!isAuth) {
		return <Navigate to='/' />;
	}

	let count = 1;

	const onClickRemove = (id) => {
		if (window.confirm('Вы действительно хотите удалить тренировку?')) {
			dispatch(fetchRemoveTrainer(id));
		}
	};

	const onClickAllRemove = (id) => {
		if (window.confirm('Вы действительно хотите удалить все тренировки?')) {
			dispatch(fetchRemoveTrainersAll(id));
		}
	};

	return (
		<div className={`${styles.container} ${styles.themeText}`}>
			<div className={styles.div}>
				<FaUser className={styles.logo} />
				<h1 className={styles.title}>
					<TypewriterText text={'Личный кабинет'} />
				</h1>
				<div>
					<h2 className={styles.text}>Ваше имя: {userData.username}</h2>
					<h2 className={styles.text}>Ваш email: {userData.email}</h2>
					<div className={styles.gg}>
						<div className={styles.updatesUser}>
							{/* Кнопка и поле для обновления имени пользователя */}
							<Btn
								className={''}
								text='Изменить имя'
								onclick={handleUsernameButtonClick}
							/>
							{usernameInputVisible && (
								<div className={styles.updateUser}>
									<FormInput
										textError='Введите имя'
										error={errorName}
										type='text'
										value={username}
										placeholder='Ваше имя'
										onChange={handleUsernameChange}
									/>
									<Btn onclick={handleSaveChanges} text='Сохранить' />
								</div>
							)}
						</div>
						<div className={styles.updatesUser}>
							{/* Кнопка и поле для обновления почты пользователя */}
							<Btn text='Изменить почту' onclick={handleEmailButtonClick} />
							{emailInputVisible && (
								<div className={styles.updateUser}>
									<FormInput
										type='email'
										value={email}
										error={errorName}
										onChange={handleEmailChange}
										placeholder='Введите email'
									/>
									<Btn onclick={handleSaveChanges} text='Сохранить' />
								</div>
							)}
						</div>
						<div className={styles.updatesUser}>
							{/* Кнопка и поле для обновления пароля пользователя */}
							<Btn text='Изменить пароль' onclick={handlePasswordButtonClick} />
							{passwordInputVisible && (
								<div className={styles.updateUser}>
									<FormInput
										type='password'
										value={oldPassword}
										error={errorName}
										onChange={handleOldPasswordChange}
										placeholder='Введите новый пароль'
									/>
									<FormInput
										type='password'
										value={password}
										error={errorName}
										onChange={handlePasswordChange}
										placeholder='Повторите новый пароль'
									/>
									<Btn
										text='Сохранить'
										onclick={() => handleSaveChanges(true)}
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<h2 className={styles.text}>Ваши тренировки</h2>
			<div className={styles.statistics}>
				<Statistics
					onclick={onClickAllRemove}
					name='Очистить все'
					shortsStat={true}
					first={true}
				/>
				<Statistics name='№' shortsStat={true} />
				<Statistics name='Дата' />
				<Statistics icon={MdSpeed} name='Символов в минуту:' />
				<Statistics icon={VscSymbolKey} name='Кол-во символов:' />
				<Statistics icon={HiTranslate} name='Язык:' />
				<Statistics name='Строгий режим:' shortsStat={true} />
				<Statistics icon={BiTime} name='Время:' />
				<Statistics icon={BiErrorCircle} name='Точность:' last={true} />
			</div>
			{Array.isArray(trainers.items) &&
				trainers.items.map((obj, index) => (
					<div key={obj._id} className={styles.statistics}>
						<Btn
							text=''
							icon={AiTwotoneDelete}
							onclick={() => onClickRemove(obj._id)}
						/>
						<Statistics name={count++} shortsStat={true} />
						<Statistics name={new Date(obj.createdAt).toLocaleString()} />
						<Statistics name={`${obj.charactersPerMinute} сим/м`} />
						<Statistics name={`${obj.characterCount} сим.`} />
						<Statistics name={obj.language} />
						<Statistics
							icon={obj.strictMode === true ? IoCheckmarkSharp : IoCloseSharp}
							shortsStat={true}
						/>
						<Statistics name={`${obj.time} сек.`} />
						<Statistics name={`${obj.accuracy}%`} last={true} />
					</div>
				))}
		</div>
	);
};
