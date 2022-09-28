import React, { useContext } from "react";
import "./Sidebar.css";
import { StateContext } from "../../context/Context";
import videoCamera from "../../assets/icons/video.png";
import { useNavigate } from "react-router-dom";

export default function SidebarActive(props) {
  const { navStretch, balance } = useContext(StateContext);
  const navigate = useNavigate();
  const { active } = props;
  return (
    <div className={navStretch ? "sidebar w-240" : "sidebar w-100"}>
      <div className="containerr ">
        <div style={{ width: "100%" }}>
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
          <div className="divider"></div>

          <ul>
            <li
              onClick={() => navigate("/speaker")}
              className="pointer d-flex pl-40 align-center"
            >
              {/* <WorkIcon className="icon"  />  */}
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

              <p className={active === 1 ? "active" : ""}>Statistika</p>
            </li>
            <li
              onClick={() => navigate("/speakerMyCourses")}
              className="pointer d-flex pl-40 align-center"
            >
              <svg
                className="icon"
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
              <p className={active === 2 ? "active" : ""}>Mening Kurslarim</p>
            </li>

            <li
              onClick={() => navigate("/userAbout")}
              className="pointer sd-flex pl-40 align-center"
            >
              <svg
                className="icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke={active === 3 ? "#006AFF" : "#1C1C1C"}
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
              <p className={active === 3 ? "active" : ""}>Profil</p>
            </li>
            <li
              onClick={() => navigate("/activeDevices")}
              className="pointer d-flex pl-40 align-center"
            >
              <svg
                className="icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke={active === 4 ? "#006AFF" : "#1C1C1C"}
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

              <p className={active === 4 ? "active" : ""}>Aktiv qurilmalarim</p>
            </li>
            <div className="divider"></div>
          </ul>
          <div className="text-align-center">
            <svg
              className="icon d-24-none"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => navigate("/uploadCourse")}
              stroke={active === 5 ? "#006AFF" : "#1C1C1C"}
            >
              <path
                d="M12.53 20.4201H6.21C3.05 20.4201 2 18.3201 2 16.2101V7.79008C2 4.63008 3.05 3.58008 6.21 3.58008H12.53C15.69 3.58008 16.74 4.63008 16.74 7.79008V16.2101C16.74 19.3701 15.68 20.4201 12.53 20.4201Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.5202 17.0999L16.7402 15.1499V8.83989L19.5202 6.88989C20.8802 5.93989 22.0002 6.51989 22.0002 8.18989V15.8099C22.0002 17.4799 20.8802 18.0599 19.5202 17.0999Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="9.4502"
                y1="8.75"
                x2="9.4502"
                y2="14.75"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="6.4502"
                y1="11.75"
                x2="12.4502"
                y2="11.75"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <button
              onClick={() => navigate("/uploadCourse")}
              className="pointer courseUploadButton"
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
          </div>
        </div>

        <p className="copyRight">© 2022 EduON LLC</p>
      </div>
    </div>
  );
}
