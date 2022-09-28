import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../context/Context";
import "./CoursesPopup.css";

export default function CoursesPopup(props) {
  const { index, name, listStyle, id, courseCategories, handleClose } = props;
  const [subMenu, setsubMenu] = useState(false);
  const [shows, setShows] = useState(false);
  const [sub, setSub] = useState([]);
  const { setSubCategoryId } = useContext(StateContext);

  const navigate = useNavigate();

  const show = () => {
    setsubMenu(true);
  };

  useEffect(() => {
    const filteredSub = courseCategories.filter(
      (item) => item.name === name
    )[0];
    setSub(filteredSub);
  }, [id]);

  function hide() {
    setTimeout(() => {
      setsubMenu(false);
    }, 100);
  }

  const subcategoryChoose = (e, id, name) => {
    setSubCategoryId(id);
    navigate(`/subCourses/${id}`);
    handleClose();
  };

  return (
    <>
      <li
        onMouseLeave={hide}
        onMouseOver={name == "Barchasi" ? null : () => show()}
        key={index}
        style={listStyle}
        id="title"
        class="title"
        onClick={name === "Barchasi" ? (e) => navigate("/") : null}
      >
        {name}
        <svg width="9" height="18" fill="none">
          <path
            d="M0.910034 16.92L7.43003 10.4C8.20003 9.62999 8.20003 8.36999 7.43003 7.59999L0.910034 1.07999"
            stroke="#1C1C1C"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {subMenu || shows ? (
          <ul
            onMouseOver={() => {
              setShows(true);
            }}
            onMouseLeave={() => {
              setShows(false);
            }}
            class="subMenu"
          >
            {sub.subcategory.length !== 0
              ? sub.subcategory.map((subs, key) => (
                  <li
                    onClick={(e) => subcategoryChoose(e, subs.id, subs.name)}
                    key={key}
                  >
                    {subs.name}
                  </li>
                ))
              : null}
          </ul>
        ) : null}
      </li>
    </>
  );
}
