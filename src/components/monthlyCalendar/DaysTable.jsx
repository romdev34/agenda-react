import {createPortal} from "react-dom";
import Modal from "./Modal.jsx";
import EventModal from "./EventModal.jsx";
import {useState} from "react";
import {nanoid} from "nanoid";

export default function DaysTable({
                                      eventDetails,
                                      year,
                                      month,
                                      dayNumber,
                                      active,
                                      actualMonthState,
                                      todayDay,
                                  }) {

    const [showModal, setShowModal] = useState(false)
    const [showEditEventModal, setShowEditEventModal] = useState(false)
    const [eventId, setEventId] = useState("")
    let tag = []
    return (
        <>
            {todayDay === dayNumber && <div
                className={`h-[130px] border-r border-l border-b border-gray-300 ${actualMonthState && active ? 'bg-amber-300' : !active ? 'bg-gray-100' : 'bg-white'}`}>
                <p onClick={() => setShowModal(!showModal)}
                   className="inline-block cursor-pointer float-right mr-4">{dayNumber}</p>
                <br/>

                <div
                    className="flex flex-col">{eventDetails.length ? eventDetails.map(function (event, index, array) {
                    tag = []
                    return ([tag,
                        <div onClick={
                            function() {
                                setEventId(event.id)
                                setShowEditEventModal(!showEditEventModal)
                            }} className={`cursor-pointer text-sm mb-1 ${event.bgColor}`}
                             key={nanoid(8)}>{event.title}</div>])
                }) : ""}</div>
            </div>}

            {todayDay !== dayNumber && <div
                className={`h-[130px] border-r border-l border-b border-gray-300 ${!active ? 'bg-gray-100' : 'bg-white'}`}>
                <p onClick={() => setShowModal(!showModal)}
                   className="inline-block cursor-pointer float-right mr-4">{dayNumber}</p>
                <br/>

                <div
                    className="flex flex-col">{eventDetails.length ? eventDetails.map(function (event) {
                    tag = []
                    return ([tag,
                        <div onClick={
                            function() {
                                setEventId(event.id)
                                 setShowEditEventModal(!showEditEventModal)
                        }} className={`cursor-pointer text-sm mb-1 ${event.bgColor}`}
                             key={nanoid(8)}>{event.title}</div>])
                }) : ""}</div>
            </div>}

            {showModal && createPortal(<Modal
                    setShowModal={setShowModal} eventId={eventId} year={year} month={month} day={dayNumber}/>,
                document.body)}

            {showEditEventModal && createPortal(<EventModal
                    setShowEditEventModal={setShowEditEventModal} eventDetails={eventDetails} eventId={eventId} year={year} month={month} day={dayNumber}/>,
                document.body)}
        </>
    )
}
