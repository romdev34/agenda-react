import React, {useState} from 'react'
import {nanoid} from "nanoid";
import axios from "axios";
import {useSelector} from "react-redux";
import moment from "moment";
// eslint-disable-next-line react/prop-types
export default function Modal({setShowModal}) {
    moment.locale('fr')
    const regex1 = /(\d+-\d+-\d+)/
    let url = ""
    let payload = {
        title: "",
        details: "",
        start_date_event: "",
        end_date_event: "",
        hourTimeSlotStart: null,
        minuteTimeSlotStart: null,
        hourTimeSlotEnd: null,
        minuteTimeSlotEnd: null,
        eventType: 0
    }
    let options = []
    const [type, setType] = useState(0)
    const [title, setTitle] = useState("")
    const [details, setDetails] = useState("")
    const [startDateEvent, setStartDateEvent] = useState("")
    const [hourTimeSlotStart, setHourTimeSlotStart] = useState("00")
    const [minuteTimeSlotStart, setMinuteTimeSlotStart] = useState("00")
    const [endDateEvent, setEndDateEvent] = useState("")
    const [hourTimeSlotEnd, setHourTimeSlotEnd] = useState("00")
    const [minuteTimeSlotEnd, setMinuteTimeSlotEnd] = useState("00")
    let errors = []

    const eventState = useSelector(state => state.eventReducer)

    const [formErrors, setFormErrors] = useState([])

    // console.log(eventState.events)
    function handleSubmit(e) {
        errors = []
        url = "http://localhost:8080/api/events"
        payload.eventType = parseInt(type)
        payload.title = title
        payload.details = details
        payload.start_date_event = startDateEvent
        payload.hourTimeSlotStart = hourTimeSlotStart
        payload.minuteTimeSlotStart = minuteTimeSlotStart
        payload.end_date_event = endDateEvent
        payload.hourTimeSlotEnd = hourTimeSlotEnd
        payload.minuteTimeSlotEnd = minuteTimeSlotEnd

        eventState.events.map(function (event) {

            if (event.eventType === 0 && parseInt(type) === 0 &&
                (event.end_date_event.match(regex1)[1] >= startDateEvent && endDateEvent >= event.start_date_event.match(regex1)[1] || event.start_date_event.match(regex1)[1] <= endDateEvent && startDateEvent <= event.end_date_event.match(regex1)[1])
                && (
                    (event.hourTimeSlotEnd > hourTimeSlotStart && hourTimeSlotEnd > event.hourTimeSlotStart || event.hourTimeSlotStart < hourTimeSlotEnd && hourTimeSlotStart < event.hourTimeSlotEnd)
                    || ((event.hourTimeSlotStart === hourTimeSlotEnd && event.minuteTimeSlotStart === minuteTimeSlotEnd) || (event.hourTimeSlotStart === hourTimeSlotStart && event.minuteTimeSlotStart === minuteTimeSlotStart) || (event.hourTimeSlotEnd === hourTimeSlotEnd && event.minuteTimeSlotEnd === minuteTimeSlotEnd) || (event.hourTimeSlotEnd === hourTimeSlotStart && event.minuteTimeSlotEnd === minuteTimeSlotStart))
                )
            ) {
                console.log(event.id)
            }
        })

        if (startDateEvent > endDateEvent) {
            errors.push('date de début supérieure a date de fin')
        }
        if(startDateEvent ==="" || endDateEvent === "") {
            errors.push("Vous devez remplir une date de début et de fin")
        }
        if (parseInt(type) === 0 && (hourTimeSlotStart > hourTimeSlotEnd || (hourTimeSlotStart === hourTimeSlotEnd && minuteTimeSlotStart >= minuteTimeSlotEnd))) {
            errors.push(<div key={nanoid(8)}> l'heure de début doit etre
                inférieure strictement à l'heure de fin <br/></div>)
        }
        setFormErrors([errors])

        if (errors.length >= 0) {
            e.preventDefault()
        }
        if (errors.length === 0) {
            hourTimeSlotEnd
            axios.post(url, payload, {
                headers: {
                    "Content-Type": "application/ld+json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then((response) => console.log(response))
                .catch((error) => console.error(error));
            window.location.reload();
        }

    }

    function handleSelectOptions() {
        options = []
        for (let i = 0; i < 24; i++) {
            i = i.toString();
            if (i.length < 2) i = "0" + i;
            options.push(
                <option key={nanoid(8)} value={i}>{i}</option>
            )
        }
        return options
    }

    return (<form

        onSubmit={handleSubmit}
        onClick={() => setShowModal(false)}
        className="fixed z-10 inset-0 flex items-center justify-center bg-gray-600/75"
    >
        <div
            onClick={e => e.stopPropagation()}
            className="max-w-[400px] rounded p-7 bg-gray-50 mb-[10vh]"
        >
            <div className="flex items-end mb-5">
                <p className="font-semibold mr-5">Création d'un nouvel
                    évenement</p>
                <button
                    onClick={() => setShowModal(false)}
                    className="text-sm bg-red-600 text-white hover:bg-red-700 py-1 px-3 rounded"
                >
                    Close
                </button>
            </div>
            <div className="text-red-600 font-semibold">{
                formErrors.map(error => <div key={nanoid(8)}>{error}</div>)
            }</div>
            <select value={type} onChange={(e) => setType(e.target.value)}
                    name="type" id="type">
                <option value="0">Rendez-vous</option>
                <option value="1">Note</option>
            </select>
            <br/>
            <input onChange={(e) => setTitle(e.target.value)} value={title}
                   placeholder="titre (20 caractères max)" maxLength="20"
                   className="border border-gray-300 p-1" type="text"
                   id="title"/>
            <br/>
            <input onChange={(e) => setDetails(e.target.value)} value={details}
                   placeholder="détails" className="p-1 border border-gray-300"
                   type="text" id="details"/>
            <br/>
            <div>
                <label className="bg-gray-300 w-[119px] inline-block pl-1 rounded" htmlFor="startDateEvent">Date de
                    début : </label>
                <input onChange={(e) => setStartDateEvent(e.target.value)}
                       value={startDateEvent} className="p-1 w-[115px] mr-1"
                       id="startDateEvent" type="date"/>
                {parseInt(type) === 0 && <select value={hourTimeSlotStart}
                                                 onChange={(e) => setHourTimeSlotStart(e.target.value)}
                                                 name="hourTimeSlotStart"
                                                 id="hourTimeSlotStart">
                    {handleSelectOptions()}
                </select>}
                {parseInt(type) === 0 && <select
                    onChange={(e) => setMinuteTimeSlotStart(e.target.value)}
                    value={minuteTimeSlotStart} name="minuteTimeSlotStart"
                    id="minuteTimeSlotStart">
                    <option value="00">00</option>
                    <option value="30">30</option>
                </select>}
            </div>
            <div>
                <label className="bg-gray-300 w-[119px] inline-block pl-1 rounded" htmlFor="endDateEvent">Date de
                    fin : </label>
                <input onChange={(e) => setEndDateEvent(e.target.value)}
                       value={endDateEvent} className="p-1 w-[115px] mr-1" id="endDateEvent"
                       type="date"/>

                {parseInt(type) === 0 &&
                    <select onChange={(e) => setHourTimeSlotEnd(e.target.value)}
                            value={hourTimeSlotEnd} name="hourTimeSlotEnd"
                            id="hourTimeSlotEnd">
                        {handleSelectOptions()}
                    </select>}
                {parseInt(type) === 0 && <select
                    onChange={(e) => setMinuteTimeSlotEnd(e.target.value)}
                    value={minuteTimeSlotEnd} className="m-auto"
                    name="minuteTimeSlotEnd" id="minuteTimeSlotEnd">
                    <option value="00">00</option>
                    <option value="30">30</option>
                </select>}
            </div>
            <button onSubmit={(e) => handleSubmit(e)}
                    className="w-full text-center text-white cursor-pointer rounded p-2 bg-blue-600"
                    type="submit">Valider
            </button>
        </div>

    </form>)
}
