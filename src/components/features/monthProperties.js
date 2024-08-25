import {createSlice} from "@reduxjs/toolkit";
import moment from "moment";


// POUR CETTE FONCTION ON ATTEND LE VRAI NOMBRE DU MOIS
const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
moment.locale('fr')
// POUR CETTE FONCTION ON ATTEND LE MOIS - 1 donc month
const firstDayNumberCalcul = (year, month) => {
    if (new Date(year, month, 1).getDay() === 0) {
        return 7
    } else {
        return new Date(year, month, 1).getDay();
    }
}
const today = new Date();
const DateElements = {
    "year": today.getFullYear(),
    "monthNumber": today.getMonth(),
    "month": today.toLocaleString('fr-FR', {month: 'long'}),
    "numberOfDaysInTheMonth": daysInMonth(today.getFullYear(), today.getMonth()),
    "firstDayNumber": firstDayNumberCalcul(today.getFullYear(), today.getMonth()),
    'todayDayNumber': today.getDate(),
    'actualMonth': true,
    'previousMonth': today.getMonth() - 1,
    'nextMonth': today.getMonth() + 1,
    'numberOfDaysInThePreviousMonth': daysInMonth(today.getFullYear(), today.getMonth() - 1),
    'disableButton': true
}
const checkActualMonth = function (actualMonth, actualYear) {
    const today = new Date();
    if (actualMonth !== today.getMonth() || actualYear !== today.getFullYear()) {
        return false
    }
    if (actualMonth === today.getMonth() && actualYear === today.getFullYear()) {
        return true
    }
}

const previousMonth = function (year, month) {
    return new Date(year, month).toLocaleString('fr-FR', {month: 'long'})
}
const nextMonth = function (year, month) {
    return new Date(year, month).toLocaleString('fr-FR', {month: 'long'})
}
const initialState = DateElements

export const monthSlice = createSlice({
    name: "monthProperties",
    initialState,
    reducers: {
        toPreviousMonth: (state, actions) => {
            state.monthNumber -= 1
            //il calcul le mois en fonction de l'année de actuelle si les mois sont négatifs ou supérieurs à 12 il retrouve la bonne année te le bon mois
            state.numberOfDaysInTheMonth = daysInMonth(state.year, state.monthNumber)
            state.month = previousMonth(state.year, state.monthNumber)
            state.firstDayNumber = firstDayNumberCalcul(state.year, state.monthNumber)
            state.actualMonth = checkActualMonth(state.monthNumber, state.year)
            state.numberOfDaysInThePreviousMonth = daysInMonth(state.year, state.monthNumber - 1)
            if (state.actualMonth) {
                state.disableButton = true
            }
            if (!state.actualMonth) {
                state.disableButton = false
            }
        },
        toNextMonth: (state) => {
            state.monthNumber += 1
            state.numberOfDaysInTheMonth = daysInMonth(state.year, state.monthNumber)
            state.month = nextMonth(state.year, state.monthNumber)
            state.firstDayNumber = firstDayNumberCalcul(state.year, state.monthNumber)
            state.actualMonth = checkActualMonth(state.monthNumber, state.year)
            state.numberOfDaysInThePreviousMonth = daysInMonth(state.year, state.monthNumber - 1)
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
            state.numberOfDaysInTheMonth = daysInMonth(state.year, state.monthNumber)
            state.firstDayNumber = firstDayNumberCalcul(state.year, state.monthNumber)
            state.actualMonth = checkActualMonth(state.monthNumber, state.year)
            state.disableButton = true
        }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(toPreviousWeek, (state, action) => {
    //         console.log(moment(state.year, state.monthNumber, state.day) )
    //     })
    // }
})

export const {toPreviousMonth, toNextMonth, loadToday} = monthSlice.actions

export default monthSlice.reducer