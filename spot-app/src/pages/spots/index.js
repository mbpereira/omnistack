import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import SpotList from '../../components/spot-list'
import './styles.css'

export default function Show({ location }) {

    const params = new URLSearchParams(location.search);
    const [techs, setTechs] = useState([])


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