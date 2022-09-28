import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../../context/Context";
import MyCourseList from "../../components/MyCoursesList/mycoursesList";
import NavbarDemo from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "../../pages/SpeakerMyCourses/SpMycourses.css";
import axios from "../../Apis/api";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import SidebarSm from "../../components/Sidebar/SidebarSm";
import NavbarSm from "../../components/Navbar/NavbarSm";
export default function MyEnrolledCourses(props) {
  const { navStretch } = useContext(StateContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_API_KEY}/api/v1/courses/enrolled-courses/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        )
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <div className="spMycourses">
      <NavbarDemo />
      <Sidebar active={2} />
      <SidebarSm active={2} />
      <NavbarSm />
      <div className="container">
        <div className={navStretch ? "courses ml-240" : "courses ml-100"}>
          {data.length != 0 && (
            <h1 className="headerText">O'qiyotgan kurslarim</h1>
          )}
          <MyCourseList datas={data} />
        </div>
      </div>
    </div>
  );
}
