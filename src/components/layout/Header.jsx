import {useSelector, useDispatch} from "react-redux";
import {toPreviousMonth, toNextMonth} from "../features/monthProperties.js";
import {toPreviousDay, toNextDay} from "../features/dailyProperties.js";
import {toPreviousWeek, toNextWeek} from "../features/weeklyProperties.js";
import {
    toWeeklyType,
    toDailyType,
    toMonthlyType
} from "../features/calendarType.js";
import ButtonToday from "./ButtonToday.jsx";
import {useState} from "react";


export default function Header() {
    const monthReducer = useSelector(state => (state.monthReducer))
    const weekReducer = useSelector(state => (state.weeklyReducer))
    const dayReducer = useSelector(state => (state.dailyReducer))

    const month = monthReducer.month
    const disableButton = monthReducer.disableButton
    const monthNumber = monthReducer.monthNumber
    const year = monthReducer.year

    const agendaType = useSelector(state => state.calendarTypeReducer.type)

    const dispatch = useDispatch()


    const weekNumber = weekReducer.weekNumber
    const monthName = weekReducer.monthName

    const dayName = dayReducer.dayName

    const handleToPrevious = function () {
        if (agendaType === "monthly"){
            dispatch(toPreviousMonth())
        }
        if (agendaType === "weekly"){
            dispatch(toPreviousWeek())
        }
        if (agendaType === "daily"){
            dispatch(toPreviousDay())
        }
    }

    const handleToNext = function () {
        if (agendaType === "monthly") {
            dispatch(toNextMonth())
        }
        if (agendaType === "weekly"){
            dispatch(toNextWeek())
        }
        if (agendaType === "daily"){
            dispatch(toNextDay())
        }
    }

    const handleWeeklyCalendar = function () {
        dispatch(toWeeklyType())
    }

    const handleMonthlyCalendar = function () {
        dispatch(toMonthlyType())
    }

    const handleDailyCalendar = function () {
        dispatch(toDailyType())
    }




    const displayYear = new Date(year, monthNumber).getFullYear()

    return (
        <>
            <div
                className="cursor-pointer self-auto text-4xl">{displayYear } {agendaType === "weekly" && monthName }</div>

            <div className="ml-auto items-center flex justify-end select-none">
                <div className="flex mr-4">
                    <span onClick={handleMonthlyCalendar}
                                        className="hover:bg-emerald-400 cursor-pointer text-sky-50 p-2 bg-emerald-800 border-r-amber-50 border-r-2">MOIS</span>
                    <span onClick={handleWeeklyCalendar}
                          className="hover:bg-fuchsia-400 cursor-pointer text-sky-50 p-2 bg-fuchsia-800 border-r-amber-50 border-r-2">SEMAINE</span>
                    <span onClick={handleDailyCalendar}
                        className="hover:bg-amber-400 text-sky-50 cursor-pointer p-2 bg-amber-800">JOUR</span>
                </div>
                <ButtonToday disableButton={disableButton}/>
                <div className="p-2">
                <span onClick={handleToPrevious}
                      className="cursor-pointer text-3xl">&#9664;</span>
                    <span
                        className="inline-block w-[130px] capitalize text-xl">{agendaType === "monthly" ? month : agendaType === "weekly" ? " semaine " + weekNumber : dayName}</span>
                    <span onClick={handleToNext}
                          className="cursor-pointer text-3xl">&#9654;</span>
                </div>
            </div>
        </>
    )
}
