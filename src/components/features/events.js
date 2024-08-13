import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    events: [],
    positions: []
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

const groupEventsByDay = []


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

            actions.payload.map(function (event, index, array) {
                let eventWithBg = {
                    ...event,
                    bgColor: colors[index % 10],
                    position: position
                }
                state.events.push(eventWithBg)
                position++
            })
        },

    }
})

export const {updateEvents} = eventSlice.actions

export default eventSlice.reducer