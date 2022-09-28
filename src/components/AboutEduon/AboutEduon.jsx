import React, { useContext, useEffect } from "react";
import "./AboutEduon.css";
import { StateContext } from "../../context/Context";
import partner1 from "../../assets/images/image 59.png";
import partner2 from "../../assets/images/image 60.png";
import partner3 from "../../assets/images/image 61.png";
import partner4 from "../../assets/images/image 62.png";
import partner5 from "../../assets/images/image 64.png";
import AboutEduonIMg from "../../assets/images/abouteduonimg.png";
import AboutEduonVideo from "../../assets/images/abouteduonvideo.png";
import Useful from "../../assets/images/useful.png"
import We from "../../assets/images/we.png"


import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footers/Footer";
import NavbarDemo from "../Navbar/Navbar";
import NavbarSm from "../Navbar/NavbarSm";
export default function AboutEduon(props) {
  const { navStretch } = useContext(StateContext);
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);
  return (
    <div className="about">
      <NavbarDemo />
      <NavbarSm />
      <Sidebar />
      <div className={navStretch ? "courses ml-240" : "courses ml-100"}>
        <div className="aboutEduon">
          <div className="container">
            <h1 className="title eduonTitle">Eduon platformasi haqida</h1>
            <div className="useful">
              <div className="rowGrid">
                <div className="col-12 col-lg-12 col-sm-24">
                  <img src={Useful} alt={Useful} />
                </div>
                <div className="col-12 col-lg-12 col-sm-24 smMedia">
                  <h1>Foydali bilm va ko’nikmalarni biz <br />
                    bilan istalgan joyda tez, onson va <br /> sifatli o’rganing!</h1>
                  <p>Treninglar, seminarlar, vebinar va onlayn darsliklar uchun yagona <br /> o’zbek tilidagi sifatli platforma. <br /> <br />
                    EduOn MFaktor tomonidan har kimga, hamma joyda hayotni <br /> o'zgartiradigan ta'lim tajribalarini taqdim etish niyatida asos <br /> solingan <br /> <br />
                    Hozirda bu O'zbekiston bo'ylab million o'quvchi kelajak <br /> ko'nikmalarini o'rganish uchun yetakchi onlayn ta'lim platformasi <br /><br />
                    O'zbekistonning dan ortiq eng yaxshi universitetlari va soha <br /> o'qituvchilari EduOn bilan hamkorlik qilib, kurslar, mutaxassisliklar, <br /> sertifikatlar va diplom dasturlarini taklif qilmoqdalar <br />
                    Muvaffaqiyatli insonlar ilmi bilan bo’lishamiz</p>
                </div>
              </div>
              <h1 className="usefulTitle">Ta’lim olishning yangi darajasini his qiling!</h1>
              <p className="usefulText">Istalgan mavzudagi videodarslik, seminar, vebinar va treninglar katalogi siz uchun <br /> shay! Sizdan faqat yo’nalish tanlash va ilm olishgini talab qilinadi!</p>
              <div className="rowGrid justify-center align-center Text-center">
                <div className="number">
                  <h1>50,000</h1>
                  <p>Platforma umumiy foydalanuvchilari</p>
                </div>
                <div className="number">
                  <h1>+1,500</h1>
                  <p>Umumiy kurslar soni</p>
                </div>
                <div className="number">
                  <h1>+20</h1>
                  <p>Jamoamiz a’zolari</p>
                </div>
                <div className="number">
                  <h1>+150</h1>
                  <p>Spiker va ustozlarimiz</p>
                </div>
              </div>
            </div>
            <div className="ourTeam">
              <h1 className="title">Bizning jamoa</h1>
              <div className="ourTeamImg">
                <img src={We} alt={We} />
              </div>
            </div>
            {/* ----------------------- */}
            <div className="aboutEduonImgs">
              <div className="aboutEduonImg">
                <img src={AboutEduonIMg} alt="..........." />
              </div>
              <div className="aboutEduonText">
                <h1>Maqsadlar</h1>
                <p>
                  EduOn dagi har bir kursni jahon miqyosidagi universitetlar
                  va kompaniyalarning ustozlari <br /> o'qitadilar, shuning
                  uchun siz istagan vaqtingizda va istagan joyda yangi
                  narsalarni <br />
                  o'rganishingiz mumkin Yuzlab kurslar talab bo'yicha video
                  ma'ruzalar, uy vazifalari mashqlari va jamoatchilik <br />
                  muhokamalari forumlariga kirish imkoniyatini beradi. Har
                  kuni o'zingiz uchun yangilik <br /> kashf eting
                </p>
              </div>
            </div>
            <div className="partners">
              <h1 className="title">Hamkorlarimiz</h1>
              <div className="partnersImg">
                <img src={partner1} alt="..." />
                <img src={partner2} alt="..." />
                <img src={partner3} alt="..." />
                <img src={partner4} alt="..." />
                <img src={partner5} alt="..." />
              </div>
            </div>
            <div className="videoBrifing">
              <div className="rowGrid">
                <div className="col-24">
                  <h1 className="title">Video brifing</h1>
                  <img src={AboutEduonVideo} alt="..." />
                </div>
              </div>
            </div>
            <div className="contact">
              <h1 className="title">Ma'muriyat bilan aloqa</h1>
              <h2>info@eduon.uz</h2>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
