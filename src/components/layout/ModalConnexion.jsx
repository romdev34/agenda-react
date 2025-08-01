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
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()

        const payload = {
            email: email,
            password: password
        }

        console.log("🚀 Début de la connexion...");
        console.log("📧 Email:", email);
        console.log("🔗 URL de connexion:", url);

        setApiState({...ApiState, loading: true})

        try {
            // Étape 1: Connexion et récupération du token
            console.log("📡 Envoi de la requête de connexion...");
            const loginResponse = await axios.post(url, payload);

            console.log("✅ Réponse de connexion reçue:", loginResponse.status);
            console.log("🎫 Token reçu:", loginResponse.data.token ? "OUI" : "NON");

            if (!loginResponse.data.token) {
                throw new Error("Aucun token reçu du serveur");
            }

            // Étape 2: Stockage du token
            console.log("💾 Stockage du token dans localStorage...");
            localStorage.setItem('token', loginResponse.data.token);

            // Vérification immédiate du stockage
            const storedToken = localStorage.getItem('token');
            console.log("✔️ Token stocké avec succès:", storedToken ? "OUI" : "NON");
            console.log("🔍 Token stocké (premiers 10 caractères):", storedToken ? storedToken.substring(0, 10) + "..." : "AUCUN");

            if (!storedToken) {
                throw new Error("Échec du stockage du token");
            }

            // Étape 3: Mise à jour de l'état de connexion
            setIsLogged(true);
            console.log("👤 État de connexion mis à jour");

            // Étape 4: Récupération des événements avec le token
            console.log("📅 Récupération des événements...");
            const eventsResponse = await axios.get(
                import.meta.env.VITE_API_EVENTS_URL,
                {
                    headers: {
                        "Authorization": `Bearer ${storedToken}`
                    }
                }
            );

            console.log("✅ Événements récupérés:", eventsResponse.data["hydra:member"]?.length || 0, "événement(s)");

            // Étape 5: Mise à jour du store Redux
            dispatch(updateEvents(eventsResponse.data["hydra:member"]));
            console.log("🔄 Store Redux mis à jour");

            // Étape 6: Fermeture de la modal
            setDisplayModalConnexion(false);
            console.log("🚪 Modal fermée");

        } catch (error) {
            console.error("❌ Erreur during connexion:");
            console.error("📍 Type d'erreur:", error.message);

            if (error.response) {
                console.error("🔍 Status HTTP:", error.response.status);
                console.error("📄 Message serveur:", error.response.data?.message || "Pas de message");
                console.error("📋 Données complètes:", error.response.data);
            } else if (error.request) {
                console.error("🌐 Erreur réseau - pas de réponse reçue");
            } else {
                console.error("⚙️ Erreur de configuration:", error.message);
            }

            // Nettoyage en cas d'erreur
            localStorage.removeItem('token');
            setIsLogged(false);
            console.log("🧹 Token supprimé et état de connexion réinitialisé");

        } finally {
            setApiState({...ApiState, loading: false});
            console.log("🏁 Processus de connexion terminé");
        }
    }

    // Fonction utilitaire pour vérifier l'état du localStorage
    const checkTokenStatus = () => {
        const token = localStorage.getItem('token');
        console.log("🔍 Vérification token:", {
            exists: !!token,
            length: token?.length || 0,
            preview: token ? token.substring(0, 20) + "..." : "AUCUN"
        });
    };

    // Ajout d'un bouton de débogage (à retirer en production)
    const DebugButton = () => (
        <button
            type="button"
            onClick={checkTokenStatus}
            className="text-xs bg-gray-500 text-white py-1 px-2 rounded mt-2"
        >
            Debug Token
        </button>
    );

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
                <input
                    className="block m-auto border-gray-300 border text-center mb-3 p-2"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    placeholder="email"
                    required
                />
                <input
                    className="block m-auto border-gray-300 border text-center mb-3 p-2"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="password"
                    required
                />
                <button
                    className="w-full text-center text-white cursor-pointer rounded p-2 bg-blue-600 disabled:bg-gray-400"
                    type="submit"
                    disabled={ApiState.loading}
                >
                    {ApiState.loading ? "Connexion..." : "Valider"}
                </button>

                {/* Bouton de débogage - à retirer en production */}
                <DebugButton />
            </form>
        </div>
    )
}