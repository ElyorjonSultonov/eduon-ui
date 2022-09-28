import React, { useContext, useEffect, useState } from "react";
import "../ChosenCourse/ChosenCourse.css";
import "../../assets/css/Grid.css";
import Img1 from "../../assets/images/ChosenCourse/img1.png";
import edit from "../../assets/icons/edit-2.png";
import trash from "../../assets/icons/trash.png";
import verified from "../../assets/icons/like-shapes.png";
import Rectangle from "../../assets/images/ChosenCourse/Rectangle 7.png";
import { StateContext } from "../../context/Context";
import CourseAbout from "../CourseAbout/CourseAbout";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import Comments from "../Comments/comments";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import TabUnstyled from "@mui/base/TabUnstyled";
import CourseStructure from "../CourseStructure/CourseStructure";
import axios from "../../Apis/api";
import SidebarActive from "../Sidebar/SidebarActive";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footers/Footer";
import NavbarDemo from "../Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import NavbarSm from "../Navbar/NavbarSm";
import "./SpChosenCourse.css";
import PauseIcon from "@mui/icons-material/Pause";

export default function SpChosenCourse(props) {
  const { navStretch } = useContext(StateContext);
  const [resData, setResData] = useState("");
  const [play, setPlay] = useState(true);
  const [hover, setHover] = useState(false);
  const [pause, setPause] = useState(false);
  const [isBought, setisBought] = useState(false);

  const navigate = useNavigate();
  var id = useParams();
  const { user } = props;
  useEffect(() => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_API_KEY}/api/v1/courses/uploaded-courses/${id.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        )
        .then((res) => {
          setResData(res.data);
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  }, [id]);

  const navigateToSpeaker = (e, id) => {
    e.preventDefault();
    navigate(`/speakerAbout/${id}`);
  };
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

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
          setisBought(res.data.some((item) => item.course.id === resData.id));
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  }, [resData]);
  return (
    // <section id="CRMbiznes"  classNameName={navStretch ? "ml-240" : "ml-100"}>
    <>
      <NavbarDemo />
      <NavbarSm />
      {user ? user.is_speaker ? <SidebarActive /> : <Sidebar /> : <Sidebar />}
      <div className={navStretch ? "ml-240" : "ml-100"}>
        <section id="courseAbout" className="speakerMyCourse">
          <div className="container">
            <div className="rowGrid justify-between">
              <div className="col-16 col-lg-14 col-sm-24">
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
                {/* <!-- video end -------- --> */}
                <div className="fundamentals d-none d-sm-block">
                  <div className="fundamentals_title">
                    <h1>{resData.name}</h1>
                    <div className="spikers">
                      <div className="img">
                        {resData ? (
                          resData.course_owner.profile_picture ===
                          "NULL" ? null : (
                            <img
                              src={`${process.env.REACT_APP_API_KEY}/media/${resData.course_owner.profile_picture}`}
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
                    <a className="titleCourse" href="#!">
                      Kurs haqida qisqacha:
                    </a>
                    <ul>
                      <li>
                        <a href="#!">
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
                            {resData ? resData.course_rating.rating : null}{" "}
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
                    <button
                      onClick={() => navigate("/speaker")}
                      className="btn btn_one"
                    >
                      Statistika
                    </button>
                    <div className="rowGrid">
                      <div className="col-24">
                        <button
                          onClick={() => navigate(`/courseEdit/${id.id}`)}
                          className="btn_two d-align-center"
                        >
                          <img src={edit} alt="...." /> Tahrirlash
                        </button>
                      </div>
                    </div>
                    {resData.is_valid === "VALID" ? (
                      <p className="verifiedCourse d-align-center">
                        <img src={verified} alt="...." />
                        Tasdiqlangan Kurs
                      </p>
                    ) : (
                      <p
                        style={{ color: "orange" }}
                        className="verifiedCourse d-align-center"
                      >
                        <EmojiObjectsIcon style={{ color: "orange" }} />
                        Jarayondagi kurs
                      </p>
                    )}
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
                {/* <!-- video_title end --- --> */}
              </div>
              <div className="col-8 col-lg-10 col-sm-24">
                <div className="fundamentals d-sm-none">
                  <div className="fundamentals_title">
                    <h1>{resData.name}</h1>
                    <div className="spikers">
                      <div className="img">
                        {resData ? (
                          resData.course_owner.profile_picture ===
                          "NULL" ? null : (
                            <img
                              src={`${process.env.REACT_APP_API_KEY}/media/${resData.course_owner.profile_picture}`}
                              alt="jpg"
                            />
                          )
                        ) : null}
                      </div>
                      <div className="spikers_title">
                        <span>Spiker:</span>
                        <p
                          onClick={(e) =>
                            navigateToSpeaker(e, resData.course_owner.id)
                          }
                        >
                          {resData ? resData.course_owner.full_name : null}
                        </p>
                      </div>
                    </div>
                    <a className="titleCourse" href="#!">
                      Kurs haqida qisqacha:
                    </a>
                    <ul>
                      <li>
                        <a href="#!">
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
                            {resData ? resData.course_rating.rating : null}{" "}
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
                        ? resData.price.toLocaleString("uz-UZ", {
                            style: "currency",
                            currency: "UZS",
                          })
                        : 0}
                    </p>
                    <button
                      onClick={() => navigate("/speaker")}
                      className="btn btn_one"
                    >
                      Statistika
                    </button>
                    <div className="rowGrid">
                      <div className="col-24">
                        <button
                          onClick={() => navigate(`/courseEdit/${id.id}`)}
                          className="btn_two d-align-center"
                        >
                          <img src={edit} alt="...." /> Tahrirlash
                        </button>
                      </div>
                    </div>
                    {resData.is_valid === "VALID" ? (
                      <p className="verifiedCourse d-align-center">
                        <img src={verified} alt="...." />
                        Tasdiqlangan Kurs
                      </p>
                    ) : (
                      <p
                        style={{ color: "orange" }}
                        className="verifiedCourse d-align-center"
                      >
                        <EmojiObjectsIcon style={{ color: "orange" }} />
                        Jarayondagi kurs
                      </p>
                    )}
                  </div>
                </div>

                {/* <!-- fundamentals Husan M end  --> */}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
