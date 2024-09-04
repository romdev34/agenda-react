import React, {useState} from 'react'
import {nanoid} from "nanoid";
import axios from "axios";
import {useSelector} from "react-redux";
import moment from "moment";
import monthReducer from "../features/monthProperties.js";
// eslint-disable-next-line react/prop-types
export default function Modal({setShowModal, year, month, day}) {
    moment.locale('fr')
    const regex1 = /(\d+-\d+-\d+)/
    let url = ""
    let payload = {
        title: "",
        details: "",
        startDateEvent: "",
        endDateEvent: "",
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
    const [startDateEvent, setStartDateEvent] = useState(year + "-" + ("0" + (month + 1)).slice(-2) + "-" + ("0" + day).slice(-2))
    const [hourTimeSlotStart, setHourTimeSlotStart] = useState("00")
    const [minuteTimeSlotStart, setMinuteTimeSlotStart] = useState("00")
    const [endDateEvent, setEndDateEvent] = useState(year + "-" + ("0" + (month + 1)).slice(-2) + "-" + ("0" + day).slice(-2))
    const [hourTimeSlotEnd, setHourTimeSlotEnd] = useState("00")
    const [minuteTimeSlotEnd, setMinuteTimeSlotEnd] = useState("00")
    let errors = []
    let slots = []
    let errorAvailability = ""

    const eventState = useSelector(state => state.eventReducer)

    const [formErrors, setFormErrors] = useState([])

    function calculSlots() {
        let t1 = moment(startDateEvent + " " + hourTimeSlotStart + ":" + minuteTimeSlotStart)
        let t2 = moment(endDateEvent + " " + ("0" + hourTimeSlotEnd).slice(-2) + ":" + ("0" + minuteTimeSlotEnd).slice(-2))

        while (t2.isAfter(t1, "m")) {
            slots.push(t1.year() + "-" + ("0" + (t1.month() + 1)).slice(-2) + "-" + ("0" + t1.date()).slice(-2) + " " + ("0" + t1.hour()).slice(-2) + ":" + ("0" + t1.minute()).slice(-2) + ":" + "00")
            t1.add(30, "minutes")
            if (t1.hour() === parseInt(hourTimeSlotEnd) && t1.minute() === parseInt(minuteTimeSlotEnd)) {
                t1.add(1, "day")
                t1.hour(hourTimeSlotStart)
                t1.minute(minuteTimeSlotStart)
            }
        }
    }

    // console.log(eventState.events)
    function handleSubmit(e) {
        errors = []
        url = "http://localhost:8080/api/events"
        payload.eventType = parseInt(type)
        payload.title = title
        payload.details = details
        payload.startDateEvent = startDateEvent
        payload.hourTimeSlotStart = hourTimeSlotStart
        payload.minuteTimeSlotStart = minuteTimeSlotStart
        payload.endDateEvent = endDateEvent
        payload.hourTimeSlotEnd = hourTimeSlotEnd
        payload.minuteTimeSlotEnd = minuteTimeSlotEnd
        calculSlots()
        if (event.eventType === 0) {
            eventState.events.map(function (event) {
                if (event.eventType === 0) {
                    event.eventsDaysSlots.map(function (slot) {
                        if (slots.find((element) => element === slot)) {
                            errorAvailability = 'Ce créneau est deja pris à ces dates par l\'evenement "' + event.title + '"'
                        }
                    })
                }
            })
        }
        if (errorAvailability) {
            errors.push(errorAvailability)
        }

        if (startDateEvent > endDateEvent) {
            errors.push(<div>date de début supérieure a date de fin<br/></div>)
        }
        if (startDateEvent === "" || endDateEvent === "") {
            errors.push(<div>Vous devez remplir une date de début et de fin<br/>
            </div>)
        }
        if (title === "") {
            errors.push(<div>Vous devez indiquer le titre de l'évenement<br/>
            </div>)
        }
        if (parseInt(type) === 0 && (hourTimeSlotStart > hourTimeSlotEnd || (hourTimeSlotStart === hourTimeSlotEnd && minuteTimeSlotStart >= minuteTimeSlotEnd))) {
            errors.push(<div key={nanoid(8)}> l'heure de début doit etre
                inférieure strictement à l'heure de fin <br/></div>)
        }
        setFormErrors([errors])

        if (errors.length > 0) {
            e.preventDefault()
        }
        console.log(errors)
        if (errors.length === 0) {
            axios.post(url, payload, {
                headers: {
                    "Content-Type": "application/ld+json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then((response) => window.location.reload())
                .catch((error) => console.error(error));

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
                <label
                    className="bg-gray-300 w-[119px] inline-block pl-1 rounded"
                    htmlFor="startDateEvent">Date de
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
                <label
                    className="bg-gray-300 w-[119px] inline-block pl-1 rounded"
                    htmlFor="endDateEvent">Date de
                    fin : </label>
                <input onChange={(e) => setEndDateEvent(e.target.value)}
                       value={endDateEvent} className="p-1 w-[115px] mr-1"
                       id="endDateEvent"
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
