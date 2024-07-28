import React from 'react'
import MonthlyCalendar from "./components/monthlyCalendar/MonthlyCalendar.jsx";
import WeeklyCalendar from "./components/weeklyCalendar/WeeklyCalendar.jsx";
import DailyCalendar from "./components/dailyCalendar/DailyCalendar.jsx";

export default function CalendarType(props) {

    function checkCalendarType(props) {
        if(props.type === "monthly") {
           return <MonthlyCalendar />
        }
        if(props.type === "weekly") {
            return <WeeklyCalendar />
        }
        if(props.type === "daily") {
            return <DailyCalendar />
        }
    }

    return (
       checkCalendarType(props)
    )
}
