import PropTypes from 'prop-types'
import React from 'react'

import styles from './FormInput.module.scss'

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

export const FormInput = ({ className, type, name, placeholder, labelText }) => {
  return (
    <div className={styles.block}>
      <h2 className={`${styles.text} ${styles.themeText}`}>{labelText}</h2>
      <input
        className={`${styles.inputForm} ${styles.themeInput} ${className}`}
        type={type}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
}

FormInput.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
};
