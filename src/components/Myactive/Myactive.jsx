import React, { useContext } from "react";
import "./Myactive.css";
import Windows from "../../assets/icons/monitor.png";
import Ipad from "../../assets/icons/mobile.png";
import Delete from "../../assets/icons/trash-red.png";
import { StateContext } from "../../context/Context";
// import axios from "../../Apis/api";
import SidebarActive from "../Sidebar/SidebarActive";
import Sidebar from "../Sidebar/Sidebar";
import NavbarDemo from "../Navbar/Navbar";
import NavbarSm from "../Navbar/NavbarSm";

function Myactive(props) {
  const { navStretch } = useContext(StateContext);

  const { user } = props;
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  return (
    <>
      <NavbarDemo />
      <NavbarSm />
      {user ? (
        user.is_speaker ? (
          <SidebarActive active={4} />
        ) : (
          <Sidebar />
        )
      ) : (
        <Sidebar />
      )}{" "}
      <div className={navStretch ? "courses ml-240" : "courses ml-100"}>
        <div className="myActive">
          <div className="container">
            <h1 className="ActiveInstallations">Aktiv qurilmalarim</h1>
            <div className="rowGrid">
              <div className="col-8 col-lg-12 col-sm-24 mb-lg-30">
                <div className="cards">
                  <div className="windows">
                    <div className="title">
                      <div className="img">
                        <img src={Windows} alt="..." />
                      </div>
                      <div className="windows10">
                        <h1>Windows 10</h1>
                        <p>10:32:55 01-12-2021</p>
                      </div>
                    </div>
                    <p className="current"> Joriy sessiya</p>
                  </div>
                </div>
              </div>

              <div className="col-8 col-lg-12 col-sm-24 mb-lg-30">
                <div className="cards">
                  <div className="windows">
                    <div className="title">
                      <div className="img">
                        <img src={Ipad} alt="..." />
                      </div>
                      <div className="windows10">
                        <h1>IPad13,4, IPad</h1>
                        <p>11:01:08 18-05-2022</p>
                      </div>
                    </div>
                    <p className="delete">
                      <img src={Delete} alt="..." />
                      O'chirish
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-8 col-lg-12 col-sm-24 mb-lg-30">
                <div className="cards">
                  <div className="windows">
                    <div className="title">
                      <div className="img">
                        <img src={Ipad} alt="..." />
                      </div>
                      <div className="windows10">
                        <h1>IPhone 13 Pro</h1>
                        <p>22:02:09 02-12-2021</p>
                      </div>
                    </div>
                    <p className="delete">
                      <img src={Delete} alt="..." />
                      O'chirish
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="allDevices">
              <h2>Barcha qurilmalarni o’chirish</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Myactive;
