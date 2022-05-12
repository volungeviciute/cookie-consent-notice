import React, { Fragment } from 'react';
import { Icon } from "@iconify/react";
import "./LegalDescription.css"
import parse from "html-react-parser";

function LegalDescription(props) {
  return (
    <div className="legal-description-container">
      {props.canDo && (
        <Fragment>
          <p>
            <b>Tiekėjai gali:</b>
          </p>
          <ul>
            {props.canDo.map((purpose) => (
              <li>{purpose}</li>
            ))}
          </ul>
        </Fragment>
      )}
      {props.cantDo && (
        <Fragment>
          <p>
            <br />
            <b>Tiekėjai negali:</b>
          </p>
          <ul>
            {props.cantDo.map((purpose) => (
              <li>{purpose}</li>
            ))}
          </ul>
        </Fragment>
      )}
      {props.note && (
        <div>
          <div className="note-container">
            <Icon
              className="icon"
              icon="clarity:exclamation-circle-solid"
              align='bottom'
            />
            <p className="note">
              <b>Pastaba:</b>
              <br />
            </p>
          </div>
          {/* https://stackoverflow.com/questions/66996539/how-to-show-only-texts-in-react-from-json-data-with-html-tag */}
          <p>{parse(props.note)}</p>
        </div>
      )}
    </div>
  );
}

export default LegalDescription