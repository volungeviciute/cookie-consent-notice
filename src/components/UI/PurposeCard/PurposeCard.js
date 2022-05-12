import { Icon } from '@iconify/react';
import DescriptionAccordion from '../DescriptionAccordion/DesctiptionAccordion';
import LegalDescription from '../LegalDescription/LegalDescription';
import './PurposeCard.css';
import SettingStatus from '../SettingStatus/SettingStatus';

function PurposeCard(props) {
  function getDescriptionClass() {
    if (!props.icon) {
      return 'purpose-title-no-icon';
    }
    return '';
  }

  return (
    <div className='purpose-container'>
      <div className='purpose-card'>
        {props.title && (
          <div className='purpose-title'>
            <Icon className='purpose-icon' icon={props.icon} />
            <p className={getDescriptionClass()}>{props.title}</p>
          </div>
        )}
        <p className='purpose-description'>{props.children}</p>
        <DescriptionAccordion
          title='Teisinis aprašas'
          parentId={props.parentId ? props.parentId : ''}
        >
          <LegalDescription
            canDo={props.canDo}
            cantDo={props.cantDo}
            note={props.note}
          />
        </DescriptionAccordion>
        {props.partners && (
          <DescriptionAccordion
            title={`Rodyti partnerius (${props.partners.length})`}
            parentId={props.parentId ? props.parentId : ''}
          >
            <ul className='partner-list'>
              {props.partners.map((partner) => (
                <li>{partner.title}</li>
              ))}
            </ul>
          </DescriptionAccordion>
        )}
      </div>
      {props.required !== null && (
        <SettingStatus id={props.id} required={props.required} />
      )}
    </div>
  );
}

export default PurposeCard;
