import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AddMoney from "../AddMoney/addMoney";
import { StateContext } from "../../context/Context";
import Withdraw from "../Withdraw/withdraw";
import axios from "../../Apis/api";
import SidebarActive from "../Sidebar/SidebarActive";
import NavbarDemo from "../Navbar/Navbar";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import NavbarSm from "../Navbar/NavbarSm";
import "./moneyOperation.css";
import { useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
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
export default function MoneyOperations() {
  const { navStretch, loggedIn, balanceToggle } = useContext(StateContext);
  const [value, setValue] = React.useState(0);
  const [dataCards, setdataCards] = useState("");
  const [savedCards, setsavedCards] = useState([]);
  const [status, setStatus] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      loggedIn &&
        axios
          .get(`${process.env.REACT_APP_API_KEY}/api/v1/wallet/info`, {
            headers,
          })
          .then((res) => setdataCards(res.data.result))
          .catch((err) => {
            refresh(err.response.status, err.response.status.text);
          });
    } catch (error) {}
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v1/wallet/card`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
        .then((res) => {
          setsavedCards(res.data);
        })
        .catch((err) => {});
    } catch (error) {}
  }, [balanceToggle]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    setStatus(JSON.parse(localStorage.getItem("status")));
  }, [location]);

  return (
    <div className="moneyOperations">
      <NavbarDemo />
      <NavbarSm />
      {status ? <SidebarActive /> : <Sidebar />}
      <div
        className={
          navStretch ? "courses mt-100 ml-240" : "courses mt-100 ml-100"
        }
      >
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Hisobni to'ldirish" {...a11yProps(0)} />
              <Tab label="Pul yechib olish" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <AddMoney datas={dataCards} savedCards={savedCards} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Withdraw datas={dataCards} savedCards={savedCards} />
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}
