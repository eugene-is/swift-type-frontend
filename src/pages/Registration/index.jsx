import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { Btn, TypewriterText, FormInput } from '../../components';
import styles from './Registration.module.scss';
import { fetchRegister, isAuthSelect } from '../../redux/slices/auth'


/**
 * Страница регистрации
 *
 * @returns {JSX.Element} - отображаемая страница регистрации.
*/

export const Registration = () => {
	const isAuth = useSelector(isAuthSelect);
	console.log(isAuth)

	const dispatch = useDispatch();

	const { register, handleSubmit, formState: { errors, isValid} } = useForm({
		defaultValues: {
			fullName: '',
			email: '',
			password: ''
		},
		mode: 'onChange',
	});

	const onSubmit = async (values) => {
		const data = await dispatch(fetchRegister(values));

		if(!data.payload) {
			return alert('Не удалось зарегестрироваться');

		}
		if('token' in data.payload){
			window.localStorage.setItem('token', data.payload.token);
		} 
	}

	if (isAuth){
		return <Navigate to='/'/>
	}

	console.log('isAuth', isAuth);
	console.log()
  return (
		<div className={`${ styles.form} ${ styles.themeContainer }`}>
			<form onSubmit={ handleSubmit(onSubmit) } className={ styles.form__content}>
				<h1 className={`${ styles.form__title } ${ styles.themeText }`}><TypewriterText text={ 'Registration' }/></h1>
				<FormInput
					className={styles.customInput}
					type="text"
					name="fullName"
					placeholder="Ваше имя"
					labelText="Name"
					textError='Введите имя'
					error={errors.fullName?.message}
					register={register}
				/>
				<FormInput
					className={styles.customInput}
					type="text"
					name="email"
					placeholder="Your Email"
					labelText="Email"
					textError='Введите email'
					error={errors.email?.message}
					register={register}
				/>
				<FormInput
					className={styles.customInput}
					helperText={errors.password?.message}
					type="password"
					name="password"
					placeholder="Password"
					labelText="Password"
					textError='Введите пароль'
					error={errors.password?.message}
					register={register}
				/>
				<FormInput
					className={styles.customInput}
					helperText={errors.password?.message}
					type="password"
					name="passwordSecond"
					placeholder="Повторите пароль"
					labelText="Повторите пароль"
					textError='Введите пароль'
					error={errors.password?.message}
					register={register}
				/>
				<FormInput
					className={styles.customInput}
					helperText={errors.checkbox?.message}
					type="checkbox"
					name="checkbox"
					labelText="I agree to the terms and conditions"
					textError='Для успешной регистрации необходимо принять правила приложения.'
					error={errors.checkbox?.message}
					register={register}
				/>
				<Btn text="Submit" className="one" type='submit' />
			</form>
		</div>
  );
};