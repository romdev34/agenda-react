import React from 'react'
import Header from "./layout/Header.jsx";
import MonthlyCalendar from "./monthlyCalendar/MonthlyCalendar.jsx";
import Footer from "./layout/Footer.jsx";
import {useSelector} from "react-redux";
import WeeklyCalendar from "./weeklyCalendar/WeeklyCalendar.jsx";
import DailyCalendar from "./dailyCalendar/DailyCalendar.jsx";

export default function Calendar() {
    const type = useSelector(state => state.calendarTypeReducer.type)

    function checkCalendarType(type) {
        if(type === "monthly") {
            return <MonthlyCalendar />
        }
        if(type === "weekly") {
            return <WeeklyCalendar />
        }
        if(type === "daily") {
            return <DailyCalendar />
        }
    }

    return (
        <div>
            <header className="items-center m-auto min-w-[703px] max-w-[1000px] flex mt-10">
                <Header />
            </header>
            <main>
                {checkCalendarType(type)}
            </main>
                <Footer />
        </div>
    )
}
