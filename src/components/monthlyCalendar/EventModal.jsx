import React, {useState} from 'react'
import trash from '/src/assets/trash.png'
import axios from "axios";
import {useSelector} from "react-redux";
import moment from "moment";
import monthReducer from "../features/monthProperties.js";
import {nanoid} from "nanoid";
// eslint-disable-next-line react/prop-types
export default function Modal({
                                  setShowEditEventModal,
                                  eventDetails,
                                  eventId,
                                  year,
                                  month,
                                  day
                              }) {
    moment.locale('fr')
    const eventState = useSelector(state => state.eventReducer)


    const regex1 = /(\d+-\d+-\d+)/
    let url = ""
    let errorAvailability = ""
    let slots = []
    let errors = []
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
    let title = ""
    let type = 0
    let details = ""
    let endDateEvent = ""
    let startDateEvent = ""
    let hourTimeSlotStart = ""
    let hourTimeSlotEnd = ""
    let minuteTimeSlotStart = ""
    let minuteTimeSlotEnd = ""
    const [formErrors, setFormErrors] = useState([])

    eventDetails.map(function (event) {
        if (event.id === eventId) {
            type = event.type
            title = event.title
            details = event.details
            endDateEvent = event.endDateEvent.match(regex1)[1]
            startDateEvent = event.startDateEvent.match(regex1)[1]
            hourTimeSlotStart = event.hourTimeSlotStart
            hourTimeSlotEnd = event.hourTimeSlotEnd
            minuteTimeSlotStart = event.minuteTimeSlotStart
            minuteTimeSlotEnd = event.minuteTimeSlotEnd
        }
    })
    // console.log(eventDetails)
    const [typeState, setTypeState] = useState(type)
    const [titleState, setTitleState] = useState(title)
    const [detailsState, setDetailsState] = useState(details)
    const [startDateEventState, setStartDateEventState] = useState(startDateEvent)
    const [hourTimeSlotStartState, setHourTimeSlotStartState] = useState(hourTimeSlotStart)
    const [minuteTimeSlotStartState, setMinuteTimeSlotStartState] = useState(minuteTimeSlotStart)
    const [endDateEventState, setEndDateEventState] = useState(endDateEvent)
    const [hourTimeSlotEndState, setHourTimeSlotEndState] = useState(hourTimeSlotEnd)
    const [minuteTimeSlotEndState, setMinuteTimeSlotEndState] = useState(minuteTimeSlotEnd)
    let options = []

    function calculSlots() {
        let t1 = moment(startDateEventState + " " + hourTimeSlotStartState + ":" + minuteTimeSlotStart)
        let t2 = moment(endDateEventState + " " + ("0" + hourTimeSlotEndState).slice(-2) + ":" + ("0" + minuteTimeSlotEndState).slice(-2))

        while (t2.isAfter(t1, "m")) {
            slots.push(t1.year() + "-" + ("0" + (t1.month() + 1)).slice(-2) + "-" + ("0" + t1.date()).slice(-2) + " " + ("0" + t1.hour()).slice(-2) + ":" + ("0" + t1.minute()).slice(-2) + ":" + "00")
            t1.add(30, "minutes")
            if (t1.hour() === parseInt(hourTimeSlotEndState) && t1.minute() === parseInt(minuteTimeSlotEndState)) {
                t1.add(1, "day")
                t1.hour(hourTimeSlotStartState)
                t1.minute(minuteTimeSlotStartState)
            }
        }
    }

    function handleSubmit(e) {
        url = import.meta.env.VITE_API_EVENTS_URL + eventId
        payload.eventType = parseInt(typeState)
        payload.title = titleState
        payload.details = detailsState
        payload.startDateEvent = startDateEventState
        payload.hourTimeSlotStart = hourTimeSlotStartState
        payload.minuteTimeSlotStart = minuteTimeSlotStartState
        payload.endDateEvent = endDateEventState
        payload.hourTimeSlotEnd = hourTimeSlotEndState
        payload.minuteTimeSlotEnd = minuteTimeSlotEndState
        calculSlots()
        if (typeState === 0) {
            eventState.events.map(function (event) {
                if (event.id !== eventId && event.eventType === 0) {
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
        setFormErrors([errors])
        if (errors.length > 0) {
            e.preventDefault()
        }
        if (errors.length === 0) {
            axios.put(url, payload, {
                headers: {
                    "Content-Type": "application/ld+json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then((response) => window.location.reload())
                .catch((error) => console.error(error))
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

    function removeEvent(e) {
        url = import.meta.env.VITE_API_EVENTS_URL + eventId
        axios.delete(url, {
            headers: {
                "Content-Type": "application/ld+json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => window.location.reload())
            .catch((error) => console.error(error));

    }

    return (<form

        onSubmit={handleSubmit}
        onClick={() => setShowEditEventModal(false)}
        className="fixed z-10 inset-0 flex items-center justify-center bg-gray-600/75"
    >
        <div
            onClick={e => e.stopPropagation()}
            className="max-w-[400px] rounded p-7 bg-gray-50 mb-[10vh]"
        >
            <div className="flex items-end mb-5">
                <p className="font-semibold mr-5">Evenement {title} </p>
                <button
                    onClick={() => setShowEditEventModal(false)}
                    className="text-sm bg-red-600 text-white hover:bg-red-700 py-1 px-3 rounded"
                >
                    Close
                </button>
            </div>
            <div>
                <button
                    onClick={() => setShowEditEventModal(false)}
                    className="text-sm text-white  py-1 px-3 rounded"
                >
                    <img onClick={removeEvent} src={trash} width="16" alt=""/>
                </button>
            </div>
            <div className="text-red-600 font-semibold">{
                formErrors.map(error => <div key={nanoid(8)}>{error}</div>)
            }</div>
            <select value={typeState}
                    onChange={(e) => setTypeState(e.target.value)}
                    name="type" id="type">
                <option value="0">Rendez-vous</option>
                <option value="1">Note</option>
            </select>
            <br/>
            <input onChange={(e) => setTitleState(e.target.value)}
                   value={titleState}
                   placeholder="titre (20 caractères max)" maxLength="20"
                   className="border border-gray-300 p-1" type="text"
                   id="title"/>
            <br/>
            <input onChange={(e) => setDetailsState(e.target.value)}
                   value={detailsState}
                   placeholder="détails" className="p-1 border border-gray-300"
                   type="text" id="details"/>
            <br/>
            <div>
                <label
                    className="bg-gray-300 w-[119px] inline-block pl-1 rounded"
                    htmlFor="startDateEvent">Date de
                    début : </label>
                <input onChange={(e) => setStartDateEventState(e.target.value)}
                       value={startDateEventState}
                       className="p-1 w-[115px] mr-1"
                       id="startDateEvent" type="date"/>
                {parseInt(type) === 0 && <select value={hourTimeSlotStartState}
                                                 onChange={(e) => setHourTimeSlotStartState(e.target.value)}
                                                 name="hourTimeSlotStart"
                                                 id="hourTimeSlotStart">
                    {handleSelectOptions()}
                </select>}
                {parseInt(type) === 0 && <select
                    onChange={(e) => setMinuteTimeSlotStartState(e.target.value)}
                    value={minuteTimeSlotStartState} name="minuteTimeSlotStart"
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
                <input onChange={(e) => setEndDateEventState(e.target.value)}
                       value={endDateEventState} className="p-1 w-[115px] mr-1"
                       id="endDateEvent"
                       type="date"/>

                {parseInt(type) === 0 &&
                    <select
                        onChange={(e) => setHourTimeSlotEndState(e.target.value)}
                        value={hourTimeSlotEndState} name="hourTimeSlotEnd"
                        id="hourTimeSlotEnd">
                        {handleSelectOptions()}
                    </select>}
                {parseInt(type) === 0 && <select
                    onChange={(e) => setMinuteTimeSlotEndState(e.target.value)}
                    value={minuteTimeSlotEndState} className="m-auto"
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
