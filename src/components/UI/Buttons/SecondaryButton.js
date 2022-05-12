import React from 'react'
import './Button.css'

function SecondaryButton(props) {
  return (
    <button className="button-base secondary-btn" onClick={props.onClick}>
      {props.buttonName}
    </button>
  );
}

export default SecondaryButton