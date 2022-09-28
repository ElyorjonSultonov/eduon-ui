import axios from "../../Apis/api";
import React, { useEffect, useState } from "react";
import "./DownloadedCourses.css";
import courseImg from "./img/Rectangle 7.png";
import { useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";

function DownloadedCourses() {
  const [uploadedCourses, setuploadedCourses] = useState([]);
  const [loader, setLoader] = useState(true);

  const navigate = useNavigate();
  const chosenCourse = (e, id) => {
    e.preventDefault();
    navigate(`/chosenCourse/${id}`);
  };
  const speakerAbout = (e, id) => {
    e.preventDefault();
    navigate(`/speakerAbout/${id}`);
  };

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v1/courses/uploaded-courses/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
        .then((res) => {
          setuploadedCourses(res.data);
          setLoader(false);
        })
        .catch((err) => {
          setLoader(false);
        });
    } catch (error) { }
  }, []);

  return (
    <div className="DownloadedCourses">
      {uploadedCourses.length > 0 ? (
        <div className="Courserow rowGrid">
          {uploadedCourses.map((courses, index) => (
            <div key={index} className="first_card col-6 col-lg-8 col-md-12 col-sm-24">
              <div className="smCards">
                <img
                  onClick={(e) => chosenCourse(e, courses.id)}
                  className="pointer"
                  src={
                    courses.cover_img
                      ? `${process.env.REACT_APP_API_KEY}${courses.cover_img}`
                      : courseImg
                  }
                  alt="..."
                />
                <div className="smCardText">
                  <h4 onClick={(e) => chosenCourse(e, courses.id)}>
                    {courses.name.slice(0, 20) +
                      (courses.name.length > 20 ? "..." : "")}
                  </h4>
                  <p onClick={(e) => speakerAbout(e, courses.course_owner.id)}>
                    {courses.course_owner.full_name.slice(
                      0,
                      courses.course_owner.full_name.indexOf(" ")
                    ) +
                      " " +
                      (courses.course_owner.full_name[
                        courses.course_owner.full_name.indexOf(" ") + 1
                      ] +
                        ".")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="col-24">
          <p className="alertMessage">Sizda yuklangan kurslar mavjud emas</p>
        </div>
      )}
      {loader && (
        <div className="loader">
          <BounceLoader color="#006AFF" speedMultiplier={1.2} />
        </div>
      )}
    </div>
  );
}

export default DownloadedCourses;
