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

export default function ResetPassword() {
  const { setToken } = useContext(StateContext);

  const [mobile, setMobile] = useState("");

  const navigate = useNavigate();
  const [check, setcheck] = useState(true);

  const sendddata = async () => {
    mobile.length >= 10 ? setcheck(true) : setcheck(false);
    try {
      await axios
        .post(`${process.env.REACT_APP_API_KEY}/api/v1/accounts/step-one/`, {
          mobile: mobile.length >= 10 ? mobile : null,
        })
        .then((res) => {
          setToken(res.data.otp_generated);
        });
      mobile.length >= 10
        ? navigate("/resetVerify")
        : navigate("/resetPassword");
    } catch (error) {}
  };
  return (
    <>
      <NavbarFalse />
      <NavbarSm />
      <div className="Login Register">
        <div className="container">
          <h1 className="login-title">Parolni tiklash</h1>
          <form action="">
            <div className="rowGrid">
              <div className="col-24">
                <div className="phoneInputBox">
                  <p className="label"></p>
                  <PhoneInput
                    country={"uz"}
                    onChange={(phone) => setMobile(phone)}
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
              Tasdiqlash kodini yuborish
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
