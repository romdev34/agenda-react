import React, {useState} from 'react'
import axios from "axios";
import {updateEvents} from "../features/events.js";
import {useDispatch} from "react-redux";

export default function ModalConnexion({
                                           setDisplayModalConnexion,
                                           setApiState,
                                           ApiState,
                                           setIsLogged
                                       }) {
    const url = import.meta.env.VITE_API_LOGIN_URL
    const dispatch = useDispatch();
    const payload = {}
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        payload.email = email
        payload.password = password
        setApiState({...ApiState, loading: true})
        axios.post(url, payload)
            .then(function (res) {
                const token = res.data.token;
                localStorage.setItem('token', token);

                if (token) {
                    setIsLogged(true);

                    // Ensuite, on récupère les événements
                    axios.get(import.meta.env.VITE_API_EVENTS_URL, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                        .then(function (res) {
                            setApiState(prev => ({...prev, loading: false}));
                            setDisplayModalConnexion(false);
                            dispatch(updateEvents(res.data["hydra:member"]));
                        })
                        .catch(error => {
                            console.error("Erreur récupération événements :", error.response?.data?.message || error.message);
                            setApiState(prev => ({...prev, loading: false}));
                        });
                } else {
                    setApiState(prev => ({...prev, loading: false}));
                }
            })
            .catch(function (error) {
                setApiState(prev => ({...prev, loading: false}));
            });
    }

    return (
        <div
            onClick={() => setDisplayModalConnexion(false)}
            className="fixed z-10 inset-0 flex items-center justify-center bg-gray-600/75"
        >
            <form
                onSubmit={handleSubmit}
                onClick={e => e.stopPropagation()}
                className="max-w-[400px] rounded p-7 bg-gray-50 mb-[10vh]"
            >
                <div className="flex items-end mb-5">
                    <p className="font-semibold mr-5">Identifiants </p>
                    <button
                        type="button"
                        onClick={() => setDisplayModalConnexion(false)}
                        className="text-sm bg-red-600 text-white hover:bg-red-700 py-1 px-3 rounded"
                    >
                        Close
                    </button>
                </div>
                <input className="block m-auto border-gray-300 border text-center"
                       onChange={(e) => setEmail(e.target.value)}
                       value={email}
                       type="email"
                       placeholder="email"/>
                <input className="block m-auto border-gray-300 border text-center"
                       onChange={(e) => setPassword(e.target.value)}
                       value={password}
                       type="password"
                       placeholder="password"/>
                <button
                    className="w-full text-center text-white cursor-pointer rounded p-2 bg-blue-600"
                    type="submit">
                    Valider
                </button>
            </form>
        </div>
    )
}