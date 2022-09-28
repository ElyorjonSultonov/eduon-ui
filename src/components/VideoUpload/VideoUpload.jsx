import { Alert, TextField } from "@mui/material";
import React, { useContext, useEffect, useState, useRef } from "react";
import uploadIcon from "../../assets/icons/send-square.png";
import deleteIcon from "../../assets/icons/trash-red.png";

import { StateContext } from "../../context/Context";
import "./VideoUpload.css";

import axios from "../../Apis/api";
import { BounceLoader, BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";

export default function VideoUpload(props) {
  const { state, dispatch, videUploadBtn, setvideUploadBtn, modules } =
    useContext(StateContext);
  const { moduleId, courseId, setAddNewLesson } = props;

  const [videoName, setvideoName] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const [aboutVideo, setAboutVideo] = useState("");
  const [subtitleFile, setSubtitleFile] = useState("");
  const [contentFile, setContentFile] = useState("");
  const [loader, setLoader] = useState(false);
  const [lessons, setlessons] = useState([]);
  const [lessonEdit, setLessonEdit] = useState(false);
  const [videoUrl, setvideoUrl] = useState("");
  const [deleteBool, setDeleteBool] = useState(false);
  const [lessonId, setLessonId] = useState("");
  // const files = useRef(null);
  const [duration, setDuration] = useState("");
  const [videoError, setVideoError] = useState(false);
  const [videoForm, setVideoForm] = useState(true);
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

  const finalUpload = async (e) => {
    e.preventDefault();
    setLoader(true);
    const headers = {
      "Content-type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    };
    try {
      const formData = new FormData();
      formData.append("video", videoFile);
      await axios
        // .post("http://92.63.206.134:8080/media/upload", formData, { headers })
        .post(`${process.env.REACT_APP_STREAM_API}/media/upload`, formData, {
          headers,
        })
        .then((res) => {
          deleteBool
            ? uploadAllPut(res.data.urls, res.data.urls.duration)
            : uploadAll(res.data.urls, res.data.urls.duration);
        })
        .catch((err) => {
          setVideoError(true);
          setLoader(false);
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
    // uploadAll({}, 0);
  };

  const uploadAll = (url, duration) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      const formData = new FormData();
      formData.append("name", videoName);
      aboutVideo && formData.append("about", aboutVideo);
      formData.append("duration", duration);
      formData.append("module", moduleId);
      url.p240 && formData.append("resolution_240p", url.p240);
      url.p360 && formData.append("resolution_360p", url.p360);
      url.p480 && formData.append("resolution_480p", url.p480);
      url.p720 && formData.append("resolution_720p", url.p720);
      url.p1080 && formData.append("resolution_1080p", url.p1080);
      contentFile && formData.append("resource_file", contentFile);
      axios
        .post(
          `${process.env.REACT_APP_API_KEY}/api/v1/courses/lesson/`,

          formData,
          { headers }
        )
        .then((res) => {
          setLoader(false);
          setvideUploadBtn(!videUploadBtn);
          setvideoName("");
          setAboutVideo("");
          setVideoFile(null);
          setSubtitleFile("");
          setContentFile("");
          setLessonEdit(false);
          setDeleteBool(false);
          setVideoForm(false);
          setAddNewLesson(false);
        })
        .catch((err) => {
          setVideoError(true);
          setLoader(false);
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  };

  // const deleteVideo = () => {
  //   setDeleteBool(true);
  //   try {
  //     axios
  //       .delete(`${videoUrl.replace("240p/stream", "")}delete`)
  //       .then((res) => {
  //       })
  //   } catch (error) {
  //   }
  // };

  useEffect(() => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_API_KEY}/api/v1/courses/module/${courseId}`
        )
        .then((res) => {
          var lessonsData = res.data.filter((item) => item.id === moduleId);
          setlessons(lessonsData[0].lessons);
        })
        .catch((err) => {
          // refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  }, [loader, lessonEdit]);

  // const editLesson = (id) => {
  //   setLessonEdit(true);
  //   var filteredLesson = lessons.filter((item) => item.id === id);
  //   setvideoName(filteredLesson[0].name);
  //   setAboutVideo(filteredLesson[0].about);
  //   setvideoUrl(filteredLesson[0].video_lesson_url);
  //   setLessonId(filteredLesson[0].id);
  //   setDuration(filteredLesson[0].duration);
  // };

  const uploadAllPut = (url, duration) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      axios
        .put(
          `${process.env.REACT_APP_API_KEY}/api/v1/courses/lesson/${lessonId}`,
          {
            name: videoName,
            video_lesson_url: url.p240,
            subtitle_url: null,
            about: aboutVideo,
            duration: duration,
            module: moduleId,
            resolution_240p: url.p240 ? url.p240 : null,
            resolution_360p: url.p360 ? url.p360 : null,
            resolution_480p: url.p480 ? url.p480 : null,
            resolution_720p: url.p720 ? url.p720 : null,
            resolution_1080p: url.p1080 ? url.p1080 : null,
            resource_file: contentFile ? contentFile : null,
          },
          { headers }
        )
        .then((res) => {
          // addVideoLesson(res.data.id);
          setLoader(false);
          // setvideUploadBtn(!videUploadBtn)
          setvideoName("");
          setAboutVideo("");
          setVideoFile(null);
          setSubtitleFile("");
          setContentFile("");
          setLessonEdit(false);
          setDeleteBool(false);
          setVideoForm(false);
        });
    } catch (error) {}
  };

  return (
    <>
      <h1 className="headerText">Yangi darslikni yuklash</h1>
      {videoForm ? (
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="rowGrid">
            <div className="col-12 col-sm-24">
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
                onChange={(e) => setvideoName(e.target.value)}
              />
            </div>
            <div className="col-12 col-sm-24 mb-sm-15">
              <div
                className={
                  videoError ? "button-upload border-red" : "button-upload"
                }
              >
                <label htmlFor="video">
                  <img src={uploadIcon} alt="..." className="mr-10" />
                  {videoFile
                    ? videoFile.name.slice(0, 18) + "..."
                    : "Videoni tanlash"}
                </label>
                <input
                  onChange={(e) => setVideoFile(e.target.files[0])}
                  ref={firstRef}
                  id="video"
                  type="file"
                />
              </div>
            </div>
          </div>
          <div className="rowGrid">
            <div className="col-24 col-sm-24 textarea">
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
              <div className="col-12 col-sm-24 mb-sm-15">
                <div className="button-upload ">
                  <label htmlFor="subtitle">
                    <img src={uploadIcon} alt="..." className="mr-10" />
                    {/* {subtitleFile.img ? subtitleFile.img.name : "Subtitr yuklash"} */}
                    Subtitr yuklash
                  </label>
                  <input
                    onChange={(e) => setSubtitleFile(e.target.files[0])}
                    // value
                    id="subtitle"
                    type="file"
                  />
                </div>
              </div>
              <div className="col-12 col-sm-24">
                <div className="button-upload mb-0 ">
                  <label htmlFor="content">
                    <img src={uploadIcon} alt="..." className="mr-10" />
                    {contentFile
                      ? contentFile.name.length > 20
                        ? contentFile.name.slice(0, 20) + "..."
                        : contentFile.name.slice(0, 20)
                      : "Videoga fayl biriktirish"}
                  </label>
                  <input
                    onChange={(e) => setContentFile(e.target.files[0])}
                    // value={contentFile}
                    id="content"
                    type="file"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="rowGrid">
            <div className="col-24 col-sm-24">
              <button
                onClick={(e) => {
                  finalUpload(e);
                }}
                className="pointer button-upload addVideoButton"
              >
                <label>Darslikni yuklash</label>
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="rowGrid">
          <div className="col-24 col-sm-24">
            <button
              onClick={() => {
                setVideoForm(true);
              }}
              className="pointer button-upload addVideoButton"
            >
              <label>Yangi dars qo'shish</label>
            </button>
          </div>
        </div>
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
