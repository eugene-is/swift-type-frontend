import React from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BiErrorCircle, BiTime } from 'react-icons/bi';
import { HiTranslate } from 'react-icons/hi';
import { IoCheckmarkSharp, IoCloseSharp } from 'react-icons/io5';
import { MdSpeed } from 'react-icons/md';
import { VscSymbolKey } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { isAuthSelect, fetchUpdate } from '../../redux/slices/auth';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa'
import { Btn, Statistics, TypewriterText, FormInput } from '../../components';
import {
	fetchGetAllOneUser,
	fetchRemoveTrainer,
	fetchRemoveTrainersAll
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
			if (username.length < 2){
				return setErrorName('Укажите корректное имя');
			}
      dispatch(fetchUpdate({ id: userData._id, username }));
    }
    if (email) {
			dispatch(fetchUpdate({ id: userData._id, email }));
		}
		if (password) {
      // Проверка старого пароля перед изменением пароля
      if (oldPassword === userData.password || userData) {
        dispatch(fetchUpdate({ id: userData._id, password }));
      } else {
        // Старый пароль не совпадает, выполнение действий в случае ошибки
        console.log('Старый пароль неверный');
        // Дополнительные действия, например, показать сообщение об ошибке или очистить поле старого пароля
      }
    }
    setUsername('');
    setEmail('');
    setPassword('');
    setOldPassword('');
  };

	let showhidden = false

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
		if (window.confirm('Вы действительно хотите выйти?')) {
			console.log(id);
			dispatch(fetchRemoveTrainer(id));
		}
	};

	const onClickAllRemove = (id) => {
		if (window.confirm('Вы действительно хотите выйти?')) {
			console.log(id);
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
				{/* <Btn
							icon={AiTwotoneDelete}
							onclick={() => onClickAllRemove()}
				/> */}
				<div>
					<h2 className={styles.text}>Ваше имя: {userData.username}</h2>
					<h2  className={styles.text}>Ваш email: {userData.email}</h2>
					<div className={styles.gg}>
						<div className={styles.updadesUser}>

							{/* Кнопка и поле для обновления имени пользователя */}
							<Btn
								className={''}
								text='Обновить имя'
								onclick={handleUsernameButtonClick}
							/>
							{usernameInputVisible && (
								<div className={styles.updadeUser}>
									<FormInput
										textError='Введите имя'
										error={errorName}
										type="text"
										value={username}
										placeholder='Ваше имя'
										onChange={handleUsernameChange}
									/>
									<Btn
										onclick={handleSaveChanges}
										text='Сохранить'
									/>
								</div>
							)}
						</div>
						<div className={styles.updadesUser}>
							{/* Кнопка и поле для обновления почты пользователя */}
							<Btn
								text='Обновить почту'
								onclick={handleEmailButtonClick}
							/>
							{emailInputVisible && (
								<div className={styles.updadeUser}>
									<FormInput
										type="email"
										value={email} 
										onChange={handleEmailChange}
										placeholder='Введите email'
									/>
									<Btn
											onclick={handleSaveChanges}
											text='Сохранить'
										/>
								</div>
							)}
						</div>
						<div className={styles.updadesUser}>
							{/* Кнопка и поле для обновления пароля пользователя */}
								<Btn
										text='Обновить пароль'
										onclick={handlePasswordButtonClick}
									/>
								{passwordInputVisible && (
									<div className={styles.updadeUser}>
										<FormInput
												type="password"
												value={oldPassword}
												onChange={handleOldPasswordChange}
												placeholder='Введите старый пароль'
											/>
											<FormInput
												type="password"
												value={password} 
												onChange={handlePasswordChange}
												placeholder='Введите новый пароль'
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
				<Statistics onclick={onClickAllRemove} name='Очистить все' shortsStat={true} first={true} />
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
					<div className={styles.statistics}>
						<Btn
							icon={AiTwotoneDelete}
							onclick={() => onClickRemove(obj._id)}
						/>
						<Statistics name={count++} shortsStat={true} />
						<Statistics name={new Date(obj.createdAt).toLocaleString()} />
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
