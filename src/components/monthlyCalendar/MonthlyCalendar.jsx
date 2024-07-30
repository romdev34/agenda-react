import {useSelector} from "react-redux";
import DaysTable from "./DaysTable.jsx";
import {nanoid} from "nanoid";

export default function MonthlyCalendar() {
    const monthReducerState = useSelector(state => state.monthReducer)
    const todayDate = new Date()
    const options = {
        day: 'numeric',
        weekday: 'short'
    };

    const daysNumbers = [];
    let j = 1;
    let k = 1;
    let l = 1;
    for (let i = 1; i < 43; i++) {

        // je pars du principe que 1 = lundi
        if (i < monthReducerState.firstDayNumber) {

            daysNumbers.push({'day': monthReducerState.numberOfDaysInThePreviousMonth - monthReducerState.firstDayNumber + i + 1,'month': monthReducerState.monthNumber-1, 'active': false
            })
            l += 1
        }

        if (i >= monthReducerState.firstDayNumber && i < monthReducerState.numberOfDaysInTheMonth + (monthReducerState.firstDayNumber)) {

            daysNumbers.push({
                'day': j, 'active': true, 'month': monthReducerState.monthNumber
            })
            j++
            l += 1
        }

        if (i >= l ){
            daysNumbers.push({
                'day': k, 'active': false, 'month': monthReducerState.monthNumber + 1
            })
            k+=1
        }
    }
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
                                          active={day.active}
                                          todayDay={todayDate.getDate()}/>
                    }
                )}

            </div>
        </div>
    )
}
