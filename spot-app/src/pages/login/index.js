import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import './styles.css'

export default function Main({ history }) {

    const [email, setEmail] = useState('')
    const [techs, setTechs] = useState([])
    const [selectedTech, setSelectedTech] = useState('')
    const [spotTechs, setSpotTechs] = useState([])

    useEffect(() => {
        loadTechs().then(techs => {
            setTechs(techs)
            setSelectedTech(techs[0].id)
        })
    }, [])

    async function loadTechs() {

        const { data } = await api.get('/techs')
        return data

    }

    async function handleSubmit(e) {
      e.preventDefault()
  
      const { data: user } = await api.post('/sessions', { email })
      const url = spotTechs.length ? `/spots?techs=${spotTechs.join(',')}` : '/spots'

      localStorage.setItem('session', user.id)
      
      history.push(url)
  
    }

    async function handleRelate(e) {

        const selecteds = new Set([...spotTechs, Number(selectedTech)])
        setSpotTechs([...selecteds])
    
    }

    return(
        <>
            <form onSubmit={handleSubmit}>

                <label htmlFor="email">Email *</label>
                <input 
                    type="text" 
                    name="email" 
                    id="email" 
                    placeholder="Seu melhor email"
                    value={email}
                    onChange={event => setEmail(event.target.value)} />

                <label htmlFor="techs">Tecnologias buscadas</label>
                <div className="inline">

                    <select className="flex-fill" onChange={e => setSelectedTech(e.target.value)}>

                        {techs.map(tech => (
                            <option key={tech.id} value={tech.id}>{tech.name}</option>
                        ))}

                    </select>
                    <button type="button" className="success btn w-auto" onClick={handleRelate}>+ tech</button>

                </div>

                <ul className="inline">

                    {techs.filter(tech => spotTechs.indexOf(tech.id) !== -1).map(tech => (<li className="tag" key={tech.id}>{tech.name}</li>))}

                </ul>

                <button className="btn primary" type="submit">Entrar</button>


            </form>
        </>
    )
}