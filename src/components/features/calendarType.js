import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    'type': 'monthly'
}

export const calendTYpeSlice = createSlice({
    name: "calendarType",
    initialState,
    reducers: {
        toMonthlyType: (state, actions) => {
            state.type = "monthly"
        },
        toDailyType: (state, actions) => {
            state.type = "daily"
        },
        toWeeklyType: (state, actions) => {
            state.type = "weekly"
        }
    }
})

export const {toMonthlyType, toDailyType, toWeeklyType} = calendTYpeSlice.actions

export default calendTYpeSlice.reducer