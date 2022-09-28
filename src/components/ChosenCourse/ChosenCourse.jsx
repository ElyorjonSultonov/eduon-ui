import React, { useContext, useEffect, useState } from "react";
import "./ChosenCourse.css";
import "../../assets/css/Grid.css";
import { StateContext } from "../../context/Context";
import CourseAbout from "../CourseAbout/CourseAbout";
import Comments from "../Comments/comments";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import TabUnstyled from "@mui/base/TabUnstyled";
import CourseStructure from "../CourseStructure/CourseStructure";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../Apis/api";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Navigation, Autoplay } from "swiper";
import PauseIcon from "@mui/icons-material/Pause";
import SwiperItem from "../SwiperItem/SwiperItem";
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import "swiper/modules/navigation/navigation.min.css";
import Sidebar from "../Sidebar/Sidebar";
import FooterN from "../Footers/Footer";
import NavbarDemo from "../Navbar/Navbar";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import { Alert } from "@mui/material";
import NavbarSm from "../Navbar/NavbarSm";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "4px solid #006aff",
  borderRadius: "15px",
  boxShadow: 24,
  p: 5,
};

export default function ChosenCourse(props) {
  const { navStretch, isremoved, setIsRemoved, loggedIn } =
    useContext(StateContext);
  var id = useParams();
  const [alertError, setAlertError] = useState(false);
  const [resData, setResData] = useState("");
  const [slidePerView, setSlidePerView] = useState(0);
  const [alertErrorFav, setAlertErrorFav] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [play, setPlay] = useState(true);
  const [hover, setHover] = useState(false);
  const [pause, setPause] = useState(false);
  const [sameCourses, setSameCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [isBought, setisBought] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    alertError
      ? setTimeout(() => {
          setAlertError(false);
        }, 3000)
      : setAlertError(false);
    alertErrorFav
      ? setTimeout(() => {
          setAlertErrorFav(false);
        }, 3000)
      : setAlertErrorFav(false);
  }, [alertError, alertErrorFav]);

  useEffect(() => {
    loginError
      ? setTimeout(() => {
          setLoginError(false);
        }, 4000)
      : setLoginError(false);
  }, [loginError]);
  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v1/courses/${id.id}`)
        .then((res) => {
          setResData(res.data);
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  }, [id]);
  useEffect(() => {
    try {
      loggedIn &&
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
            setisBought(res.data.some((item) => item.course.id === resData.id));
          })
          .catch((err) => {
            refresh(err.response.status, err.response.status.text);
          });
    } catch (error) {}
  }, [resData]);
  const buyCourse = async (e, id) => {
    !loggedIn && handleOpen();
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      loggedIn &&
        (await axios
          .post(
            `${process.env.REACT_APP_API_KEY}/api/v1/orders/cart`,
            {
              course: id,
              is_referral: false,
            },
            { headers }
          )
          .then((res) => {
            res.data.message === "This course already exists"
              ? setAlertError(true)
              : setAlertError(false);
            navigate("/cart");
          })
          .catch((err) => {
            refresh(err.response.status, err.response.status.text);
          }));

      setIsRemoved(!isremoved);
    } catch (error) {}
  };

  const addToFav = async (e, id) => {
    e.preventDefault();
    !loggedIn && handleOpen();
    try {
      const data = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_KEY}/api/v1/courses/fav-courses/`,
        data: {
          course: id,
        },
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      }).catch((err) => {
        refresh(err.response.status, err.response.status.text);
      });
      data.data.message === "This course is already in the list!"
        ? setAlertErrorFav(true)
        : setAlertErrorFav(false);
    } catch (error) {}
  };

  useEffect(() => {
    if (window.innerWidth >= 900 && window.innerWidth < 1300) {
      // navStretch? setSlidePerView(2):setSlidePerView(2)
      setSlidePerView(2);
    } else {
      setSlidePerView(4);
    }
  }, [navStretch]);
  const navigateToSpeaker = (e, id) => {
    e.preventDefault();
    navigate(`/speakerAbout/${id}`);
  };

  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_API_KEY} /api/v1/courses/filter/?category=${resData.category}`
        )
        .then((res) => {
          setSameCourses(res.data);
        });
    } catch (error) {}
  }, [resData]);
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <>
      <NavbarDemo />
      <NavbarSm />
      <Sidebar />
      <div className={navStretch ? "ml-240" : "ml-100"}>
        <section id="courseAbout">
          <div className="container">
            <div className="rowGrid justify-between">
              <div className="col-16 col-lg-15 col-sm-24 px-sm-0">
                <div className="video">
                  <div className="img">
                    <video
                      onMouseOver={() => setHover(true)}
                      onMouseLeave={() => setHover(false)}
                      className="coverImg"
                      src={resData.trailer_file}
                      poster={resData.cover_img}
                      controls
                      onPlay={() => {
                        setPlay(false);
                        setPause(true);
                      }}
                      onPause={() => {
                        setPlay(true);
                        setPause(false);
                      }}
                    ></video>

                    {play && hover ? (
                      <svg
                        width="100"
                        height="100"
                        fill="none"
                        onClick={() => {
                          document.querySelector("video").play();
                          setPlay(false);
                          setPause(true);
                        }}
                        onMouseOver={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                      >
                        <path
                          d="M49.8749 91.6667C72.8868 91.6667 91.5416 73.0119 91.5416 50C91.5416 26.9881 72.8868 8.33334 49.8749 8.33334C26.8631 8.33334 8.20825 26.9881 8.20825 50C8.20825 73.0119 26.8631 91.6667 49.8749 91.6667Z"
                          fill="#006AFF"
                          stroke="#006AFF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M36.4167 50.9583V44C36.4167 35.3333 42.5418 31.7917 50.0418 36.125L56.0834 39.625L62.1251 43.125C69.6251 47.4583 69.6251 54.5417 62.1251 58.875L56.0834 62.375L50.0418 65.875C42.5418 70.2083 36.4167 66.6667 36.4167 58V50.9583Z"
                          fill="#FCFCFC"
                          stroke="#006AFF"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : null}
                    {pause && hover ? (
                      <div
                        className="pause"
                        onMouseLeave={() => {
                          setHover(false);
                        }}
                        onMouseOver={() => setHover(true)}
                        onClick={() => {
                          document.querySelector("video").pause();
                          setPlay(true);
                        }}
                      >
                        <PauseIcon
                          style={{
                            borderRadius: "50%",
                            background: "#006AFF",
                            fontSize: "20px",
                            width: "10px",
                          }}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="fundamentals d-none d-sm-block">
                  <div className="fundamentals_title">
                    <h1>{resData.name}</h1>
                    <div className="spikers">
                      <div className="img">
                        {resData ? (
                          resData.course_owner.profile_picture ===
                          "NULL" ? null : (
                            <img
                              src={`https://eduon-backend.uz/media/${resData.course_owner.profile_picture}`}
                              alt="jpg"
                            />
                          )
                        ) : null}
                      </div>
                      <div className="spikers_title">
                        <span>Spiker:</span>
                        <p
                          className="pointer"
                          onClick={(e) =>
                            navigateToSpeaker(e, resData.course_owner.id)
                          }
                        >
                          {resData ? resData.course_owner.full_name : null}
                        </p>
                      </div>
                    </div>
                    <a className="titleCourse">Kurs haqida qisqacha:</a>
                    <ul>
                      <li>
                        <a>
                          <svg width="24" height="24" fill="none">
                            <path
                              d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15.7099 15.18L12.6099 13.33C12.0699 13.01 11.6299 12.24 11.6299 11.61V7.51"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {resData
                            ? new Date(
                                resData.course_duration
                                  ? resData.course_duration * 1000
                                  : 0
                              )
                                .toISOString()
                                .substring(11, 19)
                            : null}{" "}
                          soatlik videodarslik
                        </a>
                      </li>
                      <li>
                        <a>
                          <svg width="24" height="24" fill="none">
                            <path
                              d="M12.53 20.42H6.21C3.05 20.42 2 18.32 2 16.21V7.79C2 4.63 3.05 3.58 6.21 3.58H12.53C15.69 3.58 16.74 4.63 16.74 7.79V16.21C16.74 19.37 15.68 20.42 12.53 20.42Z"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M19.5202 17.1L16.7402 15.15V8.84L19.5202 6.89C20.8802 5.94 22.0002 6.52 22.0002 8.19V15.81C22.0002 17.48 20.8802 18.06 19.5202 17.1Z"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M11.5 11C12.3284 11 13 10.3284 13 9.5C13 8.67157 12.3284 8 11.5 8C10.6716 8 10 8.67157 10 9.5C10 10.3284 10.6716 11 11.5 11Z"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {resData && resData.video_count + " ta videolar"}
                        </a>
                      </li>

                      <li>
                        <a>
                          <svg width="24" height="24" fill="none">
                            <path
                              d="M19.0598 18.67L16.9198 14.4L14.7798 18.67"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15.1699 17.91H18.6899"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16.9198 22C14.1198 22 11.8398 19.73 11.8398 16.92C11.8398 14.12 14.1098 11.84 16.9198 11.84C19.7198 11.84 21.9998 14.11 21.9998 16.92C21.9998 19.73 19.7298 22 16.9198 22Z"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5.02 2H8.94C11.01 2 12.01 3.00002 11.96 5.02002V8.94C12.01 11.01 11.01 12.01 8.94 11.96H5.02C3 12 2 11 2 8.92999V5.01001C2 3.00001 3 2 5.02 2Z"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9.0097 5.84998H4.94971"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6.96973 5.16998V5.84998"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7.98994 5.84003C7.98994 7.59003 6.61994 9.01001 4.93994 9.01001"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9.01015 9.01001C8.28015 9.01001 7.62016 8.62 7.16016 8"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2 15C2 18.87 5.13 22 9 22L7.95 20.25"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M22 9C22 5.13 18.87 2 15 2L16.05 3.75"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {resData.lang === "O'zbekcha"
                            ? "O'zbekcha"
                            : resData.lang === "RUSSIAN"
                            ? "Русский"
                            : resData.lang === "ENGLISH" && "English"}
                        </a>
                      </li>
                      <li className="percent">
                        <div className="stark">
                          <svg width="24" height="24" fill="none">
                            <path
                              d="M13.7299 3.51L15.4899 7.03C15.7299 7.52 16.3699 7.99 16.9099 8.08L20.0999 8.61C22.1399 8.95 22.6199 10.43 21.1499 11.89L18.6699 14.37C18.2499 14.79 18.0199 15.6 18.1499 16.18L18.8599 19.25C19.4199 21.68 18.1299 22.62 15.9799 21.35L12.9899 19.58C12.4499 19.26 11.5599 19.26 11.0099 19.58L8.01991 21.35C5.87991 22.62 4.57991 21.67 5.13991 19.25L5.84991 16.18C5.97991 15.6 5.74991 14.79 5.32991 14.37L2.84991 11.89C1.38991 10.43 1.85991 8.95 3.89991 8.61L7.08991 8.08C7.61991 7.99 8.25991 7.52 8.49991 7.03L10.2599 3.51C11.2199 1.6 12.7799 1.6 13.7299 3.51Z"
                              fill="#006AFF"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p>
                            {resData ? resData.course_rating.rating : null}
                            <span>
                              (
                              {resData
                                ? resData.course_rating.voters_number
                                : null}
                              )
                            </span>
                          </p>
                        </div>
                        <div className="teacher">
                          <svg width="24" height="24" fill="none">
                            <path
                              d="M10.05 2.53001L4.03002 6.46001C2.10002 7.72001 2.10002 10.54 4.03002 11.8L10.05 15.73C11.13 16.44 12.91 16.44 13.99 15.73L19.98 11.8C21.9 10.54 21.9 7.73001 19.98 6.47001L13.99 2.54001C12.91 1.82001 11.13 1.82001 10.05 2.53001Z"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5.63012 13.08L5.62012 17.77C5.62012 19.04 6.60012 20.4 7.80012 20.8L10.9901 21.86C11.5401 22.04 12.4501 22.04 13.0101 21.86L16.2001 20.8C17.4001 20.4 18.3801 19.04 18.3801 17.77V13.13"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M21.3999 15V9"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p>{resData.enrolled_students}</p>
                        </div>
                      </li>
                    </ul>
                    <p className="twelve">
                      {resData
                        ? resData.discount_price
                          ? (
                              resData.price - resData.discount_price
                            ).toLocaleString("uz-UZ", {
                              style: "currency",
                              currency: "UZS",
                            })
                          : resData.price.toLocaleString("uz-UZ", {
                              style: "currency",
                              currency: "UZS",
                            })
                        : 0}
                    </p>
                    {isBought ? (
                      <button
                        onClick={() => navigate(`/watch/${resData.id}`)}
                        className="btn_one btn"
                      >
                        Kursni davom ettirish
                      </button>
                    ) : (
                      <button
                        onClick={(e) => buyCourse(e, resData.id)}
                        className="btn_one btn"
                      >
                        Xarid qilish
                      </button>
                    )}

                    <button
                      onClick={(e) => addToFav(e, resData.id)}
                      className="btn_two"
                    >
                      Sevimlilarga qo'shish
                    </button>
                  </div>
                </div>
                <div className="video_title">
                  <TabsUnstyled defaultValue={0}>
                    <div className="aboutCourse">
                      <TabsListUnstyled>
                        <TabUnstyled className="tab">Kurs haqida</TabUnstyled>
                        <TabUnstyled className="tab">Kurs tarkibi</TabUnstyled>
                        <TabUnstyled className="tab">
                          Fikr va izohlar
                        </TabUnstyled>
                      </TabsListUnstyled>
                    </div>
                    <TabPanelUnstyled value={0}>
                      <CourseAbout resData={resData} />
                    </TabPanelUnstyled>
                    <TabPanelUnstyled value={1}>
                      <CourseStructure
                        isBought={isBought}
                        id={id}
                        resData={resData}
                      />
                    </TabPanelUnstyled>
                    <TabPanelUnstyled value={2}>
                      <Comments id={id} resData={resData} />
                    </TabPanelUnstyled>
                  </TabsUnstyled>
                </div>
              </div>
              <div className="col-8 col-lg-9 col-sm-24">
                <div className="fundamentals d-sm-none">
                  <div className="fundamentals_title">
                    <h1>{resData.name}</h1>
                    <div className="spikers">
                      <div className="img">
                        {resData ? (
                          resData.course_owner.profile_picture ===
                          "NULL" ? null : (
                            <img
                              src={`https://eduon-backend.uz/media/${resData.course_owner.profile_picture}`}
                              alt="jpg"
                            />
                          )
                        ) : null}
                      </div>
                      <div className="spikers_title">
                        <span>Spiker:</span>
                        <p
                          className="pointer"
                          onClick={(e) =>
                            navigateToSpeaker(e, resData.course_owner.id)
                          }
                        >
                          {resData ? resData.course_owner.full_name : null}
                        </p>
                      </div>
                    </div>
                    <a className="titleCourse">Kurs haqida qisqacha:</a>
                    <ul>
                      <li>
                        <a>
                          <svg width="24" height="24" fill="none">
                            <path
                              d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15.7099 15.18L12.6099 13.33C12.0699 13.01 11.6299 12.24 11.6299 11.61V7.51"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {resData
                            ? new Date(
                                resData.course_duration
                                  ? resData.course_duration * 1000
                                  : 0
                              )
                                .toISOString()
                                .substring(11, 19)
                            : null}{" "}
                          soatlik videodarslik
                        </a>
                      </li>
                      <li>
                        <a>
                          <svg width="24" height="24" fill="none">
                            <path
                              d="M12.53 20.42H6.21C3.05 20.42 2 18.32 2 16.21V7.79C2 4.63 3.05 3.58 6.21 3.58H12.53C15.69 3.58 16.74 4.63 16.74 7.79V16.21C16.74 19.37 15.68 20.42 12.53 20.42Z"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M19.5202 17.1L16.7402 15.15V8.84L19.5202 6.89C20.8802 5.94 22.0002 6.52 22.0002 8.19V15.81C22.0002 17.48 20.8802 18.06 19.5202 17.1Z"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M11.5 11C12.3284 11 13 10.3284 13 9.5C13 8.67157 12.3284 8 11.5 8C10.6716 8 10 8.67157 10 9.5C10 10.3284 10.6716 11 11.5 11Z"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {resData && resData.video_count + " ta videolar"}{" "}
                        </a>
                      </li>

                      <li>
                        <a>
                          <svg width="24" height="24" fill="none">
                            <path
                              d="M19.0598 18.67L16.9198 14.4L14.7798 18.67"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15.1699 17.91H18.6899"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16.9198 22C14.1198 22 11.8398 19.73 11.8398 16.92C11.8398 14.12 14.1098 11.84 16.9198 11.84C19.7198 11.84 21.9998 14.11 21.9998 16.92C21.9998 19.73 19.7298 22 16.9198 22Z"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5.02 2H8.94C11.01 2 12.01 3.00002 11.96 5.02002V8.94C12.01 11.01 11.01 12.01 8.94 11.96H5.02C3 12 2 11 2 8.92999V5.01001C2 3.00001 3 2 5.02 2Z"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9.0097 5.84998H4.94971"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6.96973 5.16998V5.84998"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7.98994 5.84003C7.98994 7.59003 6.61994 9.01001 4.93994 9.01001"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9.01015 9.01001C8.28015 9.01001 7.62016 8.62 7.16016 8"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2 15C2 18.87 5.13 22 9 22L7.95 20.25"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M22 9C22 5.13 18.87 2 15 2L16.05 3.75"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {resData.lang === "O'zbekcha"
                            ? "O'zbekcha"
                            : resData.lang === "RUSSIAN"
                            ? "Русский"
                            : resData.lang === "ENGLISH" && "English"}
                        </a>
                      </li>
                      <li className="percent">
                        <div className="stark">
                          <svg width="24" height="24" fill="none">
                            <path
                              d="M13.7299 3.51L15.4899 7.03C15.7299 7.52 16.3699 7.99 16.9099 8.08L20.0999 8.61C22.1399 8.95 22.6199 10.43 21.1499 11.89L18.6699 14.37C18.2499 14.79 18.0199 15.6 18.1499 16.18L18.8599 19.25C19.4199 21.68 18.1299 22.62 15.9799 21.35L12.9899 19.58C12.4499 19.26 11.5599 19.26 11.0099 19.58L8.01991 21.35C5.87991 22.62 4.57991 21.67 5.13991 19.25L5.84991 16.18C5.97991 15.6 5.74991 14.79 5.32991 14.37L2.84991 11.89C1.38991 10.43 1.85991 8.95 3.89991 8.61L7.08991 8.08C7.61991 7.99 8.25991 7.52 8.49991 7.03L10.2599 3.51C11.2199 1.6 12.7799 1.6 13.7299 3.51Z"
                              fill="#006AFF"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p>
                            {resData ? resData.course_rating.rating : null}
                            <span>
                              (
                              {resData
                                ? resData.course_rating.voters_number
                                : null}
                              )
                            </span>
                          </p>
                        </div>
                        <div className="teacher">
                          <svg width="24" height="24" fill="none">
                            <path
                              d="M10.05 2.53001L4.03002 6.46001C2.10002 7.72001 2.10002 10.54 4.03002 11.8L10.05 15.73C11.13 16.44 12.91 16.44 13.99 15.73L19.98 11.8C21.9 10.54 21.9 7.73001 19.98 6.47001L13.99 2.54001C12.91 1.82001 11.13 1.82001 10.05 2.53001Z"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5.63012 13.08L5.62012 17.77C5.62012 19.04 6.60012 20.4 7.80012 20.8L10.9901 21.86C11.5401 22.04 12.4501 22.04 13.0101 21.86L16.2001 20.8C17.4001 20.4 18.3801 19.04 18.3801 17.77V13.13"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M21.3999 15V9"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p>{resData.enrolled_students}</p>
                        </div>
                      </li>
                    </ul>
                    <p className="twelve">
                      {resData
                        ? resData.discount_price
                          ? (
                              resData.price - resData.discount_price
                            ).toLocaleString("uz-UZ", {
                              style: "currency",
                              currency: "UZS",
                            })
                          : resData.price.toLocaleString("uz-UZ", {
                              style: "currency",
                              currency: "UZS",
                            })
                        : 0}
                    </p>
                    {isBought ? (
                      <button
                        onClick={() => navigate(`/watch/${resData.id}`)}
                        className="btn_one btn"
                      >
                        Kursni davom ettirish
                      </button>
                    ) : (
                      <button
                        onClick={(e) => buyCourse(e, resData.id)}
                        className="btn_one btn"
                      >
                        Xarid qilish
                      </button>
                    )}
                    <button
                      onClick={(e) => addToFav(e, resData.id)}
                      className="btn_two"
                    >
                      Sevimlilarga qo'shish
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="spikers">
          <div className="container">
            <h1 className="spiker_title">Spiker va o'xshash kurslar</h1>
            <div className="rowGrid" style={{ flexWrap: "nowrap" }}>
              <div className="col-4 col-lg-6 col-sm-24">
                <div className="cards_one">
                  <div className="spiker_card_one">
                    <div className="d-sm-flex justify-sm-between">
                      {resData ? (
                        resData.course_owner.profile_picture ===
                        "NULL" ? null : (
                          <img
                            src={`https://eduon-backend.uz/media/${resData.course_owner.profile_picture}`}
                            alt="jpg"
                          />
                        )
                      ) : null}
                      <div>
                        <h3>
                          {resData && resData.course_owner.full_name}
                          {/* {resData
                            ? speaker.slice(0, index) +
                              " " +
                              (speaker[index + 1] + ".")
                            : null} */}
                        </h3>
                        <div className="stark">
                          <svg width="22" height="22" fill="none">
                            <path
                              d="M12.7299 2.51001L14.4899 6.03001C14.7299 6.52001 15.3699 6.99001 15.9099 7.08001L19.0999 7.61001C21.1399 7.95001 21.6199 9.43001 20.1499 10.89L17.6699 13.37C17.2499 13.79 17.0199 14.6 17.1499 15.18L17.8599 18.25C18.4199 20.68 17.1299 21.62 14.9799 20.35L11.9899 18.58C11.4499 18.26 10.5599 18.26 10.0099 18.58L7.01991 20.35C4.87991 21.62 3.57991 20.67 4.13991 18.25L4.84991 15.18C4.97991 14.6 4.74991 13.79 4.32991 13.37L1.84991 10.89C0.389909 9.43001 0.859909 7.95001 2.89991 7.61001L6.08991 7.08001C6.61991 6.99001 7.25991 6.52001 7.49991 6.03001L9.25991 2.51001C10.2199 0.600015 11.7799 0.600015 12.7299 2.51001Z"
                              fill="#006AFF"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p>
                            {resData ? resData.course_rating.rating : 0}{" "}
                            <span>
                              {resData ? resData.enrolled_students : 0}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      className="pointer btn"
                      onClick={(e) =>
                        navigateToSpeaker(e, resData.course_owner.id)
                      }
                    >
                      Profilni ko'rish
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-20 col-lg-18 d-sm-none">
                {sameCourses.length > 3 ? (
                  <Swiper
                    autoplay={{
                      delay: 2000,
                      disableOnInteraction: false,
                    }}
                    navigation={true}
                    spaceBetween={50}
                    pagination={{
                      clickable: true,
                    }}
                    centeredSlides={true}
                    modules={[Autoplay, Navigation]}
                    className="mySwiper"
                    style={{ overflowX: "hidden" }}
                    slidesPerView={slidePerView}
                    loop={true}
                  >
                    {sameCourses.map((item, index) => (
                      <SwiperSlide key={index} className="swiperSlide">
                        <SwiperItem
                          alertError={alertError}
                          alertErrorFav={alertErrorFav}
                          loginError={loginError}
                          setAlertError={setAlertError}
                          setAlertErrorFav={setAlertErrorFav}
                          setLoginError={setLoginError}
                          resData={resData}
                          sameCourse={item}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <div style={{ flexWrap: "nowrap" }} className="rowGrid">
                    {sameCourses.map((item, index) => (
                      <SwiperItem
                        key={index}
                        className={"col-5"}
                        alertError={alertError}
                        alertErrorFav={alertErrorFav}
                        loginError={loginError}
                        setAlertError={setAlertError}
                        setAlertErrorFav={setAlertErrorFav}
                        setLoginError={setLoginError}
                        resData={resData}
                        sameCourse={item}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="container d-sm-block">
            <div className="rowGrid">
              {sameCourses.map((item, index) => (
                <SwiperItem
                  key={index}
                  className={"col-24"}
                  alertError={alertError}
                  alertErrorFav={alertErrorFav}
                  loginError={loginError}
                  setAlertError={setAlertError}
                  setAlertErrorFav={setAlertErrorFav}
                  setLoginError={setLoginError}
                  resData={resData}
                  sameCourse={item}
                />
              ))}
            </div>
          </div>
        </section>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style} className="container">
              <div className="rowGrid">
                <p style={{ color: "#1c1c1c" }} className="col-24">
                  Akkauntingiz yo'qmi? Unda
                </p>
                <div className="col-24">
                  <Button
                    sx={{
                      width: "100%",
                      marginTop: "20px",
                      backgroundColor: "#80B5FF",
                      borderRadius: "15px",
                      height: "59px",
                      color: "white",
                      fontSize: "20px",
                      fontWeight: "500",
                    }}
                    className="btn"
                    onClick={() => navigate("/register")}
                  >
                    Ro'yxatdan o'ting
                  </Button>
                </div>
              </div>
            </Box>
          </Fade>
        </Modal>
        <Alert
          className={alertError ? "alert animation" : "alert"}
          severity="error"
        >
          <strong>Bu kurs savatchaga qo'shilgan!</strong>
        </Alert>
        <Alert
          className={alertErrorFav ? "alert animation" : "alert"}
          severity="error"
        >
          <strong>Bu kurs sevimlilarga qo'shilgan!</strong>
        </Alert>
        <Alert
          className={loginError ? "alert animation" : "alert"}
          severity="error"
        >
          <strong>
            Iltimos ushbu amaliyotni bajarish uchun tizimga kiring!
          </strong>
          <br />
        </Alert>
      </div>
      <FooterN />
    </>
  );
}
