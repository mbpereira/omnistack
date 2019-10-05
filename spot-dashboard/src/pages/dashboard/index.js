import React, { useEffect, useState } from 'react';
import api, { baseURL } from '../../services/api'
import { Link } from 'react-router-dom'
import './styles.css';
export default function Dashboard() {

    const [ spots, setSpots ] = useState([])

    useEffect(() => {

        const user_id = localStorage.getItem('session')

        api.get('/dashboard', {
            headers: {
                user_id
            }
        })
        .then(res => setSpots(res.data))


    }, [])


    return (
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot.id}>
                        <header style={{ backgroundImage: `url(${baseURL}${spot.link})`}}/>
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn primary">Cadastrar novo spot</button>
            </Link>
        </>
    );
}