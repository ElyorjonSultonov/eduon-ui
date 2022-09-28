import axios from "../../Apis/api";
import React, { useEffect, useState } from "react";
import courseImg from "./img/Rectangle 7.png";
import courseReact from "./img/Rectangle 96.png";
import "./UserCourses.css";

function UserCourses() {
  const [myCourses, setMyCourses] = useState("");

  useEffect(() => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_API_KEY}/api/v1/courses/enrolled-courses/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        )
        .then((res) => {
          setMyCourses(res.data);
        });
    } catch (error) { }
  }, []);

  return (
    <div className="UserCourses">
      <div className="Courserow rowGrid">
        {myCourses.length > 0 ? (
          myCourses.map((item, index) => (
            <div key={index} className="second_card col-6 col-lg-8 col-md-12 col-sm-24">
              <div className="smImgMedia">
                <img
                  className="imgs"
                  src={
                    item.course.cover_img
                      ? `${process.env.REACT_APP_API_KEY + item.course.cover_img
                      }`
                      : courseReact
                  }
                  alt="..."
                />
                <div className="smCard">
                  <h4>
                    {item.course.name.slice(0, 45) +
                      (item.course.name.length > 45 ? "..." : "")}
                  </h4>
                  <p>
                    {item.course.course_owner.full_name.includes(" ")
                      ? item.course.course_owner.full_name.slice(
                        0,
                        item.course.course_owner.full_name.indexOf(" ")
                      ) +
                      " " +
                      (item.course.course_owner.full_name[
                        item.course.course_owner.full_name.indexOf(" ") + 1
                      ] +
                        ".")
                      : item.course.course_owner.full_name}
                  </p>
                </div>
              </div>
              <button className="begin_course_btn">
                Kursni davom ettirish
              </button>
            </div>
          ))
        ) : (
          <div className="col-24">
            <p className="alertMessage">
              Sizda harid qilingan kurslar mavjud emas
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserCourses;
