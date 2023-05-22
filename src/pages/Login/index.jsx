import React from 'react';

import styles from './Login.module.scss';
import { Btn, TypewriterText, FormInput } from '../../components';


export const Login = () => {
  return (
		<div className={`${ styles.form } ${ styles.themeContainer }`}>
			<form className={ styles.form__content} id="form" method="post">
				<h1 className={`${ styles.form__title } ${ styles.themeText }`}><TypewriterText text={ 'Login' }/></h1>
				<FormInput
					className={styles.customInput}
					type="text"
					name=""
					placeholder="Your Email"
					labelText="Email"
				/>
				<FormInput
					className={styles.customInput}
					type="password"
					name=""
					placeholder="Password"
					labelText="Password"
				/>
				<Btn text="Submit" className="one" type='submit' />
			</form>
		</div>
  );
};