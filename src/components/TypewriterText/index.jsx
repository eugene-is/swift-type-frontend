import PropTypes from 'prop-types';
import React from 'react';
import { useTypewriter } from '../../hooks/useTypewriter';

/**
 * Компонент текста, который появляется посимвольно, эмулируя машинопись.
 *
 * @param {string} text - Текст для отображения.
 * @returns {JSX.Element} - Возвращаемый отображаемый компонент текста.
 */

export const TypewriterText = ({ text }) => {
	const displayText = useTypewriter(text);

	return <div>{displayText}</div>;
};

TypewriterText.propTypes = {
	text: PropTypes.string.isRequired,
};
