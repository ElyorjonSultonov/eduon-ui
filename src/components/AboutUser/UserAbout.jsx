import React, { useContext, useEffect, useState } from "react";
import "./UserAbout.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import UserCourses from "../UserCourses/UserCourses";
import DownloadedCourses from "../DownloadedCourses/DownloadedCourses";
import FavoriteCourses from "../FavoriteCourses/FavoriteCourses";
import { StateContext } from "../../context/Context";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "../../Apis/api";
import SidebarActive from "../Sidebar/SidebarActive";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footers/Footer";
import NavbarDemo from "../Navbar/Navbar";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import NavbarSm from "../Navbar/NavbarSm";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function UserAbout(props) {
  const { navStretch, responseData, setresponseData, loggedIn } =
    useContext(StateContext);
  const [value, setValue] = useState(0);
  const [status, setStatus] = useState(null);
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
    setStatus(JSON.parse(localStorage.getItem("status")));
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <NavbarSm />
      <NavbarDemo />
      {status ? <SidebarActive active={3} /> : <Sidebar />}
      <div className={navStretch ? "courses ml-240" : "courses ml-100"}>
        <div className="UserAbout container">
          <div className="headrow rowGrid">
            <div className="avatar col-18 col-sm-24">
              {responseData.profile_picture ? (
                <img
                  src={`${process.env.REACT_APP_API_KEY}${responseData.profile_picture}`}
                  className="avatar"
                  alt="...."
                />
              ) : (
                <AccountCircleIcon className="avatar" />
              )}

              <div className="avInfo">
                <div>
                  <h3 className="mb-20">Foydalanuvchi</h3>
                  <h1 className="userName mb-20">
                    {responseData.f_name} {responseData.l_name}
                  </h1>
                  {responseData.speciality && (
                    <p className="d-flex bolder mb-20">
                      <span className="mr-10">Kasbi:</span>{" "}
                      {responseData.speciality}
                    </p>
                  )}
                  <p className="d-flex bolder mb-20">
                    <span className="weight-normal mr-10">Bog'lanish: </span>{" "}
                    {responseData.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="aboutMe rowGrid">
            <div className="col-24">
              <h3>Men haqimda</h3>
            </div>
            <div className="aboutMeInfo col-24">
              <p>{responseData.about_me}</p>
            </div>
          </div>
          <div className="UserCards rowGrid">
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Mening kurslarim" {...a11yProps(0)} />
                  <Tab label="Yuklagan kurslarim" {...a11yProps(1)} />
                  <Tab label="Sevimli kurslarim" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <UserCourses />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <DownloadedCourses />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <FavoriteCourses />
              </TabPanel>
            </Box>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default UserAbout;
