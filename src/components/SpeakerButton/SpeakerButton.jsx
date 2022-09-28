import React, { useContext, useEffect, useState } from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import "./SpeakerButton.css";
import { useNavigate } from "react-router-dom";
import axios from "../../Apis/api";
import { StateContext } from "../../context/Context";
import { Alert } from "@mui/material";

export default function SpeakerButton(props) {
  const navigate = useNavigate();

  const { loggedIn } = useContext(StateContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [alertError, setAlertError] = useState(false);
  const { userInfo } = props;

  useEffect(() => {
    alertError
      ? setTimeout(() => {
          setAlertError(false);
        }, 2000)
      : setAlertError(false);
  }, [alertError]);
  const handleClick = (event) => {
    userInfo.isSpeaker
      ? navigate("/speaker")
      : setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const becomeSpeaker = async () => {
    handleClose();
    if (loggedIn) {
      setTimeout(() => {
        navigate("/speaker");
      }, 2000);
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      };
      try {
        await axios
          .put(
            `${process.env.REACT_APP_API_KEY}/api/v1/accounts/become-speaker`,
            { is_speaker: true },
            { headers }
          )
          .then((res) => {
            setAlertError(true);
          });
      } catch (error) {}
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="courseDownload">
      <div
        className="speakerButton"
        aria-describedby={id}
        onClick={handleClick}
      >
        <p>Spiker</p>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        disableScrollLock={true}
        sx={{
          "& .MuiPaper-root": {
            background: "#fcfcfc",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
            borderRadius: "15px",
            // position: "absolute",
            // top: "0px",
            // left: "0",
            width: "300px",
            padding: "30px",
            marginTop: "20px",
          },
        }}
      >
        <div className="speakerPopover" sx={{ p: "2" }}>
          <p>Eduon Platformasida Onlayn bilim ulashish</p>
          <p>Ushbu havola orqali siz Eduon platformasida spikerga aylanasiz.</p>
          <div className="rowGrid">
            <div className="col-24">
              <Button
                sx={{
                  width: "100%",
                  height: "40px",
                  borderRadius: "15px",
                  backgroundColor: "#80B5FF;",
                  fontFamily: "sans-serif",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "18px",
                  lineHeight: "29px",
                  textTransform: "none",
                  marginTop: "15px",
                }}
                variant="contained"
                className="btn"
                onClick={becomeSpeaker}
              >
                Batafsil
              </Button>
            </div>
          </div>
        </div>
      </Popover>
      <Alert
        className={alertError ? "alert animation" : "alert"}
        severity="success"
      >
        <strong>Siz spikerga aylandingiz!</strong>
      </Alert>
    </div>
  );
}
