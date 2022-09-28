import React, { useContext, useState, useEffect } from "react";
import "./Sidebar.css";
import { StateContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import axios from "../../Apis/api";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
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

export default function Sidebar(props) {
  const { navStretch, addedToFav, balance, loggedIn } =
    useContext(StateContext);
  const [favCourses, setfavCourses] = useState();
  const navigate = useNavigate();
  const { active } = props;
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

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
      }, 500);
  }, [copied]);

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
            setfavCourses(res.data.length);
          });
    } catch (error) {}
  }, [addedToFav]);
  // handleOpen()

  return (
    // <div className={"sidebar w-240"}>
    <div className={navStretch ? "sidebar w-240" : "sidebar w-100"}>
      <div className="containerr">
        <div style={{ width: "100%" }}>
          {loggedIn && (
            <div
              className="pl-40 top "
              onClick={() => navigate("/moneyOperations")}
            >
              <div className="d-flex align-center">
                <svg
                  className="icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.2617 15.998H9.26172"
                    stroke="#1C1C1C"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.66 2.51814L12.63 2.58814L9.72996 9.31814H6.87996C6.19996 9.31814 5.54996 9.45814 4.95996 9.70814L6.70996 5.52814L6.74996 5.42814L6.81996 5.26814C6.83996 5.20814 6.85996 5.14814 6.88996 5.09814C8.19996 2.06814 9.67996 1.37814 12.66 2.51814Z"
                    stroke="#1C1C1C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.05 9.51819C17.6 9.37819 17.12 9.31819 16.64 9.31819H9.72998L12.63 2.58819L12.66 2.51819C12.81 2.56819 12.95 2.63819 13.1 2.69819L15.31 3.62819C16.54 4.13819 17.4 4.66819 17.92 5.30819C18.02 5.42819 18.1 5.53819 18.17 5.66819C18.26 5.80819 18.33 5.94819 18.37 6.09819C18.41 6.18819 18.44 6.27819 18.46 6.35819C18.73 7.19819 18.57 8.22819 18.05 9.51819Z"
                    stroke="#1C1C1C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21.5217 14.1984V16.1484C21.5217 16.3484 21.5117 16.5484 21.5017 16.7484C21.3117 20.2384 19.3617 21.9984 15.6617 21.9984H7.86172C7.62172 21.9984 7.38172 21.9784 7.15172 21.9484C3.97172 21.7384 2.27172 20.0384 2.06172 16.8584C2.03172 16.6284 2.01172 16.3884 2.01172 16.1484V14.1984C2.01172 12.1884 3.23172 10.4584 4.97172 9.70836C5.57172 9.45836 6.21172 9.31836 6.89172 9.31836H16.6517C17.1417 9.31836 17.6217 9.38836 18.0617 9.51836C20.0517 10.1284 21.5217 11.9884 21.5217 14.1984Z"
                    stroke="#1C1C1C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.71 5.52808L4.96 9.70808C3.22 10.4581 2 12.1881 2 14.1981V11.2681C2 8.42808 4.02 6.05808 6.71 5.52808Z"
                    stroke="#1C1C1C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21.5186 11.2677V14.1977C21.5186 11.9977 20.0586 10.1277 18.0586 9.52766C18.5786 8.22766 18.7286 7.20766 18.4786 6.35766C18.4586 6.26766 18.4286 6.17766 18.3886 6.09766C20.2486 7.05766 21.5186 9.02766 21.5186 11.2677Z"
                    stroke="#1C1C1C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>Mening Hisobim</p>
              </div>
              <p className="summa">{balance ? balance : 0} so'm</p>
            </div>
          )}

          <div className="divider"></div>
          <ul>
            <li
              onClick={() => navigate("/")}
              className="pointer d-flex pl-40 align-center"
            >
              <svg
                className="icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke={active === 1 ? "#006AFF" : "#1C1C1C"}
              >
                <path
                  d="M22 8.52V3.98C22 2.57 21.36 2 19.77 2H15.73C14.14 2 13.5 2.57 13.5 3.98V8.51C13.5 9.93 14.14 10.49 15.73 10.49H19.77C21.36 10.5 22 9.93 22 8.52Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 19.77V15.73C22 14.14 21.36 13.5 19.77 13.5H15.73C14.14 13.5 13.5 14.14 13.5 15.73V19.77C13.5 21.36 14.14 22 15.73 22H19.77C21.36 22 22 21.36 22 19.77Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* <p className={active === 1 ? "active w100-d-block w240-d-none" : ""}>Bosh sahifa</p> */}
              <p className={active === 1 ? "active " : ""}>Bosh sahifa</p>
            </li>
            <li
              onClick={() => navigate("/myEnrolledCourses")}
              className=" d-flex pointer pl-40 align-center"
            >
              <svg
                className="icon "
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke={active === 2 ? "#006AFF" : "#1C1C1C"}
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

              {/* <p className={active === 2 ? "active w100-d-block w240-d-none" : "w100-d-block w240-d-none"}>Mening Kurslarim</p> */}
              <p className={active === 2 ? "active " : ""}>Mening Kurslarim</p>
            </li>
            <li
              onClick={() => navigate("/favCourses")}
              className="pointer d-flex pl-40 align-center favourite "
            >
              <div className="favCount">
                <svg
                  className="icon "
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke={active === 3 ? "#006AFF" : "#1C1C1C"}
                >
                  <path
                    d="M9.25 9.05005C11.03 9.70005 12.97 9.70005 14.75 9.05005"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {favCourses > 0 ? (
                  <span className="count">{favCourses}</span>
                ) : null}
              </div>
              {/* <p className={active === 3 ? "active w100-d-block w240-d-none" : "w100-d-block w240-d-none"}>Saqlangan Kurslar</p> */}
              <p className={active === 3 ? "active " : ""}>Saqlangan Kurslar</p>
            </li>
            <li
              onClick={() => handleOpen()}
              className="d-flex pl-40 align-center pointer"
            >
              <svg
                className="icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.40005 6.32003L15.8901 3.49003C19.7001 2.22003 21.7701 4.30003 20.5101 8.11003L17.6801 16.6C15.7801 22.31 12.6601 22.31 10.7601 16.6L9.92005 14.08L7.40005 13.24C1.69005 11.34 1.69005 8.23003 7.40005 6.32003Z"
                  stroke="#1C1C1C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.11 13.6501L13.69 10.0601"
                  stroke="#1C1C1C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {/* <p className="w100-d-block w240-d-none">Yaqinlarga jo'natish</p> */}
              <p>Yaqinlarga jo'natish</p>
            </li>
          </ul>
          <div className="divider"></div>
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
                      fontSize: "14px",
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
                        height: "49px",
                        color: "white",
                        fontSize: "14px",
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
        <p className="copyRight">© 2022 EduON LLC</p>
      </div>
    </div>
  );
}
