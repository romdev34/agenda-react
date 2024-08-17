import {createSlice} from "@reduxjs/toolkit";
import moment from "moment";

moment.locale('fr')
const initialState = {
    events: [],
    positions: [],
    eventDays: []
}
let position = 1
const colors = [
    "bg-pink-500",
    "bg-rose-500",
    "bg-fuchsia-500",
    "bg-purple-500",
    "bg-violet-500",
    "bg-indigo-500",
    "bg-blue-500",
    "bg-sky-500",
    "bg-cyan-500",
    "bg-teal-500"
];

function reducer(accumulator, currentValue, index) {
    // console.log(accumulator)
    // console.log(currentValue)
    // if(accumulator.)
}

let startDateEvent = []
let endDateEvent = []


export const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        updateEvents: (state, actions) => {
            actions.payload.sort((a, b) => {
                if (a.start_date_event < b.start_date_event) {
                    return -1;
                }
                if (a.start_date_event > b.start_date_event) {
                    return 1;
                }
            })
            // console.log(actions.payload)
            actions.payload.map(function (event, index, array) {
                state.eventDays = []
                state.eventDays["daysEvents"]= []

                state.eventDays["position"] = position
                state.eventDays["id"] = event.id
                startDateEvent = moment(event.start_date_event)
                endDateEvent = moment(event.end_date_event)
                state.eventDays["daysEvents"].push(startDateEvent.format("YYYY-MM-DD"))
                startDateEvent.add(1, 'd').date()
                while (startDateEvent.isBefore(moment(event.end_date_event), 'day')) {
                    state.eventDays["daysEvents"].push(startDateEvent.format("YYYY-MM-DD"))
                    startDateEvent.add(1, 'd').date()
                }
                state.eventDays["daysEvents"].push(endDateEvent.format("YYYY-MM-DD"))

                let eventWithBg = {
                    ...event,
                    bgColor: colors[index % 10],
                    position: position,
                    eventDays: state.eventDays
                }
                state.events.push(eventWithBg)
                position++
            })
        },

    }
})

export const {updateEvents} = eventSlice.actions

export default eventSlice.reducer