// import React from 'react'
// import "./example.css"

// export default function Example() {
//   return (
//     <div className='example'>
//            <div className="rowGrid">
//               {props.Infos.map((item, index) => (
//                 <div
//                   key={index}
//                   onClick={() => {
//                     setCardNum(item.card_number);
//                     setExpire(
//                       item.expire
//                         .replace(/[^0-9]/g, "")
//                         .replace(/^([2-9])$/g, "0$1")
//                         .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
//                         .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, "$1/$2")
//                     );
//                   }}
//                   className="savedCart col-24"
//                 >
//                   <div className="fl-row lifetime">
//                     <div className="saved">
//                       <h1>
//                         {item.card_number?.slice(0, 4)} **** ****{" "}
//                         {item.card_number.slice(12)}
//                       </h1>
//                       <p className="text">Amal qilish muddati</p>
//                       <p>
//                         {item.expire?.slice(0, 2) +
//                           "/" +
//                           item.expire?.slice(2, 4)}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//     </div>
//   )
// }
