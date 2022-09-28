import axios from "../../Apis/api";
import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../../context/Context";
import NavbarDemo from "../Navbar/Navbar";
import NavbarSm from "../Navbar/NavbarSm";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import CourseItem from "../CourseItem/CourseItem";
import CoursesSkeleton from "../CoursesSkeleton/CoursesSkeleton";

export default function FilteredCourses() {
  const { navStretch, boughtCourses } = useContext(StateContext);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [courseData, setcourseData] = useState([]);

  const [title, setTitle] = useState("");
  const { value } = useParams();
  const [errorShowBool, seterrorShowBool] = useState(true);

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v1/courses/categories/`)
        .then((res) => {
          setCategories(res.data);
          seterrorShowBool(false);
        })
        .catch((err) => {
          seterrorShowBool(false);
        });
    } catch (error) {}
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  const navigateToCourses = (id, name) => {
    name === "Barchasi" ? navigate("/") : navigate(`/courses/${id}`);
    localStorage.setItem("activeCategory", name);
  };
  useEffect(() => {
    const initialValue = value.replace("course ", "");
    if (initialValue === "+price") {
      setTitle("Narx yuqorilab borishi bo'yicha kurslar");
    } else if (initialValue === "-price") {
      setTitle("Narx pasayib borishi bo'yicha kurslar");
    } else {
      setTitle("Bepul kurslar");
    }
    try {
      // ${initialValue.replace(" ","")}
      axios
        .get(
          `${process.env.REACT_APP_API_KEY}/api/v1/courses/filter/?ordering=${
            initialValue === "free" ? "+price" : initialValue
          }`
        )
        .then((res) => {
          setcourseData(
            initialValue === "free"
              ? res.data.filter((item) => item.is_free == true)
              : res.data
          );
          seterrorShowBool(false);
        })
        .catch((err) => {
          seterrorShowBool(false);
        });
    } catch (error) {}
  }, [value]);
  for (let i = 0; i < courseData.length; i++) {
    if (window.innerWidth > 1320) {
      if ((i + 1) % 4 === 0) {
        courseData[i].className = "cards-left";
      } else {
        courseData[i].className = "cards-right";
      }
    } else if (window.innerWidth < 1320) {
      if ((i + 1) % 3 === 0) {
        courseData[i].className = "cards-left";
      } else {
        courseData[i].className = "cards-right";
      }
    }
  }

  return (
    <div className="coursesFilter container">
      <NavbarDemo filterValue={value.replace("course ", "")} />
      <NavbarSm />
      <Sidebar active={1} />
      <div className={navStretch ? "ml-240" : "ml-100"}>
        <div>
          <div>
            <div className="navBotMenu ">
              <ul>
                {categories.map((item, index) => (
                  <li
                    key={index}
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

      <div className={navStretch ? "ml-240" : "ml-100"}>
        <h1 className="headerText">{title}</h1>

        {errorShowBool ? (
          <CoursesSkeleton />
        ) : (
          <div className="rowGrid">
            {courseData.length !== 0 &&
              courseData.map((course, index) => (
                <div
                  key={index}
                  style={{ overflowX: "visible !important" }}
                  className="col-6 col-lg-8 col-sm-24"
                >
                  <CourseItem
                    key={index}
                    id={course.id}
                    video={course.video}
                    label={null}
                    title={course.name}
                    trainer={course.course_owner.full_name}
                    trainerId={course.course_owner.id}
                    rating={course.null}
                    ratersNumber={null}
                    graduates={course.enrolled_students}
                    priceLine={course.discount_price}
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
                    coverImgFull={true}
                    boughtCourses={boughtCourses}
                    // cartItemsIds={cartItems}
                    // isAddedToCart={cartItems.some((item) => item == course.id)}
                    // isAddedToFav={favItems.some((item) => item == course.id)}
                    // cartData={cartData}
                    // favData={favData}
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
