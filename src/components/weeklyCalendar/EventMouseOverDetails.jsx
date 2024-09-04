import React from 'react'
import moment from "moment";

export default function EventMouseOverDetails({setShowEventMouseOverDetails, events}) {

    const regex1 = /(\d+-\d+-\d+)/
    return (
        <div onClick={(e) => setShowEventMouseOverDetails(false)}
            className="fixed z-10 inset-0 flex items-center justify-center bg-gray-600/75">
            <div
                onClick={e => e.stopPropagation()}
                className="max-w-[400px] rounded p-7 bg-gray-50 mb-[10vh]"
            >
                <p className="text-center">{events.title}</p>
                <div className="inline">Du: <p className=" inline-block font-bold">{events.startDateEvent.match(regex1)[1]} {("0" + events.hourTimeSlotStart).slice(-2)}:{events.minuteTimeSlotStart}</p>  </div>
                <div>Au: <p className=" inline-block font-bold">
                        {events.endDateEvent.match(regex1)[1]} {events.hourTimeSlotEnd}:{events.minuteTimeSlotEnd}
                    </p></div>
                <div className="flex w-[250px]"> Détails: <p className="overflow-x-auto flex  flex-wrap ml-2"> {events.details}</p></div>

            </div>
        </div>
    )
}
