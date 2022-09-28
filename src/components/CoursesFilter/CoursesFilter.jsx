import axios from "../../Apis/api";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StateContext } from "../../context/Context";
import NavbarDemo from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./CoursesFilter.css";
import CoursesSkeleton from "../CoursesSkeleton/CoursesSkeleton";
import CourseItem from "../CourseItem/CourseItem";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import NavbarSm from "../Navbar/NavbarSm";

export default function CoursesFilter() {
  const { navStretch, addedToFav, addedToCart, loggedIn, boughtCourses } =
    useContext(StateContext);
  const id = useParams();
  const [courseData, setcourseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [errorShowBool, seterrorShowBool] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartData, setCartData] = useState([]);

  const [favItems, setFavItems] = useState([]);
  const [favData, setFavData] = useState([]);

  const navigate = useNavigate();

  const navigateToCourses = (id, name) => {
    name === "Barchasi" ? navigate("/") : navigate(`/courses/${id}`);
    localStorage.setItem("activeCategory", name);
  };
  useEffect(() => {
    setActiveCategory(localStorage.getItem("activeCategory"));
  }, [navigate]);

  useEffect(() => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_API_KEY}/api/v1/courses/filter/?category=${id.id}`
        )
        .then((res) => {
          setcourseData(res.data);
          seterrorShowBool(false);
        })
        .catch((err) => { });
    } catch (error) { }
  }, [id]);
  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v1/courses/categories/`)
        .then((res) => {
          setCategories(res.data);
        });
    } catch (error) { }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);
  useEffect(() => {
    try {
      loggedIn &&
        axios
          .get(`${process.env.REACT_APP_API_KEY}/api/v1/orders/cart`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          })
          .then((res) => {
            setCartData(res.data.items);
            setCartItems(res.data.items.map((item) => item.course.id));
          })
          .catch((err) => {
            refresh(err.response.status, err.response.status.text);
          });
    } catch (error) { }
  }, [addedToCart]);
  useEffect(() => {
    try {
      loggedIn &&
        axios
          .get(
            `${process.env.REACT_APP_API_KEY}/api/v1/courses/list-fav-courses/`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          )
          .then((res) => {
            setFavData(res.data);
            setFavItems(res.data.map((item) => item.id));
          })
          .catch((err) => {
            refresh(err.response.status, err.response.status.text);
          });
    } catch (error) { }
  }, [addedToFav]);
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
      <NavbarDemo />
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

      <div className={navStretch ? "ml-240" : "ml-100"}>
        {courseData.length !== 0 ? (
          <h1 className="headerText">{activeCategory}</h1>
        ) : null}
        <div className="rowGrid">
          {errorShowBool ? (
            <CoursesSkeleton />
          ) : courseData.length !== 0 ? (
            courseData.map((course, index) => (
              <div
                style={{ overflowX: "visible !important" }}
                className="col-6 col-lg-8 col-md-12 col-sm-24"
                key={index}
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
                  cartItemsIds={cartItems}
                  isAddedToCart={cartItems.some((item) => item == course.id)}
                  isAddedToFav={favItems.some((item) => item == course.id)}
                  cartData={cartData}
                  favData={favData}
                  boughtCourses={boughtCourses}
                />
              </div>
            ))
          ) : (
            <h1 className="headerText col-24">
              {activeCategory} - kurslari topilmadi
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}
