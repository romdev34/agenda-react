import {createSlice} from "@reduxjs/toolkit";
import moment from "moment";
import 'moment/dist/locale/fr';

const today = new Date(); // get current date
moment.locale('fr')
const weekNumber = moment().isoWeek()
const dayNumbers = []
const monthName = moment().month("M").format("MMMM")
for (let i = 0; i < 7; i++) {
    dayNumbers.push(moment().weekday(i).date())
}
const DateElements = {
    'weekNumber': weekNumber,
    'dayNumbers': dayNumbers,
    'monthName' : monthName,
    'Compteur': 0,
}

const initialState = DateElements

export const weekSlice = createSlice({
    name: "monthProperties",
    initialState,
    reducers: {
        toPreviousWeek: (state, actions) => {
            const daysArray = []
            state.Compteur -=1
            if (state.Compteur > 0) {
                state.monthName = moment().add(state.Compteur , "w").month("M").format("MMMM")

                for (let i = 0; i < 7; i++) {
                    daysArray.push(moment().add(state.Compteur , "w").weekday(i).date())
                }
            }
            else {
                state.monthName = moment().subtract(Math.abs(state.Compteur), "w").month("M").format("MMMM")
                for (let i = 0; i < 7; i++) {
                    daysArray.push(moment().subtract(Math.abs(state.Compteur), "w").weekday(i).date())
                }
            }

            state.weekNumber -= 1

            state.dayNumbers = daysArray
        },
        toNextWeek: (state) => {
            const daysArray = []
            state.Compteur +=1

            if (state.Compteur < 0) {
                state.monthName =moment().subtract(Math.abs(state.Compteur) , "w").month("M").format("MMMM")
                for (let i = 0; i < 7; i++) {
                    daysArray.push(moment().subtract(Math.abs(state.Compteur) , "w").weekday(i).date())
                }
            }

            else {
                state.monthName = moment().add(state.Compteur, "w").month("M").format("MMMM")
                for (let i = 0; i < 7; i++) {
                    daysArray.push(moment().add(state.Compteur, "w").weekday(i).date())
                }
            }
            state.weekNumber += 1


            state.dayNumbers = daysArray
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

export const {toPreviousWeek, toNextWeek, loadToday} = weekSlice.actions

export default weekSlice.reducer