import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../context/Context";
import axios from "../../Apis/api";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
export default function SwiperItem(props) {
  const { setAlertError, setLoginError, sameCourse } = props;
  const { isremoved, setIsRemoved, loggedIn } = useContext(StateContext);

  const navigate = useNavigate();
  // add to cart courses

  const addToCart = async () => {
    const headers = {
      Authorization: loggedIn
        ? `Bearer ${localStorage.getItem("access")}`
        : setLoginError(true),
    };
    try {
      loggedIn &&
        (await axios
          .post(
            `${process.env.REACT_APP_API_KEY}/api/v1/orders/cart`,
            {
              course: sameCourse.id,
              is_referral: false,
            },
            { headers }
          )
          .then((res) => {
            res.data.message === "This course already exists"
              ? setAlertError(true)
              : setAlertError(false);
          })
          .catch((err) => {
            refresh(err.response.status, err.response.status.text);
          }));
      setIsRemoved(!isremoved);
    } catch (error) {}
  };

  return (
    <>
      <div
        className={props.className ? props.className : "cards_two"}
        style={
          props.className === "col-24"
            ? null
            : props.className
            ? { margin: "0px 15px" }
            : { margin: "0px 50px" }
        }
      >
        <div className="biznes_CRM">
          <div className="d-sm-flex">
            <div
              className="img"
              style={{ background: "#f9f9f9", textAlign: "center" }}
            >
              <img
                style={{
                  aspectRatio: "16/9",
                  width: "100%",
                  borderRadius: "15px",
                }}
                src={sameCourse.cover_img ? sameCourse.cover_img : null}
                alt="jpg"
              />
            </div>
            <div>
              <h1
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/chosenCourse/${sameCourse.id}`);
                  document.body.scrollTop = 0;
                  document.documentElement.scrollTop = 0;
                }}
              >
                {sameCourse.name.length > 20
                  ? sameCourse.name.slice(0, 20) + "..."
                  : sameCourse.name}
              </h1>
              <p
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/speakerAbout/${sameCourse.course_owner.id}`);
                }}
              >
                {sameCourse.course_owner
                  ? sameCourse.course_owner.full_name
                  : null}
              </p>
            </div>
          </div>
          <div className="svgs">
            <div className="stark">
              <svg width="22" height="22" fill="none">
                <path
                  d="M12.7299 2.51001L14.4899 6.03001C14.7299 6.52001 15.3699 6.99001 15.9099 7.08001L19.0999 7.61001C21.1399 7.95001 21.6199 9.43001 20.1499 10.89L17.6699 13.37C17.2499 13.79 17.0199 14.6 17.1499 15.18L17.8599 18.25C18.4199 20.68 17.1299 21.62 14.9799 20.35L11.9899 18.58C11.4499 18.26 10.5599 18.26 10.0099 18.58L7.01991 20.35C4.87991 21.62 3.57991 20.67 4.13991 18.25L4.84991 15.18C4.97991 14.6 4.74991 13.79 4.32991 13.37L1.84991 10.89C0.389909 9.43001 0.859909 7.95001 2.89991 7.61001L6.08991 7.08001C6.61991 6.99001 7.25991 6.52001 7.49991 6.03001L9.25991 2.51001C10.2199 0.600015 11.7799 0.600015 12.7299 2.51001Z"
                  fill="#006AFF"
                  stroke="#006AFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>
                {sameCourse.course_rating
                  ? sameCourse.course_rating.rating
                  : null}{" "}
                <span>
                  (
                  {sameCourse.course_rating
                    ? sameCourse.course_rating.voters_number
                    : null}
                  )
                </span>
              </p>
            </div>
            <div className="teacher">
              <svg width="24" height="24" fill="none">
                <path
                  d="M10.05 2.53004L4.03002 6.46004C2.10002 7.72004 2.10002 10.54 4.03002 11.8L10.05 15.73C11.13 16.44 12.91 16.44 13.99 15.73L19.98 11.8C21.9 10.54 21.9 7.73004 19.98 6.47004L13.99 2.54004C12.91 1.82004 11.13 1.82004 10.05 2.53004Z"
                  stroke="#006AFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.63012 13.08L5.62012 17.77C5.62012 19.04 6.60012 20.4 7.80012 20.8L10.9901 21.86C11.5401 22.04 12.4501 22.04 13.0101 21.86L16.2001 20.8C17.4001 20.4 18.3801 19.04 18.3801 17.77V13.13"
                  stroke="#006AFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.3999 15V9"
                  stroke="#006AFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>
                {sameCourse.enrolled_students
                  ? sameCourse.enrolled_students
                  : 0}
              </p>
            </div>
          </div>
          <div className="discount" style={{ justifyContent: "flex-end" }}>
            <button onClick={addToCart}>
              <svg width="24" height="24" fill="none">
                <path
                  d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                  stroke="#006AFF"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                  stroke="#006AFF"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                  stroke="#006AFF"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 8H21"
                  stroke="#006AFF"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
