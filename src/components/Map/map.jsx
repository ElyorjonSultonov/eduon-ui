import React from 'react'
import { ReactWorldCountriesMap } from "react-world-countries-map"  
import './map.css'
export default function Map() {
    const data =
    [
      { country: "cn", value: 18778 }, // china
      { country: "uz", value: 34000000 }, // uzbekistan
      { country: "in", value: 1559204 }, // india
      { country: "us", value: 33188 },  // united states
      { country: "id", value: 26493 },  // indonesia
      { country: "pk", value: 210796 },  // pakistan
      { country: "af", value: 21591 },  // brazil
      { country: "kz", value: 9908614 },  // kazakhstan
      { country: "tj", value: 16190005 },  // tajikistan
      { country: "ru", value: 14194410 },  // russia
      { country: "kg", value: 12180112 },   // kirgystan
      { country: "mn", value: 12180112 }   // mongolia
    ]

  return (
    <div className='map'>
         <ReactWorldCountriesMap className="worldMap" color="#006AFF"  value-suffix="people" size="lg" data={data} />
    </div>
  )
}
