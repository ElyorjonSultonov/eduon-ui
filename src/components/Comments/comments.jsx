import React, { useContext, useEffect, useState } from "react";
// import IMGONE from "../../assets/images/ChosenCourse/Rectangle 90.png";
import "./comments.css";
import Button from "@mui/material/Button";
import axios from "../../Apis/api";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import { StateContext } from "../../context/Context";

export default function Comments(props) {
  const [comment, setComment] = useState("");
  // const [courseId, setCourseId] = useState("");
  const [sendMsg, setsendMsg] = useState(false);
  const [commentsData, setCommentsData] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [commentId, setCommentId] = useState("");
  const [show, setShow] = useState(false);
  const { loggedIn } = useContext(StateContext);

  const senddata = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_KEY}/api/v1/courses/comments/`,
          {
            text: comment,
            course: props.id.id,
          },

          { headers }
        )
        .then(() => setsendMsg(!sendMsg))
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
      setComment("");
    } catch (error) {}
  };

  const updateComment = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      };
      await axios
        .put(
          `${process.env.REACT_APP_API_KEY}/api/v1/courses/comments/${commentId}`,
          { text: comment, course: props.id.id },
          { headers }
        )
        .then(() => setsendMsg(!sendMsg));
      setComment("");
      setShow(false);
    } catch (error) {}
  };

  const deleteComment = async (id) => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      };
      await axios
        .delete(
          `${process.env.REACT_APP_API_KEY}/api/v1/courses/comments/${id}`,
          {
            headers,
          }
        )
        .then((res) => {
          setsendMsg(!sendMsg);
        })
        .catch((err) => {});
    } catch (error) {}
  };

  useEffect(() => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_API_KEY}/api/v1/courses/comments/${props.id.id}`
        )
        .then((res) => {
          setCommentsData(res.data);
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  }, [sendMsg]);

  useEffect(() => {
    try {
      loggedIn &&
        axios
          .get(`${process.env.REACT_APP_API_KEY}/api/v1/accounts/profile`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          })
          .then((res) => {
            setUserInfo({
              mobile: res.data.phone_number,
            });
          });
    } catch (error) {}
  }, []);
  return (
    <div className="izohlar">
      <h2 className="izohTitle">{show ? "Izohni o’zgartirish" : "Izohlar"}</h2>
      <div className="izohTexts">
        {/* <!-- text one --------- --> */}
        {commentsData.map((comments, index) => (
          <div key={index}>
            <div className="names">
              <p className="d-sm-block mb-sm-0">
                {new Date(comments.date_created)
                  .toLocaleDateString([], {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })
                  .replace(",", " ")}
              </p>
              <div className="nameText">
                <img
                  src={`${process.env.REACT_APP_API_KEY}${comments.user.picture}`}
                  alt=""
                />
                <h3>{comments.user.full_name}</h3>
              </div>
              <p className="d-sm-none">
                {new Date(comments.date_created)
                  .toLocaleDateString([], {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })
                  .replace(",", " ")}
              </p>
            </div>
            <div className="commentTexts d-flex justify-between">
              <p className="izohP">{comments.text}</p>
              {comments.phone === userInfo.mobile ? (
                <div style={{ alignSelf: "end" }} className="editBtn d-flex">
                  <svg
                    className="pointer"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                      deleteComment(comments.id);
                    }}
                    style={{ marginRight: "20px" }}
                  >
                    <path
                      d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.8484 9.13989L18.1984 19.2099C18.0884 20.7799 17.9984 21.9999 15.2084 21.9999H8.78844C5.99844 21.9999 5.90844 20.7799 5.79844 19.2099L5.14844 9.13989"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.3281 16.5H13.6581"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.5 12.5H14.5"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    className="pointer"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                      setShow(!show);
                      setCommentId(comments.id);
                      setComment(comments.text);
                    }}
                  >
                    <path
                      d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.0418 3.02001L8.16183 10.9C7.86183 11.2 7.56183 11.79 7.50183 12.22L7.07183 15.23C6.91183 16.32 7.68183 17.08 8.77183 16.93L11.7818 16.5C12.2018 16.44 12.7918 16.14 13.1018 15.84L20.9818 7.96001C22.3418 6.60001 22.9818 5.02001 20.9818 3.02001C18.9818 1.02001 17.4018 1.66001 16.0418 3.02001Z"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.9102 4.1499C15.5802 6.5399 17.4502 8.4099 19.8502 9.0899"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              ) : null}
            </div>
          </div>
        ))}
        {/* <!-- --------------- --> */}
        {loggedIn ? (
          // show ? (
          <form action="">
            <textarea
              style={{
                width: "100%",
                maxWidth: "100%",
                minHeight: "200px",
                border: " 1px solid #D9D9D9",
                borderRadius: "15px",
                padding: "30px",
                fontWeight: "400",
                fontSize: "20px",
                lineHeight: "24px",
                marginTop: "50px",
                marginBottom: "30px",
              }}
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder=" Izoh qoldirish..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            {show ? (
              <Button
                sx={{
                  width: "30%",
                  height: "70px",
                  borderRadius: "15px",
                  backgroundColor: "#80B5FF;",
                  fontFamily: "sans-serif",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "24px",
                  lineHeight: "29px",
                  textTransform: "none",
                  marginBottom: "44px",
                  display: "block",
                  marginLeft: "auto",
                }}
                variant="contained"
                className="btn sendBtn"
                onClick={updateComment}
              >
                O'zgartirish
              </Button>
            ) : (
              <Button
                sx={{
                  width: "25%",
                  height: "55px",
                  borderRadius: "15px",
                  backgroundColor: "#80B5FF;",
                  fontFamily: "sans-serif",
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "16px",
                  lineHeight: "29px",
                  textTransform: "none",
                  marginBottom: "44px",
                  display: "block",
                  marginLeft: "auto",
                }}
                variant="contained"
                className="btn sendBtn"
                onClick={senddata}
              >
                Yuborish
              </Button>
            )}
          </form>
        ) : // ) : null
        null}
      </div>
    </div>
  );
}
