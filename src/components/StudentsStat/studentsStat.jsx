import React, { useState } from "react";
import "./studentsStat.css";
import { countries } from "../../datas/studentsDatas";
import { PieChart, Pie, Cell } from "recharts";
import Map from "../Map/map";
import Barchart from "../Barchart/barchart";

const data = [
  { name: "Erkaklar", value: 76 },
  { name: "Ayollar", value: 24 },
];
const data1 = [
  { name: "Desktop", value: 66 },
  { name: "Mobile", value: 16 },
  { name: "Tablet", value: 10 },
  { name: "Tv", value: 8 },
];
const COLORS = ["#80B5FF", "#999999"];
const COLORS1 = ["#006AFF", "#80B5FF", "#999999", "#FC8873"];

export default function StudentsStat() {
  const [showCountry, setShowCountry] = useState(true);
  return (
    <div className="studensStat">
      <div className="headerRow rowGrid">
        <div className="col-24 col-sm-24">
          <h1>Studentlar bo'yicha statistika</h1>
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
      <div className="maps bg-light p-30">
        <div className="rowGrid">
          <div className="col-24 col-sm-24">
            <div className="rowGrid">
              <div className="col-12 col-lg-15 col-sm-24">
                <p className="titles mb-24">Dunyo Xaritasida</p>
                <Map className="world" />
              </div>
              <div className="col-12 col-lg-9 col-sm-24">
                <div
                  onClick={() => setShowCountry(!showCountry)}
                  className="dropdownSelect mb-24 "
                >
                  <p className="titles">Mamlakatlar bo'yicha saralash</p>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className={showCountry ? "main" : "d-none  "}>
                  {countries.map((item, index) => (
                    <div key={index} className="item">
                      <span>
                        <img src={item.flag} alt="...." />
                        <p className="country">{item.country}</p>
                      </span>
                      <span>
                        <p className="country t-light">{item.quantity}</p>
                        <p className="percent">{item.percent}</p>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ overflowX: "hidden" }} className="rowGrid mt-50">
        <div className="col-12 col-lg-24  col-sm-24 lgMargin">
          <p className="titles mb-24">O'quvchilar yoshi</p>
          <div className="rectangle h-337">
            <Barchart />
          </div>
        </div>
        <div className="col-6 col-lg-12 col-sm-24">
          <p className="titles mb-24">O'quvchilar jinsi</p>
          <div className="rectangle h-337">
            <PieChart width={800} height={180}>
              <Pie
                data={data}
                cx={120}
                cy={80}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={0}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
            <div className="indicators">
              <div
                style={{ backgroundColor: `${COLORS[0]}` }}
                className="color-box"
              ></div>
              <p className="percent">76%</p>
              <p className="gender">Erkak</p>
            </div>
            <div className="indicators">
              <div
                style={{ backgroundColor: `${COLORS[1]}` }}
                className="color-box"
              ></div>
              <p className="percent">26%</p>
              <p className="gender">Ayol</p>
            </div>
          </div>
        </div>
        <div className="col-6 col-lg-12 col-sm-24">
          <p className="titles mb-24">O'quvchilar jinsi</p>
          <div className="rectangle h-337">
            <PieChart width={800} height={180}>
              <Pie
                data={data1}
                cx={120}
                cy={80}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={0}
                dataKey="value"
              >
                {data1.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS1[index % COLORS1.length]}
                  />
                ))}
              </Pie>
            </PieChart>
            <div className="rowGrid">
              <div className="col-12 col-sm-24">
                <div className="indicators">
                  <div
                    style={{ backgroundColor: `${COLORS1[0]}` }}
                    className="mr-10 color-box"
                  ></div>
                  <p className="percent mr-10">76%</p>
                  <p className="gender">Erkak</p>
                </div>
                <div className="indicators">
                  <div
                    style={{ backgroundColor: `${COLORS1[1]}` }}
                    className="mr-10 color-box"
                  ></div>
                  <p className="percent mr-10">26%</p>
                  <p className="gender">Ayol</p>
                </div>
              </div>
              <div className="col-12 col-sm-24">
                <div className="indicators">
                  <div
                    style={{ backgroundColor: `${COLORS1[2]}` }}
                    className="color-box mr-10"
                  ></div>
                  <p className="percent mr-10">76%</p>
                  <p className="gender">Erkak</p>
                </div>
                <div className="indicators">
                  <div
                    style={{ backgroundColor: `${COLORS1[3]}` }}
                    className="color-box mr-10"
                  ></div>
                  <p className="percent mr-10">26%</p>
                  <p className="gender">Ayol</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rowGrid h-385 mt-50">
        <div className="col-18 col-lg-24 col-sm-24 mb-lg-30">
          <div className="rectangle vertical-center h-100p">
            <p className="titles mb-24">O'quvchilar qiziqishlari</p>
            {/* <img src={barChart1} alt="chart" /> */}
            <Barchart />
          </div>
        </div>
        <div className="col-6 col-lg-24 col-sm-24 mb-lg-30">
          <div className="rectangle vertical-center h-100p referral">
            <p className="titles mb-24">Referral link</p>
            <div className="lgMedia">
              <div className="link-box">
                <div className="icon-box">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.0598 10.9399C15.3098 13.1899 15.3098 16.8299 13.0598 19.0699C10.8098 21.3099 7.16985 21.3199 4.92985 19.0699C2.68985 16.8199 2.67985 13.1799 4.92985 10.9399"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.59 13.4099C8.24996 11.0699 8.24996 7.26988 10.59 4.91988C12.93 2.56988 16.73 2.57988 19.08 4.91988C21.43 7.25988 21.42 11.0599 19.08 13.4099"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p>15000 ta</p>
              </div>
              <p className="ps">
                Men yuborgan referal havoli orqali o'tgan foydalanuvchilar soni
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
