import React, { useContext, useEffect, useState } from "react";
import CourseItem from "../CourseItem/CourseItem";
import "../../assets/css/Grid.css";
import "../Courses/Courses.css";
import { StateContext } from "../../context/Context";
import axios from "../../Apis/api";
import CoursesSkeleton from "../CoursesSkeleton/CoursesSkeleton";
import NavbarDemo from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import NavbarSm from "../Navbar/NavbarSm";
import "./ChosenCourseCategory.css";

export default function ChosenCourseCategory() {
  const { navStretch, boughtCourses } = useContext(StateContext);
  const [subcategoryName, setSubcategoryName] = useState("");

  const [subCategoryCourses, setsubCategoryCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  const id = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_API_KEY}/api/v1/courses/subcategories/${id.id}`
        )
        .then((res) => {
          setsubCategoryCourses(res.data.courses);
          setSubcategoryName(res.data.name);
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) { }
  }, [id]);

  if (subCategoryCourses) {
    for (let i = 0; i < subCategoryCourses.length; i++) {
      if (window.innerWidth > 1320) {
        if ((i + 1) % 4 === 0) {
          subCategoryCourses[i].className = "cards-left";
        } else {
          subCategoryCourses[i].className = "cards-right";
        }
      } else if (window.innerWidth < 1320) {
        if ((i + 1) % 3 === 0) {
          subCategoryCourses[i].className = "cards-left";
        } else {
          subCategoryCourses[i].className = "cards-right";
        }
      }
    }
  }

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v1/courses/categories/`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) { }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);
  const navigateToCourses = (id, name) => {
    name === "Barchasi" ? navigate("/") : navigate(`/courses/${id}`);
    localStorage.setItem("activeCategory", name);
  };

  return (
    <>
      <NavbarDemo />
      <Sidebar />
      <NavbarSm />
      <div className="pt-0">
        <div className={navStretch ? "ml-240" : "ml-100"}>
          <div>
            <div>
              <div className="navBotMenu ">
                <ul>
                  {categories.map((item, index) => (
                    <li
                      key={index}
                      className={id.id == item.id ? "activeCategory" : ""}
                      onClick={() => navigateToCourses(item.id, item.name)}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={navStretch ? "courses ml-240" : "courses ml-100"}>
          <div className="container pt-sm-130">
            {subcategoryName ? (
              <h1 className="headerText">{subcategoryName} - kurslari</h1>
            ) : null}
            {subCategoryCourses ? (
              <div className="rowGrid">
                {subCategoryCourses.map((course, index) => (
                  <div className="col-6 col-lg-8 col-md-12 col-sm-24">
                    <CourseItem
                      key={index}
                      id={course.id}
                      video={course.video}
                      label={null}
                      title={course.name}
                      trainer={course.course_owner.full_name}
                      rating={course.null}
                      ratersNumber={null}
                      graduates={course.enrolled_students}
                      priceLine={null}
                      price={course.price}
                      dicountAvailable={null}
                      updated_at={course.updated_at}
                      level={course.level}
                      about={course.short_descr}
                      coverImg={course.cover_img}
                      recommendation={course.recommendation}
                      exchange_url={course.exchange_url}
                      ratings={course.course_rating}
                      key_words={course.key_words}
                      trailer_url={course.trailer_url}
                      category={course.category}
                      subcategory={course.subcategory}
                      type={course.type}
                      lang={course.lang}
                      class={course.className}
                      boughtCourses={boughtCourses}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <CoursesSkeleton />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
