import './App.css'
import Calendar from "./components/Calendar.jsx";
import axios from "axios";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {updateEvents} from "./components/features/events.js";
import spinner from './assets/spinner.svg'
import {createPortal} from "react-dom";
import ModalConnexion from "./components/layout/ModalConnexion.jsx";

function App() {
    const dispatch = useDispatch();

    const [displayModalConnexion, setDisplayModalConnexion] = useState(false)
    const [ApiState, setApiState] = useState(
        {
            loading: false,
            error: false,
            data: undefined
        }
    )
    let content;
    if (ApiState.loading) {
        content = <div
            className="fixed inset-0  items-center m-auto  max-w-[1000px] flex h-screen bg-gray-400 opacity-40">
            <img className="block m-auto" src={spinner}
                 alt="icone de chargement"/></div>
    }

    useEffect(() => {
        setApiState({...ApiState, loading: true})
        if (checkIsLogged()) {
            axios.get(import.meta.env.VITE_API_EVENTS_URL, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}})
                .then(function (res) {
                    setApiState({...ApiState, loading: false})
                    dispatch(updateEvents(res.data["hydra:member"]))
                })
                .catch(function (error) {
                    if (error.response.status === 401) {
                        console.log(error.response.data.message)
                        setApiState({...ApiState, loading: false})
                        setIsLogged(false)
                    }
                })
        } else {
            // Cas utilisateur non connecté → désactiver le loader
            setApiState({...ApiState, loading: false})
        }
    }, []);

    function checkIsLogged() {
        return !!localStorage.getItem('token');
    }

    function handleLogout() {
        localStorage.removeItem('token');
        console.log("🗑️ Token supprimé du localStorage");

        // Mettre à jour l'état de connexion
        setIsLogged(false);

        // Vider le store Redux des événements
        dispatch(updateEvents([]));

        window.location.reload()
    }

    const [isLogged, setIsLogged] = useState(checkIsLogged)

    return (
        <>
            <h1 className="text-5xl">Mon agenda en react</h1>
            {content}
            <div className="m-auto min-w-[703px] max-w-[1000px]">
                {!isLogged ? (
                    // Bouton Connexion (affiché si non connecté)
                    <button
                        onClick={() => setDisplayModalConnexion(!displayModalConnexion)}
                        className="text-white block ml-auto rounded p-2 bg-blue-600 hover:bg-blue-800"
                    >
                        Connexion
                    </button>
                ) : (
                    // Bouton Déconnexion (affiché si connecté)
                    <button
                        onClick={handleLogout}
                        className="text-white block ml-auto rounded p-2 bg-red-600 hover:bg-red-800"
                    >
                        Déconnexion
                    </button>
                )}
            </div>
            <Calendar/>

            {displayModalConnexion && createPortal(<ModalConnexion
                    setDisplayModalConnexion={setDisplayModalConnexion} apiState={ApiState} setIsLogged={setIsLogged}
                    setApiState={setApiState}/>,
                document.body)}
        </>
    )
}

export default App
