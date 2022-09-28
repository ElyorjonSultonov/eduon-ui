import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import edit from "../../assets/icons/gallery-edit.png";
import TextField from "@mui/material/TextField";
import "./Profile.css";
import axios from "../../Apis/api";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../context/Context";

export default function ProfileInfo() {
  const navigate = useNavigate();
  const { avatar, setAvatar, loggedIn } = useContext(StateContext);
  const [responseData, setresponseData] = useState({});
  const [gender, setGender] = useState("");
  const [name, setname] = useState("");
  const [surname, setsurname] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const [specialty, setspecialty] = useState("");
  const [about_me, setAbout_me] = useState("");
  const [interests, setinterests] = useState("");
  const [district, setDistrict] = useState("");
  const [country, setCountry] = useState("");
  const [images, setImages] = useState("");
  // const [avatar, setAvatar] = useState("")

  const sendddata = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      const formData = new FormData();
      images.img && formData.append("profile_picture", images.img);
      formData.append("f_name", name);
      formData.append("l_name", surname);
      formData.append("email", email);
      formData.append("country", country);
      formData.append("district", district);
      formData.append("speciality", specialty);
      formData.append("interests", interests);
      formData.append("about_me", about_me);
      formData.append("sex", gender);

      // formData.append("name", name);
      await axios
        .put(
          `${process.env.REACT_APP_API_KEY}/api/v1/accounts/update`,
          formData,
          {
            headers,
          }
        )
        .then((res) => {
          navigate("/userAbout");
        })
        .catch((err) => {});
    } catch (error) {}
  };
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
            setresponseData(res.data);
            setname(res.data.f_name);
            setsurname(res.data.l_name);
            setmobile(res.data.phone_number);
            setemail(res.data.email);
            setGender(res.data.sex);
            setAvatar(res.data.profile_picture);
            setspecialty(res.data.speciality);
            setCountry(res.data.country);
            setDistrict(res.data.district);
            setAbout_me(res.data.about_me);
            setinterests(res.data.interests);
          });
    } catch (error) {}
  }, []);
  return (
    <div className="container">
      <div className="container_body rowGrid">
        <div className="left_container col-5 col-lg-5 col-sm-24">
          <img
            className="profile_picture"
            src={
              images.preViews
                ? images.preViews
                : `${process.env.REACT_APP_API_KEY}${avatar}`
            }
            alt=""
          />
          <div className="uploadImg">
            <input
              id="profile_picture"
              type="file"
              onChange={(e) =>
                setImages({
                  img: e.target.files[0],
                  preViews: URL.createObjectURL(e.target.files[0]),
                })
              }
            />
            <label htmlFor="profile_picture">
              <p className="d-align-center mt-30">
                <img className="smImg" src={edit} alt="img" /> Rasmni
                ozgartirish
              </p>
            </label>
          </div>
        </div>
        <div className="right_container col-16 col-lg-19 col-sm-24">
          <p className="overallInfo common">Umumiy malumotlar</p>
          <form action="">
            <div id="fioForm">
              <div className="d-flex f-direction">
                <TextField
                  className="inputs"
                  sx={{
                    width: "50%",
                    marginRight: "30px",
                    marginBottom: "44px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      height: "70px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "70px",
                      padding: "0 0 0 25px",
                      marginTop: "-4px",
                      fontSize: "20px",
                    },
                    "& .MuiInputLabel-root": {
                      top: "4px",
                    },
                    "& .MuiInputLabel-shrink": {
                      top: "0",
                      left: "2px",
                    },
                  }}
                  label="Familiyangiz"
                  variant="outlined"
                  value={surname}
                  onChange={(e) => setsurname(e.target.value)}
                />
                <TextField
                  className="inputs"
                  sx={{
                    maxWidth: "100% !important",
                    width: "50%",
                    marginBottom: "44px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      height: "70px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "70px",
                      padding: "0 0 0 25px",
                      marginTop: "-4px",
                      fontSize: "20px",
                      maxWidth: "100% !important",
                    },
                    "& .MuiInputLabel-root": {
                      top: "4px",
                    },
                    "& .MuiInputLabel-shrink": {
                      top: "0",
                      left: "2px",
                    },
                  }}
                  label="Ismingiz"
                  onChange={(e) => setname(e.target.value)}
                  value={name}
                  variant="outlined"
                />
              </div>
              <div className="d-flex f-direction f-dar">
                <TextField
                  className="inputs mt-34"
                  sx={{
                    width: "100%",
                    marginRight: "30px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      height: "70px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "70px",
                      padding: "0 0 0 25px",
                      marginTop: "-4px",
                      fontSize: "20px",
                    },
                    "& .MuiInputLabel-root": {
                      top: "4px",
                    },
                    "& .MuiInputLabel-shrink": {
                      top: "0",
                      left: "2px",
                    },
                  }}
                  label="Telefon raqamingiz "
                  onChange={(e) => setmobile(e.target.value)}
                  variant="outlined"
                  value={mobile}
                />
                <TextField
                  className="inputs mt-30"
                  sx={{
                    width: "100%",

                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      height: "70px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "70px",
                      padding: "0 0 0 25px",
                      marginTop: "-4px",
                      fontSize: "20px",
                    },
                    "& .MuiInputLabel-root": {
                      top: "4px",
                    },
                    "& .MuiInputLabel-shrink": {
                      top: "0",
                      left: "2px",
                    },
                  }}
                  label="Elektron pochtangiz"
                  onChange={(e) => setemail(e.target.value)}
                  value={email}
                  variant="outlined"
                />
              </div>

              <Box>
                <div className="container">
                  <div className="rowGrid">
                    <div className="col-24 col-sm-24">
                      <p className="genderTitle overallInfo">Jinsingiz</p>
                      <div className="rowGrid">
                        <div className="gender-box">
                          <input
                            className="d-none"
                            type="radio"
                            id="erkak"
                            name="gender"
                            onClick={(e) => setGender(e.target.value)}
                            value="Erkak"
                          />
                          <label
                            style={
                              responseData.sex === "Erkak"
                                ? { borderColor: "#006aff" }
                                : null
                            }
                            className="mr-30 genderBtn"
                            for="erkak"
                          >
                            Erkak
                          </label>
                          <input
                            className="d-none"
                            type="radio"
                            id="ayol"
                            name="gender"
                            onClick={(e) => setGender(e.target.value)}
                            value="Ayol"
                          />
                          <label
                            style={
                              responseData.sex === "Ayol"
                                ? { borderColor: "#006aff" }
                                : null
                            }
                            className="genderBtn"
                            for="ayol"
                          >
                            Ayol
                          </label>
                        </div>
                        <TextField
                          className="inputs"
                          sx={{
                            width: "100%",
                            marginBottom: "35px",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderRadius: "15px",
                              height: "70px",
                              border: "2px solid #D9D9D9",
                            },
                            "& .MuiOutlinedInput-input": {
                              height: "70px",
                              padding: "0 0 0 25px",
                              // fontSize: "20px",
                              lineHeight: "24px",
                              marginTop: "-3px",
                              fontSize: "20px",
                            },
                            "& .MuiInputLabel-root": {
                              top: "4px",
                            },
                            "& .MuiInputLabel-shrink": {
                              top: "0",
                              left: "2px",
                            },
                          }}
                          label="Kasbingiz"
                          variant="outlined"
                          onChange={(e) => setspecialty(e.target.value)}
                          value={specialty}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Box>
              <div className="d-flex f-direction f-dar">
                <TextField
                  className="inputs country"
                  sx={{
                    width: "100%",
                    marginBottom: "44px",
                    marginRight: "30px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      height: "70px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "70px",
                      padding: "0 0 0 25px",
                      marginTop: "-4px",
                      fontSize: "20px",
                    },
                    "& .MuiInputLabel-root": {
                      top: "4px",
                    },
                    "& .MuiInputLabel-shrink": {
                      top: "0",
                      left: "2px",
                    },
                  }}
                  label="Mamlakat"
                  variant="outlined"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                <TextField
                  className="inputs mt-34"
                  sx={{
                    width: "100%",
                    marginBottom: "44px",

                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      height: "70px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "70px",
                      padding: "0 0 0 25px",
                      marginTop: "-4px",
                      fontSize: "20px",
                    },
                    "& .MuiInputLabel-root": {
                      top: "4px",
                    },
                    "& .MuiInputLabel-shrink": {
                      top: "0",
                      left: "2px",
                    },
                  }}
                  label="Shahar yoki viloyat"
                  variant="outlined"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                />
              </div>
              <div className="d-grid">
                <div className="comments">
                  <p className="titleComments">Men haqimda</p>
                  <textarea
                    className="inputs aboutMe"
                    label="Men haqimda"
                    variant="outlined"
                    value={about_me}
                    onChange={(e) => setAbout_me(e.target.value)}
                  ></textarea>
                </div>
                <TextField
                  className="inputs"
                  sx={{
                    width: "100%",
                    marginBottom: "44px",

                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      height: "70px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "70px",
                      padding: "0 0 0 25px",
                      marginTop: "-4px",
                      fontSize: "20px",
                    },
                    "& .MuiInputLabel-root": {
                      top: "4px",
                    },
                    "& .MuiInputLabel-shrink": {
                      top: "0",
                      left: "2px",
                    },
                  }}
                  label="Qiziqishlarim"
                  variant="outlined"
                  value={interests}
                  onChange={(e) => setinterests(e.target.value)}
                />
                <Button
                  style={{
                    borderRadius: 15,
                    color: "white",
                    backgroundColor: "#80B5FF",
                    fontWeight: "500",
                    width: "1   1px",
                    height: "55px",
                  }}
                  sx={{ mr: 1 }}
                  variant="outlined"
                  type="button"
                  onClick={sendddata}
                >
                  Saqlash
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
