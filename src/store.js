import { configureStore } from '@reduxjs/toolkit'
import monthReducer from "./components/features/monthProperties.js";
import calendarTypeReducer from "./components/features/calendarType.js";

export default configureStore({
    reducer: {
        monthReducer,
        calendarTypeReducer
    },
})