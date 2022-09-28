import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "../../Apis/api";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import "./withdraw.css";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import { StateContext } from "../../context/Context";

import Switch from "@mui/material/Switch";

export default function Withdraw(props) {
  const [amout, setAmount] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState(false);
  const [expire, setExpire] = useState("");
  const { balance, setbalanceToggle, balanceToggle } = useContext(StateContext);
  const [trId, setTrid] = useState("");
  const [saveCard, setsaveCard] = useState(false);
  const [savedCardUID, setSavedCardUID] = useState(false);

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const transfer = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_KEY}/api/v1/wallet/withdraw`,
          {
            number: savedCardUID ? savedCardUID : cardNum.replace(/ /g, ""),
            expire: expire.replace(/\//g, ""),
            amount: amout,
            is_saved_card: savedCardUID ? true : false,
          },
          {
            headers,
          }
        )
        .then((res) => {
          console.log(res);
          setAlert(true);
          setTrid(res.data.result.tr_id);
          setError(false);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  };

  const checkingCard = (num) => {
    if (num === "9") {
      return (
        <svg
          className="eye uzcard"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.7503 0.0855112C14.5192 0.155247 14.1414 0.38803 13.9108 0.602885L13.4916 0.993634L13.7982 1.21851C14.1902 1.50621 14.304 2.5891 14.1593 4.65521L14.0542 6.15467H10.5847H7.11526V5.48046C7.11526 4.13797 7.54749 1.55745 7.93807 0.567311C8.01644 0.368831 7.9581 0.350197 7.53617 0.438849C5.74803 0.814493 4.71651 2.07666 4.19705 4.52463C3.20951 9.17817 5.02537 15.0131 7.84619 16.2503C8.69716 16.6236 8.78758 16.4182 8.28496 15.2541C7.77638 14.0759 7.3099 11.9316 7.17332 10.1426L7.07361 8.83683H10.5779H14.0821V11.9495C14.0821 15.1928 14.1716 15.7359 14.7417 15.9487C14.8709 15.9968 15.4967 16.0363 16.1325 16.0363C17.1662 16.0363 17.326 15.9998 17.6445 15.6898C17.6445 15.6898 17.9739 15.3226 17.9739 15.1312C17.9739 13.0093 18 8.87848 18 8.87848C17.9996 4.8671 17.9424 2.21458 17.8493 1.88877C17.4781 0.588487 15.9776 -0.284486 14.7503 0.0855112ZM2.76494 4.01925C1.53385 5.29455 1.11395 7.0316 1.4456 9.47632C1.80134 12.0986 2.95319 14.5623 4.52666 16.0665C5.40477 16.906 5.29795 16.9923 4.26193 16.2804C3.14753 15.5148 1.95447 13.6762 1.24806 11.636C1.05212 11.0701 0.826137 10.5859 0.745729 10.5598C0.665321 10.5337 0.458639 10.781 0.286356 11.1093C-0.693203 12.9768 0.953136 16.1413 3.50951 17.3048C4.98937 17.9783 6.62613 18.183 7.69583 17.8283C8.50688 17.5592 8.45013 17.1508 7.55896 16.8429C4.80621 15.892 2.77031 11.4011 2.93737 6.64876C2.98962 5.161 3.0619 4.68259 3.31865 4.12117C3.49282 3.74045 3.60052 3.39501 3.55784 3.35351C3.51517 3.31201 3.15842 3.61156 2.76494 4.01925Z"
            fill="#1C1C1C"
          />
        </svg>
      );
    } else if (num === "8") {
      return (
        <svg
          width="16"
          height="20"
          className="eye uzcard"
          viewBox="0 0 16 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.9996 10.6212C15.9996 13.5244 15.3361 15.6879 14.0104 17.0977C12.6847 18.5074 10.6362 19.212 7.87459 19.212C5.29438 19.212 3.33686 18.5072 2.00202 17.0977C0.667186 15.6882 -0.000155548 13.5624 2.71952e-08 10.7203V1.18515C0.000307575 1.07784 0.0430567 0.975008 0.118914 0.899107C0.194771 0.823206 0.297576 0.780399 0.404884 0.780029H5.08334C5.19069 0.780337 5.29356 0.823118 5.36946 0.899025C5.44537 0.974933 5.48815 1.0778 5.48846 1.18515V10.9287C5.48846 12.0892 5.70315 12.9823 6.14001 13.6124C6.35683 13.8998 6.63642 14.134 6.95746 14.297C7.2785 14.46 7.63251 14.5475 7.99252 14.5529C8.35252 14.5583 8.709 14.4814 9.03479 14.3281C9.36058 14.1749 9.64706 13.9492 9.87241 13.6684C10.2995 13.0772 10.5123 12.206 10.5109 11.0548V9.23009H15.9996V10.6212Z"
            fill="#1C1C1C"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.5757 8.16433H10.5117V1.20428C10.512 1.09186 10.5568 0.984126 10.6363 0.90463C10.7158 0.825134 10.8235 0.780337 10.936 0.780029H11.6939C11.6947 1.92128 12.1487 3.01551 12.9559 3.82221C13.7632 4.62891 14.8578 5.08207 15.999 5.08207H16.0002V8.16433H15.5757Z"
            fill="#1C1C1C"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.7725 0.780029H15.5758C15.6883 0.780337 15.796 0.825134 15.8755 0.90463C15.955 0.984126 15.9998 1.09186 16.0001 1.20428V4.01117C15.1441 4.01117 14.3231 3.67111 13.7178 3.06581C13.1125 2.46051 12.7725 1.63955 12.7725 0.78353V0.780029Z"
            fill="#F4821F"
          />
        </svg>
      );
    } else if (num === "5") {
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="eye uzcard"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.29688 7.20752H14.7046V16.8183H9.29688V7.20752Z"
            fill="#FF5F00"
          />
          <path
            d="M9.63958 12.0127C9.63958 10.0601 10.5666 8.32805 11.9915 7.20734C10.9443 6.39231 9.62245 5.8999 8.18039 5.8999C4.76393 5.8999 2 8.63366 2 12.0127C2 15.3918 4.76393 18.1256 8.18031 18.1256C9.62237 18.1256 10.9442 17.6332 11.9915 16.8181C10.5666 15.7144 9.63958 13.9654 9.63958 12.0127Z"
            fill="#EB001B"
          />
          <path
            d="M21.9993 12.0127C21.9993 15.3918 19.2353 18.1256 15.819 18.1256C14.3769 18.1256 13.055 17.6332 12.0078 16.8181C13.4499 15.6974 14.3598 13.9654 14.3598 12.0127C14.3598 10.0601 13.4327 8.32805 12.0078 7.20734C13.055 6.39231 14.3769 5.8999 15.819 5.8999C19.2353 5.8999 21.9993 8.65068 21.9993 12.0127H21.9993Z"
            fill="#F79E1B"
          />
        </svg>
      );
    } else if (num === "4") {
      return (
        <svg
          width="24"
          className="eye uzcard"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.4241 8.91992C15.6295 8.95851 15.8349 8.99473 16.0398 9.0357C16.1983 9.06716 16.399 9.07132 16.491 9.18175C16.5901 9.29931 16.4756 9.48574 16.4542 9.64189C16.4227 9.87106 16.3723 10.0985 16.3414 10.3282C16.3265 10.4369 16.3058 10.4588 16.1947 10.4114C15.7126 10.2059 15.2097 10.1228 14.6867 10.1905C14.5151 10.2125 14.3512 10.2605 14.2111 10.368C13.9843 10.5414 13.9724 10.7795 14.182 10.9736C14.3625 11.1398 14.5846 11.2408 14.8013 11.3476C15.0952 11.4919 15.3932 11.6291 15.6544 11.8315C16.396 12.4045 16.5213 13.3289 15.9572 14.0817C15.6004 14.5573 15.0993 14.8013 14.5382 14.9414C14.3423 14.9907 14.1428 15.0204 13.9416 15.0394C13.9089 15.043 13.8691 15.0299 13.8483 15.0709H13.7872C13.6979 15.0473 13.604 15.0473 13.5147 15.0709H13.4238C13.3448 15.0461 13.26 15.0461 13.181 15.0709H13.1204C12.8847 15.0014 12.636 15.0062 12.3973 14.9521C12.1898 14.9092 11.985 14.8541 11.784 14.7871C11.7098 14.761 11.6807 14.72 11.6949 14.6404C11.7602 14.2676 11.8232 13.8947 11.8843 13.5219C11.9045 13.3984 11.9728 13.4435 12.0363 13.4732C12.4899 13.6863 12.9649 13.8068 13.4672 13.8223C13.7367 13.8306 14.0027 13.8128 14.2521 13.6988C14.6819 13.5029 14.7259 13.1086 14.3506 12.8266C14.1428 12.6711 13.9047 12.5707 13.6732 12.4591C13.4223 12.3402 13.1841 12.196 12.9625 12.0286C12.1159 11.3839 12.2542 10.4458 12.7155 9.86335C13.0486 9.4418 13.5028 9.21144 14.0086 9.06835C14.2087 9.01195 14.4124 8.9787 14.6178 8.95317C14.6552 8.94842 14.7009 8.96504 14.727 8.91992H14.7567C14.8577 8.94426 14.9586 8.94426 15.0595 8.91992H15.1207C15.2115 8.94367 15.3024 8.94367 15.3932 8.91992H15.4241Z"
            fill="#00579F"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 9.04095C2.89652 9.04095 3.79304 9.03323 4.68956 9.04213C5.08735 9.04629 5.30109 9.23153 5.38065 9.60854C5.55699 10.4398 5.72798 11.2727 5.90075 12.1051C5.9055 12.1289 5.90313 12.155 5.90431 12.18C5.80041 12.1776 5.77904 12.0885 5.74579 12.0196C5.59244 11.6971 5.40152 11.3938 5.177 11.116C4.83227 10.6956 4.42017 10.3352 3.9575 10.0497C3.85803 9.99185 3.77217 9.91328 3.70576 9.81931C3.17141 9.51058 2.59906 9.30337 2 9.16206V9.04095Z"
            fill="#F1A839"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.061 8.91992C15.0137 8.94265 14.962 8.95446 14.9096 8.95446C14.8572 8.95446 14.8054 8.94265 14.7582 8.91992H15.061ZM15.3917 8.91992C15.3503 8.94269 15.3038 8.95462 15.2566 8.95462C15.2094 8.95462 15.1629 8.94269 15.1215 8.91992H15.3917ZM13.5155 15.0709C13.5569 15.048 13.6033 15.036 13.6506 15.036C13.6978 15.036 13.7443 15.048 13.7857 15.0709H13.5155ZM13.1824 15.0709C13.2186 15.049 13.2601 15.0374 13.3024 15.0374C13.3447 15.0374 13.3861 15.049 13.4223 15.0709H13.1824ZM3.70605 9.81882C4.65957 10.3437 5.3946 11.0757 5.85117 12.0732C5.8672 12.1094 5.88679 12.1444 5.90461 12.18L6.09994 13.0439C6.15278 12.9982 6.16109 12.937 6.18128 12.8854C6.66828 11.6461 7.15315 10.406 7.6359 9.16513C7.67212 9.07073 7.71605 9.03273 7.82055 9.03392C8.30027 9.03985 8.78 9.03867 9.25913 9.03392C9.37372 9.03332 9.39806 9.05529 9.34997 9.16691C8.53301 11.0609 7.71783 12.9566 6.90503 14.8524C6.87 14.9349 6.82309 14.9652 6.73463 14.964C6.24501 14.9601 5.75537 14.9602 5.26576 14.9646C5.16364 14.9658 5.12624 14.923 5.1013 14.8328C4.6376 13.1615 4.17153 11.4901 3.70605 9.81882ZM9.86473 14.9753C9.64208 14.9753 9.41944 14.9705 9.19798 14.9777C9.08339 14.9812 9.04658 14.9509 9.06736 14.831C9.24191 13.8276 9.41172 12.8225 9.58271 11.8179C9.73114 10.9475 9.88373 10.0777 10.0262 9.20669C10.0476 9.07785 10.088 9.02976 10.2251 9.03273C10.6585 9.04223 11.0931 9.03867 11.5277 9.03451C11.6382 9.03332 11.6768 9.05351 11.6554 9.17819C11.3318 11.0573 11.0118 12.9376 10.6953 14.818C10.6746 14.9403 10.63 14.9866 10.5006 14.9789C10.2892 14.967 10.0767 14.9753 9.86473 14.9753ZM21.8888 14.1298C21.6133 12.8884 21.3372 11.6475 21.0659 10.4054C20.9786 10.0058 20.8919 9.60626 20.7981 9.20847C20.7488 9.00186 20.718 8.98048 20.5102 8.98048C20.1314 8.98048 19.7526 8.98523 19.3744 8.9787C18.9647 8.97158 18.6767 9.1491 18.5141 9.52255C18.2445 10.1424 17.9667 10.7593 17.6953 11.3779C17.3284 12.2139 16.9567 13.0481 16.5898 13.884C16.4539 14.1934 16.303 14.4967 16.1879 14.8144C16.1344 14.9628 16.1819 15.0246 16.3381 15.0252C16.8178 15.0263 17.2969 15.0228 17.7767 15.0275C17.8907 15.0287 17.953 14.9818 17.9957 14.8821C18.0731 14.7011 18.1436 14.5173 18.2071 14.3311C18.2534 14.1957 18.3348 14.1399 18.4761 14.1405C18.9962 14.1435 19.5163 14.1405 20.0358 14.1423C20.2186 14.1435 20.2495 14.172 20.2893 14.3537C20.3267 14.5258 20.3641 14.6986 20.4063 14.8702C20.433 14.98 20.4876 15.0293 20.6063 15.0275C21.0202 15.0228 21.434 15.0258 21.8478 15.0258C21.9036 15.0258 21.9606 15.0311 22.0004 14.98V14.9195C21.9511 14.6582 21.9464 14.3911 21.8888 14.1298ZM19.9016 12.8658C19.5436 12.8599 19.1856 12.8599 18.8275 12.8658C18.7136 12.8676 18.7041 12.8325 18.7421 12.737C18.9279 12.2685 19.109 11.7989 19.2912 11.3292C19.3708 11.1244 19.4486 10.9196 19.527 10.7147L19.5679 10.7207C19.6807 11.2372 19.7947 11.7532 19.9069 12.2691C19.9402 12.4217 19.9663 12.5761 20.0079 12.7263C20.0376 12.8331 20.0174 12.8676 19.9016 12.8658Z"
            fill="#00579F"
          />
        </svg>
      );
    } else {
      return null;
    }
  };

  const confirmTransfer = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_KEY}/api/v1/wallet/confirm-withdraw`,
          {
            tr_id: trId,
          },
          { headers }
        )
        .then((res) => {
          setError(false);
          setbalanceToggle(!balanceToggle);
          setCardNum("");
          setExpire("");
          setAmount("");
          console.log(res);
          setbalanceToggle(!balanceToggle);
        })
        .catch((err) => {
          setError(true);
          console.log(err);
        });
    } catch (error) {}
  };

  return (
    <div className="paymentOne">
      <div className="container">
        <div className="rowGrid">
          <div className="col-10 col-lg-10 col-sm-24">
            <div className="cardBalans">
              <div className="icon">
                <div className="img">{/* <img src={Cart} alt="...." /> */}</div>
                <div className="uzs">
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="25" cy="25.5" r="25" fill="#BFDAFF" />
                    <path
                      d="M31.04 27.05C30.62 27.46 30.38 28.05 30.44 28.68C30.53 29.76 31.52 30.55 32.6 30.55H34.5V31.74C34.5 33.81 32.81 35.5 30.74 35.5H19.26C17.19 35.5 15.5 33.81 15.5 31.74V25.01C15.5 22.94 17.19 21.25 19.26 21.25H30.74C32.81 21.25 34.5 22.94 34.5 25.01V26.45H32.48C31.92 26.45 31.41 26.67 31.04 27.05Z"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.5 25.9103V21.3403C15.5 20.1503 16.23 19.0903 17.34 18.6703L25.28 15.6703C26.52 15.2003 27.85 16.1203 27.85 17.4503V21.2503"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M35.5588 27.4702V29.5302C35.5588 30.0802 35.1188 30.5302 34.5588 30.5502H32.5988C31.5188 30.5502 30.5288 29.7602 30.4388 28.6802C30.3788 28.0502 30.6188 27.4602 31.0388 27.0502C31.4088 26.6702 31.9188 26.4502 32.4788 26.4502H34.5588C35.1188 26.4702 35.5588 26.9202 35.5588 27.4702Z"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20 25.5H27"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="smSvg">
                    <p>Hisobdagi joriy balans</p>
                    <h1>
                      {" "}
                      {balance
                        ? balance
                            .toLocaleString("uz-UZ", {
                              style: "currency",
                              currency: "UZS",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })
                            .replace(",", " ")
                        : 0}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="rowGrid">
              {props.savedCards.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    savedCardUID === item.card_uuid
                      ? setCardNum("")
                      : setCardNum(item.card_number);
                    savedCardUID === item.card_uuid
                      ? setExpire("")
                      : setExpire(
                          item.expire
                            .replace(/[^0-9]/g, "")
                            .replace(/^([2-9])$/g, "0$1")
                            .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
                            .replace(
                              /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g,
                              "$1/$2"
                            )
                        );
                    savedCardUID === item.card_uuid
                      ? setSavedCardUID(false)
                      : setSavedCardUID(item.card_uuid);
                    console.log(item);
                  }}
                  className={`savedCart col-24`}
                >
                  <div
                    className={`fl-row lifetime  ${
                      savedCardUID === item.card_uuid && "activeSavedCard"
                    }`}
                  >
                    <div className="saved">
                      <h1>
                        {item.card_number?.slice(0, 4)} **** ****{" "}
                        {item.card_number.slice(12)}
                      </h1>
                      <p className="text">Amal qilish muddati</p>
                      <p>
                        {item.expire?.slice(0, 2) +
                          "/" +
                          item.expire?.slice(2, 4)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-14 col-lg-14 col-sm-24">
            <div className="cardRegister">
              <h1 className="smPay">Hisobdan pul yechish</h1>
              {error ? (
                <p className="error-messageee">Tizimda muammo yuzaga keldi</p>
              ) : null}
              <form action="" className="account">
                <div className="password">
                  <TextField
                    className="inputs"
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: "15px",
                        height: "70px",
                        border: "2px solid #D9D9D9",
                      },
                      "& .MuiOutlinedInput-input": {
                        height: "70px",
                        padding: "0 0 0 25px",
                        marginTop: "-2px",
                      },
                      "& .MuiInputLabel-root": {
                        top: "4px",
                      },
                      "& .MuiInputLabel-shrink": {
                        top: "0",
                        left: "2px",
                      },
                    }}
                    type="number"
                    label="To'ldirish miqdori"
                    variant="outlined"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <h1 className="eye">UZS</h1>
                </div>
                <p
                  style={{
                    color: "gray",
                    marginBottom: "15px",
                    fontSize: "14px",
                  }}
                >
                  Komissiya foizi: 1.5%{" "}
                </p>
                <div className="password">
                  <TextField
                    className="inputs"
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: "15px",
                        height: "70px",
                        border: "2px solid #D9D9D9",
                      },
                      "& .MuiOutlinedInput-input": {
                        height: "70px",
                        padding: "0 0 0 25px",
                        marginTop: "-2px",
                        fontWeight: "600",
                      },
                      "& .MuiInputLabel-root": {
                        top: "4px",
                      },
                      "& .MuiInputLabel-shrink": {
                        top: "0",
                        left: "2px",
                      },
                    }}
                    type="text"
                    label="Karta raqami"
                    variant="outlined"
                    onChange={(e) => {
                      let res = e.target.value
                        .replace(/[^\dA-Z]/g, "")
                        .replace(/(.{4})/g, "$1 ")
                        .trim();
                      res.length > 20 ? e.preventDefault() : setCardNum(res);
                    }}
                    value={cardNum}
                    disabled={savedCardUID && true}
                  />
                  {checkingCard(cardNum.slice(0, 1))}
                </div>

                <TextField
                  className="inputs"
                  sx={{
                    width: "100%",
                    marginBottom: "44px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      height: "70px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "70px",
                      padding: "0 0 0 25px",
                      marginTop: "-2px",
                    },
                    "& .MuiInputLabel-root": {
                      top: "4px",
                    },
                    "& .MuiInputLabel-shrink": {
                      top: "0",
                      left: "2px",
                    },
                  }}
                  label="Amal qilish muddati"
                  variant="outlined"
                  placeholder="mm/yy"
                  onChange={(e) => {
                    let res = e.target.value
                      .replace(/[^0-9]/g, "")
                      .replace(/^([2-9])$/g, "0$1")
                      .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
                      .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, "$1/$2");
                    setExpire(res);
                  }}
                  value={expire}
                  type="text"
                  disabled={savedCardUID && true}
                />
                <Switch
                  onChange={(e) => setsaveCard(e.target.checked)}
                  id="switchie"
                  {...label}
                  defaultChecked={saveCard}
                  disabled={savedCardUID && true}
                />
                <label htmlFor="switchie">Kartani saqlab qolish</label>
              </form>
              <button
                className="fillBtn"
                onClick={() => {
                  setAlert(true);
                  transfer();
                }}
              >
                Yechib olish
              </button>
            </div>
          </div>
        </div>
        <Alert
          className={alert ? "alert animation" : "alert"}
          severity="success"
        >
          <p>
            Siz{" "}
            <strong>
              {cardNum.slice(0, 4)} **** **** {cardNum.slice(14)}
            </strong>{" "}
            raqamli kartasiga{" "}
            <strong>{parseInt(amout) + parseInt(amout) * 0.015}</strong> UZS
            o’tkazmoqdasiz
          </p>
          <Button
            sx={{
              width: "100%",
              height: "50px",
              borderRadius: "15px",
              backgroundColor: "#80B5FF;",
              fontFamily: "sans-serif",
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "20px",
              lineHeight: "24px",
              textTransform: "none",
              marginTop: " 30px",
            }}
            variant="contained"
            className="btn"
            onClick={() => {
              setAlert(false);
              confirmTransfer();
            }}
          >
            O’tkazmani tasdiqlash
          </Button>
        </Alert>
      </div>
    </div>
  );
}
