import axios from "../../Apis/api";
import React, { useContext, useEffect, useState } from "react";
import "./FavoriteCourses.css";
import { useNavigate } from "react-router-dom";
// import courseImg from "./img/Rectangle 7.png";
import courseReact from "./img/Rectangle 96.png";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
// import { StateContext } from "../../context/Context";
import { BounceLoader } from "react-spinners";
import { StateContext } from "../../context/Context";

function FavoriteCourses() {
  const [favCourses, setfavCourses] = useState([]);
  const [loader, setLoader] = useState(true);
  const [boughtCourses, setboughtCourses] = useState([]);

  const { loggedIn } = useContext(StateContext);

  const navigate = useNavigate();

  const singleCourse = (e, id) => {
    e.preventDefault();
    navigate(`/chosenCourse/${id}`);
  };
  // const speakerAbout = (e, id) => {
  //   e.preventDefault();
  //   navigate(`/chosenCourse/${id}`);
  // };
  useEffect(() => {
    try {
      loggedIn &&
        axios
          .get(
            `${process.env.REACT_APP_API_KEY}/api/v1/courses/list-fav-courses/`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          )
          .then((res) => {
            setfavCourses(res.data);
            setTimeout(() => {
              setLoader(false);
            }, 100);
          });
    } catch (error) { }
  }, []);
  const addToCart = async (e, id) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      loggedIn &&
        (await axios
          .post(
            `${process.env.REACT_APP_API_KEY}/api/v1/orders/cart`,
            {
              course: id,
              is_referral: false,
            },
            { headers }
          )
          .then((res) => {
            navigate("/cart");
          })
          .catch((err) => {
            refresh(err.response.status, err.response.status.text);
          }));
    } catch (error) { }
  };
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
          setboughtCourses(res.data);
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) { }
  }, []);

  return (
    <div className="FavoriteCourses">
      <div style={{ margin: "0px" }} className="Courserow rowGrid">
        {favCourses.length !== 0 ? (
          favCourses.map((favorites, index) => (
            <div key={index} className="second_card col-6 col-lg-8 col-md-12 col-sm-24">
              <div className="smFavoiteCard">
                <img
                  src={
                    favorites.cover_img
                      ? `${process.env.REACT_APP_API_KEY}${favorites.cover_img}`
                      : courseReact
                  }
                  alt="..."
                />
                <div className="smFavoriteText">
                  <h4 onClick={(e) => singleCourse(e, favorites.id)}>
                    {favorites.name.length > 20
                      ? favorites.name.slice(0, 18) + "..."
                      : favorites.name}
                  </h4>
                  <p onClick>{favorites.course_owner.full_name}</p>
                </div>
              </div>
              {boughtCourses.some((item) => item.course.id == favorites.id) ? (
                <button
                  onClick={() => navigate(`/watch/${favorites.id}`)}
                  className="begin_course_btn"
                >
                  Kursni davom ettirish
                </button>
              ) : (
                <button
                  onClick={(e) => addToCart(e, favorites.id)}
                  className="begin_course_btn"
                >
                  Kursni boshlash
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="col-24">
            <p style={{ textDecoration: "none" }} className="alertMessage">
              Sizda sevimli kurslar mavjud emas
            </p>
          </div>
        )}
      </div>
      {loader && (
        <div className="loader">
          <BounceLoader color="#006AFF" speedMultiplier={1.2} />
        </div>
      )}
    </div>
  );
}

export default FavoriteCourses;
