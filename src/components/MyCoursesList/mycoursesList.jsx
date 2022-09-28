import React, { useEffect, useState } from "react";
import "../Mycourses/Mycourses.css";
// import RectangelOne from "../../assets/images/Rectangle 1.png";
import { useNavigate } from "react-router-dom";
import axios from "../../Apis/api";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
function MyCourseList(props) {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v1/courses/categories/`)
        .then((res) => {
          setCategoryName(res);
        })
        .catch((err) => refresh(err.response.status, err.response.status.text));
    } catch (error) {}
  }, []);
  useEffect(() => {}, [props.datas]);
  const navigateToCourses = (id, name) => {
    name === "Barchasi" ? navigate("/") : navigate(`/courses/${id}`);
    localStorage.setItem("activeCategory", name);
  };

  return (
    <section className="loadedCourses">
      <div className="container">
        <div className="rowGrid">
          {props.datas.length !== 0 ? (
            <div className="tableList">
              <table>
                <tr className="topTitle">
                  <th className="col-1">№</th>
                  <th style={{ textAlign: "left" }} className="col-7">
                    Nomi
                  </th>
                  <th className="col-auto">
                    Avtor
                    <svg width="9" height="13" fill="none">
                      <path
                        d="M1 8.63989L4.53 12.1599L8.06 8.63989"
                        stroke="#999999"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.05957 4.52002L4.52957 1.00002L0.999571 4.52002"
                        stroke="#999999"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </th>
                  <th className="col-auto">
                    Kategoriya
                    <svg width="9" height="13" fill="none">
                      <path
                        d="M1 8.63989L4.53 12.1599L8.06 8.63989"
                        stroke="#999999"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.05957 4.52002L4.52957 1.00002L0.999571 4.52002"
                        stroke="#999999"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </th>
                </tr>
                {props.datas
                  ? props.datas.map((element, value) => (
                      <tr key={value} className="bodyTitle">
                        <td className="col-1 number">{value + 1}</td>
                        <td
                          onClick={() =>
                            navigate(`/watch/${element.course.id}`)
                          }
                          className="col-21 imgs"
                        >
                          <img
                            src={`${process.env.REACT_APP_API_KEY}${element.course.cover_img}`}
                            alt="..."
                          />
                          <p>
                            {element.course.name.length > 20
                              ? element.course.name.slice(0, 20)
                              : element.course.name}
                          </p>
                        </td>
                        <td
                          onClick={() =>
                            navigate(
                              `/speakerAbout/${element.course.course_owner.id}`
                            )
                          }
                          className="col-2 hover-underline"
                        >
                          {element.course.course_owner.full_name}
                        </td>
                        <td
                          onClick={() =>
                            navigateToCourses(
                              element.course.category,
                              categoryName.data.filter(
                                (id) => id.id == element.course.category
                              )[0].name
                            )
                          }
                          className="col-2 hover-underline"
                        >
                          {categoryName.data
                            ? categoryName.data.filter(
                                (id) => id.id == element.course.category
                              )[0].name
                            : null}
                        </td>
                      </tr>
                    ))
                  : null}
              </table>
            </div>
          ) : (
            <h1
              style={{ textDecoration: "none", marginTop: "40px" }}
              className="alertMessage"
            >
              Sizda sotib olingan kurslar mavjud emas
            </h1>
          )}
        </div>
      </div>
    </section>
  );
}

export default MyCourseList;
