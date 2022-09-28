import React from "react";
import "./AccordionItem.css";
import Icon1 from "../../assets/icons/CourseStructureIcons/video-play.png";

function AccordionItem() {
  return (
    <div className="accordion__item">
      <div className="acc__left">
        <img src={Icon1} alt="..." />
        <p>1. Strategik marketing (treyler)</p>
      </div>
    </div>
  );
}

export default AccordionItem;
