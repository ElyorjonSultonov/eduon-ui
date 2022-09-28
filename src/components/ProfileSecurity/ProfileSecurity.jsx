import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "../../Apis/api";
// import VisibilityOutlinedIcon from "../../assets/icons/eye.png";
// import VisibilityOffOutlinedIcon from "../../assets/icons/eye-slash.png";
import "./ProfileSecurity.css";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../context/Context";

export default function ProfileSecurity() {
  const {loggedIn} = useContext(StateContext)
  const [show, setShow] = useState(false);
  const [shownew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [responseData, setresponseData] = useState("");
  const [oldPasswordError, setoldPasswordError] = useState("");
  const [newPasswordError, setnewPasswordError] = useState("");
  const [passWordConfirmError, setpassWordConfirmError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    try {
      loggedIn &&
        axios
          .get(`${process.env.REACT_APP_API_KEY}/api/v1/accounts/profile`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          })
          .then((res) => {
            setresponseData(res.data);
          })
          .catch((err) => {
            refresh(err.response.status, err.response.status.text);
          });
    } catch (error) {}
  }, []);
  const sendddata = async () => {
    try {
      await axios
        .put(
          `${process.env.REACT_APP_API_KEY}/api/v1/accounts/change-password`,
          {
            old_password: oldPassword,
            password: passwordNew,
            password2: passwordConfirm,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        )
        .then((res) => {
          setoldPasswordError("");
          setnewPasswordError("");
          setpassWordConfirmError("");
          window.location.reload();
        })
        .catch((err) => {
          err.response.data.old_password
            ? setoldPasswordError("Joriy parol xato kiritildi!")
            : setoldPasswordError("");
          err.response.data.password
            ? setnewPasswordError(
                "Parol raqamlar, kichik harflar va maxsus belgilardan tashkil topishi kerak!"
              )
            : setnewPasswordError("");
          passwordNew !== passwordConfirm
            ? setpassWordConfirmError("Parollar bir biriga mos emas!")
            : setpassWordConfirmError("");
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  };

  return (
    <div className="security">
      <h1 className="secTitle">Parolni o'zgartirish</h1>
      <div className="rowGrid">
        <div className="col-8 col-sm-24 passwordFio">
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
                padding: "0 55px 0 25px",
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
            type={!show ? "password" : "text"}
            label="Joriy parol"
            variant="outlined"
            onChange={(e) => setOldPassword(e.target.value)}
          />
          {!show ? (
            <svg
              width="24"
              className="eye"
              onClick={() => setShow(!show)}
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                stroke="#999999"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                stroke="#999999"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="24"
              className="eye eyeSlash"
              onClick={() => setShow(!show)}
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.5299 9.47004L9.46992 14.53C8.81992 13.88 8.41992 12.99 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C12.9899 8.42004 13.8799 8.82004 14.5299 9.47004Z"
                stroke="#999999"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.8198 5.76998C16.0698 4.44998 14.0698 3.72998 11.9998 3.72998C8.46984 3.72998 5.17984 5.80998 2.88984 9.40998C1.98984 10.82 1.98984 13.19 2.88984 14.6C3.67984 15.84 4.59984 16.91 5.59984 17.77"
                stroke="#999999"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.41992 19.5301C9.55992 20.0101 10.7699 20.2701 11.9999 20.2701C15.5299 20.2701 18.8199 18.1901 21.1099 14.5901C22.0099 13.1801 22.0099 10.8101 21.1099 9.40005C20.7799 8.88005 20.4199 8.39005 20.0499 7.93005"
                stroke="#999999"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.5095 12.7C15.2495 14.11 14.0995 15.26 12.6895 15.52"
                stroke="#999999"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.47 14.53L2 22"
                stroke="#999999"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21.9993 2L14.5293 9.47"
                stroke="#999999"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          )}
          <p
            style={{ marginTop: "0 !important" }}
            className="error-messageee col-24"
          >
            {oldPasswordError}
          </p>
        </div>
        <div className="col-8 col-sm-24 passwordFio">
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
                padding: "0 55px 0 25px",
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
            type={!shownew ? "password" : "text"}
            label="Yangi parolni kiriting"
            variant="outlined"
            onChange={(e) => setPasswordNew(e.target.value)}
          />
          {!shownew ? (
            <svg
              width="24"
              className="eye"
              onClick={() => setShowNew(!shownew)}
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                stroke="#999999"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                stroke="#999999"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="24"
              className="eye eyeSlash"
              onClick={() => setShowNew(!shownew)}
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.5299 9.47004L9.46992 14.53C8.81992 13.88 8.41992 12.99 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C12.9899 8.42004 13.8799 8.82004 14.5299 9.47004Z"
                stroke="#999999"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.8198 5.76998C16.0698 4.44998 14.0698 3.72998 11.9998 3.72998C8.46984 3.72998 5.17984 5.80998 2.88984 9.40998C1.98984 10.82 1.98984 13.19 2.88984 14.6C3.67984 15.84 4.59984 16.91 5.59984 17.77"
                stroke="#999999"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.41992 19.5301C9.55992 20.0101 10.7699 20.2701 11.9999 20.2701C15.5299 20.2701 18.8199 18.1901 21.1099 14.5901C22.0099 13.1801 22.0099 10.8101 21.1099 9.40005C20.7799 8.88005 20.4199 8.39005 20.0499 7.93005"
                stroke="#999999"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.5095 12.7C15.2495 14.11 14.0995 15.26 12.6895 15.52"
                stroke="#999999"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.47 14.53L2 22"
                stroke="#999999"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21.9993 2L14.5293 9.47"
                stroke="#999999"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          )}
          <p
            style={{ marginTop: "0 !important" }}
            className="error-messageee col-24"
          >
            {newPasswordError}
          </p>
        </div>
        <div className="col-8 col-sm-24 passwordFio">
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
                padding: "0 55px 0 25px",
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
            type={!showConfirm ? "password" : "text"}
            label="Parolni tasdiqlash"
            variant="outlined"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          {!showConfirm ? (
            <svg
              width="24"
              className="eye"
              onClick={() => setShowConfirm(!showConfirm)}
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
                stroke="#999999"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
                stroke="#999999"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="24"
              className="eye eyeSlash"
              onClick={() => setShowConfirm(!showConfirm)}
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.5299 9.47004L9.46992 14.53C8.81992 13.88 8.41992 12.99 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C12.9899 8.42004 13.8799 8.82004 14.5299 9.47004Z"
                stroke="#999999"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.8198 5.76998C16.0698 4.44998 14.0698 3.72998 11.9998 3.72998C8.46984 3.72998 5.17984 5.80998 2.88984 9.40998C1.98984 10.82 1.98984 13.19 2.88984 14.6C3.67984 15.84 4.59984 16.91 5.59984 17.77"
                stroke="#999999"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.41992 19.5301C9.55992 20.0101 10.7699 20.2701 11.9999 20.2701C15.5299 20.2701 18.8199 18.1901 21.1099 14.5901C22.0099 13.1801 22.0099 10.8101 21.1099 9.40005C20.7799 8.88005 20.4199 8.39005 20.0499 7.93005"
                stroke="#999999"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.5095 12.7C15.2495 14.11 14.0995 15.26 12.6895 15.52"
                stroke="#999999"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.47 14.53L2 22"
                stroke="#999999"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21.9993 2L14.5293 9.47"
                stroke="#999999"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          )}
          <p
            style={{ marginTop: "0 !important" }}
            className="error-messageee col-24"
          >
            {passWordConfirmError}
          </p>
        </div>
      </div>
      <Button
        sx={{
          width: "180px",
          height: "55px",
          borderRadius: "15px",
          backgroundColor: "#80B5FF;",
          fontFamily: "sans-serif",
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "16px",
          lineHeight: "29px",
          textTransform: "none",
        }}
        variant="contained"
        className="btn"
        onClick={sendddata}
      >
        Saqlash
      </Button>
    </div>
  );
}
