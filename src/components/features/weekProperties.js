import {createSlice} from "@reduxjs/toolkit";

const today = new Date(); // get current date
const firstDayofWeek = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
const lastDayOfWeek = firstDayofWeek + 6; // last day is the first day + 6


const DateElements = {
    "year": today.getFullYear(),
    "monthNumber": today.getMonth(),
    "month": today.toLocaleString('fr-FR', {month: 'long'}),
    'todayDayNumber': today.getDate(),
    'actualMonth': true,
    'previousMonth': today.getMonth() - 1,
    'nextMonth': today.getMonth() + 1,
    'disableButton': true
}


const initialState = DateElements

export const monthSlice = createSlice({
    name: "monthProperties",
    initialState,
    reducers: {
        toPreviousWeek: (state, actions) => {
            state.monthNumber += 1
            if (state.actualMonth) {
                state.disableButton = true
            }
            if (!state.actualMonth) {
                state.disableButton = false
            }
        },
        toNextWeek: (state) => {
            state.monthNumber += 1
            if (state.actualMonth) {
                state.disableButton = true
            }
            if (!state.actualMonth) {
                state.disableButton = false
            }
        },
        loadToday: (state) => {
            const today = new Date();
            state.year = today.getFullYear();
            state.monthNumber = today.getMonth();
            state.month = today.toLocaleString('fr-FR', {month: 'long'});
            state.disableButton = true
        }
    }
})

export const {toPreviousMonth, toNextMonth, loadToday} = monthSlice.actions

export default monthSlice.reducer