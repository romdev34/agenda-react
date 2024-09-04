import {useSelector} from "react-redux";
import DaysTable from "./DaysTable.jsx";
import {nanoid} from "nanoid";
import moment from "moment";

export default function MonthlyCalendar() {
    const eventState = useSelector(state => state.eventReducer)
    // console.log(eventState)
    const monthReducerState = useSelector(state => state.monthReducer)
    const todayDate = new Date()
    let daysNumbers = [];
    let j = 1;
    let k = 1;
    let l = 1;
    let events = []
    let numberOfEventsInADay = 0

    for (let i = 1; i < 43; i++) {

        events = []
        // je pars du principe que 1 = lundi
        if (i < monthReducerState.firstDayNumber) {
            daysNumbers.push({
                'day': monthReducerState.numberOfDaysInThePreviousMonth - monthReducerState.firstDayNumber + i + 1,
                'month': monthReducerState.monthNumber - 1,
                'active': false,
                'eventDetails': []
            })
            l += 1
        }
        numberOfEventsInADay = 0
        if (i >= monthReducerState.firstDayNumber && i < monthReducerState.numberOfDaysInTheMonth + (monthReducerState.firstDayNumber)) {
            if (eventState.events) {

                eventState.events.map(function (event) {
                        const startDateEvent = moment(new Date(event.startDateEvent));
                        const endDateEvent = moment(new Date(event.endDateEvent));
                        const actualDayDate = moment(new Date(monthReducerState.year, monthReducerState.monthNumber, j, '0', '0', '0'));
                        // si le start date de l'event fait partie de la date du jour parcouru on rajoute les details
                        if (actualDayDate.isSame(startDateEvent, 'day')) {
                            numberOfEventsInADay++
                            events.push({
                                id: event.id,
                                type: event.eventType,
                                startDateEvent: event.startDateEvent,
                                hourTimeSlotStart: event.hourTimeSlotStart,
                                minuteTimeSlotStart: event.minuteTimeSlotStart,
                                hourTimeSlotEnd: event.hourTimeSlotEnd,
                                minuteTimeSlotEnd: event.minuteTimeSlotEnd,
                                endDateEvent: event.endDateEvent,
                                title: event.title,
                                details: event.details,
                                bgColor: event.bgColor,
                            })
                        }
                        //si le jour de la date de fin de l'event est supérieure ou égale au jour de la date du jour parcourue et si la date du jour parcourue est supérieure à la date de début de l'event
                        if ((endDateEvent.isAfter(actualDayDate, 'day') || endDateEvent.isSame(actualDayDate, 'day')) && actualDayDate.isAfter(startDateEvent, 'day')) {
                            numberOfEventsInADay++
                            events.push({
                                id: event.id,
                                type: event.eventType,
                                startDateEvent: event.startDateEvent,
                                hourTimeSlotStart: event.hourTimeSlotStart,
                                minuteTimeSlotStart: event.minuteTimeSlotStart,
                                hourTimeSlotEnd: event.hourTimeSlotEnd,
                                minuteTimeSlotEnd: event.minuteTimeSlotEnd,
                                endDateEvent: event.endDateEvent,
                                title: event.title,
                                details: event.details,
                                bgColor: event.bgColor,
                            })
                        }
                    }
                )
                if (numberOfEventsInADay) {
                    events.push({'numberOfEventsInADay': numberOfEventsInADay})
                }
            }
            daysNumbers.push({
                'day': j,
                'active': true,
                'month': monthReducerState.monthNumber,
                'eventDetails': events
            })
            j++
            l += 1
        }


        if (i >= l) {
            daysNumbers.push({
                'day': k,
                'active': false,
                'month': monthReducerState.monthNumber + 1,
                'eventDetails': []
            })
            k += 1
        }
    }

    return (
        <div className="mt-10 flex justify-center">
            <div
                className="grid grid-cols-[repeat(7,minmax(100px,_1fr))] grid-flow-row w-full max-w-[1000px]">

                <div
                    className=" text-xl border-r border-l  border-gray-300">Lun
                </div>
                <div
                    className=" text-xl border-r border-l border-gray-300">Mar
                </div>
                <div
                    className=" text-xl border-r border-l border-gray-300">Mer
                </div>
                <div
                    className=" text-xl border-r border-l border-gray-300">Jeu
                </div>
                <div
                    className=" text-xl border-r border-l border-gray-300">Ven
                </div>
                <div
                    className=" text-xl border-r border-l border-gray-300">Sam
                </div>
                <div
                    className=" text-xl border-r border-l border-gray-300">Dim
                </div>

                {daysNumbers.map(day => {
                        return <DaysTable key={nanoid(8)}
                                          month={day.month}
                                          year={monthReducerState.year}
                                          actualMonthState={monthReducerState.actualMonth}
                                          dayNumber={day.day}
                                          eventDetails={day.eventDetails}
                                          active={day.active}
                                          todayDay={todayDate.getDate()}/>
                    }
                )}
            </div>
        </div>
    )
}
