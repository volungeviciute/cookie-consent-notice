import React from 'react';
import Accordion from '../Accordion/Accordion';
import PurposeCard from '../PurposeCard/PurposeCard';
import DataFilter from '../../../DataFilter';
import './SummarySettingsSection.css';

function SummarySettingsSection(props) {
  return (
    <Accordion
      id={props.id}
      icon={props.icon}
      purposesId={props.purposes.map((x) => x.id)}
      title={props.title}
    >
      <p className='section-description'>{props.children}</p>
      {props.purposes.map((purpose) => (
        <PurposeCard
          parentId={props.id}
          id={purpose.id}
          icon={purpose.icon}
          title={purpose.title}
          canDo={purpose.legalDescription.can}
          cantDo={purpose.legalDescription.cant}
          note={purpose.legalDescription.note}
          partners={DataFilter(props.partners, purpose.partners)}
        >
          {purpose.description}
        </PurposeCard>
      ))}
    </Accordion>
  );
}

export default SummarySettingsSection;
