import React from 'react';
import './Checkbox.scss';

export const Checkbox = ({ checked = false }) => {
  return (
    <div className="checkbox">
      <input type="checkbox" defaultChecked={false} tabIndex={-1} />
      <span className="checkmark" data-checked={checked} />
    </div>
  );
};
