import {createPortal} from "react-dom";
import Modal from "./Modal.jsx";
import {useState} from "react";
import {nanoid} from "nanoid";

export default function DaysTable({
                                      eventDetails,
                                      dayNumber,
                                      active,
                                      actualMonthState,
                                      todayDay,

                                  }) {

    const [showModal, setShowModal] = useState(false)
    // console.log(eventDetails)
    let tag = []
    return (
        <>
            {todayDay === dayNumber && <div
                className={`h-[130px] border border-gray-300 ${actualMonthState && active ? 'bg-amber-300' : !active ? 'bg-gray-100' : 'bg-white'}`}>
                <p onClick={() => setShowModal(!showModal)}
                   className="inline-block cursor-pointer float-right mr-4">{dayNumber}</p>
                <br/>

                <div
                    className="flex flex-col">{eventDetails.length ? eventDetails.map(function (event, index, array) {
                    tag = []
                    if (index === 0) {
                        if (array[array.length - 1].numberOfEventsInADay < event.position) {
                            for (let i = 1; i < event.position; i++) {
                                tag.push(<div className="opacity-0 mb-1"
                                              key={nanoid(8)}>{index}</div>)
                            }
                        }
                    }
                    return ([tag, <div className={`mb-1 ${event.bgColor}`}
                                       key={nanoid(8)}>{event.title}</div>])
                }) : ""}</div>
            </div>}

            {todayDay !== dayNumber && <div
                className={`h-[130px] border border-gray-300 ${!active ? 'bg-gray-100' : 'bg-white'}`}>
                <p onClick={() => setShowModal(!showModal)}
                   className="inline-block cursor-pointer float-right mr-4">{dayNumber}</p>
                <br/>

                <div
                    className="flex flex-col">{eventDetails.length ? eventDetails.map(function (event, index, array) {
                    tag = []
                    if (index === 0) {
                        if (array[array.length - 1].numberOfEventsInADay < event.position) {
                            for (let i = 1; i < event.position; i++) {
                                tag.push(<div className="opacity-0 mb-1"
                                              key={nanoid(8)}>{index}</div>)
                            }
                        }
                    }
                    return ([tag, <div className={`mb-1 ${event.bgColor}`}
                                       key={nanoid(8)}>{event.title}</div>])
                }) : ""}</div>
            </div>}

            {showModal && createPortal(<Modal
                    closeModal={() => setShowModal(!showModal)}/>,
                document.body)}
        </>
    )
}
