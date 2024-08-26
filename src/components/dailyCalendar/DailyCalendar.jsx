import {nanoid} from "nanoid";
import {useSelector} from "react-redux";
import moment from "moment/moment.js";
import dailyReducer from "../features/dailyProperties.js";
import Memos from "./Memos.jsx";

export default function DailyCalendar() {

    const eventState = useSelector(state => state.eventReducer)
    const dailyReducer = useSelector(state => state.dailyReducer)
    const regex = /(\d+)-(\d+)-(\d+)\s(\d+):(\d+):(\d+)/
    const regex1 = /(\d+)-(\d+)-(\d+)/
    // console.log(eventState.events)

    let cases = []
    let halfHour = 0
    let actualHour = -0.5
    let actualMinute = 0
    let eventPlaced = []
    let bgEvent = []
    let memos = []

    function createDailyCalendar() {
        for (let i = 0; i < 96; i++) {

            if ((i % 2 === 0) && ((i / 2) % 2 === 0)) {
                actualHour = actualHour + 0.5
                actualMinute = 0
                cases.push(
                    <div key={nanoid(8)}
                         className="h-10 leading-10 bg-white border-r border-l border-t border-gray-300">
                        <div
                            className="relative bottom-[2px] text-sm">{("0" + (i / 2) / 2).slice(-2) + " h"}</div>
                    </div>
                )
            }
            if ((i % 2 === 0) && ((i / 2) % 2 !== 0)) {
                actualHour = actualHour + 0.5
                actualMinute = 30
                cases.push(<div key={nanoid(8)}
                                className="h-10 leading-10 bg-white border-r border-l border-t border-gray-300">
                    <div
                        className="relative bottom-[2px] text-sm">{("0" + halfHour).slice(-2) + " h 30"}</div>
                </div>)
                halfHour++
            }
            if ((i % 2 !== 0)) {
                eventState.events.map(function (event) {
                    memos[event.id] = []
                    memos[event.id]["date"] = []
                    event.eventsDaysSlots.map(function (slots, index) {

                        if (event.eventType === 0) {
                            if (parseInt(slots.match(regex)[1]) === dailyReducer.year && parseInt(slots.match(regex)[2] - 1) === dailyReducer.monthNumber && parseInt(slots.match(regex)[3]) === dailyReducer.todayDayNumber && parseInt(slots.match(regex)[4]) === parseInt(actualHour) && parseInt(slots.match(regex)[5]) === actualMinute) {
                                eventPlaced[i] = event.title
                                bgEvent[i] = event.bgColor
                            }
                        } else {
                            // let weekNumber = moment(slots, "DD-MM-YYYY").isoWeek()
                            if (parseInt(slots.match(regex1)[3]) === dailyReducer.year && parseInt(slots.match(regex1)[2] - 1) === dailyReducer.monthNumber && parseInt(slots.match(regex1)[1]) === dailyReducer.todayDayNumber) {

                                memos[event.id]['date'][index] = slots
                                memos[event.id]['title'] = event.title
                                memos[event.id]['bgColor'] = event.bgColor
                            }
                        }
                    })
                })

                cases.push(
                    <div key={nanoid(8)}
                         className={`${eventPlaced[i] ? `${bgEvent[i]} h-10 leading-10  border-r border-l border-b border-gray-300` : "h-10 leading-10 bg-white border-r border-l border-t border-gray-300"}`}>{eventPlaced[i]}</div>
                )
            }
        }
        return cases

    }

    return (
        <>
            <Memos memos={memos}/>
            <div className="mt-10 flex justify-center">
                <div
                    className="grid grid-cols-[repeat(2,minmax(140px,_1fr))] grid-flow-row w-full max-w-[1000px]">
                    <div
                        className="text-xl bg-white border-r border-l border-gray-300">Heure
                    </div>
                    <div
                        className="text-xl bg-amber-50 border-r border-l  border-gray-300">jour
                    </div>
                    {(createDailyCalendar())}
                </div>
            </div>
        </>
    )
}
