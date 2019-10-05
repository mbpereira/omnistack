import React, { useState } from 'react'
import moment from 'moment'
import api from '../../services/api'

export default function Show({ match }) {
    const { spot_id } = match.params

    const [date, setDate] = useState('')


    async function handleSubmit(e) {
        e.preventDefault()

        const formatedDate = moment(date).format('YYYY-MM-DD')
        const user_id = localStorage.getItem('session')

        await api.post(`/spots/${spot_id}/bookings`, { date: formatedDate }, {
            headers: {
                user_id
            }
        })

    }



    return (
        <form onSubmit={handleSubmit}>  
            <label htmlFor="price">DATA DE INTERESSE *</label>
            <input
                id="date"
                name="date"
                placeholder="Data no formato DD/MM/AAAA"
                value={date}
                onChange={event => setDate(event.target.value)} />
            <button type="submit" className="btn primary">Solicitar Reserva</button>
            <button type="button" className="btn cancel">Cancelar</button>
        </form>
    )
}