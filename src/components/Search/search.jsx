import { Popover } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarSm from "../Navbar/NavbarSm";
import SidebarSm from "../Sidebar/SidebarSm";
import "./search.css";
import {
  price,
  price_title,
  pTitle_typography,
  filter_title,
  input,
  label,
  svg,
} from "../Navbar/NavbarStyles";
import { useContext } from "react";
import { StateContext } from "../../context/Context";

export default function Search() {
  const { filterPriceValue, setFilterPriceValue } = useContext(StateContext);
  const [searchValue, setSearchValue] = useState("");
  const [anchorElFilter, setAnchorElFilter] = React.useState(null);

  const navigate = useNavigate();

  const search = (e) => {
    e.preventDefault();
    navigate(`/search/${searchValue}`);
  };
  const openFilter = Boolean(anchorElFilter);
  const idFilter = openFilter ? "simple-popover-filter" : undefined;
  const handleCloseFilter = () => {
    setAnchorElFilter(null);
  };
  const navigateToFilter = (e) => {
    setFilterPriceValue(e.target.value);
    navigate(`/courses/filter/course ${e.target.value}`);
  };
  const handleClickFilter = (event) => {
    setAnchorElFilter(event.currentTarget);
  };

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <div className="searchPageComp">
      <NavbarSm />
      <SidebarSm active={1} />
      <div className="container">
        <div className="rowGrid">
          <div className="col-sm-block col-sm-24">
            <form onSubmit={search} id="searchBox">
              <div className="search">
                <label htmlFor="search" className="pointer searchIcon">
                  <svg width="24" height="24" fill="none">
                    <path
                      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                      stroke="#999999"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 22L20 20"
                      stroke="#999999"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </label>
                <button
                  aria-describedby={idFilter}
                  onClick={handleClickFilter}
                  style={{
                    zIndex: "5",
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    outline: "none",
                  }}
                >
                  <svg
                    // className="filterButton"
                    width="24"
                    height="24"
                    fill="none"
                  >
                    <path
                      d="M3 7H21"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M6 12H18"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10 17H14"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                <Popover
                  id={idFilter}
                  open={openFilter}
                  anchorEl={anchorElFilter}
                  onClose={handleCloseFilter}
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
                      width: "100%",
                      padding: "30px",
                      marginTop: "20px",
                      overflowY: "visible",
                      height: "auto",
                    },
                  }}
                >
                  <div style={price}>
                    <h1 style={filter_title}>
                      Narx
                      <svg width="18" height="9" fill="none">
                        <path
                          d="M16.9201 0.949997L10.4001 7.47C9.63008 8.24 8.37008 8.24 7.60008 7.47L1.08008 0.949997"
                          stroke="#999999"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </h1>
                    <div style={price_title}>
                      <label for="increment">
                        <p style={pTitle_typography}>
                          Narx yuqorilab borish bo'yicha
                        </p>
                      </label>
                      <div>
                        <label style={label} for="increment">
                          {" "}
                          {filterPriceValue === "+price" && (
                            <svg style={svg} width="10" height="8" fill="none">
                              <path
                                d="M0.75 4L3.58 6.83L9.25 1.17"
                                stroke="#006AFF"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </label>
                        <input
                          style={input}
                          type="radio"
                          name="price"
                          id="increment"
                          value="+price"
                          onChange={(e) => {
                            navigateToFilter(e);
                          }}
                        />
                      </div>
                    </div>
                    <div style={price_title}>
                      <label for="decrement">
                        <p style={pTitle_typography}>
                          Narx pastlab borish bo’yicha
                        </p>
                      </label>
                      <div>
                        <label style={label} for="decrement">
                          {filterPriceValue === "-price" && (
                            <svg style={svg} width="10" height="8" fill="none">
                              <path
                                d="M0.75 4L3.58 6.83L9.25 1.17"
                                stroke="#006AFF"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </label>
                        <input
                          style={input}
                          type="radio"
                          name="price"
                          id="decrement"
                          value="-price"
                          onChange={(e) => {
                            navigateToFilter(e);
                          }}
                        />
                      </div>
                    </div>
                    <div style={price_title}>
                      <label for="free">
                        <p style={pTitle_typography}>Bepul kurslar</p>
                      </label>
                      <div>
                        <label style={label} for="free">
                          {filterPriceValue === "free" && (
                            <svg style={svg} width="10" height="8" fill="none">
                              <path
                                d="M0.75 4L3.58 6.83L9.25 1.17"
                                stroke="#006AFF"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </label>
                        <input
                          style={input}
                          type="radio"
                          name="price"
                          id="free"
                          value="free"
                          onChange={(e) => {
                            navigateToFilter(e);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Popover>
                <input
                  onChange={(e) => setSearchValue(e.target.value)}
                  id="search"
                  type="text"
                  placeholder="Qidirish..."
                  value={searchValue}
                />
              </div>

              {/* {searchValue && searchResponse.length != 0 && (
                  <div className="searchResponse">
                    {searchResponse.map((item) => (
                      <div
                        onClick={() => navigate(`/chosenCourse/${item.id}`)}
                        className="rowGrid pointer"
                      >
                        <img
                          className="col-8"
                          src={`${process.env.REACT_APP_API_KEY}${item.cover_img}`}
                          alt=""
                        />
                        <div className="col-16">
                          <p className="name">
                            {item.name.length > 25
                              ? item.name.slice(0, 24) + "..."
                              : item.name}
                          </p>
                          <p className="teacher">
                            {item.course_owner.full_name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )} */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
