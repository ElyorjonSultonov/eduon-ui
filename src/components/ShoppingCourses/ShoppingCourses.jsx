import axios from "../../Apis/api";
import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../../context/Context";
import "./ShoppingCourses.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footers/Footer";
import NavbarDemo from "../Navbar/Navbar";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import NavbarSm from "../Navbar/NavbarSm";
import image from "../../assets/images/Rectangle 1.png";

function ShoppingCourses(props) {
  const [cartItems, setCartItems] = useState([]);
  const [overallCost, setOverallCost] = useState(0);
  const { navStretch, balance, loggedIn } = useContext(StateContext);
  const [buyCourses, setBuyCourse] = useState("");
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
  }, [buyCourses]);

  const buyCourse = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_KEY}/api/v1/orders/payment-proceed`,
          null,
          {
            headers,
          }
        )
        .then((res) => {
          setBuyCourse(res.data.eduon);
          navigate("/myEnrolledCourses");
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
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
        <div className="shoppingCourses">
          <div className="container">
            <h1>Kurs xarid qilish</h1>
            <div className="rowGrid nowrap justify-lg-end">
              <div className="col-7 col-sm-24 hisob">
                <p>Hisobdagi joriy balans</p>
                <div className="carta">
                  <h1>
                    {balance
                      ? balance.toLocaleString("uz-UZ", {
                          style: "currency",
                          currency: "UZS",
                        })
                      : 0}
                  </h1>
                </div>
                <button
                  onClick={() => navigate("/moneyOperations")}
                  className="pointer cartaBtn"
                >
                  Balansni to’ldirish
                </button>
              </div>
              <div className="col-12 hisob col-lg-17 col-sm-24 mb-lg-30">
                <p>Xarid xulosasi</p>
                {cartItems.length > 0 ? (
                  <div className="purchaseSummary">
                    {cartItems.map((item, index) => (
                      <div key={index} className="summary">
                        <div className="summaryImg">
                          <img
                            src={
                              item.course.cover_img
                                ? `${process.env.REACT_APP_API_KEY}${item.course.cover_img}`
                                : image
                            }
                            alt="jpg"
                          />
                          <h1>{item.course.name}</h1>
                        </div>
                        <h1>
                          {item.course.discount_price
                            ? (
                                item.course.price - item.course.discount_price
                              ).toLocaleString("uz-UZ", {
                                style: "currency",
                                currency: "UZS",
                              })
                            : item.course.price.toLocaleString("uz-UZ", {
                                style: "currency",
                                currency: "UZS",
                              })}
                        </h1>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="col-6 col-lg-9 col-sm-24">
                <div className="shoppingTotoal">
                  <h2>Jami:</h2>
                  <h1>
                    {overallCost.toLocaleString("uz-UZ", {
                      style: "currency",
                      currency: "UZS",
                    })}{" "}
                  </h1>
                  <button onClick={buyCourse}>Xarid qilish</button>
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

export default ShoppingCourses;
