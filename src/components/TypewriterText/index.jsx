import React from 'react';
import PropTypes from 'prop-types';
import { useTypewriter } from '../../hooks/use-typewriter';

/**
 * Компонент текста, который появляется посимвольно, эмулируя машинопись.
 * 
 * @param {string} text - Текст для отображения.
 * @returns {JSX.Element} - Возвращаемый отображаемый компонент текста.
 */

export const TypewriterText = ({ text }) => {
  const displayText = useTypewriter(text);

  return (
    <h1>{displayText}</h1>
  );
};

TypewriterText.propTypes = {
  text: PropTypes.string.isRequired,
};