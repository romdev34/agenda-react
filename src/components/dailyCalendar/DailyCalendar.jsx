import {nanoid} from "nanoid";
import {useSelector} from "react-redux";

export default function DailyCalendar() {

    let cases = []
    let halfHour = 0
    function createDailyCalendar() {
        for(let i=0; i<96; i++) {

            // console.log((i % 8) % 2 === 0)
            if((i % 2 === 0) && ((i / 2) % 2 === 0)) {
                cases.push(
                    <div key={nanoid(8)}
                         className="bg-white border border-gray-300">{("0" + (i / 2)/2).slice(-2) + " h"}</div>
                )
            }
            if((i % 2 === 0) && ((i / 2) % 2 !== 0)) {
                cases.push(<div key={nanoid(8)}
                                className="bg-white border border-gray-300">{("0" + halfHour).slice(-2) + " h 30"}</div>)
                halfHour++
            }
            if ((i % 2 !== 0)) {
                cases.push(
                    <div key={nanoid(8)}
                         className="h-10 bg-white border border-gray-300"></div>
                )
            }
        }
        return cases

    }

    return (
        <div className="mt-10 flex justify-center">
            <div
                className="grid grid-cols-[repeat(2,minmax(140px,_1fr))] grid-flow-row w-full max-w-[1000px]">

                <div className="bg-white border border-gray-300">Heures</div>
                <div className="bg-amber-50 border border-gray-300">jour</div>

                {(createDailyCalendar())}

            </div>
        </div>
    )
}
