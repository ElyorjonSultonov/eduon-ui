import React, { useContext, useEffect, useState } from "react";
import "./overallHeader.css";
// import walet from "../../assets/images/Statistic/walet.png";
// import student from "../../assets/images/Statistic/student.png";
// import book from "../../assets/images/Statistic/book.png";
// import register from "../../assets/images/Statistic/register.png";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import crsImage from "../../assets/images/Rectangle 49.png";
import { StateContext } from "../../context/Context";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import axios from "../../Apis/api";
import { BounceLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
const data = [
  {
    name: "Du",
    uv: 2000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Se",
    uv: 2500,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Ch",
    uv: 2200,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Pa",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Ju",
    uv: 5090,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Sh",
    uv: 4600,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Ya",
    uv: 7890,
    pv: 4300,
    amt: 2100,
  },
];

function OverallHeader() {
  const [areaWidth, setAreaWidth] = useState(750);
  const { navStretch, balance, myEnrolledCourses, setmyEnrolledCourses } =
    useContext(StateContext);
  const [coursesQuantity, setcoursesQuantity] = useState(0);
  const [overallStudents, setoverallStudents] = useState(0);
  const [loader, setLoader] = useState(false);
  const [coursesOnProcess, setcoursesOnProcess] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth > 1300 && window.innerWidth < 1480) {
      navStretch ? setAreaWidth(550) : setAreaWidth(650);
    } else {
      navStretch ? setAreaWidth(650) : setAreaWidth(750);
    }
  }, [navStretch]);

  useEffect(() => {
    setLoader(true);
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v1/courses/uploaded-courses/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
        .then((res) => {
          res.data.map((item) =>
            setoverallStudents((p) => p + parseInt(item.enrolled_students))
          );
          let filteredCourses = res.data.filter(
            (item) => item.is_valid === "ON HOLD"
          );
          setcoursesOnProcess(filteredCourses);
          setcoursesQuantity(res.data.length);
          setLoader(false);
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {
      setLoader(false);
    }
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v1/courses/enrolled-courses/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
        .then((res) => {
          setmyEnrolledCourses(res.data.length);
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  }, []);
  return (
    <div className="statistic">
      <div className="headerRow rowGrid">
        <div className="col-24 col-sm-24">
          <h1>Umumiy statistika</h1>
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
                <h2>{balance ? balance : 0} UZS</h2>
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
                <h2>{overallStudents ? overallStudents : 0}</h2>
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
                <h2>{coursesQuantity ? coursesQuantity : 0}</h2>
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
                <h2>{myEnrolledCourses ? myEnrolledCourses : 0}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rowGrid">
        {/* <div className="col-14 col-lg-24">
          <div className="profit_box">
            <div className="boxes">
              <p>Umumiy Foyda</p>
              <div className="profit">
                <h3>100 000 UZS</h3>
                <p>bu hafta</p>
              </div>
            </div>
            <div className="boxes">
              <p>Kursga a'zo bo'lganlar</p>
              <div className="profit">
                <h3>30 ta</h3>
                <p>bu hafta</p>
              </div>
            </div>
            <div className="boxes">
              <p>Umumiy Reyting</p>
              <div className="profit">
                <h3>4.55</h3>
                <p>bu hafta</p>
              </div>
            </div>
          </div>
          <div className="line"></div>
          <p className="summa">Summa</p>
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
        </div> */}
        <div className="col-10 col-lg-24 col-sm-24 mt-lg-30">
          <p className="title">Jarayondagi Kurslarim</p>
          {coursesOnProcess?.length != 0 ?
            coursesOnProcess.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/speakerChosenCourse/${item.id}`)}
                className="item"
              >
                <span>
                  <img
                    src={
                      item.cover_img
                        ? `${process.env.REACT_APP_API_KEY}${item.cover_img}`
                        : crsImage
                    }
                    alt="#"
                  />
                  <p>{item.name.slice(0.2) + "..."}</p>
                </span>
              </div>
            )):<h3>Sizda jarayondagi kurslar mavjud emas</h3>}
        </div>
      </div>
      {loader && (
        <div className="loader">
          <BounceLoader color="#006AFF" speedMultiplier={1.2} />
        </div>
      )}
    </div>
  );
}

export default OverallHeader;
