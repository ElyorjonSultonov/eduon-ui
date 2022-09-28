import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import Logo from "../../assets/images/logo.png";
import { StateContext } from "../../context/Context";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import axios from "../../Apis/api";
import {
  price,
  price_title,
  pTitle_typography,
  filter_title,
  input,
  label,
  svg,
  rating_title,
  stark,
  stark_typography,
  stark_span,
} from "./NavbarStyles";
import CoursesPopup from "../CoursesPopup/CoursesPopup";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import NavbarProfile from "../NavbarProfile/NavbarProfile";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";

export default function NavbarDemo(props) {
  const {
    navStretch,
    setNavStretch,
    isremoved,
    statusChange,
    setStatusChange,
    filterPriceValue,
    setFilterPriceValue,
  } = useContext(StateContext);
  const [userInfo, setUserInfo] = useState({});
  const [profileMenuShow, setProfileMenuShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [courseCategories, setCourseCategories] = useState([]);
  const [searchResponse, setSearchResponse] = useState([]);

  const [cartLength, setCartLength] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const [status, setStatus] = useState(false);
  useEffect(() => {
    !location.pathname.includes("/filter/course") && setFilterPriceValue("");
    setStatus(JSON.parse(localStorage.getItem("status")));
  }, [location, statusChange]);

  // useEffect(() => {
  // setStatus(JSON.parse(localStorage.getItem("status")));
  // }, [statusChange]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElFilter, setAnchorElFilter] = React.useState(null);

  const loggedIn = localStorage.getItem("access");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickFilter = (event) => {
    setAnchorElFilter(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseFilter = () => {
    setAnchorElFilter(null);
  };

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
            setCartLength(res.data.items.length);
          })
          .catch((err) => {
            refresh(err.response.status, err.response.status.text);
          });
    } catch (error) {}
  }, [isremoved]);

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v1/courses/categories/`)
        .then((res) => setCourseCategories(res.data))
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
    try {
      loggedIn &&
        axios
          .get(`${process.env.REACT_APP_API_KEY}/api/v1/accounts/profile`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          })
          .then((res) => {
            setUserInfo({
              avatar: res.data.profile_picture,
              name: res.data.f_name,
              surname: res.data.l_name,
              mobile: res.data.phone_number,
              isSpeaker: res.data.is_speaker,
            });
          })
          .catch((err) => {
            refresh(err.response.status, err.response.status.text);
          });
    } catch (error) {}
    props.filterValue && setFilterPriceValue(props.filterValue);
  }, []);

  // useEffect(() => {
  //   filterPriceValue && navigate(`/courses/filter/course ${filterPriceValue}`);
  // }, [filterPriceValue]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const openFilter = Boolean(anchorElFilter);
  const idFilter = openFilter ? "simple-popover-filter" : undefined;

  const listStyle = {
    marginBottom: "16px ",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#1c1c1c",
    cursor: "pointer",
  };
  // const searchFunc = (e, value) => {
  //   e.preventDefault();
  // setSearchValue(e.target.value);
  useEffect(() => {
    const func = () => {
      try {
        searchValue.length > 0
          ? axios
              .post(`${process.env.REACT_APP_API_KEY}/api/v1/courses/search/`, {
                word: searchValue,
              })
              .then((res) => {
                setSearchResponse(res.data.found_courses);
              })
              .catch((err) => {
                refresh(err.response.status, err.response.status.text);
              })
          : setSearchResponse([]);
      } catch (error) {}
    };
    return () => {
      func();
    };
  }, [searchValue]);

  // };

  const search = (e) => {
    e.preventDefault();
    navigate(`/search/${searchValue}`);
  };
  const becomeSpeaker = async () => {
    handleClose();
    if (loggedIn) {
      setTimeout(() => {
        navigate("/speaker");
      }, 2000);
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      };
      try {
        await axios
          .put(
            `${process.env.REACT_APP_API_KEY}/api/v1/accounts/become-speaker`,
            { is_speaker: true },
            { headers }
          )
          .then((res) => {})
          .catch((err) => {
            refresh(err.response.status, err.response.status.text);
          });
      } catch (error) {}
    } else {
      navigate("/login");
    }
  };

  document.addEventListener("click", function handleClickOutsideBox(event) {
    // 👇️ the element the user clicked
    if (searchValue) {
      const search = document.getElementById("searchBox");

      if (!search.contains(event.target)) {
        setSearchValue("");
      }
    }
  });
  const navigateToFilter = (e) => {
    setFilterPriceValue(e.target.value);
    location.pathname.includes(e.target.value)
      ? navigate("/")
      : navigate(`/courses/filter/course ${e.target.value}`);
  };
  return (
    // <!-- header_starting mainpage nav -->
    <header>
      <nav className="navbar">
        <div className="container">
          <div className="rowGrid justify-content-between align-center">
            <button className="bars" onClick={() => setNavStretch(!navStretch)}>
              <svg width="24" height="24">
                <path
                  d="M3 7H21"
                  stroke="#1C1C1C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M3 12H21"
                  stroke="#1C1C1C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M3 17H21"
                  stroke="#1C1C1C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="col-6 col-lg-10">
              <div className="courseMenu">
                <div className="d-flex align-center">
                  <Link className="logo" to={status ? "/speaker" : "/"}>
                    {/* <img className="logoImg" src={Logo} alt="jpg" /> */}
                    <svg
                      className="logoImg"
                      width="120"
                      height="35"
                      viewBox="0 0 120 35"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_4848_7842)">
                        <path
                          d="M16.2479 20.7767C17.0519 20.7767 17.7358 20.4999 18.2638 19.9582C18.7918 19.4285 19.0558 18.7664 19.0558 17.9478C19.0558 15.6486 18.1558 13.6022 16.3319 11.7965C14.5199 9.99087 12.3119 9.10007 9.69591 9.10007C7.06793 9.10007 4.81195 10.039 2.87998 11.9289C0.959991 13.8309 0 16.1422 0 18.8507C0 21.5592 0.959991 23.8465 2.86798 25.7482C4.77595 27.6624 7.04393 28.6132 9.70791 28.6132C12.3719 28.6132 14.4599 28.1559 15.9839 27.2409C16.8359 26.6632 17.2559 26.0011 17.2559 25.2668C17.2559 23.7982 16.2599 22.9796 15.0719 22.9796C14.4599 22.9796 13.8359 23.1962 13.1759 23.6298C12.5159 24.075 11.5319 24.2917 10.1999 24.2917C8.87993 24.2917 7.75193 23.9426 6.79193 23.2685C5.81995 22.5944 5.23195 21.7759 5.01595 20.7767H16.2479ZM12.9359 14.4449C13.8359 15.2032 14.3639 16.0338 14.5199 16.9728H5.01595C5.21995 16.0098 5.75995 15.1671 6.65995 14.4328C7.57193 13.7106 8.61593 13.3494 9.80391 13.3494C10.9919 13.3494 12.0359 13.7106 12.9359 14.4449Z"
                          fill="#1C1C1C"
                        />
                        <path
                          d="M34.4043 22.6913C33.4204 23.7385 32.1843 24.2563 30.6724 24.2563C29.1724 24.2563 27.9004 23.7145 26.8924 22.6431C25.8843 21.5476 25.3685 20.2837 25.3685 18.8151C25.3685 17.3465 25.8843 16.0825 26.9164 15.0352C27.9364 13.9879 29.2083 13.4583 30.6964 13.4583C32.1843 13.4583 33.4204 13.9518 34.4043 14.963C35.3764 15.9742 35.8564 17.2381 35.8564 18.803C35.8564 20.3679 35.3764 21.644 34.4043 22.6913ZM40.3322 2.40755C40.3322 1.76956 40.0922 1.20378 39.6122 0.722267C39.1322 0.240755 38.5683 0 37.9204 0C37.2843 0 36.7204 0.240755 36.2404 0.722267C35.7604 1.20378 35.5204 1.76956 35.5204 2.40755V11.0507C34.1522 9.71451 32.4364 9.06445 30.4324 9.06445C27.8043 9.06445 25.5364 9.99138 23.6524 11.8933C21.7324 13.7953 20.7844 16.1066 20.7844 18.8151C20.7844 21.5356 21.7204 23.8469 23.5685 25.7489C25.4164 27.6628 27.6604 28.6139 30.2883 28.6139C32.2922 28.638 34.0922 27.9518 35.6643 26.5916C35.6643 27.073 35.8922 27.5304 36.3243 27.9518C36.7683 28.3973 37.2962 28.6139 37.9443 28.6139C38.5804 28.6139 39.1322 28.373 39.6122 27.9035C40.0922 27.4221 40.3322 26.8442 40.3322 26.2063V2.40755Z"
                          fill="#1C1C1C"
                        />
                        <path
                          d="M48.8113 11.3747C48.8113 10.7367 48.5714 10.1589 48.0914 9.6894C47.6114 9.20787 47.0474 8.96713 46.4114 8.96713C45.7632 8.96713 45.1993 9.20787 44.7193 9.6894C44.2393 10.1589 43.9993 10.7367 43.9993 11.3747V18.7779C43.9993 21.4864 44.9832 23.7737 46.9032 25.6755C48.8353 27.5775 51.1872 28.5286 53.9113 28.5286C56.6472 28.5286 58.9753 27.5896 60.9072 25.6997C62.8151 23.8218 63.7751 21.5225 63.7751 18.7779V11.3747C63.7751 10.7126 63.5351 10.1468 63.0551 9.66531C62.5751 9.20787 62.0111 8.96713 61.3632 8.96713C60.7272 8.96713 60.1632 9.20787 59.6832 9.6894C59.2032 10.1589 58.9632 10.7367 58.9632 11.3747V18.7779C58.9632 20.2706 58.4832 21.5225 57.5111 22.5698C56.5392 23.6172 55.3513 24.1348 53.8993 24.1348C52.4472 24.1348 51.2353 23.6172 50.2632 22.5698C49.2914 21.5225 48.8113 20.2706 48.8113 18.7779V11.3747Z"
                          fill="#1C1C1C"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M81.9104 3.61118H104.806C113.158 3.61118 119.998 10.4607 119.998 18.851C119.998 27.2293 113.158 34.0909 104.806 34.0909H81.9104C73.5585 34.0909 66.7185 27.2293 66.7185 18.851C66.7185 10.4607 73.5585 3.61118 81.9104 3.61118ZM89.1948 11.9055C87.2869 10.0035 84.9229 9.07663 82.1869 9.07663C79.439 9.07663 77.099 10.0035 75.179 11.8814C73.2471 13.7834 72.299 16.0826 72.299 18.8152C72.299 21.5478 73.2471 23.8591 75.1669 25.7611C77.0629 27.675 79.4029 28.6261 82.1629 28.6261C84.9229 28.6261 87.2869 27.675 89.1948 25.737C91.1148 23.8229 92.0748 21.5117 92.0748 18.8152C92.0748 16.1187 91.1148 13.8075 89.1948 11.9055ZM85.9548 22.6553C84.9469 23.7266 83.675 24.2684 82.1869 24.2684C80.699 24.2684 79.4269 23.7266 78.419 22.6553C77.399 21.5598 76.8829 20.2959 76.8829 18.8272C76.8829 17.3586 77.399 16.0947 78.4311 15.0474C79.4629 14.0001 80.7108 13.4704 82.199 13.4704C83.699 13.4704 84.9469 14.0001 85.9548 15.0474C86.9748 16.0947 87.479 17.3586 87.479 18.8272C87.479 20.2959 86.9748 21.5598 85.9548 22.6553ZM109.463 26.2306C109.463 26.8684 109.691 27.4343 110.183 27.9159C110.651 28.3973 111.227 28.638 111.863 28.638C112.499 28.638 113.075 28.3973 113.555 27.9159C114.035 27.4343 114.275 26.8684 114.275 26.2306V18.8152C114.275 16.1187 113.291 13.8075 111.371 11.9055C109.439 10.0035 107.087 9.07663 104.363 9.07663C101.627 9.07663 99.2869 10.0035 97.3787 11.8814C95.4587 13.7834 94.4987 16.0826 94.4987 18.8152V26.2306C94.4987 26.8925 94.7387 27.4464 95.2187 27.9159C95.6987 28.3973 96.2627 28.638 96.9108 28.638C97.5469 28.638 98.1108 28.3973 98.5908 27.9159C99.0708 27.4343 99.3108 26.8684 99.3108 26.2306V18.8152C99.3108 17.3346 99.7908 16.0826 100.763 15.0353C101.735 13.9881 102.947 13.4704 104.387 13.4704C105.839 13.4704 107.039 13.9881 108.011 15.0353C108.983 16.0826 109.463 17.3346 109.463 18.8152V26.2306Z"
                          fill="#006AFF"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4848_7842">
                          <rect width="120" height="34.0909" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </Link>
                  {!status && (
                    <button
                      aria-describedby={id}
                      variant="contained"
                      onClick={handleClick}
                      className="bgBlue"
                      id="courses"
                    >
                      <svg width="24" height="24" fill="none">
                        <path
                          d="M22 16.74V4.67001C22 3.47001 21.02 2.58001 19.83 2.68001H19.77C17.67 2.86001 14.48 3.93001 12.7 5.05001L12.53 5.16001C12.24 5.34001 11.76 5.34001 11.47 5.16001L11.22 5.01001C9.44 3.90001 6.26 2.84001 4.16 2.67001C2.97 2.57001 2 3.47001 2 4.66001V16.74C2 17.7 2.78 18.6 3.74 18.72L4.03 18.76C6.2 19.05 9.55 20.15 11.47 21.2L11.51 21.22C11.78 21.37 12.21 21.37 12.47 21.22C14.39 20.16 17.75 19.05 19.93 18.76L20.26 18.72C21.22 18.6 22 17.7 22 16.74Z"
                          stroke="#FCFCFC"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 5.48999V20.49"
                          stroke="#FCFCFC"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7.75 8.48999H5.5"
                          stroke="#FCFCFC"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.5 11.49H5.5"
                          stroke="#FCFCFC"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>kurslar</span>
                    </button>
                  )}
                  {!status && (
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      className=""
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      disableScrollLock={true}
                      sx={{
                        "& .MuiPaper-root": {
                          padding: "20px 30px",
                          width: "370px",
                          background: "#fcfcfc",
                          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
                          borderRadius: "15px",
                          marginTop: "10px",
                        },
                        "& .css-3bmhjh-MuiPaper-root-MuiPopover-paper": {
                          overflow: "visible",
                        },
                      }}
                    >
                      <ul className="menuBar">
                        {courseCategories.map((item, index) => (
                          <CoursesPopup
                            courseCategories={courseCategories}
                            index={index}
                            name={item.name}
                            id={item.id}
                            handleClose={handleClose}
                            // sub={item.submenu}
                            listStyle={listStyle}
                            key={index}
                          />
                        ))}
                      </ul>
                    </Popover>
                  )}
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-2-custom">
              {!status && (
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
                    <input
                      onChange={(e) => {
                        setSearchValue(e.target.value);
                      }}
                      // onInput={(e) => {
                      //   searchValue.length <=2 && searchFunc(e,searchValue);
                      // }}
                      id="search"
                      type="text"
                      placeholder="Qidirish..."
                      value={searchValue}
                      autoComplete="off"
                    />
                  </div>

                  {searchValue && searchResponse.length != 0 && (
                    <div
                      className={`${
                        searchResponse.length >= 2 && "moreInfo"
                      } searchResponse`}
                    >
                      {searchResponse.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => navigate(`/chosenCourse/${item.id}`)}
                          className="rowGrid pointer"
                        >
                          <img
                            src={`${process.env.REACT_APP_API_KEY}${item.cover_img}`}
                            alt="..."
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
                  )}
                </form>
              )}
            </div>

            <div className="col-1 p-relative">
              {!status && (
                <>
                  <button
                    className="filter"
                    aria-describedby={idFilter}
                    variant="contained"
                    onClick={handleClickFilter}
                  >
                    <svg width="24" height="24" fill="none">
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
                    <span>Filter</span>
                  </button>

                  <Popover
                    id={idFilter}
                    open={openFilter}
                    anchorEl={anchorElFilter}
                    onClose={handleCloseFilter}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    disableScrollLock={true}
                    sx={{
                      "& .MuiPaper-root": {
                        background: "#fcfcfc",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
                        borderRadius: "15px",
                        width: "350px",
                        padding: "30px",
                        marginTop: "19px",
                        overflowY: "visible",
                        height: "auto",
                      },
                    }}
                  >
                    <div style={price}>
                      <h1 style={filter_title}>
                        Narx
                        <svg width="18" height="9" fill="none">
                          <path
                            d="M16.9201 0.949997L10.4001 7.47C9.63008 8.24 8.37008 8.24 7.60008 7.47L1.08008 0.949997"
                            stroke="#999999"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </h1>
                      <div style={price_title}>
                        <label for="increment">
                          <p style={pTitle_typography}>
                            Narx yuqorilab borish bo'yicha
                          </p>
                        </label>
                        <div>
                          <label style={label} for="increment">
                            {" "}
                            {filterPriceValue === "+price" && (
                              <svg
                                style={svg}
                                width="10"
                                height="8"
                                fill="none"
                              >
                                <path
                                  d="M0.75 4L3.58 6.83L9.25 1.17"
                                  stroke="#006AFF"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </label>
                          <input
                            style={input}
                            type="radio"
                            name="price"
                            id="increment"
                            value="+price"
                            onChange={(e) => {
                              navigateToFilter(e);
                            }}
                          />
                        </div>
                      </div>
                      <div style={price_title}>
                        <label for="decrement">
                          <p style={pTitle_typography}>
                            Narx pastlab borish bo’yicha
                          </p>
                        </label>
                        <div>
                          <label style={label} for="decrement">
                            {filterPriceValue === "-price" && (
                              <svg
                                style={svg}
                                width="10"
                                height="8"
                                fill="none"
                              >
                                <path
                                  d="M0.75 4L3.58 6.83L9.25 1.17"
                                  stroke="#006AFF"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </label>
                          <input
                            style={input}
                            type="radio"
                            name="price"
                            id="decrement"
                            value="-price"
                            onChange={(e) => {
                              navigateToFilter(e);
                            }}
                          />
                        </div>
                      </div>
                      <div style={price_title}>
                        <label for="free">
                          <p style={pTitle_typography}>Bepul kurslar</p>
                        </label>
                        <div>
                          <label style={label} for="free">
                            {filterPriceValue === "free" && (
                              <svg
                                style={svg}
                                width="10"
                                height="8"
                                fill="none"
                              >
                                <path
                                  d="M0.75 4L3.58 6.83L9.25 1.17"
                                  stroke="#006AFF"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </label>
                          <input
                            style={input}
                            type="radio"
                            name="price"
                            id="free"
                            value="free"
                            onChange={(e) => {
                              navigateToFilter(e);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div style={rating_title}>
                      <h1 style={filter_title}>
                        Reyting
                        <svg width="18" height="9" fill="none">
                          <path
                            d="M16.9201 0.949997L10.4001 7.47C9.63008 8.24 8.37008 8.24 7.60008 7.47L1.08008 0.949997"
                            stroke="#999999"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </h1>
                      <div style={stark}>
                        <p style={stark_typography}>
                          <svg width="22" height="22" fill="none">
                            <path
                              d="M12.7299 2.51L14.4899 6.03C14.7299 6.52 15.3699 6.99 15.9099 7.08L19.0999 7.61C21.1399 7.95 21.6199 9.43 20.1499 10.89L17.6699 13.37C17.2499 13.79 17.0199 14.6 17.1499 15.18L17.8599 18.25C18.4199 20.68 17.1299 21.62 14.9799 20.35L11.9899 18.58C11.4499 18.26 10.5599 18.26 10.0099 18.58L7.01991 20.35C4.87991 21.62 3.57991 20.67 4.13991 18.25L4.84991 15.18C4.97991 14.6 4.74991 13.79 4.32991 13.37L1.84991 10.89C0.389909 9.43 0.859909 7.95 2.89991 7.61L6.08991 7.08C6.61991 6.99 7.25991 6.52 7.49991 6.03L9.25991 2.51C10.2199 0.599999 11.7799 0.599999 12.7299 2.51Z"
                              fill="#006AFF"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span style={stark_span}>4,5 - 5 </span> (4,110)
                        </p>
                        <formX>
                          <label style={label} for=""></label>
                          <input style={input} type="checkbox" name="" id="" />
                          <svg style={svg} width="10" height="8" fill="none">
                            <path
                              d="M0.75 4L3.58 6.83L9.25 1.17"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </formX>
                      </div>
                      <div style={stark}>
                        <p style={stark_typography}>
                          <svg width="22" height="22" fill="none">
                            <path
                              d="M12.7299 2.51L14.4899 6.03C14.7299 6.52 15.3699 6.99 15.9099 7.08L19.0999 7.61C21.1399 7.95 21.6199 9.43 20.1499 10.89L17.6699 13.37C17.2499 13.79 17.0199 14.6 17.1499 15.18L17.8599 18.25C18.4199 20.68 17.1299 21.62 14.9799 20.35L11.9899 18.58C11.4499 18.26 10.5599 18.26 10.0099 18.58L7.01991 20.35C4.87991 21.62 3.57991 20.67 4.13991 18.25L4.84991 15.18C4.97991 14.6 4.74991 13.79 4.32991 13.37L1.84991 10.89C0.389909 9.43 0.859909 7.95 2.89991 7.61L6.08991 7.08C6.61991 6.99 7.25991 6.52 7.49991 6.03L9.25991 2.51C10.2199 0.599999 11.7799 0.599999 12.7299 2.51Z"
                              fill="#006AFF"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span style={stark_span}>4,5 - 5</span>(4,110)
                        </p>
                        <formX>
                          <label style={label} for=""></label>
                          <input style={input} type="checkbox" name="" id="" />
                          <svg style={svg} width="10" height="8" fill="none">
                            <path
                              d="M0.75 4L3.58 6.83L9.25 1.17"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </formX>
                      </div>
                      <div style={stark}>
                        <p style={stark_typography}>
                          <svg width="22" height="22" fill="none">
                            <path
                              d="M12.7299 2.51L14.4899 6.03C14.7299 6.52 15.3699 6.99 15.9099 7.08L19.0999 7.61C21.1399 7.95 21.6199 9.43 20.1499 10.89L17.6699 13.37C17.2499 13.79 17.0199 14.6 17.1499 15.18L17.8599 18.25C18.4199 20.68 17.1299 21.62 14.9799 20.35L11.9899 18.58C11.4499 18.26 10.5599 18.26 10.0099 18.58L7.01991 20.35C4.87991 21.62 3.57991 20.67 4.13991 18.25L4.84991 15.18C4.97991 14.6 4.74991 13.79 4.32991 13.37L1.84991 10.89C0.389909 9.43 0.859909 7.95 2.89991 7.61L6.08991 7.08C6.61991 6.99 7.25991 6.52 7.49991 6.03L9.25991 2.51C10.2199 0.599999 11.7799 0.599999 12.7299 2.51Z"
                              fill="#006AFF"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span style={stark_span}>4,5 - 5</span>(4,110)
                        </p>
                        <formX>
                          <label style={label} for=""></label>
                          <input style={input} type="checkbox" name="" id="" />
                          <svg style={svg} width="10" height="8" fill="none">
                            <path
                              d="M0.75 4L3.58 6.83L9.25 1.17"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </formX>
                      </div>
                      <div style={stark}>
                        <p style={stark_typography}>
                          <svg width="22" height="22" fill="none">
                            <path
                              d="M12.7299 2.51L14.4899 6.03C14.7299 6.52 15.3699 6.99 15.9099 7.08L19.0999 7.61C21.1399 7.95 21.6199 9.43 20.1499 10.89L17.6699 13.37C17.2499 13.79 17.0199 14.6 17.1499 15.18L17.8599 18.25C18.4199 20.68 17.1299 21.62 14.9799 20.35L11.9899 18.58C11.4499 18.26 10.5599 18.26 10.0099 18.58L7.01991 20.35C4.87991 21.62 3.57991 20.67 4.13991 18.25L4.84991 15.18C4.97991 14.6 4.74991 13.79 4.32991 13.37L1.84991 10.89C0.389909 9.43 0.859909 7.95 2.89991 7.61L6.08991 7.08C6.61991 6.99 7.25991 6.52 7.49991 6.03L9.25991 2.51C10.2199 0.599999 11.7799 0.599999 12.7299 2.51Z"
                              fill="#006AFF"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span style={stark_span}>4,5 - 5</span>(4,110)
                        </p>
                        <formX>
                          <label style={label} for=""></label>
                          <input style={input} type="checkbox" name="" id="" />
                          <svg style={svg} width="10" height="8" fill="none">
                            <path
                              d="M0.75 4L3.58 6.83L9.25 1.17"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </formX>
                      </div>
                    </div> */}
                  </Popover>
                </>
              )}
            </div>

            <div className="col-10 col-lg-14">
              <div className="rowGrid justify-end align-center">
                {status && (
                  <button
                    onClick={() => navigate("/uploadCourse")}
                    className="col-auto pointer courseUploadButton"
                  >
                    {/* <img src={videoCamera} alt="..." /> */}
                    <svg
                      className="icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.53 20.4201H6.21C3.05 20.4201 2 18.3201 2 16.2101V7.79008C2 4.63008 3.05 3.58008 6.21 3.58008H12.53C15.69 3.58008 16.74 4.63008 16.74 7.79008V16.2101C16.74 19.3701 15.68 20.4201 12.53 20.4201Z"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19.5202 17.0999L16.7402 15.1499V8.83989L19.5202 6.88989C20.8802 5.93989 22.0002 6.51989 22.0002 8.18989V15.8099C22.0002 17.4799 20.8802 18.0599 19.5202 17.0999Z"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <line
                        x1="9.4502"
                        y1="8.75"
                        x2="9.4502"
                        y2="14.75"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <line
                        x1="6.4502"
                        y1="11.75"
                        x2="12.4502"
                        y2="11.75"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    Kurs yuklash
                  </button>
                )}

                <div
                  onClick={() => {
                    loggedIn &&
                      !userInfo.isSpeaker &&
                      !status &&
                      becomeSpeaker();
                    loggedIn && !status
                      ? localStorage.setItem("status", true)
                      : localStorage.setItem("status", false);
                    loggedIn && setStatusChange(!statusChange);
                    loggedIn && status ? navigate("/") : navigate("/speaker");
                  }}
                  className="speakerBlock col-auto col-lg-auto pointer relative"
                >
                  {/* <SpeakerButton userInfo={userInfo} /> */}
                  <div className="speakerButton">
                    <p>{!status ? "Spiker" : "Student"}</p>
                  </div>
                  {status && (
                    <div className="sp-popup">
                      Shu yerdan Talaba ko'rinishiga o'ting va o'qiyotgan
                      kurslaringizga qayting
                    </div>
                  )}
                </div>

                <div className="col-auto col-lg-auto">
                  {!status && (
                    <p
                      onClick={() => navigate("/cart")}
                      className="shopBag relative pointer"
                    >
                      <svg width="24" height="24" fill="none">
                        <path
                          d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 8H21"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {cartLength ? (
                        <p className="cartLength">{cartLength}</p>
                      ) : null}
                    </p>
                  )}
                </div>
                <div className="col-auto col-lg-auto">
                  <NavbarProfile
                    loggedIn={loggedIn}
                    userInfo={userInfo}
                    setProfileMenuShow={setProfileMenuShow}
                    profileMenuShow={profileMenuShow}
                    AccountCircleIcon={AccountCircleIcon}
                    ProfileMenu={ProfileMenu}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
