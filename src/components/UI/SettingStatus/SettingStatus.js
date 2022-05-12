import React from 'react';
import Toggle from '../Buttons/Toggle';
import './SettingStatus.css';

function SettingStatus(props) {
  return props.required === true ? (
    <p className='status-required'>Įjungta</p>
  ) : (
    <Toggle id={props.id}></Toggle>
  );
}

export default SettingStatus;
