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

        console.log("🚀 Début de la connexion...");
        console.log("📧 Email:", email);
        console.log("🔗 URL de connexion:", url);
        console.log("📦 Payload:", payload);

        setApiState({...ApiState, loading: true})

        axios.post(url, payload)
            .then(function (res) {
                console.log("✅ Réponse de connexion reçue:", res.status);
                console.log("📄 Données complètes de la réponse:", res.data);
                console.log("🎫 Token reçu:", res.data.token ? "OUI" : "NON");

                setApiState({...ApiState, loading: false})

                console.log("💾 Stockage du token dans localStorage...");
                localStorage.setItem('token', res.data.token)

                // Vérification immédiate du stockage
                const storedToken = localStorage.getItem('token');
                console.log("✔️ Token stocké avec succès:", storedToken ? "OUI" : "NON");
                console.log("🔍 Token stocké (premiers 10 caractères):", storedToken ? storedToken.substring(0, 10) + "..." : "AUCUN");

                if (localStorage.getItem('token')) {
                    console.log("👤 Mise à jour de l'état de connexion...");
                    setIsLogged(true)
                }
            })
            .catch(function(error) {
                console.error("❌ Erreur lors de la connexion:");
                console.error("📍 Message d'erreur:", error.response?.data?.message || error.message);
                console.error("🔍 Status HTTP:", error.response?.status);
                console.error("📋 Données complètes de l'erreur:", error.response?.data);

                setApiState({...ApiState, loading: false})
            })
            .then(function (res) {
                if (res) { // On vérifie que res existe (succès de la première requête)
                    console.log("📅 Récupération des événements...");
                    const token = localStorage.getItem('token');
                    console.log("🔑 Token utilisé pour les événements:", token ? token.substring(0, 10) + "..." : "AUCUN");

                    axios.get(import.meta.env.VITE_API_EVENTS_URL, {
                        headers: {"Authorization": `Bearer ${token}`}
                    })
                        .then(function (res) {
                            console.log("✅ Événements récupérés:", res.data["hydra:member"]?.length || 0, "événement(s)");
                            console.log("📊 Données des événements:", res.data["hydra:member"]);

                            setApiState({...ApiState, loading: false})
                            setDisplayModalConnexion(false)
                            dispatch(updateEvents(res.data["hydra:member"]))

                            console.log("🔄 Store Redux mis à jour et modal fermée");
                        })
                        .catch(error => {
                            console.error("❌ Erreur lors de la récupération des événements:");
                            console.error("📍 Message:", error.response?.data?.message || error.message);
                            console.error("🔍 Status HTTP:", error.response?.status);
                        })
                }
            })
            .catch(error => {
                console.error("❌ Erreur finale:");
                console.error("📍 Message:", error.response?.data?.message || error.message);
            })
    }

    // Fonction utilitaire pour vérifier l'état du localStorage
    const checkTokenStatus = () => {
        const token = localStorage.getItem('token');
        console.log("🔍 Debug - État actuel du token:", {
            exists: !!token,
            length: token?.length || 0,
            preview: token ? token.substring(0, 20) + "..." : "AUCUN"
        });
    };

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

                {/* Bouton de débogage - à retirer en production */}
                <button
                    type="button"
                    onClick={checkTokenStatus}
                    className="text-xs bg-gray-500 text-white py-1 px-2 rounded mt-2 w-full"
                >
                    Debug Token
                </button>
            </form>
        </div>
    )
}