import axios from "../../Apis/api";
import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../../context/Context";
import "./ShoppingCart.css";
import SidebarActive from "../Sidebar/SidebarActive";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footers/Footer";
import NavbarDemo from "../Navbar/Navbar";
import CartImg from "../../assets/images/Rectangle 7.png";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import { useNavigate } from "react-router-dom";
import NavbarSm from "../Navbar/NavbarSm";
import SidebarSm from "../Sidebar/SidebarSm";
function ShoppingCart() {
  const { navStretch, isremoved, setIsRemoved, loggedIn } =
    useContext(StateContext);
  const [cartItems, setCartItems] = useState([]);
  const [overallCost, setOverallCost] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      loggedIn &&
        axios
          .get(`${process.env.REACT_APP_API_KEY}/api/v1/orders/cart`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          })
          .then((res) => {
            setCartItems(res.data.items);
            setOverallCost(res.data.total);
          })
          .catch((err) => {
            refresh(err.response.status, err.response.status.text);
          });
    } catch (error) {}
  }, [isremoved]);

  const deleteFromCart = (e, id) => {
    e.preventDefault();
    try {
      loggedIn &&
        axios
          .delete(
            `${process.env.REACT_APP_API_KEY}/api/v1/orders/cart-remove/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          )
          .then((res) => {
            setIsRemoved(!isremoved);
          });
    } catch (error) {}
  };
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <>
      <NavbarSm />
      <NavbarDemo />
      <Sidebar />
      <SidebarSm active={4} />
      <div className={navStretch ? "courses ml-240" : "courses ml-100"}>
        <div className="shoppingCart">
          <div className="container">
            <h1 className="xarid">Xarid savati</h1>
            <p className="savat">
              Savatda{" "}
              {cartItems.length > 0
                ? `${cartItems.length} ta kurs mavjud`
                : "kurs mavjud emas"}{" "}
            </p>
            <div className="rowGrid fl-lg-column">
              <div className="col-18 col-lg-24 col-sm-24">
                {cartItems.length > 0 ? (
                  <div className="cards">
                    {cartItems.map((item, index) => (
                      <div key={index} className="cartItems">
                        <div className="cardOne">
                          <div className="cardsBody">
                            <div className="imgCard">
                              <img
                                src={
                                  item.course.cover_img
                                    ? `${process.env.REACT_APP_API_KEY}${item.course.cover_img}`
                                    : CartImg
                                }
                                alt="..."
                              />
                            </div>
                            <div className="cardsTitle">
                              <h1
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  navigate(`/chosenCourse/${item.course.id}`);
                                }}
                              >
                                {item.course.name}
                              </h1>
                              <p
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  navigate(
                                    `/speakerAbout/${item.course.course_owner.id}`
                                  );
                                }}
                              >
                                {item.course.course_owner.full_name}
                              </p>
                              <div className="star">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M13.7289 3.51001L15.4889 7.03001C15.7289 7.52001 16.3689 7.99001 16.9089 8.08001L20.0989 8.61001C22.1389 8.95001 22.6189 10.43 21.1489 11.89L18.6689 14.37C18.2489 14.79 18.0189 15.6 18.1489 16.18L18.8589 19.25C19.4189 21.68 18.1289 22.62 15.9789 21.35L12.9889 19.58C12.4489 19.26 11.5589 19.26 11.0089 19.58L8.01893 21.35C5.87893 22.62 4.57893 21.67 5.13893 19.25L5.84893 16.18C5.97893 15.6 5.74893 14.79 5.32893 14.37L2.84893 11.89C1.38893 10.43 1.85893 8.95001 3.89893 8.61001L7.08893 8.08001C7.61893 7.99001 8.25893 7.52001 8.49893 7.03001L10.2589 3.51001C11.2189 1.60001 12.7789 1.60001 13.7289 3.51001Z"
                                    fill="#006AFF"
                                    stroke="#006AFF"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <h2>
                                  {item.course.course_rating.rating}
                                  <span>
                                    {" "}
                                    ({item.course.course_rating.voters_number})
                                  </span>
                                </h2>
                              </div>
                              <p>
                                Jami{" "}
                                {item.course
                                  ? new Date(
                                      item.course.course_duration
                                        ? item.course.course_duration * 1000
                                        : 0
                                    )
                                      .toISOString()
                                      .substring(11, 19)
                                  : null}{" "}
                                | {item.course.video_count} ma'ruza
                              </p>
                            </div>
                          </div>
                          <div className="UZS">
                            <h1>
                              {console.log(item.price)}
                              {console.log(item)}
                              {item.price
                                ? item.discount_price
                                  ? (
                                      item.price - item.discount_price
                                    ).toLocaleString("uz-UZ", {
                                      style: "currency",
                                      currency: "UZS",
                                    })
                                  : item.price.toLocaleString("uz-UZ", {
                                      style: "currency",
                                      currency: "UZS",
                                    })
                                : 0}
                            </h1>
                            <p
                              className="pointer"
                              onClick={(e) => deleteFromCart(e, item.id)}
                            >
                              Savatdan o’chirish
                            </p>
                          </div>
                        </div>
                        <div className="divider"></div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="col-6 col-lg-8 mb-lg- col-sm-24">
                <div className="cardTotal">
                  <h2>Jami:</h2>
                  <h1>
                    {overallCost
                      ? overallCost.toLocaleString("uz-UZ", {
                          style: "currency",
                          currency: "UZS",
                        })
                      : 0}
                  </h1>
                  <button onClick={() => navigate("/buy")}>Xarid qilish</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ShoppingCart;
