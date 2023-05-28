import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './Btn.module.scss';

/**
 * Компонент кпонки.
 *
 * @param {string} text - текстовое содержимое кнопки.
 * @param {string} className - Дополнительные классы для кнопки.
 * @param {string} link - URL-адрес ссылки (необязательно).
 * @param {string} type - тип кнопки (необязательно).
 * @param {function} onclick - Обработчик события click (необязательно).
 * @returns {JSX.Element} - отображаемый компонент кнопки.
*/

export const Btn = ({ text, className, link = '', type = '' , onclick = '', icon = null}) => {
  if (icon && onclick) {
    return (
      <button onClick={onclick} className={`${styles.btn} ${className}`}>
        {React.createElement(icon, { className: `${styles.logo} ${styles.themeLogo}` })}
      </button>
    );
  } else if (onclick){
    return (
      <button onClick={onclick} className={`${styles.btn} ${className}`}>
        <span className={styles.themeText}>{text}</span>
      </button>
    );
  } else if (link) {
    return (
      <Link to={link} className={`${styles.btn} ${className}`}>
        <span className={styles.themeText}>{text}</span>
      </Link>
    );
  } else {
    return (
      <button type={type} className={`${styles.btn} ${className}`}>
        <span className={styles.themeText}>{text}</span>
      </button>
    );
  }
};

Btn.propTypes = {
  onclick: PropTypes.func,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  link: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.elementType,
};