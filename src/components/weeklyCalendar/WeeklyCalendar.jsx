import {nanoid} from "nanoid";
import {useSelector} from "react-redux";

export default function WeeklyCalendar() {

    const weekReducer = useSelector(state => state.weeklyReducer)

    const dayNumbers = weekReducer.dayNumbers

    let cases = []
    function createWeeklyCalendar() {
        for(let i=0; i<384; i++) {

            // console.log((i % 8) % 2 === 0)
            if((i % 8 === 0) && ((i / 8) % 2 === 0)) {
                cases.push(
                    <div key={nanoid(8)}
                         className="bg-white border border-gray-300">{("0" + (i / 8)/2).slice(-2) + " h"}</div>
                )
            }
            if((i % 8 === 0) && ((i / 8) % 2 !== 0)) {
                cases.push(<div key={nanoid(8)}
                     className="bg-white border border-gray-300"></div>)
            }
            if ((i % 8 !== 0)) {
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
                className="grid grid-cols-[repeat(8,minmax(140px,_1fr))] grid-flow-row w-full max-w-[1000px]">

                <div className="bg-white border border-gray-300">Heures</div>
                <div className="bg-blue-50 border border-gray-300">Lun {dayNumbers[0]}</div>
                <div className="bg-red-50 border border-gray-300">Mar {dayNumbers[1]}</div>
                <div className="bg-green-50 border border-gray-300">Mer {dayNumbers[2]}</div>
                <div className="bg-purple-50 border border-gray-300">Jeu {dayNumbers[3]}</div>
                <div className="bg-gray-50 border border-gray-300">Ven {dayNumbers[4]}</div>
                <div className="bg-cyan-50 border border-gray-300">Sam {dayNumbers[5]}</div>
                <div className="bg-amber-50 border border-gray-300">Dim {dayNumbers[6]}</div>

                {(createWeeklyCalendar())}

            </div>
        </div>
    )
}
