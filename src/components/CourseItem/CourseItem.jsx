import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CourseItem.css";
import moment from "moment";
import "moment/locale/uz-latn";
import CourseImage from "../../assets/images/Rectangle 7.png";
import axios from "../../Apis/api";
import { StateContext } from "../../context/Context";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import ReactHlsPlayer from "react-hls-player/dist";

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

export default function CourseItem(props) {
  const {
    isremoved,
    setIsRemoved,
    loggedIn,
    addedToCart,
    setAddedToCart,
    addedToFav,
    setAddedToFav,
    setNavStretch,
  } = useContext(StateContext);

  const [loginError, setLoginError] = useState(false);
  const [open, setOpen] = useState(false);

  const [isBought, setisBought] = useState(false); /*  */

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const singleCourse = (e, id) => {
    e.preventDefault();
    navigate(`/chosenCourse/${id}`);
  };

  const [alertError, setAlertError] = useState(false);
  const [alertErrorFav, setAlertErrorFav] = useState(false);
  const [hoverPlay, setHoverPlay] = useState(false);

  const [popupShow, setpopupShow] = useState(false);
  const [popupSelfShow, setpopupSelfShow] = useState(false);
  const [artificialAddedToCart, setArtificialAddedToCart] = useState(false);
  const playVideo = useRef();

  const playingVideoPlayer = () => {
    props.trailer_url && playVideo.current.play();
  };
  const pauseVideoPlayer = () => {
    props.trailer_url && playVideo.current.pause();
  };

  useEffect(() => {
    hoverPlay ? playingVideoPlayer() : pauseVideoPlayer();
  }, [hoverPlay]);

  useEffect(() => {
    console.log(props.trailer_url);
  }, [props.trailer_url]);

  const navigateToSpeaker = (e, id) => {
    e.preventDefault();
    navigate(`/speakerAbout/${id}`);
  };

  const leave = () => {
    setTimeout(() => {
      setpopupShow(false);
    }, 100);
  };
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
    addedToCart
      ? setTimeout(() => {
        setAddedToCart(false);
      }, 3000)
      : setAddedToCart(false);
    addedToFav
      ? setTimeout(() => {
        setAddedToFav(false);
      }, 3000)
      : setAddedToFav(false);
  }, [alertError, alertErrorFav, addedToCart, addedToFav]);

  useEffect(() => {
    loginError
      ? setTimeout(() => {
        setLoginError(false);
      }, 4000)
      : setLoginError(false);
  }, [loginError]);
  useEffect(() => {
    setisBought(
      props.boughtCourses.some((item) => item.course.id === props.id)
    );
  }, [props.boughtCourses]);

  const addToCart = async (e, id) => {
    const headers = {
      Authorization: loggedIn
        ? `Bearer ${localStorage.getItem("access")}`
        : setLoginError(true),
    };
    !loggedIn && handleOpen();
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
              : setAddedToCart(true);
          })
          .catch((err) => {
            refresh(err.response.status, err.response.status.text);
          }));

      setIsRemoved(!isremoved);
    } catch (error) { }
  };

  const addToFav = async (e, id) => {
    e.preventDefault();
    setAddedToFav(true);
    !loggedIn && handleOpen();
    try {
      loggedIn &&
        (await axios({
          method: "post",
          url: `${process.env.REACT_APP_API_KEY}/api/v1/courses/fav-courses/`,
          data: {
            course: id,
          },
          headers: {
            Authorization: loggedIn
              ? `Bearer ${localStorage.getItem("access")}`
              : setLoginError(true),
          },
        })
          .then((res) => {
            // setAddedToFav(true);
            res.data.message === "This course is already in the list!" &&
              setAlertErrorFav(true);
          })
          .catch((err) => {
            refresh(err.response.status, err.response.status.text);
          }));
    } catch (error) { }
  };

  const navigateToWatch = (e, id) => {
    e.preventDefault();
    navigate(`/watch/${id}`);
  };

  const DeleteFromCart = (e, id) => {
    e.preventDefault();
    let delId = props.cartData.filter((item) => item.course.id == id)[0].id;
    try {
      loggedIn &&
        axios
          .delete(
            `${process.env.REACT_APP_API_KEY}/api/v1/orders/cart-remove/${delId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          )
          .then((res) => {
            setAddedToCart(true);
            setTimeout(() => {
              setAddedToCart(false);
            }, 10);
            setIsRemoved(!isremoved);
          });
    } catch (error) { }
  };
  const DeleteFromFav = (e, id) => {
    e.preventDefault();
    let delId = props.favData.filter((item) => item.id == id)[0].id;
    try {
      loggedIn &&
        axios
          .delete(
            `${process.env.REACT_APP_API_KEY}/api/v1/courses/remove-fav-courses/${delId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          )
          .then((res) => {
            setAddedToFav(true);
            setTimeout(() => {
              setAddedToCart(false);
            }, 10);
          });
    } catch (error) { }
  };
  useEffect(() => {
    setNavStretch(false);
  }, [popupShow]);

  return (
    <div className="wrapper">
      <div className={props.class}>
        <div
          className="course-item pointer"
          onMouseOver={() => {
            setpopupShow(true);
            setHoverPlay(true);
          }}
          onMouseLeave={() => {
            leave();
            setHoverPlay(false);
            props.trailer_url && playVideo.current.load();
          }}
        >
          <div className="item-header">
            {props.trailer_url ? (
              // <video
              //   src={`${process.env.REACT_APP_API_KEY}${props.trailer_file}`}
              //   className="courseImage pointer"
              //   poster={
              //     props.coverImgFull
              //       ? props.coverImg
              //         ? props.coverImg
              //         : CourseImage
              //       : props.coverImg
              //       ? `${process.env.REACT_APP_API_KEY}${props.coverImg}`
              //       : CourseImage
              //   }
              //   onClick={(e) => singleCourse(e, props.id)}
              //   ref={playVideo}
              //   muted={true}
              // ></video>
              <ReactHlsPlayer
                playerRef={playVideo}
                config={{
                  file: { attributes: { controlsList: "nodownload" } },
                }}
                src={
                  props.trailer_url &&
                  `${props.trailer_url}`
                }
                autoPlay={true}
                controls={false}
                width="100%"
                // height="366px !important"
                poster={
                  props.coverImgFull
                    ? props.coverImg
                      ? props.coverImg
                      : CourseImage
                    : props.coverImg
                      ? `${process.env.REACT_APP_API_KEY}${props.coverImg}`
                      : CourseImage
                }
                onClick={(e) => singleCourse(e, props.id)}
                muted={true}
                className="courseImage pointer"
              />
            ) : (
              <img
                className="courseImage pointer"
                src={
                  props.coverImgFull
                    ? props.coverImg
                      ? props.coverImg
                      : CourseImage
                    : props.coverImg
                      ? `${process.env.REACT_APP_API_KEY}${props.coverImg}`
                      : CourseImage
                }
                alt="....."
                onClick={(e) => singleCourse(e, props.id)}
              />
            )}
            {/* {props.trailer_file ? (
              <video
                src={`${process.env.REACT_APP_API_KEY}${props.trailer_file}`}
                className="courseImage pointer"
                poster={
                  props.coverImgFull
                    ? props.coverImg
                      ? props.coverImg
                      : CourseImage
                    : props.coverImg
                    ? `${process.env.REACT_APP_API_KEY}${props.coverImg}`
                    : CourseImage
                }
                onClick={(e) => singleCourse(e, props.id)}
                ref={playVideo}
                muted={true}
              ></video>
            ) : (
              <img
                className="courseImage pointer"
                src={
                  props.coverImgFull
                    ? props.coverImg
                      ? props.coverImg
                      : CourseImage
                    : props.coverImg
                    ? `${process.env.REACT_APP_API_KEY}${props.coverImg}`
                    : CourseImage
                }
                alt="....."
                onClick={(e) => singleCourse(e, props.id)}
              />
            )} */}

            {props.priceLine ? (
              <div className={"bg-red label"}>Chegirmadagi kurs</div>
            ) : null}
          </div>

          <div className="item-row">
            <p onClick={(e) => singleCourse(e, props.id)} className="title">
              {props.title.length > 25
                ? props.title.slice(0, 30) + "..."
                : props.title}
            </p>
            {props.isAddedToFav ? (
              <svg
                onClick={(e) => DeleteFromFav(e, props.id)}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="bookmark"
              >
                <path
                  d="M16.8201 2H7.18007C5.05007 2 3.32007 3.74 3.32007 5.86V19.95C3.32007 21.75 4.61007 22.51 6.19007 21.64L11.0701 18.93C11.5901 18.64 12.4301 18.64 12.9401 18.93L17.8201 21.64C19.4001 22.52 20.6901 21.76 20.6901 19.95V5.86C20.6801 3.74 18.9501 2 16.8201 2Z"
                  stroke="#1C1C1C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.8201 2H7.18007C5.05007 2 3.32007 3.74 3.32007 5.86V19.95C3.32007 21.75 4.61007 22.51 6.19007 21.64L11.0701 18.93C11.5901 18.64 12.4301 18.64 12.9401 18.93L17.8201 21.64C19.4001 22.52 20.6901 21.76 20.6901 19.95V5.86C20.6801 3.74 18.9501 2 16.8201 2Z"
                  fill="#006AFF"
                  stroke="#1C1C1C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.25 9.05C11.03 9.7 12.97 9.7 14.75 9.05"
                  stroke="#1C1C1C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                onClick={(e) => addToFav(e, props.id)}
                className="bookmark"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#006aff"
              >
                <path
                  d="M9.25 9.05C11.03 9.7 12.97 9.7 14.75 9.05"
                  stroke="#1C1C1C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.82 2H7.18001C5.05001 2 3.32001 3.74 3.32001 5.86V19.95C3.32001 21.75 4.61001 22.51 6.19001 21.64L11.07 18.93C11.59 18.64 12.43 18.64 12.94 18.93L17.82 21.64C19.4 22.52 20.69 21.76 20.69 19.95V5.86C20.68 3.74 18.95 2 16.82 2Z"
                  stroke="#1C1C1C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.82 2H7.18001C5.05001 2 3.32001 3.74 3.32001 5.86V19.95C3.32001 21.75 4.61001 22.51 6.19001 21.64L11.07 18.93C11.59 18.64 12.43 18.64 12.94 18.93L17.82 21.64C19.4 22.52 20.69 21.76 20.69 19.95V5.86C20.68 3.74 18.95 2 16.82 2Z"
                  stroke="#1C1C1C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <p
            onClick={(e) => navigateToSpeaker(e, props.trainerId)}
            className="trainer pointer"
          >
            {props.trainer}
          </p>
          <div onClick={(e) => singleCourse(e, props.id)} className="reviews">
            <div className="left">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.73 2.51L14.49 6.03C14.73 6.52 15.37 6.99 15.91 7.08L19.1 7.61C21.14 7.95 21.62 9.43 20.15 10.89L17.67 13.37C17.25 13.79 17.02 14.6 17.15 15.18L17.86 18.25C18.42 20.68 17.13 21.62 14.98 20.35L11.99 18.58C11.45 18.26 10.56 18.26 10.01 18.58L7.02 20.35C4.88 21.62 3.58 20.67 4.14 18.25L4.85 15.18C4.98 14.6 4.75 13.79 4.33 13.37L1.85 10.89C0.390001 9.43 0.860001 7.95 2.9 7.61L6.09 7.08C6.62 6.99 7.26 6.52 7.5 6.03L9.26 2.51C10.22 0.6 11.78 0.6 12.73 2.51Z"
                  fill="#006AFF"
                  stroke="#006AFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <p>
                {props.ratings.rating + " "}
                <span className="t-gray"> ({props.ratings.voters_number})</span>
              </p>
            </div>
            <div className="right">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.05 2.53L4.02999 6.46C2.09999 7.72 2.09999 10.54 4.02999 11.8L10.05 15.73C11.13 16.44 12.91 16.44 13.99 15.73L19.98 11.8C21.9 10.54 21.9 7.73 19.98 6.47L13.99 2.54C12.91 1.82 11.13 1.82 10.05 2.53Z"
                  stroke="#006AFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.63 13.08L5.62 17.77C5.62 19.04 6.6 20.4 7.8 20.8L10.99 21.86C11.54 22.04 12.45 22.04 13.01 21.86L16.2 20.8C17.4 20.4 18.38 19.04 18.38 17.77V13.13"
                  stroke="#006AFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.4 15V9"
                  stroke="#006AFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>{props.graduates}</p>
            </div>
          </div>
          <div className="item-footer">
            <div className="footer-row">
              {props.type === "PAID" ? (
                <div onClick={(e) => singleCourse(e, props.id)}>
                  <div className="price mr-20">
                    {props.priceLine ? (
                      <>
                        {" "}
                        <span className="t-gray line-through">
                          {props.price
                            ? props.price
                              .toLocaleString("uz-UZ", {
                                style: "currency",
                                currency: "UZS",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })
                              .replace(",", " ")
                            : 0}
                        </span>
                        <p>
                          {(parseInt(props.price) - parseInt(props.priceLine))
                            .toLocaleString("uz-UZ", {
                              style: "currency",
                              currency: "UZS",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })
                            .replace(",", " ")}
                          <span className="gray ml-5"></span>
                        </p>
                      </>
                    ) : (
                      <p>
                        {props.price
                          ? props.price
                            .toLocaleString("uz-UZ", {
                              style: "currency",
                              currency: "UZS",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })
                            .replace(",", " ")
                          : 0}
                        <span className="gray ml-5"></span>
                      </p>
                    )}
                  </div>
                  {props.dicountAvailable ? (
                    <div className="price">
                      <span className="t-gray">Chegirma tugashi</span>
                      <p>{props.dicountAvailable}</p>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="price">
                  <p>Bepul</p>
                </div>
              )}
            </div>
            {isBought ? (
              <div
                onClick={() => navigate(`/watch/${props.id}`)}
                className="course-start"
              >
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#006aff"
                >
                  <path
                    d="M9.10001 12.5005V11.0205C9.10001 9.11048 10.45 8.34048 12.1 9.29048L13.38 10.0305L14.66 10.7705C16.31 11.7205 16.31 13.2805 14.66 14.2305L13.38 14.9705L12.1 15.7105C10.45 16.6605 9.10001 15.8805 9.10001 13.9805V12.5005Z"
                    stroke="#006aff"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 22.5C17.5228 22.5 22 18.0228 22 12.5C22 6.97715 17.5228 2.5 12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0228 6.47715 22.5 12 22.5Z"
                    stroke="#006aff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ) : props.isAddedToCart || artificialAddedToCart ? (
              <div
                onClick={(e) => {
                  props.price
                    ? DeleteFromCart(e, props.id)
                    : navigateToWatch(e, props.id);
                  setArtificialAddedToCart(false);
                }}
                className="course-start"
              >
                {props.price ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    // fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#006aff"
                  >
                    <path
                      d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                      stroke="#1c1c1c"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                      stroke="#1c1c1c"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                      stroke="#1c1c1c"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 8H21"
                      stroke="#1c1c1c"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 16.74V4.67C22 3.47 21.02 2.58 19.83 2.68H19.77C17.67 2.86 14.48 3.93 12.7 5.05L12.53 5.16C12.24 5.34 11.76 5.34 11.47 5.16L11.22 5.01C9.44 3.9 6.26 2.84 4.16 2.67C2.97 2.57 2 3.47 2 4.66V16.74C2 17.7 2.78 18.6 3.74 18.72L4.03 18.76C6.2 19.05 9.55 20.15 11.47 21.2L11.51 21.22C11.78 21.37 12.21 21.37 12.47 21.22C14.39 20.16 17.75 19.05 19.93 18.76L20.26 18.72C21.22 18.6 22 17.7 22 16.74Z"
                      stroke="#006aff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 5.49V20.49"
                      stroke="#006aff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.75 8.49H5.5"
                      stroke="#006aff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.5 11.49H5.5"
                      stroke="#006aff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            ) : (
              <div
                onClick={(e) => {
                  props.price
                    ? addToCart(e, props.id)
                    : navigateToWatch(e, props.id);
                  loggedIn && setArtificialAddedToCart(true);
                }}
                className="course-start"
              >
                {props.price ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                      stroke="#006aff"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                      stroke="#006aff"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                      stroke="#006aff"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 8H21"
                      stroke="#006aff"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 16.74V4.67C22 3.47 21.02 2.58 19.83 2.68H19.77C17.67 2.86 14.48 3.93 12.7 5.05L12.53 5.16C12.24 5.34 11.76 5.34 11.47 5.16L11.22 5.01C9.44 3.9 6.26 2.84 4.16 2.67C2.97 2.57 2 3.47 2 4.66V16.74C2 17.7 2.78 18.6 3.74 18.72L4.03 18.76C6.2 19.05 9.55 20.15 11.47 21.2L11.51 21.22C11.78 21.37 12.21 21.37 12.47 21.22C14.39 20.16 17.75 19.05 19.93 18.76L20.26 18.72C21.22 18.6 22 17.7 22 16.74Z"
                      stroke="#006aff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 5.49V20.49"
                      stroke="#006aff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.75 8.49H5.5"
                      stroke="#006aff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.5 11.49H5.5"
                      stroke="#006aff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            )}
          </div>
        </div>
        <div
          className={
            popupSelfShow || popupShow ? "cards_popup" : "visibilityNone"
          }
          onMouseOver={() => setpopupSelfShow(true)}
          onMouseLeave={() => setpopupSelfShow(false)}
        >
          <div className={popupSelfShow || popupShow ? "popup" : "scale0"}>
            <h1 onClick={() => navigate(`/chosenCourse/${props.id}`)}>
              {props.title.length > 25
                ? props.title.slice(0, 35) + "..."
                : props.title}
            </h1>
            <div className="btn_popup">
              {props.priceLine ? <button>Chegirmadagi kurs</button> : null}
              <p>
                Yangilangan:{" "}
                <span>{moment().locale("uz-latn").format("MMMM YYYY")}</span>
              </p>
            </div>
            <p className="primary">Daraja: {props.level}</p>
            <p style={{ textAlign: "justify" }} className="product">
              {props.about && props.about.length >= 300
                ? props.about.slice(0, 300) + "..."
                : props.about}
            </p>
            <div className="add_cart">
              {isBought ? (
                <button onClick={(e) => navigate(`/watch/${props.id}`)}>
                  Kursni davom ettirish
                </button>
              ) : (
                <button onClick={(e) => addToCart(e, props.id)}>
                  Savatchaga qo'shish
                </button>
              )}

              <svg
                onClick={(e) => addToFav(e, props.id)}
                width="45"
                height="45"
                fill="none"
                className="pointer"
              >
                <circle cx="22.5" cy="22.5" r="22" stroke="#1C1C1C" />
                <path
                  d="M19.25 20.05C21.03 20.7 22.97 20.7 24.75 20.05"
                  stroke="#1C1C1C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M26.8199 13H17.1799C15.0499 13 13.3199 14.74 13.3199 16.86V30.95C13.3199 32.75 14.6099 33.51 16.1899 32.64L21.0699 29.93C21.5899 29.64 22.4299 29.64 22.9399 29.93L27.8199 32.64C29.3999 33.52 30.6899 32.76 30.6899 30.95V16.86C30.6799 14.74 28.9499 13 26.8199 13Z"
                  stroke="#1C1C1C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M26.8199 13H17.1799C15.0499 13 13.3199 14.74 13.3199 16.86V30.95C13.3199 32.75 14.6099 33.51 16.1899 32.64L21.0699 29.93C21.5899 29.64 22.4299 29.64 22.9399 29.93L27.8199 32.64C29.3999 33.52 30.6899 32.76 30.6899 30.95V16.86C30.6799 14.74 28.9499 13 26.8199 13Z"
                  stroke="#1C1C1C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
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
        {/* <Alert
          className={alertError ? "alert animation" : "alert"}
          severity="error"
        >
          <strong>Bu kurs savatchaga qo'shilgan!</strong>
        </Alert>
        <Alert
          className={addedToCart ? "alert animation" : "alert"}
          severity="success"
        >
          <strong>Kurs savatchaga qo'shildi!</strong>
        </Alert>
        <Alert
          className={addedToFav ? "alert animation" : "alert"}
          severity="success"
        >
          <strong>Kurs sevimlilarga qo'shildi!</strong>
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
        </Alert> */}
      </div>

      {/* <!-- ------------------------------------- --> */}
    </div>
  );
}
