import React, { useState, useEffect } from "react";
import "./CourseStructure.css";
import VideoCircle from "../../assets/icons/CourseStructureIcons/video-circle.png";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "../../Apis/api";
import Icon1 from "../../assets/icons/CourseStructureIcons/video-play.png";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import { useNavigate } from "react-router-dom";

// import Icon1

function CourseStructure(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [datas, setDatas] = useState([]);

  /// data of course modules
  const navigate = useNavigate();
  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v1/courses/module/${props.id.id}`)
        .then((res) => {
          setDatas(res.data);
        })
        .catch((err) => refresh(err.response.status, err.response.status.text));
    } catch (error) {}
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className="CourseStructure">
      {datas.length !== 0 && (
        <section className="StructureMain">
          <div className="main__title">
            <h1>Kurs tarkibi</h1>
            <p>
              {datas.length !== 0 ? datas.length : 0} bo'lim • {props.resData.video_count} ma'ruza •{" "}
              {props.resData
                ? new Date(
                    props.resData.course_duration
                      ? props.resData.course_duration * 1000
                      : 0
                  )
                    .toISOString()
                    .substring(11, 19)
                : null}{" "}
              umumiy uzunligi
            </p>
          </div>
          <div className="accordion">
            {datas.map((item, index) => (
              <Accordion
                expanded={expanded === `panel${index + 1}`}
                onChange={handleChange(`panel${index + 1}`)}
                sx={{
                  "&.MuiPaper-root": {
                    boxShadow: "none !important",
                    borderRadius: "15px !important",
                  },
                }}
                key={index}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                  sx={{
                    "&.MuiButtonBase-root": {
                      width: "100%",
                      height: "100px",
                      display: "flex",
                      background: "#F8F8F8",
                      borderRadius: "14px",
                      padding: "24px 32px",
                      marginTop: "20px",
                    },
                  }}
                >
                  <div
                    sx={{
                      "&.MuiTypography-root": {
                        marginTop: "0 !important",
                      },
                    }}
                  >
                    <div className="accordion__item">
                      <div className="acc__left">
                        <img src={Icon1} alt="..." />
                        <p>
                          {item.name.length > 16
                            ? item.name.slice(0, 10) + "..."
                            : item.name}
                          <span>({item.module_duration})</span>
                        </p>
                      </div>
                    </div>
                    {/* <AccordionItem /> */}
                  </div>
                </AccordionSummary>
                {item.lessons.map((items, index) => (
                  <AccordionDetails
                    key={index}
                    onClick={() => {
                      props.isBought && navigate(`/watch/${props.id.id}`);
                    }}
                  >
                    <div
                      sx={{
                        paddingLeft: "30px",
                        marginTop: "0 !important",
                      }}
                    >
                      <div className={"acc__open"}>
                        <img src={VideoCircle} alt="..." />
                        <div className="durationVideo">
                          <div className="leftDurationVideo">
                            <p className="durationVideo">{items.name}</p>
                            <div className="durationVideoParts">
                              <span>{items.duration?.slice(0, 8)}</span>
                              {items.resource_file ? (
                                <span className="fileContentDownload">
                                  <svg
                                    width="16"
                                    height="15"
                                    viewBox="0 0 16 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M14.6654 6.83334V10.8333C14.6654 13.5 13.9987 14.1667 11.332 14.1667H4.66536C1.9987 14.1667 1.33203 13.5 1.33203 10.8333V4.16667C1.33203 1.5 1.9987 0.833336 4.66536 0.833336H5.66536C6.66536 0.833336 6.88536 1.12667 7.26536 1.63334L8.26536 2.96667C8.5187 3.3 8.66536 3.5 9.33203 3.5H11.332C13.9987 3.5 14.6654 4.16667 14.6654 6.83334Z"
                                      stroke="#1C1C1C"
                                      strokeWidth="1.5"
                                      strokeMiterlimit="10"
                                    />
                                  </svg>
                                  Biriktirilgan faylni yuklash
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionDetails>
                ))}
              </Accordion>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default CourseStructure;
