import { Divider } from "@mui/material";
import axios from "../../Apis/api";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import { StateContext } from "../../context/Context";
import "./MobileMenu.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Button from "@mui/material/Button";
import videoCamera from "../../assets/icons/video.png";
import "../Sidebar/Sidebar.css";
import MyAccount from "../../assets/icons/wallet-add.png";
import "../Navbar/NavbarSm.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 360,
  bgcolor: "background.paper",
  border: "4px solid #006aff",
  borderRadius: "15px",
  boxShadow: 24,
  p: 5,
};

export default function MobileMenu() {
  const { loggedIn, balance, mobileMenuOpen, setMobileMenuOpen } =
    useContext(StateContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [subCategories, setsubCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleOpen = () => setOpen(true);
  const [moduleId, setmoduleId] = useState("");
  const [subMenu, setSubMenu] = useState(false);
  const [status, setStatus] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const handleClose = () => setOpen(false);
  useEffect(() => {
    subMenu && setMobileMenuOpen(false);
  }, [subMenu]);

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
              isSpeaker: res.data.is_speaker,
            });
          })
          .catch((err) => {
            refresh(err.response.status, err.response.status.text);
          });
    } catch (error) {}
  }, []);
  useEffect(() => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_API_KEY}/api/v1/courses/categories/${moduleId}`
        )
        .then((res) => {
          setsubCategories(res.data.subcategory);
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  }, [moduleId]);

  useEffect(() => {
    setStatus(JSON.parse(localStorage.getItem("status")));
  }, [mobileMenuOpen]);

  function copyToClipboard() {
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    setCopied(true);
  }
  useEffect(() => {
    copied &&
      setTimeout(() => {
        setCopied(false);
        handleClose();
        setMobileMenuOpen(false);
      }, 500);
  }, [copied]);

  const becomeSpeaker = async () => {
    navigate("/speaker");
    handleClose();
    if (loggedIn) {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      };
      try {
        await axios
          .put(
            `${process.env.REACT_APP_API_KEY}api/v1/accounts/become-speaker`,
            { is_speaker: true },
            { headers }
          )
          .then((res) => {
            setMobileMenuOpen(false);
          })
          .catch((err) => {
            refresh(err.response.status, err.response.status.text);
          });
      } catch (error) {}
      setMobileMenuOpen(false);
    } else {
      navigate("/login");
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <div
        className={`container  ${
          mobileMenuOpen ? "left-0" : "left-100percent"
        } d-sm-block mobileMenu`}
      >
        {!status ? (
          <>
            <div>
              <div className="rowGrid">
                <div className="col-24">
                  <div
                    style={{ margin: "0" }}
                    className="rowGrid header justify-between align-center"
                  >
                    {!loggedIn ? (
                      <button
                        onClick={() => {
                          navigate("/login");
                          setMobileMenuOpen(false);
                        }}
                        className="btn"
                      >
                        Boshlash
                      </button>
                    ) : (
                      <span></span>
                    )}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => setMobileMenuOpen(false)}
                      className="x-icon-sm"
                    >
                      <path
                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.16992 14.8299L14.8299 9.16992"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.8299 14.8299L9.16992 9.16992"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <Divider />
                  <ul className="categories rowGrid">
                    {categories.length !== 0 &&
                      categories.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setmoduleId(item.id);
                            setSubMenu(true);
                          }}
                          className="col-24"
                        >
                          <p>{item.name}</p>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.91016 19.9201L15.4302 13.4001C16.2002 12.6301 16.2002 11.3701 15.4302 10.6001L8.91016 4.08008"
                              stroke="#1C1C1C"
                              strokeWidth="1.5"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </li>
                      ))}
                  </ul>
                  <Divider />
                  <ul className="rowGrid bottom">
                    <li
                      onClick={() => {
                        // navigate("/speaker");
                        loggedIn && !userInfo.is_speaker && !status
                          ? becomeSpeaker()
                          : setMobileMenuOpen(false);

                        localStorage.setItem("status", true);
                      }}
                      className="col-24"
                    >
                      Spiker
                    </li>
                    <li
                      onClick={() => handleOpen()}
                      className="col-24 d-flex align-center"
                    >
                      <svg
                        style={{ marginRight: "10px" }}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.39969 6.32015L15.8897 3.49015C19.6997 2.22015 21.7697 4.30015 20.5097 8.11015L17.6797 16.6002C15.7797 22.3102 12.6597 22.3102 10.7597 16.6002L9.91969 14.0802L7.39969 13.2402C1.68969 11.3402 1.68969 8.23015 7.39969 6.32015Z"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.1104 13.6496L13.6904 10.0596"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Yaqinlarga ulashish
                    </li>
                  </ul>
                  <p className="col-24 copyRight">© 2022 EduON LLC</p>
                </div>
              </div>
            </div>
            {subCategories?.length !== 0 && (
              <div
                className={`submenu ${
                  subMenu ? "right-0" : "right-100percent"
                }`}
              >
                <div
                  onClick={() => {
                    setMobileMenuOpen(true);
                    setSubMenu(false);
                  }}
                  className="top d-flex align-center"
                >
                  <svg
                    style={{ marginRight: "20px" }}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.0898 4.07992L8.56984 10.5999C7.79984 11.3699 7.79984 12.6299 8.56984 13.3999L15.0898 19.9199"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h3>Menu</h3>
                </div>
                <ul className="categories">
                  {subCategories?.length !== 0 &&
                    subCategories?.map((item, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          navigate(`/subCourses/${item.id}`);
                          setMobileMenuOpen(false);
                          setSubMenu(false);
                        }}
                      >
                        {item.name}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <>
            <div
              style={{ margin: "0" }}
              className="rowGrid header justify-between align-center"
            >
              <p>Bosh sahifa</p>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <path
                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                  stroke="#1C1C1C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.16992 14.8299L14.8299 9.16992"
                  stroke="#1C1C1C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.8299 14.8299L9.16992 9.16992"
                  stroke="#1C1C1C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <Divider />
            <div className="myAccount">
              <div className="myAccountTitle">
                <span>Mening hisobim</span>
                <h1>{balance != null ? balance : 0} UZS</h1>
              </div>
              {/* <img
                onClick={() => {
                  navigate("/moneyOperations");
                  setMobileMenuOpen(false);
                }}
                className="myAccountImg"
                src={MyAccount}
                alt="MyAccount"
              /> */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  navigate("/moneyOperations");
                  setMobileMenuOpen(false);
                }}
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#006aff",
                  padding: "12px",
                  borderRadius: "10px",
                }}
                stroke="white"
              >
                <path
                  d="M14.2617 15.4385H9.26172"
                  stroke="#FCFCFC"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.7617 12.998V17.998"
                  stroke="#FCFCFC"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.66 2.51814L12.63 2.58814L9.72996 9.31814H6.87996C6.19996 9.31814 5.54996 9.45814 4.95996 9.70814L6.70996 5.52814L6.74996 5.42814L6.81996 5.26814C6.83996 5.20814 6.85996 5.14814 6.88996 5.09814C8.19996 2.06814 9.67996 1.37814 12.66 2.51814Z"
                  stroke="#FCFCFC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.0505 9.51807C17.6005 9.37807 17.1205 9.31807 16.6405 9.31807H9.73047L12.6305 2.58807L12.6605 2.51807C12.8105 2.56807 12.9505 2.63807 13.1005 2.69807L15.3105 3.62807C16.5405 4.13807 17.4005 4.66807 17.9205 5.30807C18.0205 5.42807 18.1005 5.53807 18.1705 5.66807C18.2605 5.80807 18.3305 5.94807 18.3705 6.09807C18.4105 6.18807 18.4405 6.27807 18.4605 6.35807C18.7305 7.19807 18.5705 8.22807 18.0505 9.51807Z"
                  stroke="#FCFCFC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.5217 14.1984V16.1484C21.5217 16.3484 21.5117 16.5484 21.5017 16.7484C21.3117 20.2384 19.3617 21.9984 15.6617 21.9984H7.86172C7.62172 21.9984 7.38172 21.9784 7.15172 21.9484C3.97172 21.7384 2.27172 20.0384 2.06172 16.8584C2.03172 16.6284 2.01172 16.3884 2.01172 16.1484V14.1984C2.01172 12.1884 3.23172 10.4584 4.97172 9.70836C5.57172 9.45836 6.21172 9.31836 6.89172 9.31836H16.6517C17.1417 9.31836 17.6217 9.38836 18.0617 9.51836C20.0517 10.1284 21.5217 11.9884 21.5217 14.1984Z"
                  stroke="#FCFCFC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.71 5.52832L4.96 9.70832C3.22 10.4583 2 12.1883 2 14.1983V11.2683C2 8.42832 4.02 6.05832 6.71 5.52832Z"
                  stroke="#FCFCFC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.5186 11.2677V14.1977C21.5186 11.9977 20.0586 10.1277 18.0586 9.52766C18.5786 8.22766 18.7286 7.20766 18.4786 6.35766C18.4586 6.26766 18.4286 6.17766 18.3886 6.09766C20.2486 7.05766 21.5186 9.02766 21.5186 11.2677Z"
                  stroke="#FCFCFC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <ul>
              <li
                onClick={() => {
                  navigate("/speaker");
                  setMobileMenuOpen(false);
                }}
                className="pointer d-flex pl-40 align-center"
              >
                <svg
                  className="icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke={"#1C1C1C"}
                >
                  <path
                    d="M2 22H22"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.75 4V22H14.25V4C14.25 2.9 13.8 2 12.45 2H11.55C10.2 2 9.75 2.9 9.75 4Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 10V22H7V10C7 8.9 6.6 8 5.4 8H4.6C3.4 8 3 8.9 3 10Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 15V22H21V15C21 13.9 20.6 13 19.4 13H18.6C17.4 13 17 13.9 17 15Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p>Statistika</p>
              </li>
              <li
                onClick={() => {
                  navigate("/speakerMyCourses");
                  setMobileMenuOpen(false);
                }}
                className="pointer d-flex pl-40 align-center"
              >
                <svg
                  className="icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke={"#1C1C1C"}
                >
                  <path
                    d="M10.05 2.53004L4.03002 6.46004C2.10002 7.72004 2.10002 10.54 4.03002 11.8L10.05 15.73C11.13 16.44 12.91 16.44 13.99 15.73L19.98 11.8C21.9 10.54 21.9 7.73004 19.98 6.47004L13.99 2.54004C12.91 1.82004 11.13 1.82004 10.05 2.53004Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.63 13.08L5.62 17.77C5.62 19.04 6.6 20.4 7.8 20.8L10.99 21.86C11.54 22.04 12.45 22.04 13.01 21.86L16.2 20.8C17.4 20.4 18.38 19.04 18.38 17.77V13.13"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21.4 15V9"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>Mening Kurslarim</p>
              </li>

              <li
                onClick={() => {
                  navigate("/userAbout");
                  setMobileMenuOpen(false);
                }}
                className="pointer d-flex pl-40 align-center"
              >
                <svg
                  className="icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke={"#1C1C1C"}
                >
                  <path
                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12.8801V11.1201C2 10.0801 2.85 9.22006 3.9 9.22006C5.71 9.22006 6.45 7.94006 5.54 6.37006C5.02 5.47006 5.33 4.30006 6.24 3.78006L7.97 2.79006C8.76 2.32006 9.78 2.60006 10.25 3.39006L10.36 3.58006C11.26 5.15006 12.74 5.15006 13.65 3.58006L13.76 3.39006C14.23 2.60006 15.25 2.32006 16.04 2.79006L17.77 3.78006C18.68 4.30006 18.99 5.47006 18.47 6.37006C17.56 7.94006 18.3 9.22006 20.11 9.22006C21.15 9.22006 22.01 10.0701 22.01 11.1201V12.8801C22.01 13.9201 21.16 14.7801 20.11 14.7801C18.3 14.7801 17.56 16.0601 18.47 17.6301C18.99 18.5401 18.68 19.7001 17.77 20.2201L16.04 21.2101C15.25 21.6801 14.23 21.4001 13.76 20.6101L13.65 20.4201C12.75 18.8501 11.27 18.8501 10.36 20.4201L10.25 20.6101C9.78 21.4001 8.76 21.6801 7.97 21.2101L6.24 20.2201C5.33 19.7001 5.02 18.5301 5.54 17.6301C6.45 16.0601 5.71 14.7801 3.9 14.7801C2.85 14.7801 2 13.9201 2 12.8801Z"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>Profil</p>
              </li>
              <li
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/activeDevices");
                }}
                className="pointer d-flex pl-40 align-center"
              >
                <svg
                  className="icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke={"#1C1C1C"}
                >
                  <path
                    d="M10 16.95H6.21C2.84 16.95 2 16.11 2 12.74V6.74003C2 3.37003 2.84 2.53003 6.21 2.53003H16.74C20.11 2.53003 20.95 3.37003 20.95 6.74003"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 21.4699V16.95"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12.95H10"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.74023 21.47H10.0002"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22.0003 12.8V18.51C22.0003 20.88 21.4103 21.47 19.0403 21.47H15.4903C13.1203 21.47 12.5303 20.88 12.5303 18.51V12.8C12.5303 10.43 13.1203 9.83997 15.4903 9.83997H19.0403C21.4103 9.83997 22.0003 10.43 22.0003 12.8Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.2445 18.25H17.2535"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p>Active qurilmalarim</p>
              </li>
              <div className="divider"></div>
            </ul>
            <Divider style={{ margin: "15px 0" }} />
            <div className="text-align-center">
              <button
                onClick={() => {
                  navigate("/uploadCourse");
                  setMobileMenuOpen(false);
                }}
                className="pointer courseUploadButton"
              >
                <img src={videoCamera} alt="..." />
                Kurs yuklash
              </button>
            </div>
            <Divider style={{ margin: "15px 0" }} />
            <ul>
              <li
                onClick={() => {
                  setMobileMenuOpen(false);
                  localStorage.setItem("status", false);
                  navigate("/");
                }}
              >
                <p>Student</p>
              </li>
              <li onClick={() => handleOpen()} className="d-flex align-center">
                <svg
                  style={{ marginRight: "10px" }}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.39969 6.32015L15.8897 3.49015C19.6997 2.22015 21.7697 4.30015 20.5097 8.11015L17.6797 16.6002C15.7797 22.3102 12.6597 22.3102 10.7597 16.6002L9.91969 14.0802L7.39969 13.2402C1.68969 11.3402 1.68969 8.23015 7.39969 6.32015Z"
                    stroke="#1C1C1C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.1104 13.6496L13.6904 10.0596"
                    stroke="#1C1C1C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Yaqinlarga ulashish
              </li>
            </ul>
          </>
        )}
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
          style={{
            border: "none",
          }}
        >
          <Fade in={open}>
            <Box sx={style} className="container">
              {copied ? (
                <p
                  style={{
                    color: "#0CC14A",
                    padding: "12px 20px",
                    fontSize: "16px",
                    textAlign: "center",
                  }}
                  className="col-24 d-flex align-center justify-center"
                >
                  <ContentCopyIcon style={{ marginRight: "15px" }} />
                  Nusxa olindi
                </p>
              ) : (
                <div className="rowGrid align-center">
                  <input
                    style={{
                      color: "black",
                      padding: "12px 20px",
                      backgroundColor: "#F6F6F6",
                      fontSize: "12px",
                      outline: "none",
                      border: "none",
                      borderRadius: "15px",
                    }}
                    disabled
                    type="text"
                    value="https://eduon.uz/main"
                    id="myInput"
                    className="col-14"
                  ></input>
                  <div className="col-10">
                    <Button
                      sx={{
                        width: "100%",
                        backgroundColor: "#80B5FF",
                        borderRadius: "15px",
                        height: "35px",
                        color: "white",
                        fontSize: "10px",
                        fontWeight: "500",
                      }}
                      className="btn"
                      onClick={() => copyToClipboard()}
                    >
                      Nusxa olish
                    </Button>
                  </div>
                </div>
              )}
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
}
