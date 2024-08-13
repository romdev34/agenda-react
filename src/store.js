import { configureStore } from '@reduxjs/toolkit'
import monthReducer from "./components/features/monthProperties.js";
import calendarTypeReducer from "./components/features/calendarType.js";
import dailyReducer from "./components/features/dailyProperties.js";
import weeklyReducer from "./components/features/weeklyProperties.js";
import eventReducer from "./components/features/events.js"

export default configureStore({
    reducer: {
        monthReducer,
        calendarTypeReducer,
        dailyReducer,
        weeklyReducer,
        eventReducer
    },
})