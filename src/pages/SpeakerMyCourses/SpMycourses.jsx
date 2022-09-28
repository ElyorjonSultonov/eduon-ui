import React, { useContext, useEffect } from "react";

import { StateContext } from "../../context/Context";
import UploadedCourses from "../../components/UploadedCourses/UploadedCourses";
import NavbarDemo from "../../components/Navbar/Navbar";
import SidebarActive from "../../components/Sidebar/SidebarActive";
import "./SpMycourses.css";
import NavbarSm from "../../components/Navbar/NavbarSm";
import SidebarSm from "../../components/Sidebar/SidebarSm";

export default function SpMycourses(props) {
  const { navStretch } = useContext(StateContext);

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  const { user } = props;
  return (
    <div className="spMycourses">
      <NavbarDemo />
      <NavbarSm />
      <SidebarActive active={2} />
      <SidebarSm active={2} />

      <div className="container">
        <div className={navStretch ? "courses ml-240" : "courses ml-100"}>
          <h1 className="headerText">Yuklagan kurslarim</h1>
          <UploadedCourses user={user} />
        </div>
      </div>
    </div>
  );
}
