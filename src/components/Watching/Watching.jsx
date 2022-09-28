import React, { useContext, useEffect, useState, useRef } from "react";
import "./Watching.css";
// import AccordionItem from "../AccordionItem/AccordionItem";
import Icon1 from "../../assets/icons/CourseStructureIcons/video-play.png";
import VideoCircle from "../../assets/icons/CourseStructureIcons/video-circle.png";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { StateContext } from "../../context/Context";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import TabUnstyled from "@mui/base/TabUnstyled";
import CourseAbout from "../CourseAbout/CourseAbout";
import Comments from "../Comments/comments";
import axios from "../../Apis/api";
import { useParams } from "react-router-dom";
import CourseRating from "../CourseRating/courseRating";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footers/Footer";
import NavbarDemo from "../Navbar/Navbar";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import PauseIcon from "@mui/icons-material/Pause";
import ReactHlsPlayer from "react-hls-player";
import VideoSettingsIcon from "@mui/icons-material/VideoSettings";
import CheckIcon from "@mui/icons-material/Check";
import { Divider } from "@mui/material";
import NavbarSm from "../Navbar/NavbarSm";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
// import video from "../../assets/video/office.mp4";
// import YouTube from "react-youtube" ochirib tashlash kerak;

function Watching() {
  const [expanded, setExpanded] = useState("");
  const [datas, setDatas] = useState([]);
  const [play, setPlay] = useState(true);
  const [hover, setHover] = useState(false);
  const [pause, setPause] = useState(false);
  const [videoUrl, setVideoUrl] = useState();
  const { navStretch } = useContext(StateContext);
  const [resData, setResData] = useState("");
  const [VideoSetting, setVideoSetting] = useState(false);
  const [currentVideo, setCurrentVideo] = useState();
  const [lessonIndex, setLessonIndex] = useState(0);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  var id = useParams();
  const playVideo = useRef();

  const playingVideoPlayer = () => {
    playVideo.current.play();
  };

  const pauseVideoPlayer = () => {
    playVideo.current.pause();
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
    } catch (error) { }
  }, [id]);

  useEffect(() => {
    console.log(datas);
  }, [datas]);

  // const onDownloadButton = (e) => {
  //   fetch(`${process.env.REACT_APP_API_KEY}${e}`).then((response) => {
  //     response.blob().then((blob) => {
  //       const fileURL = window.URL.createObjectURL(blob);
  //       let alink = document.createElement("a");
  //       alink.href = fileURL;
  //       alink.download = `${process.env.REACT_APP_API_KEY}${e}`;
  //       alink.click();
  //     });
  //   });
  // };

  useEffect(() => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_API_KEY}/api/v1/courses/watch/module/${id.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        )
        .then((res) => {
          setDatas(res.data);
        })
        .catch((err) => refresh(err.response.status, err.response.status.text));
    } catch (error) { }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);
  useEffect(() => {
    lessonIndex && setActiveModuleIndex(parseInt(lessonIndex.slice(0, 1)));
    lessonIndex && setActiveLessonIndex(parseInt(lessonIndex.slice(1)));
  }, [lessonIndex]);

  // const nextFunc = () => {
  //   setActiveModuleIndex((p) => p + 1);
  // };
  // const prevFunc = () => {
  //   setActiveModuleIndex((p) => p - 1);
  // };
  useEffect(() => {
    console.log(resData.trailer_url);
  }, [resData]);

  return (
    <>
      <NavbarSm />
      <NavbarDemo />
      <Sidebar />
      <div className={navStretch ? "courses ml-240" : "courses ml-100"}>
        <div className="watchingCourses">
          <div className="container">
            <div className="complete d-sm-none">
              <h1>{resData.name}</h1>
            </div>
            <div className="rowGrid">
              <div className="col-18 col-lg-14 col-md-24 p-0 col-sm-24">
                <div className="video">
                  <div className="img">
                    {videoUrl ? (
                      <ReactHlsPlayer
                        config={{
                          file: { attributes: { controlsList: "nodownload" } },
                        }}
                        src={currentVideo}
                        autoPlay={true}
                        controls={true}
                        width="100%"
                        // height="366px !important"
                        className="coverImg"
                        // poster={resData.cover_img}
                        onMouseOver={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        playerRef={playVideo}
                        onPlay={() => {
                          setPlay(false);
                          setPause(true);
                        }}
                        onPause={() => {
                          setPlay(true);
                          setPause(false);
                        }}
                        down
                      />
                    ) : (
                      // <video
                      //   onMouseOver={() => setHover(true)}
                      //   onMouseLeave={() => setHover(false)}
                      //   className="coverImg"
                      //   src={resData.trailer_file}
                      //   poster={resData.cover_img}
                      //   controls
                      //   ref={playVideo}
                      // ></video>
                      <ReactHlsPlayer
                        config={{
                          file: { attributes: { controlsList: "nodownload" } },
                        }}
                        src={resData.trailer_url && resData.trailer_url}
                        autoPlay={true}
                        controls={true}
                        width="100%"
                        // height="366px !important"
                        className="coverImg"
                        poster={resData.cover_img}
                        onMouseOver={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        playerRef={playVideo}
                        onPlay={() => {
                          setPlay(false);
                          setPause(true);
                        }}
                        onPause={() => {
                          setPlay(true);
                          setPause(false);
                        }}
                        down
                      />
                    )}
                    {play ? (
                      <svg
                        width="100"
                        height="100"
                        fill="none"
                        onClick={() => {
                          playingVideoPlayer();
                          setPlay(false);
                          setPause(true);
                        }}
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
                          setPlay(true);
                          pauseVideoPlayer();
                          setPause(false);
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
                    {hover ? (
                      <div
                        className="videoSetting"
                        onMouseOver={() => setHover(true)}
                        onMouseLeave={() => {
                          setHover(false);
                          setVideoSetting(false);
                        }}
                      >
                        <VideoSettingsIcon
                          onClick={() => setVideoSetting(!VideoSetting)}
                        />
                        {VideoSetting && hover && videoUrl ? (
                          <ul className="resolution">
                            <li className="title">Video tasvirning sifati</li>
                            <Divider color="white" />
                            {videoUrl.resolution_144p ? (
                              <li
                                onClick={() =>
                                  setCurrentVideo(videoUrl.resolution_144p)
                                }
                              >
                                {currentVideo?.includes("144p") ? (
                                  <div className="iconsQuality">
                                    <CheckIcon />
                                  </div>
                                ) : (
                                  <div className="iconsQuality"></div>
                                )}
                                144p
                              </li>
                            ) : null}
                            {videoUrl.resolution_240p ? (
                              <li
                                onClick={() =>
                                  setCurrentVideo(videoUrl.resolution_240p)
                                }
                              >
                                {currentVideo?.includes("240p") ? (
                                  <div className="iconsQuality">
                                    <CheckIcon />
                                  </div>
                                ) : (
                                  <div className="iconsQuality"></div>
                                )}
                                240p
                              </li>
                            ) : null}
                            {videoUrl.resolution_360p ? (
                              <li
                                onClick={() =>
                                  setCurrentVideo(videoUrl.resolution_360p)
                                }
                              >
                                {currentVideo?.includes("360p") ? (
                                  <div className="iconsQuality">
                                    <CheckIcon />
                                  </div>
                                ) : (
                                  <div className="iconsQuality"></div>
                                )}
                                360p
                              </li>
                            ) : null}
                            {videoUrl.resolution_480p ? (
                              <li
                                onClick={() =>
                                  setCurrentVideo(videoUrl.resolution_480p)
                                }
                              >
                                {currentVideo?.includes("480p") ? (
                                  <div className="iconsQuality">
                                    <CheckIcon />
                                  </div>
                                ) : (
                                  <div className="iconsQuality"></div>
                                )}
                                480p
                              </li>
                            ) : null}
                            {videoUrl.resolution_720p ? (
                              <li
                                onClick={() =>
                                  setCurrentVideo(videoUrl.resolution_720p)
                                }
                              >
                                {currentVideo?.includes("720p") ? (
                                  <div className="iconsQuality">
                                    <CheckIcon />
                                  </div>
                                ) : (
                                  <div className="iconsQuality"></div>
                                )}
                                720p
                              </li>
                            ) : null}
                            {videoUrl.resolution_1080p ? (
                              <li
                                onClick={() =>
                                  setCurrentVideo(videoUrl.resolution_1080p)
                                }
                              >
                                {currentVideo?.includes("1080p") ? (
                                  <div className="iconsQuality">
                                    <CheckIcon />
                                  </div>
                                ) : (
                                  <div className="iconsQuality"></div>
                                )}
                                1080p
                              </li>
                            ) : null}
                          </ul>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                  {/* <button
                    onClick={() => {
                      prevFunc();
                    }}
                    // disabled={activeModuleIndex === 0 ? true : false}
                    className="navigation n-prev"
                  >
                    <NavigateBeforeIcon />
                  </button>
                  <button
                    onClick={() => {
                      nextFunc();
                    }}
                    disabled={activeModuleIndex === datas.length ? true : false}
                    className="navigation n-next"
                  >
                    <NavigateNextIcon />
                  </button> */}
                </div>
                <h1
                  style={{ paddingLeft: "15px" }}
                  className="headerText col-sm-block"
                >
                  {resData.name}
                </h1>

                <div className="main">
                  <div className="video_title">
                    <TabsUnstyled defaultValue={0}>
                      <div className="aboutCourse">
                        <TabsListUnstyled>
                          {window.innerWidth <= 576 && (
                            <TabUnstyled className="tab">
                              Darslar ro'yxati
                            </TabUnstyled>
                          )}

                          <TabUnstyled className="tab">Kurs haqida</TabUnstyled>
                          <TabUnstyled className="tab">
                            Fikr va izohlar
                          </TabUnstyled>
                          <TabUnstyled className="tab">
                            Kurs reytingi
                          </TabUnstyled>
                        </TabsListUnstyled>
                      </div>
                      {window.innerWidth <= 576 && (
                        <TabPanelUnstyled value={0}>
                          <div className="rowGrid">
                            <div className="col-sm-24 d-sm-block">
                              <section className="StructureMain">
                                <div className="watch__title">
                                  <h1>
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M22 16.7399V4.66994C22 3.46994 21.02 2.57994 19.83 2.67994H19.77C17.67 2.85994 14.48 3.92994 12.7 5.04994L12.53 5.15994C12.24 5.33994 11.76 5.33994 11.47 5.15994L11.22 5.00994C9.44 3.89994 6.26 2.83994 4.16 2.66994C2.97 2.56994 2 3.46994 2 4.65994V16.7399C2 17.6999 2.78 18.5999 3.74 18.7199L4.03 18.7599C6.2 19.0499 9.55 20.1499 11.47 21.1999L11.51 21.2199C11.78 21.3699 12.21 21.3699 12.47 21.2199C14.39 20.1599 17.75 19.0499 19.93 18.7599L20.26 18.7199C21.22 18.5999 22 17.6999 22 16.7399Z"
                                        stroke="#1C1C1C"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M12 5.48999V20.49"
                                        stroke="#1C1C1C"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M7.75 8.48999H5.5"
                                        stroke="#1C1C1C"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M8.5 11.49H5.5"
                                        stroke="#1C1C1C"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    Darslar ro’yhati
                                  </h1>
                                </div>
                                <div className="accordion">
                                  {datas.map((item, index) => (
                                    <Accordion
                                      key={index}
                                      expanded={
                                        expanded === `panel${index + 1}`
                                      }
                                      onChange={handleChange(
                                        `panel${index + 1}`
                                      )}
                                      sx={{
                                        "&.MuiPaper-root": {
                                          boxShadow: "none !important",
                                          background: "fcfcfc",
                                        },
                                      }}
                                    >
                                      <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                        sx={{
                                          "&.MuiButtonBase-root": {
                                            width: "100%",
                                            height: "100px",
                                            display: "flex",
                                            background: "#fcfcfc",
                                            borderRadius: "14px",
                                            padding: "24px 32px",
                                          },
                                        }}
                                      >
                                        <div
                                          sx={{
                                            "&.MuiTypography-root": {
                                              marginTop: "0 !important",
                                            },
                                          }}
                                        >
                                          <div className="accordion__item">
                                            <div className="acc__left">
                                              <img src={Icon1} alt="..." />
                                              <p>{item.name}</p>
                                            </div>
                                          </div>
                                          {/* <AccordionItem /> */}
                                        </div>
                                      </AccordionSummary>
                                      {item.lessons.map((items, indexL) => (
                                        <AccordionDetails key={indexL}>
                                          <div
                                            sx={{
                                              paddingLeft: "30px",
                                              marginTop: "0 !important",
                                              width: "100%",
                                            }}
                                            className={
                                              lessonIndex ===
                                                index + indexL.toString()
                                                ? "acc__open activeLabel"
                                                : "acc__open"
                                            }
                                            onClick={() => {
                                              const url = {
                                                resolution_240p:
                                                  items.resolution_240p,
                                                resolution_360p:
                                                  items.resolution_360p,
                                                resolution_480p:
                                                  items.resolution_480p,
                                                resolution_720p:
                                                  items.resolution_720p,
                                                resolution_1080p:
                                                  items.resolution_1080p,
                                              };
                                              setVideoUrl(url);
                                              if (url.resolution_240p) {
                                                setCurrentVideo(
                                                  url.resolution_240p
                                                );
                                              } else if (url.resolution_360p) {
                                                setCurrentVideo(
                                                  url.resolution_360p
                                                );
                                              } else if (url.resolution_480p) {
                                                setCurrentVideo(
                                                  url.resolution_480p
                                                );
                                              } else if (url.resolution_720p) {
                                                setCurrentVideo(
                                                  url.resolution_720p
                                                );
                                              } else if (url.resolution_1080p) {
                                                setCurrentVideo(
                                                  url.resolution_1080p
                                                );
                                              } else {
                                                setCurrentVideo("");
                                              }

                                              setLessonIndex(
                                                index + indexL.toString()
                                              );
                                            }}
                                          >
                                            <img src={VideoCircle} alt="..." />
                                            <div className="durationVideo">
                                              <div className="leftDurationVideo">
                                                <p className="durationVideo">
                                                  {items.name}
                                                </p>
                                                <div className="durationVideoParts">
                                                  <span>
                                                    {items.duration
                                                      ? items.duration.slice(
                                                        0,
                                                        8
                                                      )
                                                      : null}
                                                  </span>
                                                  {items.resource_file ? (
                                                    <a
                                                      // onClick={(e) =>
                                                      //   onDownloadButton(
                                                      //     items.resource_file
                                                      //   )
                                                      // }
                                                      href={`${process.env.REACT_APP_API_KEY}${items.resource_file}`}
                                                      target="_blank"
                                                      className="fileContentDownload"
                                                      rel="noreferrer"
                                                    >
                                                      <svg
                                                        width="16"
                                                        height="15"
                                                        viewBox="0 0 16 15"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                      >
                                                        <path
                                                          d="M14.6654 6.83334V10.8333C14.6654 13.5 13.9987 14.1667 11.332 14.1667H4.66536C1.9987 14.1667 1.33203 13.5 1.33203 10.8333V4.16667C1.33203 1.5 1.9987 0.833336 4.66536 0.833336H5.66536C6.66536 0.833336 6.88536 1.12667 7.26536 1.63334L8.26536 2.96667C8.5187 3.3 8.66536 3.5 9.33203 3.5H11.332C13.9987 3.5 14.6654 4.16667 14.6654 6.83334Z"
                                                          stroke="#1C1C1C"
                                                          strokeWidth="1.5"
                                                          strokeMiterlimit="10"
                                                        />
                                                      </svg>
                                                      Faylni yuklash
                                                    </a>
                                                  ) : null}
                                                </div>
                                              </div>
                                              <button className="CheckboxVideo">
                                                {lessonIndex ===
                                                  index + indexL.toString() ? (
                                                  <svg
                                                    width="10"
                                                    height="8"
                                                    viewBox="0 0 10 8"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M0.75 4L3.58 6.83L9.25 1.17"
                                                      stroke="#006AFF"
                                                      strokeWidth="1.5"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                  </svg>
                                                ) : null}
                                              </button>
                                            </div>
                                          </div>
                                        </AccordionDetails>
                                      ))}
                                    </Accordion>
                                  ))}
                                </div>
                              </section>
                            </div>
                          </div>
                        </TabPanelUnstyled>
                      )}
                      <TabPanelUnstyled
                        value={window.innerWidth <= 576 ? 1 : 0}
                      >
                        <CourseAbout resData={resData} />
                      </TabPanelUnstyled>
                      <TabPanelUnstyled
                        value={window.innerWidth <= 576 ? 2 : 1}
                      >
                        <Comments id={id} resData={resData} />
                      </TabPanelUnstyled>
                      <TabPanelUnstyled
                        value={window.innerWidth <= 576 ? 3 : 2}
                      >
                        <CourseRating resData={resData} id={id} />
                      </TabPanelUnstyled>
                    </TabsUnstyled>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-10 col-md-24 p-0 col-sm-24 d-sm-none">
                <section className="StructureMain">
                  <div className="watch__title">
                    <h1>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22 16.7399V4.66994C22 3.46994 21.02 2.57994 19.83 2.67994H19.77C17.67 2.85994 14.48 3.92994 12.7 5.04994L12.53 5.15994C12.24 5.33994 11.76 5.33994 11.47 5.15994L11.22 5.00994C9.44 3.89994 6.26 2.83994 4.16 2.66994C2.97 2.56994 2 3.46994 2 4.65994V16.7399C2 17.6999 2.78 18.5999 3.74 18.7199L4.03 18.7599C6.2 19.0499 9.55 20.1499 11.47 21.1999L11.51 21.2199C11.78 21.3699 12.21 21.3699 12.47 21.2199C14.39 20.1599 17.75 19.0499 19.93 18.7599L20.26 18.7199C21.22 18.5999 22 17.6999 22 16.7399Z"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 5.48999V20.49"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7.75 8.48999H5.5"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.5 11.49H5.5"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Darslar ro’yhati
                    </h1>
                  </div>
                  <div className="accordion">
                    {datas.map((item, index) => (
                      <Accordion
                        key={index}
                        expanded={expanded === `panel${index + 1}`}
                        onChange={handleChange(`panel${index + 1}`)}
                        sx={{
                          "&.MuiPaper-root": {
                            boxShadow: "none !important",
                            background: "fcfcfc",
                          },
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                          sx={{
                            "&.MuiButtonBase-root": {
                              width: "100%",
                              height: "100px",
                              display: "flex",
                              background: "#fcfcfc",
                              borderRadius: "14px",
                              padding: "24px 32px",
                            },
                          }}
                        >
                          <div
                            sx={{
                              "&.MuiTypography-root": {
                                marginTop: "0 !important",
                              },
                            }}
                          >
                            <div className="accordion__item">
                              <div className="acc__left">
                                <img src={Icon1} alt="..." />
                                <p>{item.name}</p>
                              </div>
                            </div>
                            {/* <AccordionItem /> */}
                          </div>
                        </AccordionSummary>
                        {item.lessons.map((items, indexL) => (
                          <AccordionDetails key={indexL}>
                            <div
                              sx={{
                                paddingLeft: "30px",
                                marginTop: "0 !important",
                                width: "100%",
                              }}
                              className={
                                lessonIndex === index + indexL.toString()
                                  ? "acc__open activeLabel"
                                  : "acc__open"
                              }
                            // onClick={() => {
                            //   const url = {
                            //     resolution_240p: items.resolution_240p,
                            //     resolution_360p: items.resolution_360p,
                            //     resolution_480p: items.resolution_480p,
                            //     resolution_720p: items.resolution_720p,
                            //     resolution_1080p: items.resolution_1080p,
                            //   };
                            //   setVideoUrl(url);
                            //   if (url.resolution_240p) {
                            //     setCurrentVideo(url.resolution_240p);
                            //   } else if (url.resolution_360p) {
                            //     setCurrentVideo(url.resolution_360p);
                            //   } else if (url.resolution_480p) {
                            //     setCurrentVideo(url.resolution_480p);
                            //   } else if (url.resolution_720p) {
                            //     setCurrentVideo(url.resolution_720p);
                            //   } else if (url.resolution_1080p) {
                            //     setCurrentVideo(url.resolution_1080p);
                            //   } else {
                            //     setCurrentVideo("");
                            //   }

                            //   setLessonIndex(index + indexL.toString());
                            // }}
                            >
                              <img src={VideoCircle} alt="..." />
                              <div className="durationVideo">
                                <div className="leftDurationVideo">
                                  <p className="durationVideo">{items.name}</p>
                                  <div className="durationVideoParts">
                                    <span>
                                      {items.duration
                                        ? items.duration.slice(0, 8)
                                        : null}
                                    </span>
                                    {items.resource_file ? (
                                      <a
                                        href={`${process.env.REACT_APP_API_KEY}${items.resource_file}`}
                                        // onClick={(e) =>
                                        //   onDownloadButton(items.resource_file)
                                        // }
                                        target="_blank"
                                        download
                                        className="fileContentDownload"
                                        rel="noreferrer"
                                      >
                                        <svg
                                          width="16"
                                          height="15"
                                          viewBox="0 0 16 15"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M14.6654 6.83334V10.8333C14.6654 13.5 13.9987 14.1667 11.332 14.1667H4.66536C1.9987 14.1667 1.33203 13.5 1.33203 10.8333V4.16667C1.33203 1.5 1.9987 0.833336 4.66536 0.833336H5.66536C6.66536 0.833336 6.88536 1.12667 7.26536 1.63334L8.26536 2.96667C8.5187 3.3 8.66536 3.5 9.33203 3.5H11.332C13.9987 3.5 14.6654 4.16667 14.6654 6.83334Z"
                                            stroke="#1C1C1C"
                                            strokeWidth="1.5"
                                            strokeMiterlimit="10"
                                          />
                                        </svg>
                                        Faylni yuklash
                                      </a>
                                    ) : null}
                                  </div>
                                </div>
                                <button className="CheckboxVideo">
                                  {lessonIndex === index + indexL.toString() ? (
                                    <svg
                                      width="10"
                                      height="8"
                                      viewBox="0 0 10 8"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M0.75 4L3.58 6.83L9.25 1.17"
                                        stroke="#006AFF"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  ) : null}
                                </button>
                              </div>
                            </div>
                          </AccordionDetails>
                        ))}
                      </Accordion>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Watching;
