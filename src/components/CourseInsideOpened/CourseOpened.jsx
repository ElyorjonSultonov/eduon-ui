import React, { useContext, useEffect, useState } from "react";
import "./CourseOpened.css";
import intersec from "./img/Intersect.png";
import { StateContext } from "../../context/Context";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import NavbarDemo from "../Navbar/Navbar";
import SidebarActive from "../Sidebar/SidebarActive";
import Sidebar from "../Sidebar/Sidebar";
import NavbarSm from "../Navbar/NavbarSm";
const data = [
  {
    name: "Yan",
    uv: 190,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Fev",
    uv: 250,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    uv: 190,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
    uv: 190,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "May",
    uv: 310,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Iyun",
    uv: 240,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Iyul",
    uv: 200,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Avg",
    uv: 600,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Sen",
    uv: 500,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Okt",
    uv: 510,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Noy",
    uv: 1000,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Dek",
    uv: 700,
    pv: 4300,
    amt: 2100,
  },
];

function CourseOpened(props) {
  const { navStretch } = useContext(StateContext);
  const [areaWidth, setAreaWidth] = useState(750);
  const { user } = props;

  useEffect(() => {
    if (window.innerWidth > 1300) {
      navStretch ? setAreaWidth(450) : setAreaWidth(550);
    } else {
      navStretch ? setAreaWidth(850) : setAreaWidth(950);
    }
  }, [navStretch]);
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <>
      <NavbarDemo />
      <NavbarSm />
      {user ? user.is_speaker ? <SidebarActive /> : <Sidebar /> : <Sidebar />}
      <div
        className={
          navStretch
            ? "CourseOpened courses ml-240"
            : "CourseOpened courses ml-100"
        }
      >
        <div className="container">
          <div className="headerRow rowGrid">
            <div className="col-24 col-sm-24 smMediaFIlter">
              <h1>Biznesda sherikchilik va halollik asoslari</h1>
              <div className="filter">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                <p>Yil Bo'yicha</p>
              </div>
            </div>
          </div>
          <div className="boxes_line rowGrid">
            <div className="col-6 col-lg-12 col-sm-24 mb-lg-30">
              <div className="box">
                <div className="box_item">
                  {/* <img src={walet} alt="" /> */}
                  <div className="img">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.5 12.41V7.84004C2.5 6.65004 3.23 5.59 4.34 5.17L12.28 2.17C13.52 1.7 14.85 2.62003 14.85 3.95003V7.75002"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22.5588 13.9702V16.0302C22.5588 16.5802 22.1188 17.0302 21.5588 17.0502H19.5988C18.5188 17.0502 17.5288 16.2602 17.4388 15.1802C17.3788 14.5502 17.6188 13.9602 18.0388 13.5502C18.4088 13.1702 18.9188 12.9502 19.4788 12.9502H21.5588C22.1188 12.9702 22.5588 13.4202 22.5588 13.9702Z"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 12H14"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="box_p">
                    <p>Umumiy balans</p>
                    <h2>15 000 000 UZS</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-12 col-sm-24 mb-lg-30">
              <div className="box">
                <div className="box_item">
                  <div className="img">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.0495 2.53L4.02953 6.46C2.09953 7.72 2.09953 10.54 4.02953 11.8L10.0495 15.73C11.1295 16.44 12.9095 16.44 13.9895 15.73L19.9795 11.8C21.8995 10.54 21.8995 7.73 19.9795 6.47L13.9895 2.54C12.9095 1.82 11.1295 1.82 10.0495 2.53Z"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.63012 13.08L5.62012 17.77C5.62012 19.04 6.60012 20.4 7.80012 20.8L10.9901 21.86C11.5401 22.04 12.4501 22.04 13.0101 21.86L16.2001 20.8C17.4001 20.4 18.3801 19.04 18.3801 17.77V13.13"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21.4004 15V9"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="box_p">
                    <p>O'quvchilar soni</p>
                    <h2>215</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-12 col-sm-24 mb-lg-30">
              <div className="box">
                <div className="box_item">
                  <div className="img">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 16.74V4.67C22 3.47 21.02 2.58 19.83 2.68H19.77C17.67 2.86 14.48 3.93 12.7 5.05L12.53 5.16C12.24 5.34 11.76 5.34 11.47 5.16L11.22 5.01C9.44 3.9 6.26 2.84 4.16 2.67C2.97 2.57 2 3.47 2 4.66V16.74C2 17.7 2.78 18.6 3.74 18.72L4.03 18.76C6.2 19.05 9.55 20.15 11.47 21.2L11.51 21.22C11.78 21.37 12.21 21.37 12.47 21.22C14.39 20.16 17.75 19.05 19.93 18.76L20.26 18.72C21.22 18.6 22 17.7 22 16.74Z"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 5.49V20.49"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.75 8.49H5.5"
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
                  </div>
                  <div className="box_p">
                    <p>Kurslar soni</p>
                    <h2>341</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-12 col-sm-24 mb-lg-30">
              <div className="box">
                <div className="box_item">
                  <div className="img">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.3 7.91998V13.07C19.3 16.15 17.54 17.47 14.9 17.47H6.10995C5.65995 17.47 5.22996 17.43 4.82996 17.34C4.57996 17.3 4.33996 17.23 4.11996 17.15C2.61996 16.59 1.70996 15.29 1.70996 13.07V7.91998C1.70996 4.83998 3.46995 3.52002 6.10995 3.52002H14.9C17.14 3.52002 18.75 4.47001 19.18 6.64001C19.25 7.04001 19.3 7.44998 19.3 7.91998Z"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22.3011 10.9201V16.0701C22.3011 19.1501 20.5411 20.4701 17.9011 20.4701H9.11105C8.37105 20.4701 7.70106 20.3701 7.12106 20.1501C5.93106 19.7101 5.12105 18.8001 4.83105 17.3401C5.23105 17.4301 5.66105 17.4701 6.11105 17.4701H14.9011C17.5411 17.4701 19.3011 16.1501 19.3011 13.0701V7.9201C19.3011 7.4501 19.2611 7.03014 19.1811 6.64014C21.0811 7.04014 22.3011 8.38011 22.3011 10.9201Z"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.4984 13.1399C11.9564 13.1399 13.1384 11.9579 13.1384 10.4999C13.1384 9.04185 11.9564 7.85986 10.4984 7.85986C9.04038 7.85986 7.8584 9.04185 7.8584 10.4999C7.8584 11.9579 9.04038 13.1399 10.4984 13.1399Z"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.78027 8.29999V12.7"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.2217 8.30029V12.7003"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="box_p">
                    <p>Ro'yxatdan o'tilgan kurslar</p>
                    <h2>10</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*--------------------------- */}
        <div className="promoCode">
          <h1>Promo kodlar</h1>
          <div className="container">
            <div className="rowGrid">
              <div className="col-6 col-lg-8 col-md-12 col-sm-24">
                <div className="boxs">
                  <div className="promoName">
                    <h3>Promokod nomi</h3>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                  <div className="promoDiscount">
                    <div className="promoProsent">
                      <h1>15% chegirma</h1>
                      <div className="limits">
                        <div className="wasUsed">
                          <h3>Ishlatildi</h3>
                          <h2>20</h2>
                        </div>
                        <div className="residual">
                          <h3>Qoldiq limit</h3>
                          <h2>140</h2>
                        </div>
                      </div>
                    </div>
                    <div className="promoImgs">
                      <img className="proImg" src={intersec} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-8 col-md-12 col-sm-24">
                <div className="boxs">
                  <div className="promoName">
                    <h3>Promokod nomi</h3>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                  <div className="promoDiscount">
                    <div className="promoProsent">
                      <h1>15% chegirma</h1>
                      <div className="limits">
                        <div className="wasUsed">
                          <h3>Ishlatildi</h3>
                          <h2>20</h2>
                        </div>
                        <div className="residual">
                          <h3>Qoldiq limit</h3>
                          <h2>140</h2>
                        </div>
                      </div>
                    </div>
                    <div className="promoImgs">
                      <img className="proImg" src={intersec} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-8 col-md-12 col-sm-24">
                <div className="boxs">
                  <div className="promoName">
                    <h3>Promokod nomi</h3>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                  <div className="promoDiscount">
                    <div className="promoProsent">
                      <h1>15% chegirma</h1>
                      <div className="limits">
                        <div className="wasUsed">
                          <h3>Ishlatildi</h3>
                          <h2>20</h2>
                        </div>
                        <div className="residual">
                          <h3>Qoldiq limit</h3>
                          <h2>140</h2>
                        </div>
                      </div>
                    </div>
                    <div className="promoImgs">
                      <img className="proImg" src={intersec} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-8 col-md-12 col-sm-24">
                <div className="boxs">
                  <div className="promoName">
                    <h3>Promokod nomi</h3>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                  <div className="promoDiscount">
                    <div className="promoProsent">
                      <h1>15% chegirma</h1>
                      <div className="limits">
                        <div className="wasUsed">
                          <h3>Ishlatildi</h3>
                          <h2>20</h2>
                        </div>
                        <div className="residual">
                          <h3>Qoldiq limit</h3>
                          <h2>140</h2>
                        </div>
                      </div>
                    </div>
                    <div className="promoImgs">
                      <img className="proImg" src={intersec} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-8 col-md-12 col-sm-24">
                <div className="boxs">
                  <div className="promoName">
                    <h3>Promokod nomi</h3>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                        stroke="#1C1C1C"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                  <div className="promoDiscount">
                    <div className="promoProsent">
                      <h1>15% chegirma</h1>
                      <div className="limits">
                        <div className="wasUsed">
                          <h3>Ishlatildi</h3>
                          <h2>20</h2>
                        </div>
                        <div className="residual">
                          <h3>Qoldiq limit</h3>
                          <h2>140</h2>
                        </div>
                      </div>
                    </div>
                    <div className="promoImgs">
                      <img className="proImg" src={intersec} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ---------------------------------------- */}

        {/* diagram */}
        <div className="grapth_rectangle">
          <div className="grapth rowGrid">
            <div className="col-12 col-lg-24">
              <h1>Sotib olish / kursni boshlash jadvali</h1>
              <p className="soni">Soni</p>
              <AreaChart
                className="chart"
                width={areaWidth}
                height={300}
                data={data}
                margin={{
                  top: 10,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#006AFF"
                  fill="rgba(47, 128, 237, 0.3)"
                />
              </AreaChart>
            </div>
            <div className="col-12 col-lg-24">
              <h1>Kurs sahifasiga tashriflar jadvali</h1>
              <p className="soni">Soni</p>
              <AreaChart
                className="chart"
                width={areaWidth}
                height={300}
                data={data}
                margin={{
                  top: 10,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#006AFF"
                  fill="rgba(47, 128, 237, 0.3)"
                />
              </AreaChart>
            </div>
          </div>
        </div>
        {/* diagram end */}
      </div>
    </>
  );
}

export default CourseOpened;
