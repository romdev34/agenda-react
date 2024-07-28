import React from 'react'
import Header from "./layout/Header.jsx";
import MonthlyCalendar from "./monthlyCalendar/MonthlyCalendar.jsx";
import Footer from "./layout/Footer.jsx";
import {useSelector} from "react-redux";
import CalendarType from "../CalendarType.jsx";

export default function Calendar() {
    const type = useSelector(state => state.calendarTypeReducer.type)

    return (
        <div>
            <header className="items-center m-auto min-w-[703px] max-w-[1000px] flex mt-20">
                <Header />
            </header>
            <main>
                <CalendarType type={type} />
            </main>
                <Footer />
        </div>
    )
}
