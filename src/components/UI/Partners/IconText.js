import { Icon } from '@iconify/react';
import React from 'react';
import './PartnersDescription.css';

function IconText(props) {
  return (
    <div className="list">
      <p className="partner-text-medium">{props.listName}:</p>
      <div>
        {props.list.map((item) => (
          <div className="partner-purpose">
            <Icon icon={item.icon} className="partner-icon" />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IconText