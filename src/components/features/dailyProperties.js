import {createSlice} from "@reduxjs/toolkit";
import moment from "moment";
import 'moment/dist/locale/fr';

const today = new Date(); // get current date

moment.locale('fr')
const dayName = moment().format('dddd')

const date = moment().format("DD/MM/YYYY")


const DateElements = {
    "year": today.getFullYear(),
    "monthNumber": today.getMonth(),
    "month": today.toLocaleString('fr-FR', {month: 'long'}),
    'todayDayNumber': today.getDate(),
    'dayNumber': today.getDay(),
    'dayName': dayName,
    'compteur': 0,
    'date': date,
    'disableButton': true
}


const initialState = DateElements

export const dailySlice = createSlice({
    name: "dailyProperties",
    initialState,
    reducers: {
        toPreviousDay: (state, actions) => {
            state.compteur -= 1
            if (state.compteur > 0) {
                state.disableButton = false
                state.dayName = moment().add(state.compteur, "d").format("dddd")
                state.date = moment().add(state.compteur, "d").format("DD/MM/YYYY")
            }
            if (state.compteur < 0) {
                state.disableButton = false
                state.dayName = moment().subtract(Math.abs(state.compteur), "d").format("dddd")
                state.date = moment().subtract(Math.abs(state.compteur), "d").format("DD/MM/YYYY")
            }
            if (state.compteur === 0) {
                const today = moment();
                state.monthNumber = today.month(),
                    state.month = today.month("m").format("MMMM"),
                    state.todayDayNumber = today.date(),
                    state.dayNumber = today.day(),
                    state.dayName = today.format('dddd'),
                    state.date = today.format("DD/MM/YYYY"),
                    state.disableButton = true
            }
        },

        toNextDay: (state) => {
            state.compteur += 1
            if (state.compteur < 0) {
                state.disableButton = false
                state.dayName = moment().subtract(Math.abs(state.compteur), "d").format("dddd")
                state.date = moment().subtract(Math.abs(state.compteur), "d").format("DD/MM/YYYY")

            }
            if (state.compteur > 0) {
                state.disableButton = false
                state.dayName = moment().add(state.compteur, "d").format("dddd")
                state.date = moment().add(state.compteur, "d").format("DD/MM/YYYY")
            }
            if (state.compteur === 0) {
                const today = moment();
                state.monthNumber = today.month(),
                    state.month = today.month("m").format("MMMM"),
                    state.todayDayNumber = today.date(),
                    state.dayNumber = today.day(),
                    state.dayName = today.format('dddd'),
                    state.date = today.format("DD/MM/YYYY"),
                    state.disableButton = true
            }
        },
        loadTodayDay: (state) => {
            const today = moment();
            state.year = today.year(),
                state.monthNumber = today.month(),
                state.month = today.month("m").format("MMMM"),
                state.todayDayNumber = today.date(),
                state.dayNumber = today.day(),
                state.dayName = today.format('dddd'),
                state.compteur = 0,
                state.date = today.format("DD/MM/YYYY"),
                state.disableButton = true
        }
    },
})

export const {toPreviousDay, toNextDay, loadTodayDay} = dailySlice.actions

export default dailySlice.reducer