import React, { useEffect, useState } from "react";
import Lesson from "../Lesson/Lesson";
import CheckIcon from "@mui/icons-material/Check";
import axios from "../../Apis/api";
import "./Module.css";
import VideoUpload from "../VideoUpload/VideoUpload";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
export default function Module(props) {
  const { modul, setIsModuleEdited, isModuleEdited, courseId } = props;
  const [edit, setEdit] = useState(false);
  const [modulName, setmodulName] = useState("");
  const [addNewLesson, setAddNewLesson] = useState(false);
  useEffect(() => {
    setmodulName(modul.name);
  }, [modul]);

  const moduleDataPut = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      axios
        .put(
          `${process.env.REACT_APP_API_KEY}/api/v1/courses/module/${modul.id}`,
          {
            name: modulName,
            course: modul.course,
          },
          { headers }
        )
        .then((res) => {
          setIsModuleEdited(!isModuleEdited);
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  };

  return (
    <div className="module rectangle border-main">
      <div className={`moduleItem col-24 d-flex align-center justify-between`}>
        <p className="label">
          {edit ? "Modul nomini o'zgartirish" : "Modul nomi"}
        </p>

        {edit ? (
          <input
            value={modulName}
            onChange={(e) => setmodulName(e.target.value)}
            className="moduleInput"
          />
        ) : (
          <p className="moduleItemName">{modulName}</p>
        )}
        <div className="d-flex align-center">
          {edit ? (
            <p
              className="d-flex align-center"
              style={{ marginRight: "25px", color: "#1c1c1c" }}
              onClick={() => {
                setEdit(false);
                moduleDataPut();
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
              onClick={() => setEdit(true)}
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
      {modul?.lessons.map((item, index) => (
        <Lesson
          key={index}
          moduleId={modul.id}
          lesson={item}
          isModuleEdited={isModuleEdited}
          setIsModuleEdited={setIsModuleEdited}
          setAddNewLesson={setAddNewLesson}
          valid={props.valid}
        />
      ))}
      {addNewLesson ? (
        <VideoUpload
          moduleId={modul.id}
          courseId={courseId}
          setAddNewLesson={setAddNewLesson}
        />
      ) : (
        <div className="rowGrid">
          <div className="col-24 ">
            <button
              onClick={() => {
                setAddNewLesson(true);
              }}
              className="pointer button-upload addVideoButton"
            >
              <label>Yangi dars qo'shish</label>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
