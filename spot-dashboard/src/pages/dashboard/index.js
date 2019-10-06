import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import socketio from 'socket.io-client'
import api, { baseURL } from '../../services/api'
import './styles.css';


export default function Dashboard() {

    const [spots, setSpots] = useState([])
    const [requests, setRequests] = useState([])


    const user_id = localStorage.getItem('session')
    const socket = useMemo(() => socketio(baseURL, {
        query: { user_id }
    }), [user_id])


    useEffect(() => {
        socket.on('booking_request', data => {
            setRequests([...requests, data])
        })
    }, [requests, socket])

    useEffect(() => {

        const user_id = localStorage.getItem('session')

        api.get('/dashboard', {
            headers: {
                user_id
            }
        })
        .then(res => setSpots(res.data))

    }, [])

    async function handleClick(e, id, operation) {
        e.preventDefault()
        await api.post(`/bookings/${id}/${operation}`)

        console.log(requests)
        setRequests(requests.filter(request => request.id !== id))
        console.log(requests)
    }


    return (
        <>
            <ul className="notifications">
                {requests.map(request => (
                    <li key={request.id}>
                        <p>
                            <strong>{request.user.email}</strong> 
                            está solicitando uma reserva em 
                            <strong>{request.spot.company}</strong>
                            para a data <strong>{moment(request.date).format('DD/MM/YYYY')}</strong>
                        </p>
                        <button className="accept" onClick={(e) => handleClick(e, request.id, 'approve')}>ACEITAR</button>
                        <button className="reject" onClick={(e) => handleClick(e, request.id, 'reject')}>RECUSAR</button>
                    </li>
                ))}
            </ul>
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