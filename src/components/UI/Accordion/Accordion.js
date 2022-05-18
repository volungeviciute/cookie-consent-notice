import React, { useState, useRef } from 'react';
import './Accordion.css';
import Chevron from './Chevron';
import { Icon } from '@iconify/react';
import SettingStatus from '../SettingStatus/SettingStatus';

function Accordion(props) {
  const [setActive, setActiveState] = useState('');
  const [setHeight, setHeightState] = useState('0px');
  const [setRotate, setRotateState] = useState('accordion-icon');
 
  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === '' ? 'active' : '');
    setHeightState(
      setActive === 'active' ? '0px' : `${content.current.scrollHeight}px`
    );
    setRotateState(
      setActive === 'active' ? 'accordion-icon' : 'accordion-icon rotate'
    );
  }

  if (content && content.current) {
    console.log(
      `content.current.scrollHeight: ${content.current.scrollHeight}`
    );
    console.log(
      `setHeight: ${parseInt(setHeight.substring(0, setHeight.length - 2))}`
    );
    console.log(
      content.current.scrollHeight >
        parseInt(setHeight.substring(0, setHeight.length - 2))
    );
  }

  return (
    <div className='accordion-section'>
      <div className='accordion-card'>
        {props.icon && (
          <Icon className='accordion-title-icon' icon={props.icon} />
        )}
        <p className='accordion-title'>{props.title}</p>
        {props.required !== null && (
          <SettingStatus id={props.purposesId} required={props.required} />
        )}
        <button className={`accordion`} onClick={toggleAccordion}>
          <Chevron className={`${setRotate}`} width={10} fill={'#777'} />
        </button>
      </div>
      <div
        ref={content}
        id={props.id}
        style={{ maxHeight: `${setHeight}` }}
        className='accordion-content'
      >
        <div
          className='accordion-text'
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Accordion;
