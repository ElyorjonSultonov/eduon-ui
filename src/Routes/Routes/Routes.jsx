import axios from "../../Apis/api";
import React, { useContext, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AboutEduon from "../../components/AboutEduon/AboutEduon";
import UserAbout from "../../components/AboutUser/UserAbout";
import ChosenCourse from "../../components/ChosenCourse/ChosenCourse";
import ChosenCourseCategory from "../../components/ChosenCourseCategory/ChosenCourseCategory";
import CourseOpened from "../../components/CourseInsideOpened/CourseOpened";
import CoursesFilter from "../../components/CoursesFilter/CoursesFilter";
import EditCourse from "../../components/EditCourse/EditCourse";
// import Example from "../../components/Example/example";
import Faq from "../../components/Faq/Faq";
import Favourites from "../../components/FavouritesPage/favourites";
import MoneyOperations from "../../components/MoneyOperations/moneyOperations";
import Myactive from "../../components/Myactive/Myactive";
import Profile from "../../components/Profile/Profile";
import Search from "../../components/Search/search";
import SearchPage from "../../components/SearchPage/searchPage";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";
import ShoppingCourses from "../../components/ShoppingCourses/ShoppingCourses";
import SpChosenCourse from "../../components/SpChosenCourse/SpChosenCourse";
import SpeakerAbout from "../../components/SpeakersAbout/SpeakerAbout";
import UploadCourse from "../../components/UploadCourse/uploadCourse";
import Watching from "../../components/Watching/Watching";
import Login from "../../pages/Authentification/Login/Login";
import Fio from "../../pages/Authentification/Register/Fio";
import Register from "../../pages/Authentification/Register/Register";
import SmsVerify from "../../pages/Authentification/Register/SmsVerify";
import ResetNewPass from "../../pages/Authentification/ResetPassword/ResetNewPass";
import ResetPassword from "../../pages/Authentification/ResetPassword/ResetPassword";
import ResetVerify from "../../pages/Authentification/ResetPassword/ResetVerify";
import Homepage from "../../pages/Homepage/homepage";
import MyEnrolledCourses from "../../pages/MyEnrolledCourses/MyEnrolledCourses";
import Speaker from "../../pages/Speaker/speaker";
import SpMycourses from "../../pages/SpeakerMyCourses/SpMycourses";
import ProtectedRoutes from "../protectedRoutes/protectedRoutes";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import Values from "../../context/Values";
import FilteredCourses from "../../components/FilteredCourses/FilteredCourses";
import TermsAndConditions from "../../components/TermsAndConditions/TermsAndConditions";
import { StateContext } from "../../context/Context";

export default function RoutesComp() {
  const { loggedIn } = useContext(StateContext);
  const values = Values();
  const { user, setUser } = values;

  useEffect(() => {
    try {
      loggedIn &&
        axios
          .get(`${process.env.REACT_APP_API_KEY}/api/v1/accounts/profile`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          })
          .then((res) => setUser(res.data))
          .catch((err) =>
            refresh(err.response.status, err.response.status.text)
          );
    } catch (error) { }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/resetVerify" element={<ResetVerify />} />
      <Route path="/setNewPassword" element={<ResetNewPass />} />
      <Route path="/verify" element={<SmsVerify />} />
      <Route path="/fio" element={<Fio />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/" element={<Homepage />} />
      <Route path="/aboutEduon" element={<AboutEduon />} />
      <Route path="/search/:value" element={<SearchPage />} />
      <Route path="/chosenCourse/:id" element={<ChosenCourse />} />
      <Route path="/speakerAbout/:id" element={<SpeakerAbout />} />
      <Route path="/courses/:id" element={<CoursesFilter />} />
      <Route path="/subCourses/:id" element={<ChosenCourseCategory />} />
      <Route path="/search" element={<Search />} />
      <Route path="/termsAndConditions" element={<TermsAndConditions />} />
      <Route path="/courses/filter/:value" element={<FilteredCourses />} />

      <Route element={<ProtectedRoutes />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/speaker" element={<Speaker user={user} />} />
        <Route path="/userAbout" element={<UserAbout user={user} />} />
        <Route path="/courseOpen" element={<CourseOpened user={user} />} />
        <Route path="/moneyOperations" element={<MoneyOperations />} />
        <Route path="/activeDevices" element={<Myactive user={user} />} />
        {/* <Route path="/example" element={<Example user={user} />} /> */}
        <Route path="/uploadCourse" element={<UploadCourse />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/favCourses" element={<Favourites />} />
        <Route path="/buy" element={<ShoppingCourses />} />
        <Route path="/watch/:id" element={<Watching />} />
        <Route path="/courseEdit/:id" element={<EditCourse />} />
        <Route
          path="/myEnrolledCourses"
          element={<MyEnrolledCourses user={user} />}
        />
        <Route path="/speakerMyCourses" element={<SpMycourses user={user} />} />
        <Route
          path="/speakerChosenCourse/:id"
          element={<SpChosenCourse user={user} />}
        />
      </Route>
      {/* <Route path="/" element={<Example user={user} />} /> */}

    </Routes>
  );
}
