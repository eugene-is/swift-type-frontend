import React from 'react';
import PropTypes from 'prop-types';
import { useTypewriter } from '../../hooks/use-typewriter';

export const TypewriterText =({ text }) => {
  const displayText = useTypewriter(text);

  return (
    <div>
      <h1>{displayText}</h1>
    </div>
  );
}

TypewriterText.propTypes = {
  text: PropTypes.string.isRequired,
};