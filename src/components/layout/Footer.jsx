import React from 'react'

export default function Footer() {
    return (
        <footer className="block m-auto text-justify  w-[700px]"><ul className="  ">
            <li>Vous pouvez créer un rendez vous en cliquant sur le jour au niveau du de la vue "mois"</li>
            <li>{`Vous pouvez créer 1 note journalière pour la durée de votre choix qui en selectionnant type de rdv => note`}</li>
            <li>Les notes apparaissent en haut du calendrier dans la vue "Semaine" et "Jour"</li>
        </ul></footer>
    )
}
