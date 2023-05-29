import React from 'react';

import styles from './FormInput.module.scss';

/**
 * Компонент ввода текста в форму регистрации/авторизации
 *
 * @param {string} className - Дополнительные классы для ввода в форму.
 * @param {string} type - тип ввода.
 * @param {string} name - входное имя.
 * @param {string} заполнитель - входной заполнитель.
 * @param {string} LabelText - текст метки для ввода.
 * @returns {JSX.Element} - отображаемый компонент ввода формы.
 */

export const FormInput = ({
	className,
	type,
	name,
	placeholder,
	labelText,
	register,
	error,
	textError,
	onChange,
}) => {
	const showError = error !== undefined && error !== '';
	const checkbox = type === 'checkbox';
	if(onChange) {
		return (
			<div className={`${styles.updateBlock}`}>
				{error && <span className={styles.errorTextUpdate}>{error}</span>}
				<input
					className={`${styles.inputForm} ${styles.updateForm} ${styles.themeInput} ${
						styles.themeText
					} ${className} ${showError ? styles.errorInput : ''}`}
					type={type}
					onChange={onChange}
					name={name}
					placeholder={placeholder}
				/>
			</div>
		);
	} else{
		return (
			<div className={`${styles.block} ${checkbox ? styles.checkbox : ''}`}>
				<h2 className={`${checkbox ? '' : styles.text} ${styles.themeText}`}>
					{labelText}
				</h2>
				{error && <span className={styles.errorText}>{error}</span>}
				<input
					className={`${styles.inputForm} ${styles.themeInput} ${
						styles.themeText
					} ${className} ${showError ? styles.errorInput : ''}`}
					type={type}
					name={name}
					placeholder={placeholder}
					{...register(name, { required: textError })}
				/>
			</div>
		);
	}

};

