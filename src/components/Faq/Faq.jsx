import React, { useContext } from "react";
import "./Faq.css";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { StateContext } from "../../context/Context";
import NavbarDemo from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import NavbarSm from "../Navbar/NavbarSm";

export default function Faq() {
  const { navStretch } = useContext(StateContext);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <>
      <NavbarDemo />
      <Sidebar />
      <NavbarSm />

      <div className={navStretch ? "ml-240 " : "ml-100 "}>
        <div className="faq">
          <div className="container">
            <h1 className="faqTitle">Ko’p beriladigan savollar</h1>
            <div className="rowGrid">
              <div className="col-18 col-sm-24">
                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                >
                  <AccordionSummary
                    expandIcon={
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <p> Naqd pul orqali ham to'lov qilish imkoni bormi?</p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <p>
                      Afsus buni imkoni yo'q. Bizning platformada to'lovlar faqat onlayn amalga oshiriladi.
                    </p>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel2"}
                  onChange={handleChange("panel2")}
                >
                  <AccordionSummary
                    expandIcon={
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                  >
                    <p> Mening akkauntimdan boshqa tanishlarim ham foydalansa bo'ladimi? </p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <p>
                      Yo'q. Bu bizning mijozlarimiz qadriyatlariga to'g'ri kelmaydigan ish hisoblanadi. Bitta akkauntdan faqat bir kishi foydalanishi mumkin
                    </p>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel3"}
                  onChange={handleChange("panel3")}
                >
                  <AccordionSummary
                    expandIcon={
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                  >
                    <p> Yuklagan kursim nega asosiy sahifada ko'rinmayabdi?</p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <p>
                      Kursingizni yuklab bo'lganizdan so'ng, bizning adminlar 48 soat  ichida kursingizni ko'rib chiqishadi va kursingiz talablarga javob berganidan so'ng tasdiqlanadi va platformaga chiqariladi.
                    </p>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel4"}
                  onChange={handleChange("panel4")}
                >
                  <AccordionSummary
                    expandIcon={
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                  >
                    <p> Kurslarni qanday xarid qilsam bo'ladi?</p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <p>
                      Kursni 2 xil usulda xarid qilish mumkin:
                      1. O'zingizga yoqqan kurslarni savatchaga qo'shib va barchasini bir vaqtda sotib olsa bo'ladi.
                      2. Ma'lum bir kursga kirib xarid qilish tugmasini bosib aynan o'sha kursni sotib olish.
                      Har ikkala usulda kurslarni sotib olish uchun, avval eduon dagi balansingizni to'ldirishingiz kerak bo'ladi.

                    </p>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel5"}
                  onChange={handleChange("panel5")}
                >
                  <AccordionSummary
                    expandIcon={
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                  >
                    <p> Qanday turdagi kurslar mavjud?</p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <p>
                      Eduon.uz platformasida turli xil sohalardagi onlayn kurslar mavjud.
                    </p>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel6"}
                  onChange={handleChange("panel6")}
                >
                  <AccordionSummary
                    expandIcon={
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                  >
                    <p> Bepul kurslar ham bormi?</p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <p>
                      Afsuski, bizda bepul kurslarni qo'yish va ko'rishni imkoni yo'q.
                    </p>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel7"}
                  onChange={handleChange("panel7")}
                >
                  <AccordionSummary
                    expandIcon={
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                  >
                    <p> Kursda o'qish uchun boshlang'ich bilim talab etiladimi?</p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <p>
                      Kursning darajasi hamma kursda har xil bo'ladi. Kurs darajasini kurs haqida ma'lumot bo'limidan ko'rishingiz mumkin.
                    </p>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel8"}
                  onChange={handleChange("panel8")}
                >
                  <AccordionSummary
                    expandIcon={
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                  >
                    <p> Sotib olgan kurslarim videolarini yuklab olsam bo'ladimi?</p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <p>
                      Xavfsizlik tomonidan buning ilojisi yo'q. Sotib olingan kursni faqatgina platformamiz orqali ko'rishingiz mumkin.
                    </p>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel9"}
                  onChange={handleChange("panel9")}
                >
                  <AccordionSummary
                    expandIcon={
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                  >
                    <p> Qo'shimcha o'zimning savollarimni qanday bersam bo'ladi?</p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <p>
                      +998 99 702 00 88 shu raqam orqali yoki telegramda @eduon_admin orqali biz bilan bog'lanishingiz mumkin.
                    </p>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
