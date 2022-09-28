import React, { useContext, useEffect } from "react";
import { StateContext } from "../../context/Context";
import NavbarDemo from "../Navbar/Navbar";
import NavbarSm from "../Navbar/NavbarSm";
import Sidebar from "../Sidebar/Sidebar";
import SidebarSm from "../Sidebar/SidebarSm";
import "./TermsAndConditions.css";

function TermsAndConditions() {
  const { navStretch } = useContext(StateContext);
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);
  return (
    <div className="termsAndConditions">
      <NavbarDemo />
      <NavbarSm />
      <Sidebar />
      <SidebarSm />
      <div className={navStretch ? "courses ml-240" : "courses ml-100"}>
        <div className="col-24">
          <h1>Platformadan foydalanish shartlari</h1>
          <h2>1. Umumiy qoidalar</h2>
          <p>
            EduOn platformasida spiker bo'lish uchun ro'yxatdan o'tganingizda, ushbu spiker shartlariga rioya qilishga rozilik bildirasiz. Spiker sifatida siz to'g'ridan-to'g'ri EduOn, (O'zbekistondagi ta’lim platformasi) bilan shartnoma tuzasiz.
          </p>
          <p>
            EduOn sizning veb sahifaga yuklangan shaxsiy ma’lumotlaringizni to’g’rilash yoki o’zgartirish huquqiga ega va har qanday holatda ham tarqalishidan himoya qilishni zimmasiga oladi. Kompaniya kontentni himoyalash maqsadida undan nusxa ko’chirish, yuklab olish va tarqatish holatlarini qat’iyan man etadi va veb sahifaga joylangan materiallar intellektual mulk agentligi tomonidan himoyalangan va EduOn ushbu mulk egasi hisoblanib undan foydalanish vakolatiga ega.
          </p>
          <h3>1.1 Kurs uchun shartlar</h3>
          <li style={{ listStyle: "disc" }}>Kurs boshqa birovga tegishli bo’lmasligi;
          </li>
          <li style={{ listStyle: "disc" }}>Kursda tamaki, alkogol va odamlarni psixologiyasiga yomon ta’sir ko’rsatuvchi lavhalar bo’lmasligi;
          </li>
          <li style={{ listStyle: "disc" }}>Kursning mavzusi to’liq yoritib berilishi;
          </li>
          <li style={{ listStyle: "disc" }}>Kurs kontenti kursni nomi va tarifiga mos kelishi;
          </li>
          <li style={{ listStyle: "disc" }}>Kursda kamida 4 ta video bo’lishi;
          </li>
          <li style={{ listStyle: "disc" }}>Kursni davomiyligi kamida 30 minutni tashkil etishi;
          </li>
          <li style={{ listStyle: "disc" }}>Kurs video o'lchami 16:9 formatda bo’lishi;
          </li>
          <li style={{ listStyle: "disc" }}>Kurs video sifati kamida 480K bo’lishi;
          </li>
          <h3>1.2 EduOn huquqi
          </h3>
          <li style={{ listStyle: "disc" }}>          Eduon kurs sotuvini oshirish va kursni taniqliligini oshirish maqsadida har bir kursga 90% gacha chegirma berish huquqiga ega;
          </li>
          <li style={{ listStyle: "disc" }}>          Eduon tamonidan kurs salohiyatini ko’tarish maqsadida kurs ma’lumotlariga o’zgartirishlar kiritilishi mumkin, agarda kurs ma’lumotlarida imloviy xatolar, berilgan chegaradan ko’proq ma’lumot va Eduon talablariga mos kelmaydigan ma’lumotni o’z ichiga olsa;
          </li>
          <li style={{ listStyle: "disc" }}>          Eduon,  siz tarafdan noodatiy trafik yoki foydalanish shartlari buzilishi kuzatilsa pul o’tkazmalar, kursni Eduon saytida ko’rinishini to’xtatish hamda balansni muzlatish huquqiga ega;
          </li>
          <li style={{ listStyle: "disc" }}>          Eduon siz tarafdan bajarilgan harakatlarga javob bermaydi.
          </li>
          <li style={{ listStyle: "disc" }}>          Tasdiqlangan kursga o’zgartirish kiritilsa, Eduon shu kursni ommaga ko’rinishini vaqtinchalik to’xtatib va qayta tekshirish huquqiga ega.
          </li>
          <h2>2. Atamalar</h2>
          <h3>          2.1. eduon.uz onlayn o’quv kursi bo’yicha xizmat ko’rsatish uchun tuzilgan mazkur shartnomada qo’llangan atamalar quyidagicha tushuniladi:
          </h3>
          <p>          «Shartnoma» - eduon.uz onlayn o’quv platformasi bo’yicha xizmat ko’rsatiluvchi amaldagi ushbu ommaviy oferta tushuniladi.
          </p>
          <p>          «Ariza» - Foydalanuvchining eduon.uzdagi shaxsiy kabineti, ro’yxatdan o’tgan elektron pochtasi orqali qilgan murojaatlari.
          </p>
          <p>          «eduon.uz» - Bilim beruvchi va bilim oluvchilarni bog’lovchi onlayn platforma.
          </p>
          <p>          «O’quv kursi» - Video, audio vizual, matn fayllar tarzida bitta mavzu va nom bilan birlashtirilgan o’quv materiallarining to’plami. O’quv kurslar tavsifi saytda taqdim etiladi. O’quv kurslari tarkibiy o’zgartirib borilishi mumkin.
          </p>
          <p>          «Shaxsiy kabinet» - Foydalanuvchining eduon.uz saytida ro’yxatdan o’tishi natijasida shakllangan, himoyalangan sahifalar to’plami. Oferta shartlari doirasida sayt funksiyalaridan foydalanishi mumkin bo’lgan sahifa. Shaxsiy kabinetga kirish foydalanuvchining saytga kirishda ko’rsatgan ma’lumotlari (login va parol) asosida amalga oshiriladi.
          </p>
          <p>«Tomonlar» - Foydalanuvchi va eduon.uz xizmati.
          </p>
          <p>«Hisob» -o’rnatilgan xizmat va topshirilgan mahsulot (o’quv materiallari) haqini to'lash uchun taqdim etilgan, shaxsiy kabinetdan yoki foydalanuvchining ro'yxatdan o’tish vaqtidagi elektron pochtasiga yuborilgan to’lov xabarnomasi.
          </p>
          <p>«Xizmatlar» -eduon.uz saytida dasturlashni o’rgatish bo’yicha o’quv materiallarini onlayn taqdim etish va shu sayt orqali ko’rsatiladigan boshqa xizmatlar.
          </p>
          <h3>
            2.2. Atamalar bo’yicha tushunmovchilik yuzaga kelganda O’zbekiston Respublikasining amaldagi qonunlari va Internetning texnik talablariga muvofiq hal qilinadi.
          </h3>
          <h2>3. Shartnoma tuzish tartibi
          </h2>
          <h3>3.1. O’zbekiston Respublikasi Fuqarolik Kodeksining 370-moddasiga asosan foydalanuvchi tomonidan quyidagi harakatlarning amalga oshirilishi Mazkur taklifni to’laligicha qabul qilish hisoblanadi:
          </h3>
          <p>3.1.1. eduon.uz saytida ro’yxatdan o’tish;
          </p>
          <p>3.1.2. Foydalanuvchi ro’yxatdan o’tgandan so’ng unga elektron hamyon ochiladi va o’tkazmalar shu hamyon orqali Ucoin sistemasi yordamida amalga oshiriladi. Ucoin haqida batafsil ma'lumotni shu https://universalbank.uz havolaga o'tib bilib olishingiz mumkin.
          </p>
          <p>3.1.3. Tanlagan o’quv kursi uchun to’lovni amalga oshirish.
          </p>
          <h2>4. Tomonlarning huquq va majburiyatlari</h2>
          <h3>4.1. Spikerning majburiyatlari</h3>
          <p>Spiker sifatida siz o'zingiz joylashtirgan barcha kontent uchun, shu jumladan ma'ruzalar, viktorinalar, kodlash mashqlari, amaliy mashg'ulotlar, topshiriqlar, manbalar, javoblar, kursga kirish sahifasi kontenti va e'lonlari ("Taqdim etilgan kontent") uchun javobgarsiz.
          </p>
          <p>Siz quyidagilarni taqdim etasiz va kafolat berasiz:
          </p>
          <p>Siz aniq ma'lumotlarini taqdim etasiz va saqlaysiz;
          </p>
          <p>Sizning kontentingiz har qanday uchinchi tomonning intellektual mulk huquqlarini buzmaydi yoki o'zlashtirmaydi;
          </p>
          <p>Siz o'zingizning taqdim etilgan kontentingiz va xizmatlardan foydalanish orqali siz taklif qilayotgan xizmatlarni o'rgatish va taklif qilish uchun kerakli malaka, ma'lumot va tajribaga (shu jumladan ta'lim, o'qitish, bilim va mahorat to'plamlariga) egasiz;
          </p>
          <p>Siz o'zingizning faoliyat sohangiz standartlariga va umuman ko'rsatma xizmatlariga mos keladigan xizmat sifatini ta'minlaysiz.
          </p>
          <p>Siz shunday qilmasligingizga kafolat berasiz:
          </p>
          <p>          Har qanday noo'rin, haqoratli, irqchi, nafratlanuvchi, seksistik, pornografik, yolg'on, chalg'ituvchi, noto'g'ri, yoki tuhmat qilingan kontent yoki ma'lumotlarni joylashtirish yoki taqdim etish;
          </p>
          <p>Xizmatlar orqali yoki biron bir foydalanuvchiga istalgan yoki ruxsatsiz reklama, reklama materiallari, keraksiz pochta xabarlari, spam yoki boshqa iltimosnoma shakllarini (tijorat yoki boshqa) yuborish yoki uzatish;
          </p>
          <p>Xizmatlardan, o'quvchilarga o'qitish xizmatlarini ko'rsatishdan boshqa maqsadlar uchun foydalanish;
          </p>
          <p>Boshqa shaxsni taqlid qilish yoki boshqa shaxsning hisob raqamiga ruxsatsiz kirish huquqini olish;
          </p>
          <p>Boshqa spikerlarga o'zlarining xizmatlarini yoki kurslarini taqdim etishlariga aralashish yoki boshqa yo'l bilan to'sqinlik qilish;
          </p>
          <h2>5. Ishonch va havsizlik
          </h2>
          <h3>5.1.Ishonch va xavfsizlik siyosati
          </h3>


          <p>          Biz kurslarni olib tashlash, to'lovlarni to'xtatib turish va  yoki spikerlarni har qanday sababga ko'ra har qanday vaqtda, oldindan ogohlantirmasdan, shu jumladan quyidagi hollarda olib tashlash huquqini o'zida saqlab qolamiz:
          </p>
          <p>          O'qituvchi yoki kurs bizning siyosatimizga yoki qonuniy shartlariga (shu jumladan, foydalanish shartlariga) mos kelmasa;
          </p>
          <p>          Kurs bizning sifat standartlarimizdan pastroq bo'lsa yoki talabalar tajribasiga salbiy ta'sir ko'rsatsa;
          </p>

          <h3>          5.2.Boshqa foydalanuvchilar bilan aloqalar
          </h3>
          <p>          Siz olgan ma'lumotlaringizdan EduOn platformasida o'sha talabalarga o'z xizmatlaringizni ko'rsatishdan boshqa maqsadda foydalanmasligingizga va qo'shimcha shaxsiy ma'lumotlar so'ramasligingizga yoki talabalarning shaxsiy ma'lumotlarini EduOn platformasidan tashqarida saqlamasligingizga rozilik bildirasiz. Siz EduOn kompaniyasiga talabalarning shaxsiy ma'lumotlaridan foydalanish bilan bog'liq har qanday da'volardan tovon puli to'laysiz.
          </p>
          <h2> 6. Narxlar
          </h2>


          <p>         Narxlar EduOn platformasida minimum 50000 so'm bo’lishi lozim. Shu narxga to’g’ri kelmagan holda spiker ogohlantiriladi.
          </p>
          <h2>7. To'lovlar</h2>
          <h3>7.1.Daromad ulushi</h3>


          <p>Daromad ulushlari EduOn ma’muriyati tomonidan 70% (Spiker) va 30% (EduOn) etib belgilangan. Eduon tarafidan taqdim etilgan tizimlar orqali spikerni o’zi jalb qilgan auditoriyadan kelgan daromaddan ulushlari o’zgarishi mumkin.
          </p>
          <h3>7.2 To'lovlarni qabul qilish
          </h3>
          <p>Sizga o'z vaqtida to'lashimiz uchun siz Click yoki PayMe hisob qaydnomangizga egalik qilishingiz va sizning akkauntingiz bilan bog'liq to'g'ri elektron pochta xabarlarini bizga yetkazishingiz kerak. Biz aniqlangan firibgarliklar, intellektual mulk huquqlari buzilganligi yoki boshqa qonun hujjatlari buzilgan taqdirda biz mablag' to'lamaslik huquqini o'zimizda saqlab qolamiz.
          </p>
          <h3>7.3.Pulni qaytarish
          </h3>
          <p>Spikerlar foydalanish shartlari bo'yicha pul mablag'lari qaytarib beriladigan operatsiyalardan daromad olmaydilar. Agar talaba tegishli spikerning to'lovini to'laganimizdan keyin pulni qaytarib berishini so'rasa, biz (1) o'qituvchiga yuborilgan keyingi to'lovdan qaytariladigan summani ushlab qolish huquqiga egamiz yoki (2) qo'shimcha to'lovlar olinmasa, spikerdan to'lovlar qaytariladigan summani qoplash uchun yetarli bo’lmasa, spikerdan qaytarilish zarur bo’lgan har qanday summani qaytarishni talab qilinadi.
          </p>
          <h3>7.4 Pul yechib olish
          </h3>
          <p>Spiker EduOn platformasidagi pulini kartasiga yechib olayotganida undan 1.5% ushlab qolinishini inobatga olishi kerak bo'ladi.
          </p>
          <h2>8. Savdo belgisi</h2>


          <p>          Quyida keltirilgan talablarga rioya qilgan holda, biz sizga vakolat bergan joyda bizning savdo belgilarimizdan foydalanishingiz mumkin.
          </p>
          <p>          Siz foydalanishingiz mumkin:
          </p>
          <p>          Biz e'lon qilishimiz mumkin bo'lgan har qanday ko'rsatmalarda biz sizga taqdim etadigan savdo belgilarimiz rasmlaridan foydalaning;
          </p>
          <p>          Bizning savdo belgilarimizdan faqat EduOn kurslarini reklama qilish va sotish yoki EduOn’da ishtirok etish bilan bog'liq holda foydalaning;
          </p>

          <p>          Siz qilmasligingiz kerak:
          </p>
          <p>          Savdo belgilarimizdan sizning kurslaringiz yoki xizmatlaringizni qo'llab-quvvatlashimiz, homiylik qilishimiz yoki tasdiqlashimizni anglatadigan tarzda foydalanish;
          </p>
          <h2>
            9. Akkauntingizni o'chirish</h2>
          <p>          Akkauntingizni o'chirib tashlamasdan oldin biz sizga qolgan barcha rejalashtirilgan to'lovlarni amalga oshirish uchun tijorat maqsadlarida harakat qilamiz. Agar siz talabalar ilgari sizning kurslaringizga yozilgan bo'lsa, sizning ismingiz va yuborilgan kontentga sizning akkauntingiz o'chirilgandan so'ng ushbu talabalar kirish huquqini saqlab qolishlarini tushunasiz. Agar sizga yordam kerak bo'lsa yoki hisobingizni o'chirishda qiyinchiliklarga duch kelsangiz, bizni qo'llab-quvvatlash markazimiz orqali bog'lanishingiz mumkin.
          </p>
          <h2>          10. Turli xil huquqiy atamalar:
          </h2>
          <h3>10.1. Ushbu shartlarni yangilash
          </h3>

          <p>Vaqti-vaqti bilan biz ushbu shartlarni amaliyotimizni aniqlashtirish yoki yangi yoki turli xil amaliyotlarni aks ettirish uchun yangilashimiz mumkin (masalan, yangi xususiyatlarni qo'shganda) va EduOn ushbu shartlarni o'zgartirish va / yoki o'zgartirish kiritish huquqini o'zida saqlab qoladi. Har qanday holatda. Agar biz biron bir muhim o'zgarishlarni amalga oshirsak, biz sizning akkauntingizda ko'rsatilgan elektron pochta manziliga xabar beramiz. O'zgartirishlar, agar boshqacha ko'rsatilmagan bo'lsa, e'lon qilingan kundan boshlab kuchga kiradi.
          </p>
          <p>O'zgarishlar kuchga kirgandan keyin bizning xizmatlarimizdan doimiy ravishda foydalanishingiz ushbu o'zgarishlarni qabul qilishingizni anglatadi. Har qanday qayta ko'rib chiqilgan shartlar avvalgi shartlarning o'rnini bosadi.
          </p>
          <h3>10.2. Tarjimalar
          </h3>
          <p>Ushbu shartlarning o’zbek tilidan boshqa har qanday versiyasi qulaylik uchun taqdim etiladi.
          </p>
          <h3>10.3. Oramizdagi munosabatlar
          </h3>
          <p>Siz va biz hech qanday qo'shma korxona, sheriklik, ish bilan ta'minlash, pudratchi yoki agentlik munosabatlari oramizda mavjud emasligiga qo'shilamiz.
          </p>
          <h3>11. Biz bilan qanday bog'lanish mumkin
          </h3>
          <p>Biz bilan bog'lanishning eng yaxshi usuli - qo'llab-quvvatlash guruhimizga murojaat qilishdir. Sizning savollaringiz, tashvishlaringiz va bizning xizmatlarimiz haqidagi fikr-mulohazalaringizni eshitishga tayyormiz. (+998997020088)</p>


































          {/*  */}
          {/* <p>
            2.1. eduon.uz onlayn o’quv kursi bo’yicha xizmat ko’rsatish uchun
            tuzilgan mazkur shartnomada qo’llangan atamalar quyidagicha
            tushuniladi:
          </p>
          <p>
            «Shartnoma» - eduon.uz onlayn o’quv platformasi bo’yicha xizmat
            ko’rsatiluvchi amaldagi ushbu ommaviy oferta tushuniladi.
          </p>
          <p>
            «Ariza» - Foydalanuvchining eduon.uzdagi shaxsiy kabineti,
            ro’yxatdan o’tgan elektron pochtasi orqali qilgan murojaatlari.{" "}
          </p>
          <p>
            «eduon.uz» - Bilim beruvchi va bilim oluvchilarni bog’lovchi onlayn
            platforma.{" "}
          </p>
          <p>
            «O’quv kursi» - Video, audio vizual, matn fayllar tarzida bitta
            mavzu va nom bilan birlashtirilgan o’quv materiallarining to’plami.
            O’quv kurslar tavsifi saytda taqdim etiladi. O’quv kurslari tarkibiy
            o’zgartirib borilishi mumkin.{" "}
          </p>
          <p>
            «Shaxsiy kabinet» - Foydalanuvchining eduon.uz saytida ro’yxatdan
            o’tishi natijasida shakllangan, himoyalangan sahifalar to’plami.
            Oferta shartlari doirasida sayt funksiyalaridan foydalanishi mumkin
            bo’lgan sahifa. Shaxsiy kabinetga kirish foydalanuvchining saytda
            kirishda ko’rsatgan ma’lumotlari (login va parol) asosida amalga
            oshiriladi.{" "}
          </p>
          <p>«Tomonlar» - Foydalanuvchi va eduon.uz xizmati. </p>
          <p>
            «Hisob» -o’rnatilgan xizmat va topshirilgan mahsulot (o’quv
            materiallari) haqini to'lash uchun taqdim etilgan, shaxsiy
            kabinetdan yoki foydalanuvchining ro'yxatdan o’tish vaqtidagi
            elektron pochtasiga yuborilgan to’lov xabarnomasi.{" "}
          </p>
          <p>
            «Xizmatlar» -eduon.uz saytida dasturlashni o’rgatish bo’yicha o’quv
            materiallarini onlayn taqdim etish va shu sayt orqali
            ko’rsatiladigan boshqa xizmatlar.{" "}
          </p>
          <p>
            2.2. Atamalar bo’yicha tushunmovchilik yuzaga kelganda O’zbekiston
            Respublikasining amaldagi qonunlari va Internetning texnik
            talablariga muvofiq hal qilinadi.
          </p>
          <h2>3. Shartnoma tuzish tartibi</h2>
          <p>
            3.1. O’zbekiston Respublikasi Fuqarolik Kodeksining 370-moddasiga
            asosan foydalanuvchi tomonidan quyidagi harakatlarning amalga
            oshirilishi Mazkur taklifni to’laligicha qabul qilish hisoblanadi:
          </p>
          <p>3.1.1. eduon.uz saytida ro’yxatdan o’tish;</p>
          <p>3.1.2. Tanlagan o’quv kursi uchun to’lovni amalga oshirish.</p>
          <h2>4. Tomonlarning huquq va majburiyatlari</h2>
          <p>4.1. Spikerning majburiyatlari</p>
          <p>
            Spiker sifatida siz o'zingiz joylashtirgan barcha kontent uchun, shu
            jumladan ma'ruzalar, viktorinalar, kodlash mashqlari, amaliy
            mashg'ulotlar, topshiriqlar, manbalar, javoblar, kursga kirish
            sahifasi kontenti va e'lonlari ("Taqdim etilgan kontent") uchun
            javobgarsiz.
          </p>
          <p>
            <strong>Siz quyidagilarni taqdim etasiz va kafolat berasiz:</strong>
          </p>
          <li style={{ listStyle: "disc" }}>
            Siz aniq ma'lumotlarini taqdim etasiz va saqlaysiz;
          </li>
          <li style={{ listStyle: "disc" }}>
            Sizning kontentingiz har qanday uchinchi tomonning intellektual mulk
            huquqlarini buzmaydi yoki o'zlashtirmaydi;{" "}
          </li>
          <li style={{ listStyle: "disc" }}>
            Siz o'zingizning taqdim etilgan kontentingiz va xizmatlardan
            foydalanish orqali siz taklif qilayotgan xizmatlarni o'rgatish va
            taklif qilish uchun kerakli malaka, ma'lumot va tajribaga (shu
            jumladan ta'lim, o'qitish, bilim va mahorat to'plamlariga) egasiz;{" "}
          </li>
          <li style={{ listStyle: "disc" }}>
            Siz o'zingizning faoliyat sohangiz standartlariga va umuman
            ko'rsatma xizmatlariga mos keladigan xizmat sifatini ta'minlaysiz.
          </li>
          <p>
            <strong>Siz shunday qilmasligingizga kafolat berasiz: </strong>
          </p>
          <li style={{ listStyle: "disc" }}>
            Har qanday noo'rin, haqoratli, irqchi, nafratlanuvchi, seksistik,
            pornografik, yolg'on, chalg'ituvchi, noto'g'ri, yoki tuhmat qilingan
            kontent yoki ma'lumotlarni joylashtirish yoki taqdim etish;
          </li>
          <li style={{ listStyle: "disc" }}>
            Xizmatlar orqali yoki biron bir foydalanuvchiga istalgan yoki
            ruxsatsiz reklama, reklama materiallari, keraksiz pochta xabarlari,
            spam yoki boshqa iltimosnoma shakllarini (tijorat yoki boshqa)
            yuborish yoki uzatish;
          </li>
          <li style={{ listStyle: "disc" }}>
            Xizmatlardan, o'quvchilarga o'qitish xizmatlarini ko'rsatishdan
            boshqa maqsadlar uchun foydalanish;
          </li>
          <li style={{ listStyle: "disc" }}>
            Boshqa shaxsni taqlid qilish yoki boshqa shaxsning hisob raqamiga
            ruxsatsiz kirish huquqini olish;
          </li>
          <li style={{ listStyle: "disc" }}>
            Boshqa spikerlarga o'zlarining xizmatlarini yoki kurslarini taqdim
            etishlariga aralashish yoki boshqa yo'l bilan to'sqinlik qilish;
          </li>
          <li style={{ listStyle: "disc" }}>
            Boshqa spikerlarga o'zlarining xizmatlarini yoki kurslarini taqdim
            etishlariga aralashish yoki boshqa yo'l bilan to'sqinlik qilish;
          </li>
          <h2>5. Ishonch va havsizlik</h2>
          <p>5.1.Ishonch va xavfsizlik siyosati</p>
          <p>
            Biz kurslarni olib tashlash, to'lovlarni to'xtatib turish va / yoki
            spikerlarni har qanday sababga ko'ra har qanday vaqtda, oldindan
            ogohlantirmasdan, shu jumladan quyidagi hollarda olib tashlash
            huquqini o'zida saqlab qolamiz:{" "}
          </p>
          <li style={{ listStyle: "disc" }}>
            o'qituvchi yoki kurs bizning siyosatimizga yoki qonuniy shartlariga
            (shu jumladan, foydalanish shartlariga) mos kelmasa;
          </li>
          <li style={{ listStyle: "disc" }}>
            kurs bizning sifat standartlarimizdan pastroq bo'lsa yoki talabalar
            tajribasiga salbiy ta'sir ko'rsatsa;
          </li>
          <li style={{ listStyle: "disc" }}>
            kurs bizning sifat standartlarimizdan pastroq bo'lsa yoki talabalar
            tajribasiga salbiy ta'sir ko'rsatsa;
          </li>
          <li style={{ listStyle: "disc" }}>
            kurs bizning sifat standartlarimizdan pastroq bo'lsa yoki talabalar
            tajribasiga salbiy ta'sir ko'rsatsa;
          </li>
          <p>5.2.Boshqa foydalanuvchilar bilan aloqalar</p>
          <p>
            Spikerlar talabalar bilan to'g'ridan-to'g'ri shartnomaviy
            munosabatlarga ega emaslar, shuning uchun siz talabalar to'g'risida
            faqatgina xizmatlar orqali sizga taqdim etiladigan ma'lumotlardir.
            Siz olgan ma'lumotlaringizdan EduOn platformasida o'sha talabalarga
            o'z xizmatlaringizni ko'rsatishdan boshqa maqsadda
            foydalanmasligingizga va qo'shimcha shaxsiy ma'lumotlar
            so'ramasligingizga yoki talabalarning shaxsiy ma'lumotlarini EduOn
            platformasidan tashqarida saqlamasligingizga rozilik bildirasiz. Siz
            EduOn kompaniyasiga talabalarning shaxsiy ma'lumotlaridan
            foydalanish bilan bog'liq har qanday da'volardan tovon puli
            to'laysiz.
          </p>
          <h2>6. Narxlar</h2>
          <p>
            Narxlar EduOn tomonidan pullik kurslarga qat’iy o’rnatilgan 5$-200$
            gacha bo’lgan tartibda belgilanishi lozim. Ushbu shartlar buzilishi
            ogohlantirish, keyinchalik tovon puli to’lanishiga olib keladi.
          </p>
          <h2>7. To'lovlar</h2>
          <p>7.1.Daromad ulushi</p>
          <p>
            Daromad ulushlari EduOn ma’muriyati tomonidan 70% (Spiker) va 30%
            (EduOn) etib belgilangan. Eduon tarafidan taqdim etilgan tizimlar
            orqali Spikerni o’zi jalb qilgan auditoriyadan kelgan daromaddan
            ulushlari o’zgarishi mumkin.
          </p>
          <p>7.2To'lovlarni qabul qilish</p>
          <p>
            Sizga o'z vaqtida to'lashimiz uchun siz Click yoki PayMe hisob
            qaydnomangizga egalik qilishingiz va sizning akkauntingiz bilan
            bog'liq to'g'ri elektron pochta xabarlarini bizga yetkazishingiz
            kerak. Biz aniqlangan firibgarliklar, intellektual mulk huquqlari
            buzilganligi yoki boshqa qonun hujjatlari buzilgan taqdirda biz
            mablag' to'lamaslik huquqini o'zimizda saqlab qolamiz.{" "}
          </p>
          <p>7.3.Pulni qaytarish</p>
          <p>
            Spikerlar foydalanish shartlari bo'yicha pul mablag'lari qaytarib
            beriladigan operatsiyalardan daromad olmaydilar. Agar talaba biz
            tegishli spikerning to'lovini to'laganimizdan keyin pulni qaytarib
            berishni so'rasa, biz (1) o'qituvchiga yuborilgan keyingi to'lovdan
            qaytariladigan summani ushlab qolish huquqiga egamiz yoki (2)
            qo'shimcha to'lovlar olinmasa, spikerdan to'lovlar qaytariladigan
            summani qoplash uchun yetarli bo’lmasa, spikerdan qaytarilish zarur
            bo’lgan har qanday summani qaytarishni talab qilinadi.
          </p>
          <h2>8. Savdo belgisi</h2>
          <p>
            Quyida keltirilgan talablarga rioya qilgan holda, biz sizga vakolat
            bergan joyda bizning savdo belgilarimizdan foydalanishingiz mumkin.{" "}
          </p>
          <p>Siz foydalanishingiz mumkin</p>
          <li style={{ listStyle: "disc" }}>
            biz e'lon qilishimiz mumkin bo'lgan har qanday ko'rsatmalarda biz
            sizga taqdim etadigan savdo belgilarimiz rasmlaridan foydalaning;
          </li>
          <li style={{ listStyle: "disc" }}>
            bizning savdo belgilarimizdan faqat EduOn kurslarini reklama qilish
            va sotish yoki EduOn’da ishtirok etish bilan bog'liq holda
            foydalaning;
          </li>
          <li style={{ listStyle: "disc" }}>
            Sizdan foydalanishni to'xtatishni so'rasak, darhol bajaring;
          </li>
          <p>Siz qilmasligingiz kerak:</p>
          <li style={{ listStyle: "disc" }}>
            Sizdan foydalanishni to'xtatishni so'rasak, darhol bajaring;
          </li>
          <li style={{ listStyle: "disc" }}>
            savdo belgilarimizdan sizning kurslaringiz yoki xizmatlaringizni
            qo'llab-quvvatlashimiz, homiylik qilishimiz yoki tasdiqlashimizni
            anglatadigan tarzda foydalanish;
          </li>
          <li style={{ listStyle: "disc" }}>
            savdo belgilarimizdan sizning kurslaringiz yoki xizmatlaringizni
            qo'llab-quvvatlashimiz, homiylik qilishimiz yoki tasdiqlashimizni
            anglatadigan tarzda foydalanish;
          </li>
          <h2>9. Akkauntingizni o'chirish</h2>
          <p>
            Akkauntingizni o'chirib tashlamasdan oldin biz sizga qolgan barcha
            rejalashtirilgan to'lovlarni amalga oshirish uchun tijorat
            maqsadlarida harakat qilamiz. Agar siz talabalar ilgari sizning
            kurslaringizga yozilgan bo'lsa, sizning ismingiz va yuborilgan
            kontentga sizning akkauntingiz o'chirilgandan so'ng ushbu talabalar
            kirish huquqini saqlab qolishlarini tushunasiz. Agar sizga yordam
            kerak bo'lsa yoki hisobingizni o'chirishda qiyinchiliklarga duch
            kelsangiz, bizni qo'llab-quvvatlash markazimiz orqali
            bog'lanishingiz mumkin.
          </p>
          <h2>10. Turli xil huquqiy atamalar:</h2>
          <p>10.1. Ushbu shartlarni yangilash</p>
          <p>
            Vaqti-vaqti bilan biz ushbu shartlarni amaliyotimizni aniqlashtirish
            yoki yangi yoki turli xil amaliyotlarni aks ettirish uchun
            yangilashimiz mumkin (masalan, yangi xususiyatlarni qo'shganda) va
            EduOn ushbu shartlarni o'zgartirish va / yoki o'zgartirish kiritish
            huquqini o'zida saqlab qoladi. Har qanday holatda. Agar biz biron
            bir muhim o'zgarishlarni amalga oshirsak, biz sizning akkauntingizda
            ko'rsatilgan elektron pochta manziliga xabar beramiz.
            O'zgartirishlar, agar boshqacha ko'rsatilmagan bo'lsa, e'lon
            qilingan kundan boshlab kuchga kiradi.{" "}
          </p>
          <p>
            O'zgarishlar kuchga kirgandan keyin bizning xizmatlarimizdan doimiy
            ravishda foydalanishingiz ushbu o'zgarishlarni qabul qilishingizni
            anglatadi. Har qanday qayta ko'rib chiqilgan shartlar avvalgi
            shartlarning o'rnini bosadi.
          </p>
          <p>10.2. Tarjimalar</p>
          <p>
            Ushbu shartlarning o’zbek tilidan boshqa har qanday versiyasi
            qulaylik uchun taqdim etiladi.
          </p>
          <p>10.3. Oramizdagi munosabatlar</p>
          <p>
            Siz va biz hech qanday qo'shma korxona, sheriklik, ish bilan
            ta'minlash, pudratchi yoki agentlik munosabatlari oramizda mavjud
            emasligiga qo'shilamiz.
          </p>
          <h2>11. Biz bilan qanday bog'lanish mumkin</h2>
          <p>
            Biz bilan bog'lanishning eng yaxshi usuli - qo'llab-quvvatlash
            guruhimizga murojaat qilishdir. Sizning savollaringiz,
            tashvishlaringiz va bizning xizmatlarimiz haqidagi
            fikr-mulohazalaringizni eshitishga tayyormiz. (+998997020088)
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;
