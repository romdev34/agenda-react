import {nanoid} from "nanoid";
import {useSelector} from "react-redux";
import moment from "moment";
import 'moment/dist/locale/fr';
import Memos from "./Memos.jsx";
import {useState} from "react";
import {createPortal} from "react-dom";
import EventMouseOverDetails from './EventMouseOverDetails.jsx'

export default function WeeklyCalendar() {
    const regex = /(\d+)-(\d+)-(\d+)\s(\d+):(\d+):(\d+)/
    const regex1 = /(\d+)-(\d+)-(\d+)/

    const eventState = useSelector(state => state.eventReducer)
    // console.log(eventState.events)
    const weekReducer = useSelector(state => state.weeklyReducer)

    const [actualEventId, setActualEventId] = useState("")
    moment.locale('fr')
    let actualWeekNumber = moment().isoWeek()
    let actualYearNumber = moment().year()
    const dayNumbers = weekReducer.dayNumbers
    let cases = []
    let eventPlaced = []
    let memos = []
    let bgEvent = []
    let eventId = []
    let actualHour = -0.5
    let actualMinute = 0
    let monthNumber = 0
    let events = []

    const [showEventMouseOverDetails, setShowEventMouseOverDetails] = useState(false)

    function createWeeklyCalendar() {
        for (let i = 0; i < 384; i++) {
            if ((i % 8 === 0) && ((i / 8) % 2 === 0)) {
                actualHour = actualHour + 0.5
                actualMinute = 0
                cases.push(
                    <div key={nanoid(8)}
                         className="leading-5 text-xs h-5 font-bold bg-white border-r border-l border-b border-gray-300">
                        <div>{("0" + (i / 8) / 2).slice(-2) + " h"}</div>
                    </div>
                )
            }
            if ((i % 8 === 0) && ((i / 8) % 2 !== 0)) {
                actualHour = actualHour + 0.5
                actualMinute = 30
                cases.push(<div key={nanoid(8)}
                                className="leading-5 text-xs h-5 font-bold bg-white border-r border-l border-b border-gray-300">
                        <div>{("0" + parseInt((i / 8) / 2)).slice(-2) + " h 30"}</div>
                    </div>
                )
            }

            if ((i % 8 !== 0)) {
                monthNumber = weekReducer.monthNumber
                if ((i % 8 - 1) > 0 && dayNumbers[i % 8 - 1] < dayNumbers[0]) {
                    monthNumber = weekReducer.monthNumber + 1
                }
                if ((i % 8 - 1) > 0 && dayNumbers[i % 8 - 1] > dayNumbers[0]) {
                    monthNumber = weekReducer.monthNumber
                }
                eventState.events.map(function (event, indexEvents, arrayEvents) {
                    memos[event.id] = []
                    memos[event.id]["date"] = []
                    event.eventsDaysSlots.map(function (slots, index, array) {
                        if (event.eventType === 0) {
                            if (parseInt(slots.match(regex)[1]) === weekReducer.year && parseInt(slots.match(regex)[2] - 1) === monthNumber && parseInt(slots.match(regex)[3]) === dayNumbers[i % 8 - 1] && parseInt(slots.match(regex)[4]) === parseInt(actualHour) && parseInt(slots.match(regex)[5]) === actualMinute) {
                                eventPlaced[i] = event.title
                                bgEvent[i] = event.bgColor
                                eventId[i] = event.id
                                events[event.id]=({title: event.title,bgColor: event.bgColor, details: event.details,  startDateEvent: event.startDateEvent, hourTimeSlotStart: event.hourTimeSlotStart, minuteTimeSlotStart: event.minuteTimeSlotStart, endDateEvent: event.endDateEvent, hourTimeSlotEnd: event.hourTimeSlotEnd,minuteTimeSlotEnd: event.minuteTimeSlotEnd })
                            }
                        } else {
                            let weekNumber = moment(slots, "DD-MM-YYYY").isoWeek()

                            if (parseInt(slots.match(regex1)[3]) === weekReducer.year && weekNumber === weekReducer.weekNumber) {
                                memos[event.id]['date'][index] = slots
                                memos[event.id]['title'] = event.title
                                memos[event.id]['bgColor'] = event.bgColor
                            }
                        }
                    })
                })

                if (eventPlaced[i]) {
                    cases.push(
                        <div onClick={function (e) {
                            setActualEventId(eventId[i])
                            setShowEventMouseOverDetails(true)
                        }}
                             key={nanoid(8)}
                             className={`${bgEvent[i]} cursor-pointer leading-5 text-sm h-5 font-bold  border-r border-l border-b border-gray-300`}>{eventPlaced[i]}</div>
                    )
                } else {
                    cases.push(
                        <div key={nanoid(8)}
                             className=" h-5 leading-10  border-r border-l border-b border-gray-300"></div>)
                }
            }
        }
        return cases
    }


    return (
        <>
            <Memos memos={memos}/>
            <div className="mt-10 flex justify-center">
                <div
                    className="grid grid-cols-[repeat(8,minmax(140px,_1fr))] grid-flow-row w-full max-w-[1000px]">

                    <div
                        className="text-xl border-r border-l border-b border-gray-300">Heures
                    </div>
                    <div
                        className={`${weekReducer.year === actualYearNumber &&  weekReducer.weekNumber === actualWeekNumber &&  moment().isoWeekday() === 1 ? "bg-amber-400 text-xl border-r border-l border-b border-gray-300" : "text-xl border-r border-l border-b border-gray-300"}`}>Lun <br/> {dayNumbers[0]}
                    </div>
                    <div
                        className={`${weekReducer.year === actualYearNumber &&  weekReducer.weekNumber === actualWeekNumber &&  moment().isoWeekday() === 2 ? "bg-amber-400 text-xl border-r border-l border-b border-gray-300" : "text-xl border-r border-l border-b border-gray-300"}`}>Mar <br/> {dayNumbers[1]}
                    </div>
                    <div
                        className={`${weekReducer.year === actualYearNumber &&  weekReducer.weekNumber === actualWeekNumber &&  moment().isoWeekday() === 3 ? "bg-amber-400 text-xl border-r border-l border-b border-gray-300" : "text-xl border-r border-l border-b border-gray-300"}`}>Mer <br/> {dayNumbers[2]}
                    </div>
                    <div
                        className={`${weekReducer.year === actualYearNumber &&  weekReducer.weekNumber === actualWeekNumber &&  moment().isoWeekday() === 4 ? "bg-amber-400 text-xl border-r border-l border-b border-gray-300" : "text-xl border-r border-l border-b border-gray-300"}`}>Jeu <br/> {dayNumbers[3]}
                    </div>
                    <div
                        className={`${weekReducer.year === actualYearNumber &&  weekReducer.weekNumber === actualWeekNumber &&  moment().isoWeekday() === 5 ? "bg-amber-400 text-xl border-r border-l border-b border-gray-300" : "text-xl border-r border-l border-b border-gray-300"}`}>Ven <br/> {dayNumbers[4]}
                    </div>
                    <div
                        className={`${weekReducer.year === actualYearNumber &&  weekReducer.weekNumber === actualWeekNumber &&  moment().isoWeekday() === 6 ? "bg-amber-400 text-xl border-r border-l border-b border-gray-300" : "text-xl border-r border-l border-b border-gray-300"}`}>Sam <br/> {dayNumbers[5]}
                    </div>
                    <div
                        className={`${weekReducer.year === actualYearNumber &&  weekReducer.weekNumber === actualWeekNumber &&  moment().isoWeekday() === 7 ? "bg-amber-400 text-xl border-r border-l border-b border-gray-300" : "text-xl border-r border-l border-b border-gray-300"}`}>Dim <br/> {dayNumbers[6]}
                    </div>
                    {(createWeeklyCalendar())}
                </div>
            </div>
            {showEventMouseOverDetails && createPortal(<EventMouseOverDetails
                    setShowEventMouseOverDetails={setShowEventMouseOverDetails}
                    events={events[actualEventId]} />,
                document.body)}
        </>
    )
}
