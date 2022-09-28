import React, { useContext, useEffect, useState } from "react";
import Statistics from "../../components/Statistics/statistics";
import "./speaker.css";
import { StateContext } from "../../context/Context";
import SidebarActive from "../../components/Sidebar/SidebarActive";
import Sidebar from "../../components/Sidebar/Sidebar";
import NavbarDemo from "../../components/Navbar/Navbar";
import NavbarSm from "../../components/Navbar/NavbarSm";
import SidebarSm from "../../components/Sidebar/SidebarSm";
import { useLocation } from "react-router-dom";

export default function Speaker(props) {
  const { navStretch, statusChange } = useContext(StateContext);
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);
  const location = useLocation();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    localStorage.setItem("status", true);
    setStatus(JSON.parse(localStorage.getItem("status")));
  }, [location, statusChange]);
  return (
    <div className="speaker">
      <NavbarDemo />
      <NavbarSm />
      <SidebarSm active={0} />
      <SidebarActive active={1} />
      <div className={navStretch ? "courses ml-240" : "courses ml-100"}>
        <Statistics user={props.user} />
      </div>
    </div>
  );
}
