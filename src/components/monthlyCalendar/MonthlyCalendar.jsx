import {useDispatch, useSelector} from "react-redux";
import DaysTable from "./DaysTable.jsx";
import {nanoid} from "nanoid";
import moment from "moment";

export default function MonthlyCalendar() {
    const dispatch = useDispatch()

    const eventState = useSelector(state => state.eventReducer)
    // console.log(eventState)
    const monthReducerState = useSelector(state => state.monthReducer)
    const todayDate = new Date()
    const daysNumbers = [];
    let j = 1;
    let k = 1;
    let l = 1;
    let events = []
    let dayPositions = []


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

        if (i >= monthReducerState.firstDayNumber && i < monthReducerState.numberOfDaysInTheMonth + (monthReducerState.firstDayNumber)) {

            if (eventState.events) {

                let numberOfEventsInADay = 0
                let position = 1

                eventState.events.map(function (event) {
                    const startDateEvent = moment(new Date(event.start_date_event));
                    const endDateEvent = moment(new Date(event.end_date_event));
                    const actualDayDate = moment(new Date(monthReducerState.year, monthReducerState.monthNumber, j, '0', '0', '0'));
                    // console.log(actualDayDate)
                    // si le start date de l'event fait partie de la date du jour parcouru on rajoute les details
                        if (actualDayDate.isSame(startDateEvent, 'day')) {
                            numberOfEventsInADay++
                            if (numberOfEventsInADay > 1) {
                                position = numberOfEventsInADay
                            }
                            events.push({
                                id: event.id,
                                title: event.title,
                                details: event.details,
                                priority: event.priority,
                                bgColor: event.bgColor,
                                position: position
                            })

                        }
                    // console.log(actualDayDate.getDate())
                        //si la date de fin de l'event est supérieure à la date du jour parcouru et si la date du jour parcouru est supérieure à la date de début de l'event
                        if ((endDateEvent.isAfter(actualDayDate, 'day') || endDateEvent.isSame(actualDayDate, 'day')) && actualDayDate.isAfter(startDateEvent, 'day')) {
                            numberOfEventsInADay++
                            events.push({
                                id: event.id,
                                title: event.title,
                                details: event.details,
                                priority: event.priority,
                                bgColor: event.bgColor,
                            })
                        }
                    }
                )
                if (numberOfEventsInADay) {
                    events.push({'numberOfEventsInADay': numberOfEventsInADay})
                }
                // console.log(events)

            }
            // console.log(events)
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
    daysNumbers.map(function (day, index1) {
        day.eventDetails.map(function (d, index2) {
            if (d.position) {
                dayPositions[d.id] = d.position
            }
            if (!d.position && dayPositions[d.id]) {
                daysNumbers[index1].eventDetails[index2] = {
                    ...daysNumbers[index1].eventDetails[index2],
                    position: dayPositions[d.id]
                }

            }
        })
    })
    // console.log(dayPositions)

    // console.log(daysNumbers)
    return (
        <div className="mt-10 flex justify-center">
            <div
                className="grid grid-cols-[repeat(7,minmax(100px,_1fr))] grid-flow-row w-full max-w-[1000px]">

                <div className="bg-blue-50 border border-gray-300">Lun</div>
                <div className="bg-red-50 border border-gray-300">Mar</div>
                <div className="bg-green-50 border border-gray-300">Mer</div>
                <div className="bg-purple-50 border border-gray-300">Jeu</div>
                <div className="bg-gray-50 border border-gray-300">Ven</div>
                <div className="bg-cyan-50 border border-gray-300">Sam</div>
                <div className="bg-amber-50 border border-gray-300">Dim</div>

                {daysNumbers.map(day => {
                        return <DaysTable key={nanoid(8)}
                                          month={day.month}
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
