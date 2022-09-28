import React, { useContext, useEffect } from "react";
import { StateContext } from "../../context/Context";
import FavoriteCourses from "../FavoriteCourses/FavoriteCourses";
import Footer from "../Footers/Footer";
import NavbarDemo from "../Navbar/Navbar";
import NavbarSm from "../Navbar/NavbarSm";
import Sidebar from "../Sidebar/Sidebar";
// import SidebarActive from "../Sidebar/SidebarActive";
import SidebarSm from "../Sidebar/SidebarSm";
import "./favourites.css";

export default function Favourites() {
  const { navStretch } = useContext(StateContext);
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <div className="favoritesPage">
      <NavbarSm />
      <NavbarDemo />
      <Sidebar active={3} />
      <SidebarSm active={3} />
      <div className={navStretch ? "courses ml-240" : "courses ml-100"}>
        <FavoriteCourses />
      </div>
      <Footer />
    </div>
  );
}
