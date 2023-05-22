import React from 'react';
import PropTypes from 'prop-types';
import styles from './FormInput.module.scss';

export const FormInput = ({ className, type, name, placeholder, labelText }) => {
  return (
    <div className={ styles.block }>
      <h2 className={`${styles.text} ${styles.themeText}`}>{labelText}</h2>
      <input
        className={`${styles.input} ${styles.themeInput} ${className}`}
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
