import React from 'react'

export default function Footer() {
    return (
        <footer className="block m-auto text-justify  w-[700px]"><ul className="  ">
            <li>Pour créer un rendez vous, se rendre sur la vue "mois" puis cliquer sur le jour souhaité</li>
            <li>{`Vous pouvez créer 1 note pour le ou les jours concernés en créant un évenement de type note`}</li>
            <li>Les notes apparaissent en haut du calendrier dans la vue "Semaine" et "Jour"</li>
        </ul></footer>
    )
}
