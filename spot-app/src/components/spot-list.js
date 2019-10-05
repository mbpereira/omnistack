import React from 'react'
import { baseURL } from '../services/api'
import { Link } from 'react-router-dom'

export default function SpotList(props){

    return (
        <>
            <p className="title">Empresas que usam <strong>{props.tech.name}</strong></p>

            <ul className="spot-list">
                {props.tech.spots.map(spot => (
                    <li key={spot.id}>
                        <header style={{ backgroundImage: `url(${baseURL}${spot.link})`}}/>
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>

                        <Link to={`/spots/${spot.id}/bookings`}>
                            <button className="btn primary">Solicitar reserva</button>
                        </Link>
                    </li>
                ))}
            </ul>

        </>
    )
}