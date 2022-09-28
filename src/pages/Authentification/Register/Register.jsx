import React, { useContext, useEffect, useState } from "react";
import "../Login/Login.css";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { StateContext } from "../../../context/Context";
import axios from "../../../Apis/api";
import ReportIcon from "@mui/icons-material/Report";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import NavbarFalse from "../../../components/NavbarFalse/NavbarFalse";
import NavbarSm from "../../../components/Navbar/NavbarSm";

export default function Register() {
  const { phoneNumber, setPhoneNumber, setToken, token } =
    useContext(StateContext);

  const [check, setcheck] = useState(true);
  const navigate = useNavigate();
  const sendddata = async () => {
    phoneNumber.length >= 10 ? setcheck(true) : setcheck(false);
    const formData = new FormData();
    formData.append("mobile", phoneNumber);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_KEY}/api/v1/accounts/step-one/`,
          formData
        )
        .then((res) => {
          setToken(res.data.otp_generated);
          phoneNumber.length >= 10
            ? navigate("/verify")
            : navigate("/register");
          localStorage.setItem("mobile", phoneNumber);
        })
        .catch((err) => {});
    } catch (error) {}
  };
  return (
    <>
      <NavbarFalse />
      <NavbarSm />
      <div className="Login Register">
        <div className="container">
          <h1 className="login-title">Ro'yxatdan o'tish</h1>
          <form action="">
            <div className="rowGrid">
              <div className="col-24">
                <div className="phoneInputBox">
                  <p className="label"></p>
                  <PhoneInput
                    country={"uz"}
                    value={phoneNumber}
                    onChange={(phone) => setPhoneNumber(phone)}
                  />
                </div>
              </div>
            </div>
            {check ? null : (
              <p className="error-messageee">
                <ReportIcon style={{ marginRight: "10px" }} /> Telefon raqami
                noto'g'ri kiritildi
              </p>
            )}
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
          <div className="box_line">
            <div className="line"></div>
            <p>yoki</p>
            <div className="line"></div>
          </div>
          <p className="sign-up">
            Akkountingiz bormi? Unda Akkauntingizga{" "}
            <Link to="/login">
              <span> kiring</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
