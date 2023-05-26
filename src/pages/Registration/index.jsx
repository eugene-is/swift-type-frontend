import React from 'react'

import { Btn, TypewriterText, FormInput } from '../../components';
import styles from './Registration.module.scss';

/**
 * Страница регистрации
 *
 * @returns {JSX.Element} - отображаемая страница регистрации.
*/

export const Registration = () => {
  return (
		<div className={`${ styles.form} ${ styles.themeContainer }`}>
			<form className={ styles.form__content} id="form" method="post">
				<h1 className={`${ styles.form__title } ${ styles.themeText }`}><TypewriterText text={ 'Registration' }/></h1>
				<FormInput
					className={styles.customInput}
					type="text"
					name=""
					placeholder="Your Name"
					labelText="Full Name"
				/>
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
				<FormInput
					className={styles.customInput}
					type="password"
					name=""
					placeholder="Repeat Password"
					labelText="Repeat Password"
				/>
				<div className={ styles.checkboxWrapper }>
          <input className={ styles.checkbox } type="checkbox" id="checkbox" />
          <label className={ styles.checkboxLabel } htmlFor="checkbox"><span className={ styles.themeText }>I agree to the terms and conditions</span></label>
        </div>
				<Btn text="Submit" className="one" type='submit' />
			</form>
		</div>
  );
};