import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { Btn, FormInput, TypewriterText } from '../../components';
import { fetchAuth, isAuthSelect } from '../../redux/slices/auth';
import styles from './Login.module.scss';

/**
 * Страница авторизации
 *
 * @returns {JSX.Element} - отобржаемая страница авторизации
 */

export const Login = () => {
	const isAuth = useSelector(isAuthSelect);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const [errorMessage, setErrorMessage] = useState('');

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
		reset,
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
	});

	const onSubmit = async (values) => {
		const data = await dispatch(fetchAuth(values));
		if (!data.payload) {
			reset();
			return setErrorMessage('Неверный логин или пароль');
		}
		if ('token' in data.payload) {
			window.localStorage.setItem('token', data.payload.token);
		}
	};

	if (isAuth) {
		return <Navigate to='/' />;
	}


	return (
		<div className={`${styles.form} ${styles.themeContainer}`}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form__content}>
				<h1 className={`${styles.form__title} ${styles.themeText}`}>
					<TypewriterText text={'Авторизация'} />
				</h1>
				<FormInput
					className={styles.customInput}
					type='text'
					name='email'
					placeholder='Введите почту'
					labelText='Электронная почта'
					textError='Введите почту'
					error={errors.email?.message || errorMessage}
					register={register}
				/>
				<FormInput
					className={styles.customInput}
					helperText={errors.password?.message}
					type='password'
					name='password'
					placeholder='Введите пароль'
					labelText='Пароль'
					textError='Введите пароль'
					error={errors.password?.message || errorMessage}
					register={register}
				/>
				<Btn text='Войти' className='one' type='submit' />
			</form>
		</div>
	);
};
