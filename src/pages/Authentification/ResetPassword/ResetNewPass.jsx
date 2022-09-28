import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../Login/Login.css";
import VisibilityOutlinedIcon from "../../../assets/icons/eye.png";
import VisibilityOffOutlinedIcon from "../../../assets/icons/eye-slash.png";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import { StateContext } from "../../../context/Context";
import ReportIcon from "@mui/icons-material/Report";
import NavbarFalse from "../../../components/NavbarFalse/NavbarFalse";
import axios from "../../../Apis/api";
import PasswordChecklist from "react-password-checklist";
import NavbarSm from "../../../components/Navbar/NavbarSm";

export default function ResetNewPass() {
  const { navStretch, token } = useContext(StateContext);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // INPUT VALUES

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordIsValid, setPasswordIsValid] = useState(false);
  // const [passwordError, setpasswordError] = useState(false)
  // const [password1Error, setpassword1Error] = useState(false)

  // ------------

  const sendddata = async () => {
    try {
      axios
        .put(
          `${process.env.REACT_APP_API_KEY}/api/v1/accounts/forgot-password`,
          {
            password: password,
            password2: confirmPassword,
          },
          {
            headers: {
              Authorization: passwordIsValid ? `Bearer ${token}` : null,
            },
          }
        )
        .then((res) => {
          navigate("/login");
        });
    } catch (error) {}
  };

  return (
    <>
      <NavbarFalse />
      <NavbarSm />
      <div className="Login fio">
        <div className="container container-setNewPass">
          <h1 className="login-title">Yangi parolni kiriting</h1>
          <div className="rowGrid">
            <div className="col-24">
              <div className="passwordFio">
                <TextField
                  className="inputs"
                  sx={{
                    width: "100%",
                    marginBottom: "20px",
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
                  onChange={(e) => setPassword(e.target.value)}
                  type={!show ? "password" : "text"}
                  label="Yangi parolni kiritish"
                  variant="outlined"
                />
                {!show ? (
                  <img
                    src={VisibilityOutlinedIcon}
                    onClick={() => setShow(!show)}
                    className="eye"
                    alt="...."
                  />
                ) : (
                  <img
                    src={VisibilityOffOutlinedIcon}
                    onClick={() => setShow(!show)}
                    className="eye eyeSlash"
                    alt="...."
                  />
                )}
              </div>
              {/* {passwordError ? <p className="error-messageee"><ReportIcon style={{ marginRight: "10px", }} />Parolni kiritish majburiy</p> : null} */}
            </div>
          </div>
          <div className="rowGrid">
            <div className="col-24">
              <div className="passwordFio">
                <TextField
                  className="inputs"
                  sx={{
                    width: "100%",
                    marginBottom: "20px",
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
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  variant="outlined"
                />
                {!showConfirm ? (
                  <img
                    src={VisibilityOutlinedIcon}
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="eye"
                    alt="...."
                  />
                ) : (
                  <img
                    src={VisibilityOffOutlinedIcon}
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="eye eyeSlash"
                    alt="...."
                  />
                )}
              </div>
              <PasswordChecklist
                rules={["minLength", "specialChar", "lowercase", "match"]}
                minLength={5}
                value={password}
                valueAgain={confirmPassword}
                onChange={(isValid) => {
                  isValid
                    ? setPasswordIsValid(true)
                    : setPasswordIsValid(false);
                }}
                messages={{
                  minLength: "Parol uzunligi 8 tadan ko'p!",
                  specialChar:
                    "Parol o'z ichiga kamida bitta maxsus xarakter oladi! ($, %, @, &...)",
                  lowercase: "Parol o'z ichiga kamida bitta kichik harf oladi",
                  match: "Parollar bir biriga mos!",
                }}
              />
              {/* {passwordError ? <p className="error-messageee"><ReportIcon style={{ marginRight: "10px", }} />Parollar mos emas</p> : null} */}
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
                  marginTop: "24px",
                }}
                variant="contained"
                className="btn continueBtn"
                type="button"
                onClick={sendddata}
              >
                Davom etish
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
