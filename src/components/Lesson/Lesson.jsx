import { Alert, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import axios from "../../Apis/api";

import uploadIcon from "../../assets/icons/send-square.png";
import deleteIcon from "../../assets/icons/trash-red.png";
import { BounceLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";

export default function Lesson(props) {
  const {
    lesson,
    moduleId,
    isModuleEdited,
    setIsModuleEdited,
    setAddNewLesson,
  } = props;
  const [lessonEdit, setLessonEdit] = useState(false);
  const [videoName, setVideoName] = useState("");
  const [aboutVideo, setAboutVideo] = useState("");
  const [videoUrl, setvideoUrl] = useState("");
  const [videoIsEdited, setvideoIsEdited] = useState(false);
  const [videoFile, setVideoFile] = useState("");
  const [loader, setLoader] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const navigate = useNavigate();

  const firstRef = useRef();
  useEffect(() => {
    videoError
      ? setTimeout(() => {
          setVideoError(false);
        }, 3000)
      : setVideoError(false);
    videoError && navigate("#video");
  }, [videoError]);

  useEffect(() => {
    setVideoName(lesson.name);
    setAboutVideo(lesson.about && lesson.about);

    setvideoUrl(lesson.video_lesson_url);
  }, [lesson]);

  const finalUpload = async () => {
    setLoader(true);
    const headers = {
      // Authorization: `Bearer ${localStorage.getItem("access")}`,
      "Content-type": "multipart/form-data",
    };
    try {
      const formData = new FormData();
      await formData.append("video", videoFile);
      await axios
        .post(`${process.env.REACT_APP_STREAM_API}/media/upload`, formData, {
          headers,
        })
        .then((res) => {
          uploadAllPut(res.data.urls, res.data.urls.duration);
        })
        .catch((err) => {
          setVideoError(true);
          setLoader(false);
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  };

  const uploadAllPut = (url, duration) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      axios
        .put(
          `${process.env.REACT_APP_API_KEY}/api/v1/courses/lesson/${lesson.id}`,
          {
            name: videoName,
            video_lesson_url: url.p240 ? url.p240 : null,
            subtitle_url: null,
            about: aboutVideo ? aboutVideo : null,
            duration: duration,
            module: moduleId,
            resolution_240p: url.p240 ? url.p240 : null,
            resolution_360p: url.p360 ? url.p360 : null,
            resolution_480p: url.p480 ? url.p480 : null,
            resolution_720p: url.p720 ? url.p720 : null,
            resolution_1080p: url.p1080 ? url.p1080 : null,
            resource_file: lesson.contentFile ? lesson.contentFile : null,
          },
          { headers }
        )
        .then((res) => {
          //   // addVideoLesson(res.data.id);
          setLoader(false);
          //   // setvideUploadBtn(!videUploadBtn)
          setVideoName("");
          setAboutVideo("");
          setVideoFile(null);
          //   setSubtitleFile("");
          //   setContentFile("");
          //   setLessonEdit(false);
          //   setDeleteBool(false);
          setvideoIsEdited(false);
          //   setVideoForm(false);
          setIsModuleEdited(!isModuleEdited);
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  };

  const deleteVideo = () => {
    try {
      axios
        .delete(
          `${
            lesson.resolution_240p
              ? lesson.resolution_240p.replace("240p/stream", "")
              : lesson.resolution_360p
              ? lesson.resolution_360p.replace("360p/stream", "")
              : lesson.resolution_480p
              ? lesson.resolution_480p.replace("480p/stream", "")
              : lesson.resolution_720p
              ? lesson.resolution_720p.replace("720p/stream", "")
              : lesson.resolution_1080p
              ? lesson.resolution_1080p.replace("1080p/stream", "")
              : null
          }delete`
        )
        .then((res) => {
          setvideoIsEdited(true);
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  };

  return (
    <>
      {!lessonEdit ? (
        <div className="moduleItem col-24 d-flex align-items-center justify-between">
          <div
            className="d-flex align-center"
            style={{ height: "100%", width: "100%" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: "20px" }}
            >
              <path
                d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
                stroke="#1C1C1C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
                stroke="#1C1C1C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 13H13"
                stroke="#1C1C1C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 17H11"
                stroke="#1C1C1C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="moduleItemName">{lesson.name}</p>
          </div>
          <div className="d-flex align-items-center">
            {lessonEdit ? (
              <p
                className="d-flex align-center"
                style={{ marginRight: "25px", color: "#1c1c1c" }}
                onClick={() => {
                  setLessonEdit(false);
                }}
              >
                <CheckIcon />
              </p>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: "25px" }}
                onClick={() => {
                  setLessonEdit(true);
                  setAddNewLesson(false);
                }}
              >
                <path
                  d="M13.2594 3.60022L5.04936 12.2902C4.73936 12.6202 4.43936 13.2702 4.37936 13.7202L4.00936 16.9602C3.87936 18.1302 4.71936 18.9302 5.87936 18.7302L9.09936 18.1802C9.54936 18.1002 10.1794 17.7702 10.4894 17.4302L18.6994 8.74022C20.1194 7.24022 20.7594 5.53022 18.5494 3.44022C16.3494 1.37022 14.6794 2.10022 13.2594 3.60022Z"
                  stroke="#1C1C1C"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.8906 5.0498C12.3206 7.8098 14.5606 9.9198 17.3406 10.1998"
                  stroke="#1C1C1C"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 22H21"
                  stroke="#1C1C1C"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="rowGrid">
            <div className={`${!props.valid ? "col-12" : "col-24"}`}>
              <TextField
                className="inputs"
                sx={{
                  width: "100%",
                  marginBottom: "30px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "15px",
                    height: "70px",
                    border: "2px solid #D9D9D9",
                  },
                  "& .MuiOutlinedInput-input": {
                    height: "70px",
                    padding: "0 0 0 25px",
                  },
                  "& .MuiInputLabel-root": {
                    top: "6.5px",
                  },
                  "& .MuiInputLabel-shrink": {
                    top: "0",
                    left: "2px",
                  },
                }}
                label="Video nomi"
                variant="outlined"
                value={videoName}
                onChange={(e) => setVideoName(e.target.value)}
              />
            </div>
            <div className="col-12">
              {!props.valid && (
                <div
                  onClick={() => {
                    deleteVideo();
                  }}
                  className={`button-upload ${!videoIsEdited && "border-red"}`}
                >
                  <label
                    style={{ textTransform: "capitalize" }}
                    htmlFor="video"
                  >
                    {!videoIsEdited && (
                      <img src={deleteIcon} alt="..." className="mr-10" />
                    )}
                    {videoFile
                      ? videoFile.name.slice(0, 18) + "..."
                      : !videoIsEdited
                      ? "Videoni o'chirish & yangi video yuklash"
                      : "yangi video yuklash"}{" "}
                  </label>
                  {videoIsEdited && (
                    <input
                      onChange={(e) => setVideoFile(e.target.files[0])}
                      ref={firstRef}
                      id="video"
                      type="file"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="rowGrid">
            <div className="col-24 textarea">
              <h2 className="miniTitle">Video tavsifi</h2>
              <textarea
                name="description"
                placeholder="Video haqida"
                id="id"
                rows="10"
                onChange={(e) => setAboutVideo(e.target.value)}
                value={aboutVideo}
              ></textarea>
            </div>
          </div>
          <div className="rectangle">
            <div className="rowGrid">
              <div className="col-12">
                <div className="button-upload">
                  <label htmlFor="subtitle">
                    <img src={uploadIcon} alt="..." className="mr-10" />
                    Subtitr yuklash
                  </label>
                  <input
                    //   onChange={(e) => setSubtitleFile(e.target.files[0])}
                    // value
                    id="subtitle"
                    type="file"
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="button-upload mb-0">
                  <label htmlFor="content">
                    <img src={uploadIcon} alt="..." className="mr-10" />
                    Videoga fayl biriktirish
                  </label>
                  <input
                    //   onChange={(e) => setContentFile(e.target.files[0])}
                    // value={contentFile}
                    id="content"
                    type="file"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="rowGrid">
            <div className="col-24 ">
              <button
                onClick={() => {
                  setLessonEdit(false);
                  videoIsEdited
                    ? finalUpload()
                    : uploadAllPut(
                        {
                          resolution_240p: lesson.resolution_240p,
                          resolution_360p: lesson.resolution_360p,
                          resolution_480p: lesson.resolution_480p,
                          resolution_720p: lesson.resolution_720p,
                          resolution_1080p: lesson.resolution_1080p,
                        },
                        lesson.duration
                      );
                }}
                className="pointer button-upload addVideoButton"
              >
                <label>Darslikni tahrirlash</label>
              </button>
            </div>
          </div>
        </form>
      )}
      {loader && (
        <div className="loader">
          <BounceLoader color="#006AFF" speedMultiplier={1.2} />
          <h3>Video yuklanmoqda...</h3>
        </div>
      )}
      <Alert
        className={videoError ? "alert animation" : "alert"}
        severity="error"
      >
        <strong>
          Video yuklashda xatolik yuz berdi! Qaytadan urinib ko'ring
        </strong>
      </Alert>
    </>
  );
}
