import React, { useState, useEffect, useMemo } from 'react'
import socketio from 'socket.io-client'
import api, { baseURL } from '../../services/api'
import SpotList from '../../components/spot-list'
import './styles.css'
import moment from 'moment'

export default function Show({ location }) {

    const params = new URLSearchParams(location.search);
    const [techs, setTechs] = useState([])

    const user_id = localStorage.getItem('session')
    const socket = useMemo(() => socketio.connect(baseURL, {
        query: { user_id }
    }), [user_id])

    function feedback(booking, detail) {
        const date = moment(booking.date).format('DD/MM/YYYY')
        alert(`Sua reserva em ${booking.spot.company} para o dia ${date} foi ${detail}`)
    }

    useEffect(() => {
        socket.on('booking_rejected', booking => {
            feedback(booking, 'recusada')
        })
        socket.on('booking_approved', booking => {
            feedback(booking, 'aceita')
        })
    }, [])

    useEffect(() => {
        loadTechs()

        return () => {
            setTechs([])
        }
    }, [])


    async function loadTechs () {

        const techIds = params.get("techs")

        const url = !!techIds ? `/techs?in=${techIds}` : '/techs'

        const { data } = await api.get(url)

        setTechs(data)

    }
    return (
        <div>
            {techs.map(tech => (
                <SpotList key={tech.id} tech={tech} />
            ))}
        </div>
    )
}