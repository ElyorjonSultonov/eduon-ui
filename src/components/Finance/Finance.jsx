import React, { useContext, useEffect, useState } from "react";
import "./Finance.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { StateContext } from "../../context/Context";
// import DateFnsUtils from "@date-io/date-fns";
import { uz } from "date-fns/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { addDays } from "date-fns";
import axios from "../../Apis/api";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
// import { set } from "date-fns/esm";
function Finance() {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const { navStretch, loggedIn } = useContext(StateContext);
  const [areaWidth, setAreaWidth] = useState(750);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [walletNumber, setwalletNumber] = useState(null);
  const [pages, setpages] = useState([]);

  const [pageNum, setpageNum] = useState(1);
  const [transactionStart, settransactionStart] = useState(0);
  const [transactionEnd, settransactionEnd] = useState(6);
  const [transactionStatus, settransactionStatus] = useState("");
  // const [activeTrioStart, setactiveTrioStart] = useState(1);
  // const [activeTrioEnd, setactiveTrioEnd] = useState(3);

  const onDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  useEffect(() => {
    if (window.innerWidth > 1300) {
      navStretch ? setAreaWidth(500) : setAreaWidth(600);
    } else {
      navStretch ? setAreaWidth(750) : setAreaWidth(850);
    }
  }, [navStretch]);

  useEffect(() => {
    setpages([]);

    try {
      axios
        .post(
          `${process.env.REACT_APP_API_KEY}/api/v1/wallet/history`,
          endDate &&
            startDate && {
              start_date: startDate.toISOString().toString().slice(0, 10),
              end_date: endDate.toISOString().toString().slice(0, 10),
            },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        )
        .then((res) => {
          setTransactions(res.data.result);
          settransactionStatus(JSON.parse(res.data.status));
          var pagess = [];
          if (res.data.result.length > 0) {
            for (
              let i = 0;
              i <
              Math.ceil(
                res.data.result.filter(
                  (item) => item.status === 1 && item.amount !== 0
                ).length / 7
              );
              i++
            ) {
              pagess.push(i + 1);
            }
          }
          setpages(res.data.result.length !== 0 ? pagess : []);
        })
        .catch((err) => {
          setTransactions([]);
        });
    } catch (error) {
      setpages([]);
    }
  }, [startDate, endDate]);
  useEffect(() => {
    try {
      loggedIn &&
        axios
          .get(`${process.env.REACT_APP_API_KEY}/api/v1/wallet/info`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          })
          .then((res) => {
            setwalletNumber(res.data.result.card_number);
          })
          .catch((err) => {
            refresh(err.response.status, err.response.status.text);
          });
    } catch (error) {}
  }, []);

  return (
    <div className="finance">
      <div className="headerRow rowGrid">
        <div className="col-24 col-sm-24">
          <h1>Moliya bo’yicha statistika</h1>
        </div>
      </div>
      {/* <div className="boxes_line rowGrid">
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
                <p>Kurslardan daromadlar</p>
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
                <p>Hamyondagi umumiy balans</p>
                <h2>29 000 UZS</h2>
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
                <p>Kartalarimdagi balans</p>
                <h2>159 000 UZS</h2>
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
                <p>Umumiy chiqimlar</p>
                <h2>10 000 000</h2>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* --------------------------- */}
      <div className="transactions">
        <div className="rowGrid ma_left">
          <div className="col-12 col-lg-24 col-sm-24">
            <div className="cardHistory ">
              <div
                className="rowGrid"
                style={{
                  justifyContent: "space-between",
                }}
              >
                <div className="col-12 col-sm-24">
                  <h1 className="historyH1">Tranzaksiyalar tarixi</h1>
                  <p className="historyP">
                    {new Date().toISOString().slice(0, 10)}
                  </p>
                </div>
                <div className="col-10 col-sm-24">
                  <p className="historyH1 color-gray">
                    Sana bo'yicha filtrlash{" "}
                  </p>
                  <DatePicker
                    isClearable={true}
                    // withPortal
                    selected={startDate}
                    onChange={onDateChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    maxDate={new Date()}
                    placeholderText={"YYYY/MM/DD-YYYY/MM/DD"}
                    dateFormat="yyyy/MM/dd"
                    locale={uz}
                    className="date-picker"
                  />
                </div>
              </div>
              {transactions?.length !== 0 &&
                transactions
                  ?.filter((item) => item.status === 1 && item.amount !== 0)
                  .slice(transactionStart, transactionEnd)
                  .map((item, index) => (
                    <div key={index} className="electronicWallet">
                      <div className="cardNumber">
                        <div className="cardNumbersSecret">
                          {item.receiver !== walletNumber ? (
                            <svg width="24" height="24" fill="none">
                              <path
                                d="M3.5 22H20.5"
                                stroke="#1C1C1C"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M5 3.5L19 17.5"
                                stroke="#1C1C1C"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M5 13.77V3.5H15.27"
                                stroke="#1C1C1C"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ) : (
                            <svg width="24" height="24" fill="none">
                              <path
                                d="M5 17.5L19 3.5"
                                stroke="#1C1C1C"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M5 7.22998V17.5H15.27"
                                stroke="#1C1C1C"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M3.5 22H20.5"
                                stroke="#1C1C1C"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                          <div className="cardSend">
                            <h1>
                              {item.receiver
                                .replace(/[^\dA-Z]/g, "")
                                .replace(/(.{4})/g, "$1 ")
                                .trim()}
                            </h1>
                            <p>{item.date}</p>
                          </div>
                        </div>
                        <h1
                          style={
                            item.receiver === walletNumber
                              ? {
                                  color: "#0CC14A",
                                }
                              : null
                          }
                        >
                          {item.amount.toLocaleString("uz-UZ", {
                            style: "currency",
                            currency: "UZS",
                          })}
                        </h1>
                      </div>
                    </div>
                  ))}
              {transactionStatus === false && transactionStatus !== "" && (
                <h1>Transaksiyalar bo'yicha ma'lumotlar topilmadi</h1>
              )}
            </div>
            {transactions?.length !== 0 && (
              <div
                style={{ flexDirection: "column", alignItems: "end" }}
                className="displaying"
              >
                <p style={{ marginBottom: "15px" }}>
                  {transactions.length !== 0 && (
                    <p>
                      Displaying{" "}
                      {7 * pageNum >
                      transactions?.filter(
                        (item) => item.status === 1 && item.amount !== 0
                      ).length
                        ? transactions?.filter(
                            (item) => item.status === 1 && item.amount !== 0
                          ).length
                        : 7 * pageNum}{" "}
                      out of{" "}
                      {
                        transactions?.filter(
                          (item) => item.status === 1 && item.amount !== 0
                        ).length
                      }
                    </p>
                  )}
                </p>
                <div className="displayNumber">
                  <svg
                    onClick={() => {
                      pageNum !== 1 && setpageNum((p) => p - 1);
                      pageNum !== 1 && settransactionStart((p) => p - 6);
                      pageNum !== 1 && settransactionEnd((p) => p - 6);
                    }}
                    width="24"
                    height="24"
                    fill="none"
                  >
                    <path
                      d="M15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2Z"
                      stroke="#80B5FF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.2598 8.46979L9.73977 11.9998L13.2598 15.5298"
                      stroke="#80B5FF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {pages.length !== 0 && (
                    <div className="d-flex justify-between align-center">
                      <p
                        onClick={(e) => {
                          setpageNum(parseInt(e.target.innerHTML));
                          settransactionEnd(parseInt(e.target.innerHTML * 6));
                          settransactionStart(
                            parseInt(e.target.innerHTML * 6 - 6)
                          );
                        }}
                        className={"pointer " + (pageNum === 1 && "one")}
                      >
                        1
                      </p>
                      {pageNum >= 4 && pageNum > 1 && <p>...</p>}

                      {pageNum > 2
                        ? pages
                            .slice(pageNum - 2, pageNum + 2)
                            .filter((item) => item != 1 && item != pages.length)
                            .map((item, index) => (
                              <div key={index}>
                                <p
                                  index={item}
                                  className={
                                    "pointer " + (pageNum === item && "one")
                                  }
                                  onClick={(e) => {
                                    setpageNum(parseInt(e.target.innerHTML));
                                    settransactionEnd(
                                      parseInt(e.target.innerHTML * 6)
                                    );
                                    settransactionStart(
                                      parseInt(e.target.innerHTML * 6 - 6)
                                    );
                                  }}
                                >
                                  {item}
                                </p>
                              </div>
                            ))
                        : pages
                            .slice(pageNum - 1, pageNum + 2)
                            .filter((item) => item != 1 && item != pages.length)
                            .map((item, index) => (
                              <p
                                key={index}
                                index={item}
                                className={
                                  "pointer " + (pageNum === item && "one")
                                }
                                onClick={(e) => {
                                  setpageNum(parseInt(e.target.innerHTML));
                                  settransactionEnd(
                                    parseInt(e.target.innerHTML * 6)
                                  );
                                  settransactionStart(
                                    parseInt(e.target.innerHTML * 6 - 6)
                                  );
                                }}
                              >
                                {item}
                              </p>
                            ))}
                      {pageNum <= 4 && pageNum > 1 && <p>...</p>}

                      <p
                        onClick={(e) => {
                          setpageNum(parseInt(e.target.innerHTML));
                          settransactionEnd(parseInt(e.target.innerHTML * 6));
                          settransactionStart(
                            parseInt(e.target.innerHTML * 6 - 6)
                          );
                        }}
                        className={
                          "pointer " + (pageNum === pages.length && "one")
                        }
                      >
                        {pages.length > 1 && pages.length}
                      </p>
                    </div>
                  )}

                  <svg
                    onClick={() => {
                      pageNum !== pages.length && setpageNum((p) => p + 1);
                      pageNum !== pages.length &&
                        settransactionStart((p) => p + 6);
                      pageNum !== pages.length &&
                        settransactionEnd((p) => p + 6);
                    }}
                    width="24"
                    height="24"
                    fill="none"
                  >
                    <path
                      d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                      stroke="#80B5FF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.7402 15.5302L14.2602 12.0002L10.7402 8.47021"
                      stroke="#80B5FF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
          <div className="col-12 col-lg-24 col-sm-24">
            <div className="chart-box">
              <h1 className="historyH1">Monitoring grafigi</h1>
              <div className="d-flex">
                <p className="indicators bg-blue">Tushumlar</p>
                <p className="indicators bg-red">Chiqimlar</p>
              </div>
              <AreaChart
                style={{ margin: "30px auto 0" }}
                width={areaWidth}
                height={250}
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#006AFF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#006AFF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF2B23" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#EF2B23" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#006AFF"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
                <Area
                  type="monotone"
                  dataKey="pv"
                  stroke="#EF2B23"
                  fillOpacity={1}
                  fill="url(#colorPv)"
                />
              </AreaChart>
            </div>
          </div>
          {/* --------------------------------- */}
        </div>

        {/* ----------------------------------- */}
      </div>
    </div>
  );
}

export default Finance;
