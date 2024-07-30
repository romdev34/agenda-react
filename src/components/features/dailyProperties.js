import {createSlice} from "@reduxjs/toolkit";
import moment from "moment";
import 'moment/dist/locale/fr';

const today = new Date(); // get current date

moment.locale('fr')
const dayName = moment().format('dddd')


const DateElements = {
    "year": today.getFullYear(),
    "monthNumber": today.getMonth(),
    "month": today.toLocaleString('fr-FR', {month: 'long'}),
    'todayDayNumber': today.getDate(),
    'dayNumber': today.getDay(),
    'dayName' : dayName,
    'disableButton': true
}


const initialState = DateElements

export const dailySlice = createSlice({
    name: "dailyProperties",
    initialState,
    reducers: {
        toPreviousDay: (state, actions) => {

        },
        toNextDay: (state) => {

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

export const {toPreviousDay, toNextDay, loadToday} = dailySlice.actions

export default dailySlice.reducer