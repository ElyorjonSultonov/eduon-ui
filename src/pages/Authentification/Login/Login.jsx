import React, { useState, useContext, useEffect } from "react";
import "./Login.css";
import TextField from "@mui/material/TextField";
import VisibilityOutlinedIcon from "../../../assets/icons/eye.png";
import VisibilityOffOutlinedIcon from "../../../assets/icons/eye-slash.png";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import { StateContext } from "../../../context/Context";
import ReportIcon from "@mui/icons-material/Report";

import axios from "../../../Apis/api";
import PhoneInput from "react-phone-input-2";
import NavbarFalse from "../../../components/NavbarFalse/NavbarFalse";
import NavbarSm from "../../../components/Navbar/NavbarSm";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "4px solid #006aff",
  borderRadius: "15px",
  boxShadow: 24,
  p: 5,
};

export default function Login() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [number, setnumber] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [check, setChek] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { setPhoneNumber } = useContext(StateContext);
  useEffect(() => {
    setPhoneNumber(number);
  }, [number]);

  const sendddata = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_API_KEY}/api/v1/accounts/login/`,
        {
          phone_number: number,
          password: password,
        }
      );
      localStorage.setItem("access", data.data.access);
      localStorage.setItem("refresh", data.data.refresh);
      data.data.access ? navigate("/") : navigate("/login");
      window.location.reload();
    } catch (error) {
      setError(true);
      handleOpen();
    }
    // saveSystems()
  };

  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("check")) &&
      localStorage.hasOwnProperty("num") &&
      localStorage.hasOwnProperty("pass")
    ) {
      setnumber(localStorage.getItem("num"));
      setpassword(localStorage.getItem("pass"));
      setChek(true);
    } else {
      localStorage.removeItem("num");
      localStorage.removeItem("pass");
    }
  }, []);
  const saveSystems = () => {
    setChek(localStorage.setItem("check", check));
    setChek(localStorage.getItem("check"));

    if (JSON.parse(check) && number && password) {
      localStorage.setItem("num", number);
      localStorage.setItem("pass", password);
    }
  };

  return (
    <>
      <NavbarFalse />
      <NavbarSm />
      <div className="Login">
        <div className="container">
          <h1 className="login-title">Profilga kirish</h1>
          <form onSubmit={sendddata}>
            <div className="phoneInputBox">
              <PhoneInput
                country={"uz"}
                // value={storageLogDetails?storageLogDetails: number}
                value={
                  localStorage.getItem("storageMobile")
                    ? localStorage.getItem("storageMobile")
                    : number
                }
                onChange={(phone) => setnumber(phone)}
                id="phone"
              />
            </div>
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
                value={password}
                type={!show ? "password" : "text"}
                label="Parolingizni kiriting"
                variant="outlined"
                onChange={(e) => setpassword(e.target.value)}
              />
              {!show ? (
                <img
                  src={VisibilityOutlinedIcon}
                  onClick={() => setShow(!show)}
                  className="eye"
                  alt="..."
                />
              ) : (
                <img
                  src={VisibilityOffOutlinedIcon}
                  onClick={() => setShow(!show)}
                  className="eye eyeSlash"
                  alt="..."
                />
              )}
            </div>
            {error ? (
              <p className="error-messageee">
                <ReportIcon style={{ marginRight: "10px" }} /> Telefon raqami
                yoki parol xato kiritilgan{" "}
              </p>
            ) : null}
            <div className="technicSights">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Tizimda eslab qolish"
                  sx={{
                    "& .MuiTypography-root": {
                      fontFamily: "sans-serif",
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "16px",
                      lineHeight: "19px",
                    },
                  }}
                  onChange={(e) => {
                    setChek(e.target.checked);
                  }}
                  checked={check}
                />
              </FormGroup>
              <p
                onClick={() => navigate("/resetPassword")}
                className="forgot pointer"
              >
                Parolingizni unutdingizmi
              </p>
            </div>
            <Button
              onClick={(e) => {
                sendddata(e);
                saveSystems();
              }}
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
            >
              Tizimga kirish
            </Button>
          </form>

          <div className="box_line">
            <div className="line"></div>
            <p>yoki</p>
            <div className="line"></div>
          </div>
          <p className="sign-up">
            Akkauntingiz yo'qmi? Unda{" "}
            <Link to="/register">
              <span> Ro'yxatdan o'ting</span>
            </Link>
          </p>
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style} className="container">
              <div className="rowGrid">
                <p style={{ color: "#1c1c1c" }} className="col-24">
                  Akkauntingiz yo'qmi? Unda
                </p>
                <div className="col-24">
                  <Button
                    sx={{
                      width: "100%",
                      marginTop: "20px",
                      backgroundColor: "#80B5FF",
                      borderRadius: "15px",
                      height: "59px",
                      color: "white",
                      fontSize: "20px",
                      fontWeight: "500",
                    }}
                    className="btn"
                    onClick={() => navigate("/register")}
                  >
                    Ro'yxatdan o'ting
                  </Button>
                </div>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
}
