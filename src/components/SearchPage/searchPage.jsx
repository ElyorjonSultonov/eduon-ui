import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StateContext } from "../../context/Context";
import CourseItem from "../CourseItem/CourseItem";
import NavbarDemo from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import SidebarActive from "../Sidebar/SidebarActive";
import "./searchPage.css";
import axios from "../../Apis/api";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import "swiper/modules/navigation/navigation.min.css";
import { Autoplay, Navigation } from "swiper";
import Img1 from "../../assets/images/ChosenCourse/img1.png";
import { Divider } from "@mui/material";
import Footer from "../Footers/Footer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NavbarSm from "../Navbar/NavbarSm";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";

export default function SearchPage(props) {
  const { navStretch, addedToCart, addedToFav, loggedIn, boughtCourses } =
    useContext(StateContext);
  const { value } = useParams();
  const [courseResponse, setCourseResponse] = useState([]);
  const [speakerResponse, setspeakerResponse] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const [favItems, setFavItems] = useState([]);
  const [favData, setFavData] = useState([]);

  useEffect(() => {
    try {
      axios
        .post(`${process.env.REACT_APP_API_KEY}/api/v1/courses/search/`, {
          word: value,
        })
        .then((res) => {
          setCourseResponse(res.data.found_courses);
          setspeakerResponse(res.data.found_speakers);
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  }, [value]);

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
    } catch (error) {}
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
    } catch (error) {}
  }, [addedToFav]);

  //   const [courseData, setCourseData] = useState(searchResponse?searchResponse.found_courses:[]);
  //   const [speakerData, setSpeakerData] = useState(searchResponse?searchResponse.found_courses:[]);

  for (let i = 0; i < courseResponse.length; i++) {
    if (window.innerWidth > 1320) {
      if ((i + 1) % 4 === 0) {
        courseResponse[i].className = "cards-left";
      } else {
        courseResponse[i].className = "cards-right";
      }
    } else if (window.innerWidth < 1320) {
      if ((i + 1) % 3 === 0) {
        courseResponse[i].className = "cards-left";
      } else {
        courseResponse[i].className = "cards-right";
      }
    }
  }

  const search = (e) => {
    e.preventDefault();
    navigate(`/search/${searchValue}`);
    // setSearchToggle()
  };
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);
  return (
    <div className="searchPageComp">
      <NavbarDemo />
      <NavbarSm />
      <Sidebar />
      <div className={navStretch ? "courses ml-240" : "courses ml-100"}>
        <div className="container d-sm-block pt-100">
          <div className="rowGrid">
            <div className="col-sm-block col-sm-24">
              <form onSubmit={search} id="searchBox">
                <div className="search">
                  <label htmlFor="search" className="pointer searchIcon">
                    <svg width="24" height="24" fill="none">
                      <path
                        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                        stroke="#999999"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 22L20 20"
                        stroke="#999999"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </label>
                  <svg
                    className="filterButton"
                    width="24"
                    height="24"
                    fill="none"
                  >
                    <path
                      d="M3 7H21"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M6 12H18"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10 17H14"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <input
                    onChange={(e) => setSearchValue(e.target.value)}
                    id="search"
                    type="text"
                    placeholder="Qidirish..."
                    value={searchValue}
                  />
                </div>

                {/* {searchValue && searchResponse.length != 0 && (
                  <div className="searchResponse">
                    {searchResponse.map((item) => (
                      <div
                        onClick={() => navigate(`/chosenCourse/${item.id}`)}
                        className="rowGrid pointer"
                      >
                        <img
                          className="col-8"
                          src={`${process.env.REACT_APP_API_KEY}${item.cover_img}`}
                          alt=""
                        />
                        <div className="col-16">
                          <p className="name">
                            {item.name.length > 25
                              ? item.name.slice(0, 24) + "..."
                              : item.name}
                          </p>
                          <p className="teacher">
                            {item.course_owner.full_name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )} */}
              </form>
            </div>
          </div>
        </div>
        <div className="container searchPage">
          {courseResponse.length != 0 ? (
            <h1 className="headerTitle">
              "{value}" - bo'yicha topilgan kurslar!
            </h1>
          ) : (
            <h1 className="headerTitle">
              "{value}" - bo'yicha kurslar topilmadi!
            </h1>
          )}
          <div className="rowGrid">
            {courseResponse.length != 0
              ? courseResponse.map((course, index) => (
                  <div key={index} className="col-6 col-lg-8 col-sm-24">
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
                      cartItemsIds={cartItems}
                      isAddedToCart={cartItems.some(
                        (item) => item == course.id
                      )}
                      isAddedToFav={favItems.some((item) => item == course.id)}
                      cartData={cartData}
                      favData={favData}
                      boughtCourses={boughtCourses}
                    />
                  </div>
                ))
              : null}
          </div>
          <Divider />
        </div>
      </div>
      <Footer />
    </div>
  );
}
