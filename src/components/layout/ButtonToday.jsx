import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {loadToday} from "../features/monthProperties.js";
import {loadTodayWeek} from "../features/weeklyProperties.js";
import {loadTodayDay} from "../features/dailyProperties.js";

export default function ButtonToday({disableButton}) {

    const dispatch = useDispatch()
    const agendaType = useSelector(state => state.calendarTypeReducer.type)
    const handleLoadToday = function () {
        if(agendaType ==="monthly") {
            return dispatch(loadToday())
        }
        if(agendaType ==="weekly") {
            return dispatch(loadTodayWeek())
        }
        if(agendaType ==="daily") {
            return dispatch(loadTodayDay())
        }
    }
    return (
        <div>
            <button onClick={handleLoadToday} disabled={disableButton}
                    className={`${!disableButton ? 'hover:bg-blue-900 bg-blue-600' : ' bg-gray-100 text-slate-700'} text-slate-50 p-2 rounded`}>aujourd'hui
            </button>
        </div>
    )
}
