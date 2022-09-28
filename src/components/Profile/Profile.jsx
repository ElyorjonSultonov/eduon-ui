import React, { useContext, useEffect } from "react";
// import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";

import "./Profile.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box1 from "@mui/material/Box";
import { StateContext } from "../../context/Context";
import ProfileInfo from "./ProfileInfo";
import ProfileSecurity from "../ProfileSecurity/ProfileSecurity";
import ProfilePrivacy from "../ProfilePrivacy/ProfilePrivacy";
import SidebarActive from "../Sidebar/SidebarActive";
import Sidebar from "../Sidebar/Sidebar";
import NavbarDemo from "../Navbar/Navbar";
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
        <Box1 sx={{ p: 3 }}>
          <div>{children}</div>
        </Box1>
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

function Profile() {
  const { navStretch } = useContext(StateContext);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <>
      <NavbarDemo />
      <NavbarSm />
      <Sidebar />
      <div className={navStretch ? "courses ml-240" : "courses ml-100"}>
        <div className="profile_container container">
          <Box1 sx={{ width: "100%" }}>
            <Box1 sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Foydalanuvchi ma'lumotlari" {...a11yProps(0)} />
                <Tab label="Xavfsizlik" {...a11yProps(1)} />
                <Tab label="Maxfiylik" {...a11yProps(2)} />
              </Tabs>
            </Box1>
            <TabPanel value={value} index={0}>
              <ProfileInfo />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ProfileSecurity />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <ProfilePrivacy />
            </TabPanel>
          </Box1>
        </div>
      </div>
    </>
  );
}

export default Profile;
