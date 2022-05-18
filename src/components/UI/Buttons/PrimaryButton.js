import React from 'react';
import './Button.css';

function PrimaryButton(props) {
  return (
    <button
      className="button-base primary-btn"
      onClick={props.onClick}
    >
      {props.buttonName}
    </button>
  );
}

export default PrimaryButton