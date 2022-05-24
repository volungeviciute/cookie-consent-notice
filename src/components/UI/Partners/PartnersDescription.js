import React from 'react';
import { Icon } from '@iconify/react';
import './PartnersDescription.css';
import IconText from './IconText';

function PartnersDescription(props) {
  return (
    <div className='partner-description-container'>
      <div className='partner-info-item'>
        <Icon className='partner-icon' icon='ep:document' />
        <p className='partner-text-medium'>Privatumo politika:</p>
        <a href={props.privacyPolicy}>{props.privacyPolicy}</a>
      </div>
      <div className='partner-info-item'>
        <Icon className='partner-icon' icon='ic:outline-access-time' />
        <p className='partner-text-medium'>
          Ilgiausias slapuko galiojimo laikas:
        </p>{' '}
        <p>{props.expiryDate}</p>
      </div>
      <IconText listName='Tikslai' list={props.purposes} />
      {props.specialPurposes.length > 0  && (
        <IconText listName='Specialūs tikslai' list={props.specialPurposes} />
      )}
      {props.functions.length > 0 && (
        <IconText listName='Funkcijos' list={props.functions} />
      )}
      {props.specialFunctions.length > 0 && (
        <IconText listName='Specialios funkcijos' list={props.specialFunctions} />
      )}
    </div>
  );
}

export default PartnersDescription