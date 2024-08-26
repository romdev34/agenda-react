import {nanoid} from "nanoid";
import {useSelector} from "react-redux";
import moment from "moment";

export default function WeeklyCalendar() {
    const regex = /(\d+)-(\d+)-(\d+)\s(\d+):(\d+):(\d+)/

    const eventState = useSelector(state => state.eventReducer)
    const weekReducer = useSelector(state => state.weeklyReducer)
    moment.locale('fr')
    const dayNumbers = weekReducer.dayNumbers
    let cases = []
    let eventPlaced = []
    let bgEvent = []
    let actualHour = -0.5
    let actualMinute = 0

    function createWeeklyCalendar() {
        for (let i = 0; i < 384; i++) {

            if ((i % 8 === 0) && ((i / 8) % 2 === 0)) {
                actualHour = actualHour + 0.5
                actualMinute = 0
                cases.push(
                    <div key={nanoid(8)}
                         className="h-10 leading-10 bg-white border-r border-l border-b border-gray-300">
                        <div
                            className="relative bottom-[2px] text-sm">{("0" + (i / 8) / 2).slice(-2) + " h"}</div>
                    </div>
                )
            }
            if ((i % 8 === 0) && ((i / 8) % 2 !== 0)) {
                actualHour = actualHour + 0.5
                actualMinute = 30

                cases.push(<div key={nanoid(8)}
                                className="h-10 leading-10  bg-white border-r border-l border-b border-gray-300">
                        <div
                            className="relative bottom-[2px] text-sm">{("0" + parseInt((i / 8) / 2)).slice(-2) + " h 30"}</div>
                    </div>
                )
            }
            if ((i % 8 !== 0)) {
                eventState.events.map(function (event) {
                    event.eventsDaysSlots.map(function (slots) {
                        if (event.eventType === 0) {
                            if (parseInt(slots.match(regex)[1]) === weekReducer.year && parseInt(slots.match(regex)[2] - 1) === weekReducer.monthNumber && parseInt(slots.match(regex)[3]) === dayNumbers[i % 8 - 1] && parseInt(slots.match(regex)[4]) === parseInt(actualHour) && parseInt(slots.match(regex)[5]) === actualMinute) {
                                eventPlaced[i] = event.title
                                bgEvent[i] = event.bgColor
                            }
                        }
                    })
                })
                cases.push(
                    <div key={nanoid(8)}
                         className={`${eventPlaced[i] ? `${bgEvent[i]} h-10 leading-10  border-r border-l border-b border-gray-300` : " h-10 leading-10  border-r border-l border-b border-gray-300"}`}>{eventPlaced[i]}</div>
                )


            }

        }
        return cases
    }


    return (
        <div className="mt-10 flex justify-center">
            <div
                className="grid grid-cols-[repeat(8,minmax(140px,_1fr))] grid-flow-row w-full max-w-[1000px]">

                <div
                    className="text-xl border-r border-l border-b border-gray-300">Heures
                </div>
                <div
                    className="text-xl border-r border-l border-b border-gray-300">Lun <br/> {dayNumbers[0]}
                </div>
                <div
                    className="text-xl border-r border-l border-b border-gray-300">Mar <br/> {dayNumbers[1]}
                </div>
                <div
                    className="text-xl border-r border-l border-b border-gray-300">Mer <br/> {dayNumbers[2]}
                </div>
                <div
                    className="text-xl border-r border-l border-b border-gray-300">Jeu <br/> {dayNumbers[3]}
                </div>
                <div
                    className="text-xl border-r border-l border-b border-gray-300">Ven <br/> {dayNumbers[4]}
                </div>
                <div
                    className="text-xl border-r border-l border-b border-gray-300">Sam <br/>{dayNumbers[5]}
                </div>
                <div
                    className="text-xl border-r border-l border-b border-gray-300">Dim <br/> {dayNumbers[6]}
                </div>

                {(createWeeklyCalendar())}

            </div>
        </div>
    )
}
