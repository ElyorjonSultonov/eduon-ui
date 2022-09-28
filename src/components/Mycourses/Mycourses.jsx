import React, { useEffect, useState } from "react";
import "../Mycourses/Mycourses.css";
import RectangelOne from "../../assets/images/Rectangle 1.png";
import { useNavigate } from "react-router-dom";
import axios from "../../Apis/api";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import { BounceLoader } from "react-spinners";

function Mycourses(props) {
  const navigate = useNavigate();
  const [uploadedCourses, setUploadedCourses] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    try {
      axios
        .get(
          `${process.env.REACT_APP_API_KEY}/api/v1/courses/uploaded-courses/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        )
        .then((res) => {
          setUploadedCourses(res.data);
          setLoader(false);
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {
      setLoader(false);
    }
  }, []);
  const chosenCourse = (e, id) => {
    e.preventDefault();
    navigate(`/speakerChosenCourse/${id}`);
  };
  const { user } = props;

  return (
    <section className="loadedCourses">
      <div className="container">
        <div className="rowGrid">
          {user ? (
            user.is_speaker ? (
              <div className="tableList">
                {!loader && uploadedCourses.length !== 0 ? (
                  <table>
                    <tr className="topTitle">
                      <th className="col-1">№</th>
                      <th style={{ textAlign: "left" }} className="col-7">
                        Nomi
                      </th>
                      <th className="col-2">
                        Kurs narxi
                        <svg width="9" height="13" fill="none">
                          <path
                            d="M1 8.63989L4.53 12.1599L8.06 8.63989"
                            stroke="#999999"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.05957 4.52002L4.52957 1.00002L0.999571 4.52002"
                            stroke="#999999"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </th>
                      <th className="col-2">
                        Kontent soni
                        <svg width="9" height="13" fill="none">
                          <path
                            d="M1 8.63989L4.53 12.1599L8.06 8.63989"
                            stroke="#999999"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.05957 4.52002L4.52957 1.00002L0.999571 4.52002"
                            stroke="#999999"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </th>
                      <th className="col-2">
                        Talabalar
                        <svg width="9" height="13" fill="none">
                          <path
                            d="M1 8.63989L4.53 12.1599L8.06 8.63989"
                            stroke="#999999"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.05957 4.52002L4.52957 1.00002L0.999571 4.52002"
                            stroke="#999999"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </th>
                      <th>
                        Status
                        <svg width="9" height="13" fill="none">
                          <path
                            d="M1 8.63989L4.53 12.1599L8.06 8.63989"
                            stroke="#999999"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.05957 4.52002L4.52957 1.00002L0.999571 4.52002"
                            stroke="#999999"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </th>
                    </tr>
                    {uploadedCourses.map((item, index) => (
                      <tr key={index} className="bodyTitle">
                        <td className="col-1 number">{index + 1}</td>
                        <td
                          // onClick={() => navigate("/courseOpen")}
                          className="col-2 imgs"
                          style={{ textAlign: "left" }}
                          onClick={(e) => chosenCourse(e, item.id)}
                        >
                          <img src={RectangelOne} alt="..." />
                          <p style={{ whiteSpace: "noWrap" }}>
                            {item.name.length > 25
                              ? item.name.slice(0, 20) + "..."
                              : item.name}
                          </p>
                        </td>
                        {/* <td style={{textAlign:"left"}} className="col-7">{item.name}</td> */}
                        <td className="col-2">
                          {item.price
                            ? item.discount_price
                              ? item.price
                                  .toLocaleString("uz-UZ", {
                                    style: "currency",
                                    currency: "UZS",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  })
                                  .replace("UZS", " ")
                                  .replace(",", " ")
                              : item.price
                                  .toLocaleString("uz-UZ", {
                                    style: "currency",
                                    currency: "UZS",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  })
                                  .replace("UZS", " ")
                                  .replace(",", " ")
                            : 0}{" "}
                          UZS
                        </td>
                        <td className="col-2">20</td>
                        <td className="col-2">{item.enrolled_students}</td>
                        <td
                          className={
                            item.is_valid === "VALID"
                              ? "col-2 active"
                              : item.is_valid === "ON HOLD"
                              ? "col-2 onHold"
                              : "col-2 rejected"
                          }
                        >
                          {item.is_valid === "VALID"
                            ? "Aktiv"
                            : item.is_valid === "ON HOLD"
                            ? "Jarayonda"
                            : "Tasdiqlanmagan"}
                        </td>

                        <td
                          onClick={(e) => chosenCourse(e, item.id)}
                          style={{ textDecoration: "underline" }}
                          className="col-1"
                        >
                          Batafsil
                        </td>
                      </tr>
                    ))}
                  </table>
                ) : (
                  !loader && <h1>Sizda hali yuklangan kurslar mavjud emas</h1>
                )}
              </div>
            ) : (
              !loader && <h1>Siz Spiker emassiz</h1>
            )
          ) : null}
        </div>
      </div>
      {loader && (
        <div className="loader">
          <BounceLoader color="#006AFF" speedMultiplier={1.2} />
        </div>
      )}
    </section>
  );
}

export default Mycourses;
