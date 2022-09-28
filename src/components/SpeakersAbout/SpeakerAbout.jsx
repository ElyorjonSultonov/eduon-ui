import React, { useContext, useEffect, useState } from "react";
import "./SpeakerAbout.css";
import FavoriteCourses from "../../components/FavoriteCourses/FavoriteCourses";
import { StateContext } from "../../context/Context";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Sidebar from "../Sidebar/Sidebar";
import NavbarDemo from "../Navbar/Navbar";
import { useParams } from "react-router-dom";
import axios from "../../Apis/api";
import { BounceLoader } from "react-spinners";
import NavbarSm from "../Navbar/NavbarSm";
// import SpeakerCourse from "../SpeakerCourse/SpeakerCourse";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import CourseItem from "../CourseItem/CourseItem";
import CoursesSkeleton from "../CoursesSkeleton/CoursesSkeleton";
import Footer from "../../components/Footers/Footer";

function SpeakerAbout(props) {
  const { navStretch, boughtCourses } = useContext(StateContext);
  const [speakerInfo, setSpeakerInfo] = useState("");
  const [loader, setLoader] = useState(true);
  const [courseData, setCourseData] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const [favItems, setFavItems] = useState([]);
  const [favData, setFavData] = useState([]);
  const [cartData, setCartData] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_API_KEY}/api/v1/accounts/speaker-profile/${id}`
        )
        .then((res) => {
          setSpeakerInfo(res.data);
          setLoader(false);
        })
        .catch((err) => {
          setLoader(false);
        });
    } catch (error) {
      setLoader(false);
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);
  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v1/courses/speaker/${id}`)
        .then((res) => {
          setCourseData(res.data);
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) { }
  }, []);

  for (let i = 0; i < courseData.length; i++) {
    if (window.innerWidth > 1300) {
      if ((i + 1) % 4 === 0) {
        courseData[i].className = "cards-left";
      } else {
        courseData[i].className = "cards-right";
      }
    } else if (window.innerWidth < 1300) {
      if ((i + 1) % 3 === 0) {
        courseData[i].className = "cards-left";
      } else {
        courseData[i].className = "cards-right";
      }
    }
  }
  return (
    <>
      <NavbarSm />
      <NavbarDemo />
      <Sidebar />

      <div className="SpeakerAbout">
        {speakerInfo && (
          <div className="container">
            <div className={navStretch ? "courses ml-240" : "courses ml-100"}>
              <div className="headrow rowGrid">
                <div className="avatar col-12 col-lg-13 col-md-12 col-sm-24">
                  {speakerInfo.profile_picture ? (
                    <img
                      src={`${process.env.REACT_APP_API_KEY}${speakerInfo.profile_picture}`}
                      alt="LogoImg"
                    />
                  ) : (
                    <AccountCircleIcon
                      aria-describedby={id}
                      className="avatarka pointer"
                    />
                  )}
                  <div className="LogInfo">
                    <div>
                      <h3>Spiker</h3>
                      <h1>
                        {(speakerInfo.f_name && speakerInfo.f_name) +
                          " " +
                          (speakerInfo.l_name === null
                            ? " "
                            : speakerInfo.l_name)}
                      </h1>
                      {speakerInfo.speciality ? (
                        <p>
                          <span>Kasbi:</span> {speakerInfo.speciality}
                        </p>
                      ) : null}
                      <p>{/* <span>Kompaniya:</span>MFactor, Deli */}</p>
                    </div>
                  </div>
                </div>
                <div className="AvInfos col-12 col-lg-11 col-sm-24">
                  <div className="infos">
                    <div className="left ">
                      <div className="top">
                        <div className="course">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.53 20.42H6.21C3.05 20.42 2 18.32 2 16.21V7.79C2 4.63 3.05 3.58 6.21 3.58H12.53C15.69 3.58 16.74 4.63 16.74 7.79V16.21C16.74 19.37 15.68 20.42 12.53 20.42Z"
                              stroke="#006AFF"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M19.5202 17.1L16.7402 15.15V8.83999L19.5202 6.88999C20.8802 5.93999 22.0002 6.51999 22.0002 8.18999V15.81C22.0002 17.48 20.8802 18.06 19.5202 17.1Z"
                              stroke="#006AFF"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M11.5 11C12.3284 11 13 10.3284 13 9.5C13 8.67157 12.3284 8 11.5 8C10.6716 8 10 8.67157 10 9.5C10 10.3284 10.6716 11 11.5 11Z"
                              stroke="#006AFF"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <p className="smMedia">Kurslar</p>
                        </div>
                        <h3>
                          <span className="smMarginLeft">
                            {speakerInfo && speakerInfo.courses_count} ta
                          </span>
                        </h3>
                      </div>
                      <div className="bottom">
                        <div className="favorite">
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.7309 2.51L14.4909 6.03C14.7309 6.52 15.3709 6.99 15.9109 7.08L19.1009 7.61C21.1409 7.95 21.6209 9.43 20.1509 10.89L17.6709 13.37C17.2509 13.79 17.0209 14.6 17.1509 15.18L17.8609 18.25C18.4209 20.68 17.1309 21.62 14.9809 20.35L11.9909 18.58C11.4509 18.26 10.5609 18.26 10.0109 18.58L7.02089 20.35C4.88089 21.62 3.58089 20.67 4.14089 18.25L4.85089 15.18C4.98089 14.6 4.75089 13.79 4.33089 13.37L1.85089 10.89C0.390886 9.43 0.860886 7.95 2.90089 7.61L6.09089 7.08C6.62089 6.99 7.26089 6.52 7.50089 6.03L9.26089 2.51C10.2209 0.599999 11.7809 0.599999 12.7309 2.51Z"
                              fill="#006AFF"
                              stroke="#006AFF"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <p className="smMedia">Spiker reytingi</p>
                        </div>
                        <h3>
                          <span className="smMarginLeft">
                            {speakerInfo && speakerInfo.overall_rating}{" "}
                          </span>
                          ({speakerInfo && speakerInfo.voters_count})
                        </h3>
                      </div>
                    </div>
                    <div className="right">
                      <div className="top">
                        <div className="teacher">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.0495 2.53001L4.02953 6.46001C2.09953 7.72001 2.09953 10.54 4.02953 11.8L10.0495 15.73C11.1295 16.44 12.9095 16.44 13.9895 15.73L19.9795 11.8C21.8995 10.54 21.8995 7.73001 19.9795 6.47001L13.9895 2.54001C12.9095 1.82001 11.1295 1.82001 10.0495 2.53001Z"
                              stroke="#006AFF"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M5.62914 13.08L5.61914 17.77C5.61914 19.04 6.59914 20.4 7.79914 20.8L10.9891 21.86C11.5391 22.04 12.4491 22.04 13.0091 21.86L16.1991 20.8C17.3991 20.4 18.3791 19.04 18.3791 17.77V13.13"
                              stroke="#006AFF"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M21.4004 15V9"
                              stroke="#006AFF"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <p className="smMedia">Jami talabalar</p>
                        </div>
                        <h3>
                          <span className="smMarginLeft">
                            {speakerInfo && speakerInfo.enrolled_students_count}{" "}
                            ta
                          </span>
                        </h3>
                      </div>
                      <div className="bottom">
                        <div className="messages">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.4698 16.83L18.8598 19.99C18.9598 20.82 18.0698 21.4 17.3598 20.97L13.1698 18.48C12.7098 18.48 12.2599 18.45 11.8199 18.39C12.5599 17.52 12.9998 16.42 12.9998 15.23C12.9998 12.39 10.5398 10.09 7.49985 10.09C6.33985 10.09 5.26985 10.42 4.37985 11C4.34985 10.75 4.33984 10.5 4.33984 10.24C4.33984 5.68999 8.28985 2 13.1698 2C18.0498 2 21.9998 5.68999 21.9998 10.24C21.9998 12.94 20.6098 15.33 18.4698 16.83Z"
                              stroke="#006AFF"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M13 15.23C13 16.42 12.56 17.52 11.82 18.39C10.83 19.59 9.26 20.36 7.5 20.36L4.89 21.91C4.45 22.18 3.89 21.81 3.95 21.3L4.2 19.33C2.86 18.4 2 16.91 2 15.23C2 13.47 2.94 11.92 4.38 11C5.27 10.42 6.34 10.09 7.5 10.09C10.54 10.09 13 12.39 13 15.23Z"
                              stroke="#006AFF"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <p className="smMedia">Izohlar</p>
                        </div>
                        <h3>
                          <span className="smMarginLeft">
                            {speakerInfo && speakerInfo.total_comments} ta{" "}
                          </span>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="aboutMe rowGrid">
                <div className="col-24">
                  <h3>Men haqimda</h3>
                </div>
                <div className="aboutMeInfo col-24">
                  {speakerInfo.about_me ? <p>{speakerInfo.about_me}</p> : null}
                </div>
              </div>
              <div className="col-24">
                {/* <FavoriteCourses /> */}
                <h3>Mening kurslarim</h3>
                {courseData.length != 0 ? (
                  <div className="rowGrid">
                    {courseData.map((course, index) => (
                      <div className="col-6 col-lg-8 col-md-12 col-sm-24 course-card">
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
                          trailer_file={course.trailer_file}
                          category={course.category}
                          subcategory={course.subcategory}
                          type={course.type}
                          lang={course.lang}
                          class={course.className}
                          cartItemsIds={cartItems}
                          isAddedToCart={cartItems.some(
                            (item) => item == course.id
                          )}
                          isAddedToFav={favItems.some(
                            (item) => item == course.id
                          )}
                          cartData={cartData}
                          favData={favData}
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
        )}
        {loader && (
          <div className="loader">
            <BounceLoader color="#006AFF" speedMultiplier={1.2} />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default SpeakerAbout;
