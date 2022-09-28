import React from "react";
import "./CourseAbout.css";
export default function CourseAbout(props) {
  return (
    <div className="course-about">
      <p>{props.resData.short_descr}</p>
      {props.resData.whom_this_course && (
        <div>
          <h4 className="headerText">Kurs kimlar uchun</h4>
          <p>{props.resData.whom_this_course}</p>
        </div>
      )}{" "}
      {props.resData.what_to_learn && (
        <div>
          <h4 className="headerText">Kursda nimalar o'rganiladi</h4>
          <p>{props.resData.what_to_learn}</p>
        </div>
      )}{" "}
    </div>
  );
}
