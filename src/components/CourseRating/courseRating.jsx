import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import "./courseRating.css";
import axios from "../../Apis/api";

export default function CourseRating(props) {
  const setRating = async (e) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_KEY}/api/v1/courses/rate-course/`,
          {
            course: props.resData && parseInt(props.resData.id),
            rating: parseInt(e.target.value),
          },
          { headers }
        )
        .then((res) => {
          res.data === "You have already rated the course!" &&
            getRatings(e.target.value);
        })
        .catch(() => {});
    } catch (error) {}
  };
  // useEffect(()=)
  const getRatings = (value) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      axios
        .get(
          `https://eduon-backend.uz/api/v1/courses/get-rate-course/${props.resData.id}`,
          // ${parseInt(
          //   props.resData.id
          // )}`
          {
            headers,
          }
        )
        .then((res) => {
          editRating(value, res.data.id);
        })
        .catch((err) => {});
    } catch (error) {}
  };

  const editRating = (value, id) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      axios
        .put(
          `https://eduon-backend.uz/api/v1/courses/edit-rate-course/${id}`,
          // ${parseInt(
          //   props.resData.id
          // )}`
          {
            rating: parseInt(value),
          },
          {
            headers,
          }
        )
        .then((res) => {})
        .catch((err) => {});
    } catch (error) {}
  };

  return (
    <div className="courseRating">
      <h1 className="title">Reyting</h1>
      <div className="rowGrid">
        <div className="col-6 col-sm-24 left comentsCourseReting">
          <h1>{props.resData && props.resData.course_rating.rating}</h1>
          <div className="smComments">
            <Rating
              name="half-rating-read"
              defaultValue={
                props.resData && parseInt(props.resData.course_rating.rating)
              }
              precision={0.5}
              readOnly
            />
            <p className="commentsNum">
              {" "}
              {props.resData && props.resData.comments_count} sharh{" "}
            </p>
          </div>
        </div>
        <div className="col-18 col-sm-24 right">
          <ul>
            <li>
              <p className="num">5</p>
              <div className="line-back">
                <div
                  style={{
                    width:
                      props.resData &&
                      (props.resData.course_rating.five_rating * 100) /
                        props.resData.course_rating.voters_number +
                        "%",
                  }}
                  className="line-front"
                ></div>
              </div>
            </li>
            <li>
              <p className="num">4</p>
              <div className="line-back">
                <div
                  style={{
                    width:
                      props.resData &&
                      (props.resData.course_rating.four_rating * 100) /
                        props.resData.course_rating.voters_number +
                        "%",
                  }}
                  className="line-front"
                ></div>
              </div>
            </li>
            <li>
              <p className="num">3</p>
              <div className="line-back">
                <div
                  style={{
                    width:
                      props.resData &&
                      (props.resData.course_rating.three_rating * 100) /
                        props.resData.course_rating.voters_number +
                        "%",
                  }}
                  className="line-front"
                ></div>
              </div>
            </li>
            <li>
              <p className="num">2</p>
              <div className="line-back">
                <div
                  style={{
                    width:
                      props.resData &&
                      (props.resData.course_rating.two_rating * 100) /
                        props.resData.course_rating.voters_number +
                        "%",
                  }}
                  className="line-front"
                ></div>
              </div>
            </li>
            <li>
              <p className="num">1</p>
              <div className="line-back">
                <div
                  style={{
                    width:
                      props.resData &&
                      (props.resData.course_rating.one_rating * 100) /
                        props.resData.course_rating.voters_number +
                        "%",
                  }}
                  className="line-front"
                ></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="rowGrid rating">
        <div className="col-24 col-sm-24 d-flex d-sm-block">
          <h1 className="title">Ushbu kursni qanday baxolaysiz</h1>
          <p>Reytingni o'zgartirish</p>
        </div>
        <p className="col-24 chooseRating">Reytingni tanlang</p>
        <div className="col-24 col-sm-24">
          <Rating
            name="half-rating"
            defaultValue={0}
            precision={0.5}
            onChange={(e) => {
              setRating(e);
            }}
          />
        </div>
      </div>
    </div>
  );
}
