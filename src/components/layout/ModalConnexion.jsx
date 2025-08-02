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

    async function handleSubmit(e) {
        e.preventDefault()
        payload.email = email
        payload.password = password

        console.log("🚀 Début de la connexion...");
        console.log("📧 Email:", email);
        console.log("🔗 URL de connexion:", url);
        console.log("📦 Payload:", payload);

        setApiState({...ApiState, loading: true})

        try {
            // Étape 1: Connexion
            const loginRes = await axios.post(url, payload)

            console.log("✅ Réponse de connexion reçue:", loginRes.status);
            console.log("📄 Données complètes de la réponse:", loginRes.data);
            console.log("🎫 Token reçu:", loginRes.data.token ? "OUI" : "NON");

            console.log("💾 Stockage du token dans localStorage...");
            localStorage.setItem('token', loginRes.data.token)

            // Vérification immédiate du stockage
            const storedToken = localStorage.getItem('token');
            console.log("✔️ Token stocké avec succès:", storedToken ? "OUI" : "NON");
            console.log("🔍 Token stocké (premiers 10 caractères):", storedToken ? storedToken.substring(0, 10) + "..." : "AUCUN");

            if (storedToken) {
                console.log("👤 Mise à jour de l'état de connexion...");
                setIsLogged(true)
            }

            // Étape 2: Récupération des événements
            console.log("📅 Récupération des événements...");
            console.log("🔑 Token utilisé pour les événements:", storedToken ? storedToken.substring(0, 10) + "..." : "AUCUN");

            const eventsRes = await axios.get(import.meta.env.VITE_API_EVENTS_URL, {
                headers: {"Authorization": `Bearer ${storedToken}`}
            })

            console.log("✅ Événements récupérés:", eventsRes.data["hydra:member"]?.length || 0, "événement(s)");
            console.log("📊 Données des événements:", eventsRes.data["hydra:member"]);

            // Mise à jour de l'état final
            setApiState({...ApiState, loading: false})
            setDisplayModalConnexion(false)
            dispatch(updateEvents(eventsRes.data["hydra:member"]))

            console.log("🔄 Store Redux mis à jour et modal fermée");

        } catch (error) {
            console.error("❌ Erreur:", error);

            if (error.response) {
                console.error("📍 Message d'erreur:", error.response?.data?.message || error.message);
                console.error("🔍 Status HTTP:", error.response?.status);
                console.error("📋 Données complètes de l'erreur:", error.response?.data);
            } else {
                console.error("📍 Message:", error.message);
            }

            setApiState({...ApiState, loading: false})
        }
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