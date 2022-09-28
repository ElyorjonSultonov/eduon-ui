import React, { useContext, useEffect, useState } from "react";
import "./ModuleUpload.css";
import { Alert, TextField } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { StateContext } from "../../context/Context";
import axios from "../../Apis/api";
import { useNavigate } from "react-router-dom";
import Module from "../Module/Module";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";

export default function ModuleUpload(props) {
  const { state, videUploadBtn, setvideUploadBtn } = useContext(StateContext);

  const { showModule, setShowModule, courseId } = props;
  const [moduleName, setmoduleName] = useState("");
  const [moduleId, setModuleId] = useState();
  const [moduleEdit, setModuleEdit] = useState(false);
  const [editModuleData, setEditModuleData] = useState([]);
  const [modules, setmodules] = useState([]);
  const [moduleSuccess, setModuleSuccess] = useState(false);
  const [isModuleEdited, setIsModuleEdited] = useState(false);

  // STEPPER SETTINGS
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const navigate = useNavigate();

  useEffect(() => {
    moduleSuccess
      ? setTimeout(() => {
          setModuleSuccess(false);
        }, 3000)
      : setModuleSuccess(false);
    moduleSuccess && navigate("#video");
  }, [moduleSuccess]);

  const addModuleData = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      axios
        .post(
          `${process.env.REACT_APP_API_KEY}/api/v1/courses/module/`,
          {
            name: moduleName,
            course: courseId,
          },
          { headers }
        )
        .then((res) => {
          setModuleId(res.data.id);
          // addNewModule(res.data.id)
          handleNext();
          setModuleEdit(false);
          setvideUploadBtn(!videUploadBtn);
          setmoduleName("");
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  };

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v1/courses/module/${courseId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
        .then((res) => {
          setmodules(res.data);
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  }, [videUploadBtn, isModuleEdited]);

  useEffect(() => {}, [editModuleData]);

  return (
    <div className="moduleUpload">
      {modules.length != 0 && (
        <div className="rowGrid">
          {modules.map((item, index) => (
            <Module
              courseId={courseId}
              isModuleEdited={isModuleEdited}
              setIsModuleEdited={setIsModuleEdited}
              key={index}
              modul={item}
              valid={props.valid}
            />
          ))}
        </div>
      )}

      <div className={showModule ? "d-none" : "d-block"}>
        <p
          onClick={() => {
            setShowModule(!showModule);
            setActiveStep(0);
          }}
          className="pointer addModule"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0586 16.5V11.5"
              stroke="#006AFF"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.5 14H9.5"
              stroke="#006AFF"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 11V17C22 21 21 22 17 22H7C3 22 2 21 2 17V7C2 3 3 2 7 2H8.5C10 2 10.33 2.44 10.9 3.2L12.4 5.2C12.78 5.7 13 6 14 6H17C21 6 22 7 22 11Z"
              stroke="#006AFF"
              strokeWidth="1.5"
              strokeMiterlimit="10"
            />
          </svg>
          Modul qo’shish
        </p>
      </div>
      <div className="rowGrid">
        <div className="col-12 col-sm-24"></div>
      </div>

      <div className={showModule ? "d-block" : "d-none"}>
        <div className="container">
          <div className="rowGrid">
            <Stepper
              className="col-24 col-sm-24"
              activeStep={activeStep}
              orientation="vertical"
            >
              <Step key={"Modul nomini"}>
                <StepLabel>
                  {moduleEdit ? "Modulni o'zgartirish" : "Modul qo'shish"}
                </StepLabel>
                <StepContent>
                  <Box sx={{ mb: 2 }}>
                    <div>
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
                        label="Modul nomi"
                        variant="outlined"
                        onChange={(e) => setmoduleName(e.target.value)}
                        value={moduleName}
                      />
                    </div>
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleNext();
                        addModuleData();
                        setShowModule(false);
                      }}
                      sx={{ mt: 1, mr: 1 }}
                      className="btn"
                    >
                      Davom etish
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            </Stepper>
          </div>
        </div>
      </div>
      <Alert
        className={moduleSuccess ? "alert animation" : "alert"}
        severity="success"
      >
        <strong>Kurs muvaffaqiyatli yuklandi</strong>
      </Alert>
    </div>
  );
}
