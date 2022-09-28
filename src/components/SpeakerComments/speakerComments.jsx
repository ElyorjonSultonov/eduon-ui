import React, { useState, useEffect } from 'react'
import './speakerComments.css'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function SpeakerComments() {
    const data = [
        {
            name: "Yan",
            uv: 190,
            pv: 2400,
            amt: 2400,
        },
        {
            name: "Fev",
            uv: 250,
            pv: 1398,
            amt: 2210,
        },
        {
            name: "Mar",
            uv: 190,
            pv: 9800,
            amt: 2290,
        },
        {
            name: "Apr",
            uv: 190,
            pv: 3908,
            amt: 2000,
        },
        {
            name: "May",
            uv: 310,
            pv: 4800,
            amt: 2181,
        },
        {
            name: "Iyun",
            uv: 240,
            pv: 3800,
            amt: 2500,
        },
        {
            name: "Iyul",
            uv: 200,
            pv: 4300,
            amt: 2100,
        },
        {
            name: "Avg",
            uv: 600,
            pv: 4300,
            amt: 2100,
        },
        {
            name: "Sen",
            uv: 500,
            pv: 4300,
            amt: 2100,
        },
        {
            name: "Okt",
            uv: 510,
            pv: 4300,
            amt: 2100,
        },
        {
            name: "Noy",
            uv: 1000,
            pv: 4300,
            amt: 2100,
        },
        {
            name: "Dek",
            uv: 700,
            pv: 4300,
            amt: 2100,
        },
    ];
    const [windowDimenion, detectHW] = useState({
        winWidth: window.innerWidth,
        winHeight: window.innerHeight,
    })

    const detectSize = () => {
        detectHW({
            winWidth: window.innerWidth,
            winHeight: window.innerHeight,
        })
    }

    useEffect(() => {
        window.addEventListener('resize', detectSize)

        return () => {
            window.removeEventListener('resize', detectSize)
        }
    }, [windowDimenion])

    return (
        <div className='speakerComments'>
            <div className="headerRow rowGrid">
                <div className="col-24 col-sm-24">
                    <h1>Izohlar</h1>
                    <div className="filter">

                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 7H21" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M6 12H18" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M10 17H14" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <p>Yil Bo'yicha</p>
                    </div>
                </div>
            </div>
            <div className="boxes_line rowGrid">
                <div className="col-8 col-lg-12 col-sm-24 mb-lg-30">
                    <div className="box">
                        <div className="box_item">
                            {/* <img src={walet} alt="" /> */}
                            <div className="img">

                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.37988 12.0001L10.7899 14.4201L15.6199 9.58008" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10.7499 2.44982C11.4399 1.85982 12.5699 1.85982 13.2699 2.44982L14.8499 3.80982C15.1499 4.06982 15.7099 4.27982 16.1099 4.27982H17.8099C18.8699 4.27982 19.7399 5.14982 19.7399 6.20982V7.90982C19.7399 8.29982 19.9499 8.86982 20.2099 9.16982L21.5699 10.7498C22.1599 11.4398 22.1599 12.5698 21.5699 13.2698L20.2099 14.8498C19.9499 15.1498 19.7399 15.7098 19.7399 16.1098V17.8098C19.7399 18.8698 18.8699 19.7398 17.8099 19.7398H16.1099C15.7199 19.7398 15.1499 19.9498 14.8499 20.2098L13.2699 21.5698C12.5799 22.1598 11.4499 22.1598 10.7499 21.5698L9.16988 20.2098C8.86988 19.9498 8.30988 19.7398 7.90988 19.7398H6.17988C5.11988 19.7398 4.24988 18.8698 4.24988 17.8098V16.0998C4.24988 15.7098 4.03988 15.1498 3.78988 14.8498L2.43988 13.2598C1.85988 12.5698 1.85988 11.4498 2.43988 10.7598L3.78988 9.16982C4.03988 8.86982 4.24988 8.30982 4.24988 7.91982V6.19982C4.24988 5.13982 5.11988 4.26982 6.17988 4.26982H7.90988C8.29988 4.26982 8.86988 4.05982 9.16988 3.79982L10.7499 2.44982Z" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="box_p">
                                <p>Umumiy balans</p>
                                <h2>15 000 000 UZS</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-8 col-lg-12 col-sm-24 mb-lg-30">
                    <div className="box">
                        <div className="box_item">
                            <div className="img">

                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.67 14H4C2.9 14 2 14.9 2 16V22H8.67V14Z" stroke="#1C1C1C" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M13.3302 10H10.6602C9.56016 10 8.66016 10.9 8.66016 12V22H15.3302V12C15.3302 10.9 14.4402 10 13.3302 10Z" stroke="#1C1C1C" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M20.0001 17H15.3301V22H22.0001V19C22.0001 17.9 21.1001 17 20.0001 17Z" stroke="#1C1C1C" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12.5202 2.06982L13.0502 3.12982C13.1202 3.27982 13.3102 3.41982 13.4702 3.43982L14.4302 3.59982C15.0402 3.69982 15.1902 4.1498 14.7502 4.5798L14.0002 5.3298C13.8702 5.4598 13.8002 5.69981 13.8402 5.86981L14.0502 6.78982C14.2202 7.51982 13.8302 7.79983 13.1902 7.41983L12.2902 6.88983C12.1302 6.78983 11.8602 6.78983 11.7002 6.88983L10.8002 7.41983C10.1602 7.79983 9.77023 7.51982 9.94023 6.78982L10.1502 5.86981C10.1902 5.69981 10.1202 5.4498 9.99023 5.3298L9.25023 4.58981C8.81023 4.14981 8.95023 3.7098 9.57023 3.6098L10.5302 3.44983C10.6902 3.41983 10.8802 3.27983 10.9502 3.13983L11.4802 2.0798C11.7702 1.4998 12.2302 1.49982 12.5202 2.06982Z" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                            </div>
                            <div className="box_p">
                                <p>O'quvchilar soni</p>
                                <h2>215</h2>
                            </div>
                        </div>
                    </div>
                </div><div className="col-8 col-lg-12 col-sm-24 mb-lg-30">
                    <div className="box">
                        <div className="box_item">
                            <div className="img">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.4698 16.83L18.8598 19.99C18.9598 20.82 18.0698 21.4 17.3598 20.97L13.1698 18.48C12.7098 18.48 12.2599 18.45 11.8199 18.39C12.5599 17.52 12.9998 16.42 12.9998 15.23C12.9998 12.39 10.5398 10.09 7.49985 10.09C6.33985 10.09 5.26985 10.42 4.37985 11C4.34985 10.75 4.33984 10.5 4.33984 10.24C4.33984 5.68999 8.28985 2 13.1698 2C18.0498 2 21.9998 5.68999 21.9998 10.24C21.9998 12.94 20.6098 15.33 18.4698 16.83Z" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M13 15.2298C13 16.4198 12.56 17.5198 11.82 18.3898C10.83 19.5898 9.26 20.3598 7.5 20.3598L4.89 21.9098C4.45 22.1798 3.89 21.8098 3.95 21.2998L4.2 19.3298C2.86 18.3998 2 16.9098 2 15.2298C2 13.4698 2.94 11.9198 4.38 10.9998C5.27 10.4198 6.34 10.0898 7.5 10.0898C10.54 10.0898 13 12.3898 13 15.2298Z" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="box_p">
                                <p>Kurslar soni</p>
                                <h2>341</h2>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="grapth_rectangle mt-50">
                <div className="grapth rowGrid">
                    <div className="col-24">
                        <h1>Izohlar grafigi</h1>
                        <p className="soni">Soni</p>
                        <div className='rowGrid'>
                            <div className='col-24 text-center'>

                                <AreaChart
                                    className="chart"
                                    width={1100}
                                    height={300}
                                    data={data}
                                    margin={{
                                        top: 10,
                                        right: 0,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area
                                        type="monotone"
                                        dataKey="uv"
                                        stroke="#006AFF"
                                        fill="rgba(47, 128, 237, 0.3)"
                                    />
                                </AreaChart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
