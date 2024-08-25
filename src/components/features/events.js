import {createSlice} from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
    events: [],
}
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

let eventsDaysSlots = []
let startDateEvent = []
let endDateEvent = []
let eventDays = []
let position = 1
let daySlotIndice = 0

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
            actions.payload.map(function (event, index) {
                eventsDaysSlots[event.id] = []
                eventDays = []
                daySlotIndice = 0
                // state.eventsDaysSlots["position"] = position
                startDateEvent = moment(event.start_date_event)
                startDateEvent.utc().hour(event.hourTimeSlotStart)
                startDateEvent.minute(event.minuteTimeSlotStart)
                endDateEvent = moment(event.end_date_event)
                endDateEvent.utc().hour(event.hourTimeSlotEnd)
                endDateEvent.minute(event.minuteTimeSlotEnd)

//todo ne pas sauvegarder l'event en date time et utiliser uniquement les slots start et end
// pour calculer les slots des events
// eventType 0 = event de type rdv eventType 1 = event de type memo
                if (!event.allDayEvent && event.eventType === 0) {
                    eventDays.push(startDateEvent.utc().format("YYYY-MM-DD HH:mm:ss"))
                    let dayEndDate = moment(event.start_date_event).utc().hour(event.hourTimeSlotEnd)
                    dayEndDate.minute(event.minuteTimeSlotEnd)
                    dayEndDate.subtract(30, "m")
                    if (!dayEndDate.isSame(startDateEvent, "m")) {
                        while (startDateEvent.isBefore(endDateEvent, 'minute')) {
                            startDateEvent.add(30, 'minute')
                            eventDays.push(startDateEvent.utc().format("YYYY-MM-DD HH:mm:ss"))

                            if (startDateEvent.isSame(dayEndDate, "m")) {
                                daySlotIndice++
                                dayEndDate = moment(event.start_date_event).utc().hour(event.hourTimeSlotEnd).minute(event.minuteTimeSlotEnd)
                                dayEndDate.subtract(30, "m")
                                dayEndDate.add(daySlotIndice, 'day')
                                startDateEvent = moment(event.start_date_event)
                                startDateEvent.utc().hour(event.hourTimeSlotStart)
                                startDateEvent.minute(event.minuteTimeSlotStart)
                                startDateEvent.add(daySlotIndice, 'day')
                                startDateEvent.subtract(30, 'minute')
                            }
                        }
                    }
                }
                if (event.allDayEvent) {
                    eventDays.push(startDateEvent.utc().format("YYYY-MM-DD"))
                    startDateEvent.add(1, 'd').date()
                    while (startDateEvent.isBefore(moment(event.end_date_event), 'day')) {
                        eventDays.push(startDateEvent.utc().format("YYYY-MM-DD"))
                        startDateEvent.add(1, 'd').date()
                    }
                }
                let eventWithBg = {
                    ...event,
                    eventsDaysSlots: eventDays,
                    bgColor: colors[index % 10],
                }
                state.events.push(eventWithBg)
                position++
            })
        },

    }
})

export const {updateEvents} = eventSlice.actions

export default eventSlice.reducer