import React, { useState } from "react";
import { Link } from "react-router-dom";
import Popover from "@mui/material/Popover";

export default function NavbarProfile(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { loggedIn, userInfo, AccountCircleIcon, ProfileMenu } = props;
  return (
    <div>
      {loggedIn ? (
        userInfo.avatar ? (
          <img
            aria-describedby={id}
            onClick={handleClick}
            src={`${process.env.REACT_APP_API_KEY}${userInfo.avatar}`}
            className="avatar pointer"
            alt="..."
          />
        ) : (
          <AccountCircleIcon
            aria-describedby={id}
            onClick={handleClick}
            className="avatar pointer"
          />
        )
      ) : (
        <Link to="/login">
          <button className="bgBlue pointer">boshlash</button>
        </Link>
      )}
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
            width: "352px",
            marginTop: "20px",
            marginRight: "40px",
            height: "auto",
          },
        }}
      >
        <ProfileMenu
          img={userInfo.avatar}
          name={userInfo.name}
          surname={userInfo.surname}
          mobile={userInfo.mobile}
          isSpeaker={userInfo.isSpeaker}
        />
      </Popover>
    </div>
  );
}
