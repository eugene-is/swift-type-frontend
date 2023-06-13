import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { Btn, FormInput, TypewriterText } from '../../components';
import { fetchRegister, isAuthSelect } from '../../redux/slices/auth';
import styles from './Registration.module.scss';

/**
 * Страница регистрации
 *
 * @returns {JSX.Element} - отображаемая страница регистрации.
 */

export const Registration = () => {
	const isAuth = useSelector(isAuthSelect);

	const [errorName, setErrorName] = useState('');
	const [errorPassword, setErrorPassword] = useState('');
	const [errorPassVerification, setErrorPassVerification] = useState('');
	const [errorMessage, setErrorMassage] = useState('');

	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm({
		defaultValues: {
			username: '',
			email: '',
			password: '',
		},
		mode: 'onChange',
	});

	const onSubmit = async (values) => {
		setErrorName('');
    setErrorPassword('');
    setErrorPassVerification('');
    setErrorMassage('');
		if(values.password !== values.passwordSecond) {
			reset({ username: values.username, email: values.email });
			return setErrorPassVerification('Пароли не совпадают');
		}
		const data = await dispatch(fetchRegister(values));
	if (values.username.length < 2) {
			reset({ email: values.email, password: '', passwordSecond: ''});
			return setErrorName('Укажите корректное имя');
		} else if (values.password.length < 5) {
			reset({ username: values.username, email: values.email });
			return setErrorPassword('Пароль должен состоять минимум из 5 символов');
		}
		if (!data.payload) {
			reset();
			return setErrorMassage('Имя и почта должны быть уникальными');
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
					<TypewriterText text={'Регистрация'} />
				</h1>
				<FormInput
					className={styles.customInput}
					type='text'
					name='username'
					placeholder='Ваше имя'
					labelText='Имя'
					textError='Введите имя'
					error={errors.username?.message || errorName || errorMessage}
					register={register}
				/>
				<FormInput
					className={styles.customInput}
					type='email'
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
					error={
						errors.password?.message || errorPassword || errorPassVerification
					}
					register={register}
				/>
				<FormInput
					className={styles.customInput}
					helperText={errors.password?.message}
					type='password'
					name='passwordSecond'
					placeholder='Повторите пароль'
					labelText='Повторите пароль'
					textError='Введите пароль'
					error={errors.password?.message || errorPassVerification}
					register={register}
				/>
				<FormInput
					className={styles.customInput}
					helperText={errors.checkbox?.message}
					type='checkbox'
					name='checkbox'
					labelText='Я согласен с политикой конфиденциальности'
					textError='Для успешной регистрации необходимо принять правила приложения.'
					error={errors.checkbox?.message}
					register={register}
				/>
				<Link to='/privacy-policy' className={`${styles.policy} ${styles.themeText}`}>
				<span>Политика конфиденциальности</span>
			</Link>
				<Btn text='Зарегестрироваться' className='one' type='submit' />
			</form>
		</div>
	);
};
