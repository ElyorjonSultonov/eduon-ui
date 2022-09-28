import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "../Login/Login.css";
import "../Register/SmsVerify.css";
import { useNavigate } from "react-router-dom";
import OTPInput from "otp-input-react";
import { StateContext } from "../../../context/Context";
import ReportIcon from "@mui/icons-material/Report";
import NavbarFalse from "../../../components/NavbarFalse/NavbarFalse";
import axios from "../../../Apis/api";
import NavbarSm from "../../../components/Navbar/NavbarSm";

export default function ResetVerify() {
  const [OTP, setOTP] = useState("");
  const { navStretch, phoneNumber, token, setToken } = useContext(StateContext);
  const [dataInfo, setDataInfo] = useState("");
  const [check, setCheck] = useState(false);
  const [message, setMessage] = useState();
  const [sec, setSec] = useState(60);
  const [otpError, setOtpError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (sec > 0) {
        setSec(sec - 1);
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  });

  const sendddata = async () => {
    try {
      await axios
        .post(`${process.env.REACT_APP_API_KEY}/api/v1/accounts/step-two/`, {
          otp: OTP,
          otp_token: token,
        })
        .then((res) => {
          setToken(res.data.jwt_token.access);

          setDataInfo(res.data);
          res.data.jwt_token.access
            ? navigate("/setNewPassword")
            : navigate("/resetVerify");
          res.data.jwt_token.access ? setOtpError(false) : setOtpError(true);
        })
        .catch((err) => {
          setOtpError(true);
        });
      setCheck(true);
    } catch (error) {}
  };

  return (
    <>
      <NavbarFalse />
      <NavbarSm />
      <div className="Login Verify">
        <div className="container">
          <h1 className="login-title">Tasdiqlash kodi</h1>
          <form action="">
            <p className="phone-number">
              {phoneNumber
                ? `  +${phoneNumber.slice(0, 5)}  ***-**-${phoneNumber.slice(
                    10,
                    12
                  )} raqamingizga tasdiqlash kodi yuborildi`
                : null}
            </p>
            <div className="wrapper">
              <OTPInput
                value={OTP}
                onChange={setOTP}
                autoFocus
                OTPLength={5}
                otpType="number"
                disabled={false}
                type="number"
              />
            </div>
            {dataInfo ? (
              dataInfo.jwt_token ? (
                <p className="error-messageee">
                  <ReportIcon style={{ marginRight: "10px" }} />
                  Bu akkaunt ro'yxatdan o'tgan
                </p>
              ) : (
                <p className="error-messageee">
                  <ReportIcon style={{ marginRight: "10px" }} />
                  Kod xato kiritilgan
                </p>
              )
            ) : null}
            <div className="resendMsg">
              <p>Tasdiqlash kodini qayta yuborish </p>
              <span>{sec < 10 ? `00 : 0${sec}` : `00:${sec}`}</span>
            </div>
            {otpError ? (
              <p className="error-messageee">
                <ReportIcon style={{ marginRight: "10px" }} />
                Tasdiqlash kodi xato kiritildi
              </p>
            ) : null}
            <Button
              sx={{
                width: "100%",
                height: "70px",
                borderRadius: "15px",
                backgroundColor: "#80B5FF;",
                fontFamily: "sans-serif",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: "24px",
                lineHeight: "29px",
                textTransform: "none",
                marginBottom: "44px",
              }}
              variant="contained"
              className="btn"
              onClick={sendddata}
            >
              Davom etish
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
