import React, {useState, useRef} from 'react';
import './DescriptionAccordion.css';
import Triangle from './Triangle';

function DescriptionAccordion(props) {
    const [setActive, setActiveState] = useState("");
    const [setHeight, setHeightState] = useState("0px");
    const [setRotate, setRotateState] = useState("description-accordion-icon");

    const content = useRef(null);

    function toggleAccordion(){
        const parentAccordion = document.getElementById(props.parentId);
        if (parentAccordion) parentAccordion.style = { maxHeight: 20000};
        setActiveState(setActive === "" ? "active" : "");
        setHeightState(setActive === "active" ? "0px" : `${content.current.scrollHeight}px`);
        setRotateState(setActive === "active" ? "description-accordion-icon" : "description-accordion-icon rotate");
    }

  return (
    <div className="accordion-section">
      <button className={`description-accordion`} onClick={toggleAccordion}>
        <p className="description-accordion-title">{props.title}</p>
        <Triangle className={`${setRotate}`} width={10} fill={"rgb(229, 32, 46)"} />
      </button>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className="description-accordion-content"
      >
        <div
          className="description-accordion-text"
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default DescriptionAccordion