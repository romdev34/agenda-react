import {createSlice} from "@reduxjs/toolkit";
import moment from "moment";
import 'moment/dist/locale/fr';

const today = new Date(); // get current date
moment.locale('fr')
const weekNumber = moment().isoWeek()
const dayNumbers = []
const monthName = moment().month("M").format("MMMM")
const year = moment().year()
for (let i = 0; i < 7; i++) {
    dayNumbers.push(moment().weekday(i).date())
}
const DateElements = {
    'weekNumber': weekNumber,
    'dayNumbers': dayNumbers,
    'monthName' : monthName,
    'year' : year,
    'compteur': 0,
    'disableButton': true,
    'actualWeek': true,
    'todayWeek': moment().isoWeek()
}

const initialState = DateElements

export const weekSlice = createSlice({
    name: "weekProperties",
    initialState,
    reducers: {
        toPreviousWeek: (state, actions) => {
            const daysArray = []
            state.compteur -=1
            if (state.compteur > 0) {
                state.disableButton = false
                state.monthName = moment().add(state.compteur , "w").month("M").format("MMMM")
                state.weekNumber = moment().add(state.compteur , "w").isoWeek()
                state.year = moment().add(state.compteur, 'w').year()
                for (let i = 0; i < 7; i++) {
                    daysArray.push(moment().add(state.compteur , "w").weekday(i).date())
                }
            }
            if (state.compteur < 0) {
                state.disableButton = false
                state.weekNumber = moment().subtract(Math.abs(state.compteur), "w").isoWeek()
                state.monthName = moment().subtract(Math.abs(state.compteur), "w").month("M").format("MMMM")
                state.year = moment().subtract(Math.abs(state.compteur), 'w').year()
                for (let i = 0; i < 7; i++) {
                    daysArray.push(moment().subtract(Math.abs(state.compteur), "w").weekday(i).date())
                }
            }
            if (state.compteur === 0) {
                state.disableButton = true
            }
            state.dayNumbers = daysArray
        },
        toNextWeek: (state) => {
            const daysArray = []
            state.compteur +=1

            if (state.compteur < 0) {
                state.disableButton = false
                state.weekNumber = moment().subtract(Math.abs(state.compteur), "w").isoWeek()
                state.monthName =moment().subtract(Math.abs(state.compteur) , "w").month("M").format("MMMM")
                state.year = moment().subtract(Math.abs(state.compteur), 'w').year()
                for (let i = 0; i < 7; i++) {
                    daysArray.push(moment().subtract(Math.abs(state.compteur) , "w").weekday(i).date())
                }
            }

            if (state.compteur > 0) {
                state.disableButton = false
                state.weekNumber = moment().add(state.compteur , "w").isoWeek()
                state.monthName = moment().add(state.compteur, "w").month("M").format("MMMM")
                state.year = moment().add(state.compteur, 'w').year()
                for (let i = 0; i < 7; i++) {
                    daysArray.push(moment().add(state.compteur, "w").weekday(i).date())
                }
            }
            if (state.compteur === 0) {
                const today = moment();
                state.weekNumber = today.isoWeek()
                state.monthName = today.month("M").format("MMMM")
                state.year = today.year()
                for (let i = 0; i < 7; i++) {
                    daysArray.push(moment().weekday(i).date())
                }
                state.disableButton = true
            }
            state.dayNumbers = daysArray
        },
        loadTodayWeek: (state) => {
            const daysArray = []

            const today = moment();
            state.weekNumber = today.isoWeek()
            state.monthName = today.month("M").format("MMMM")
            state.year = today.year()
            for (let i = 0; i < 7; i++) {
                daysArray.push(moment().weekday(i).date())
            }
            state.compteur = 0
            state.disableButton = true
            state.dayNumbers = daysArray
        }
    }
})

export const {toPreviousWeek, toNextWeek, loadTodayWeek} = weekSlice.actions

export default weekSlice.reducer