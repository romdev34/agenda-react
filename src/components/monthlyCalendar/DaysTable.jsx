import {createPortal} from "react-dom";
import Modal from "./Modal.jsx";
import {useState} from "react";
export default function DaysTable({dayNumber, active, actualMonthState, todayDay}) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>

            {todayDay === dayNumber && <div className={`h-[130px] border border-gray-300 ${actualMonthState ? 'bg-amber-300': !active ? 'bg-gray-100': 'bg-white'}`}><p onClick={() => setShowModal(!showModal)} className="inline-block cursor-pointer float-right mr-4">{dayNumber}</p></div> }

            {todayDay !== dayNumber  &&  <div className={`h-[130px] border border-gray-300 ${!active ? 'bg-gray-100': 'bg-white'}`}><p onClick={() => setShowModal(!showModal)} className="inline-block cursor-pointer float-right mr-4">{dayNumber}</p></div> }

            {showModal && createPortal(<Modal closeModal={() => setShowModal(!showModal)} />,
                document.body)}
        </>
    )
}
