import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './Btn.module.scss';

export const Btn = ({ text, className, link = '', type = '' }) => {
  if (link) {
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
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  link: PropTypes.string,
  type: PropTypes.string,
};