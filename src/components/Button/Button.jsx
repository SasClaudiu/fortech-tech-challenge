import React from 'react';
import './Button.scss';

export const Button = ({ text, children, onClick, variant = 'primary' }) => {
  return (
    <button className="button" onClick={onClick} data-variant={variant}>
      <p>{text || children}</p>
    </button>
  );
};
