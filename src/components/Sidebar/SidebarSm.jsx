import React, { useContext, useState, useEffect } from "react";
import { StateContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import axios from "../../Apis/api";
import "./SidebarSm.css";
import "./Sidebar.css";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";

export default function SidebarSm(props) {
  const { addedToFav, isremoved, setMobileMenuOpen, mobileMenuOpen, loggedIn } =
    useContext(StateContext);
  const [favCourses, setfavCourses] = useState();
  const [cartLength, setCartLength] = useState();
  const navigate = useNavigate();
  const { active } = props;
  const [status, setStatus] = useState(false);
  useEffect(() => {
    setStatus(JSON.parse(localStorage.getItem("status")));
  }, [mobileMenuOpen]);
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
  return (
    <div className="sidebarsm  d-sm-block">
      <div className="containerr">
        <div style={{ width: "100%" }}>
          <ul>
            <li
              onClick={() => {
                // navigate("/");
                status ? navigate("/speaker") : navigate("/");
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
                stroke={active === 0 ? "#006AFF" : "#1C1C1C"}
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
              <p className={active === 0 ? "active " : ""}>Bosh sahifa</p>
            </li>
            <li
              onClick={() => {
                navigate("/search");
                // localStorage.setItem("status", false);
                setMobileMenuOpen(false);
              }}
              className="pointer d-flex pl-40 align-center"
            >
              <svg
                stroke={active === 1 ? "#006AFF" : "#1C1C1C"}
                className="icon"
                width="24"
                height="24"
                fill="none"
              >
                <path
                  d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 22L20 20"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* <p className={active === 1 ? "active w100-d-block w240-d-none" : ""}>Bosh sahifa</p> */}
              <p className={active === 1 ? "active " : ""}>Qidiruv</p>
            </li>
            <li
              onClick={() => {
                // localStorage.setItem("status", false);
                setMobileMenuOpen(false);
                status
                  ? navigate("/speakerMyCourses")
                  : navigate("/myEnrolledCourses");
              }}
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
              <p className={active === 2 ? "active " : ""}>Kurslarim</p>
            </li>
            <li
              onClick={() => {
                navigate("/favCourses");
                setMobileMenuOpen(false);
              }}
              className="pointer d-flex pl-40 align-center favourite"
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
              <p className={active === 3 ? "active " : ""}>Sevimlilar</p>
            </li>
            <li
              onClick={() => {
                navigate("/cart");
                setMobileMenuOpen(false);
              }}
              className="pointer d-flex pl-40 align-center favourite"
            >
              <div className="favCount">
                <svg
                  stroke={active === 4 ? "#006AFF" : "#1C1C1C"}
                  width="24"
                  height="24"
                  fill="none"
                >
                  <path
                    d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 8H21"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {cartLength > 0 ? (
                  <span className="count">{cartLength}</span>
                ) : null}
              </div>
              {/* <p className={active === 3 ? "active w100-d-block w240-d-none" : "w100-d-block w240-d-none"}>Saqlangan Kurslar</p> */}
              <p className={active === 4 ? "active " : ""}>Savatcha</p>
            </li>
          </ul>
          <div className="divider"></div>
        </div>
      </div>
    </div>
  );
}
