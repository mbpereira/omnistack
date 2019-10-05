import React, { useState, useMemo, useEffect } from 'react'
import api from '../../services/api'
import camera from '../../assets/camera.svg'
import './styles.css'

const user_id = localStorage.getItem('session')

function SelectTechs(props) {
  return (
    <select className="flex-fill" onChange={props.onChange}>
      {props.techs.map(tech => (
        <option key={tech.id} value={tech.id}>{tech.name}</option>
      ))}
    </select>
  )
}
function CreateTechs(props) {
  return (
    <input
      id="techs"
      name="techs"
      placeholder="Separadas por virgula"
      className="flex-fill"
      value={props.techs}
      onChange={props.onChange}
    />
  )
}
export default function New({ history }) {

  const [techs, setTechs] = useState([])
  const [thumbnail, setThumbail] = useState(null)
  const [company, setCompany] = useState('')
  const [price, setPrice] = useState('')

  const [markedToNew, setMarkedToNew] = useState(true)

  const [createdTechs, setCreatedTechs] = useState('')
  const [selectedTech, setSelectedTech] = useState('')


  const [spotTechs, setSpotTechs] = useState([])


  useEffect(() => {
    loadTechs()
  }, [])

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail])

  async function loadTechs() {

    const { data } = await api.get('/techs')

    setTechs(data)

  }
  async function handleSubmit(e) {

    e.preventDefault()

    const formData = new FormData(e.target)

    await api.post('/spots', formData, {
      headers: { user_id }
    })

    history.push('/dashboard')

  }

  async function handleRelate(e) {

    if (markedToNew) {

      const techsToSave = createdTechs.replace(/\s/g, '').split(',').map(tech => ({ name: tech }))

      const { data } = await api.post('/techs', techsToSave)

      const selecteds = (Array.isArray(data)) 
        ? new Set([...data.map(tech => tech.id), ...spotTechs])
        : new Set([data.id, ...spotTechs])

      setSpotTechs([...selecteds])

      return loadTechs()

    }

    const selecteds = new Set([...spotTechs, Number(selectedTech)])
    setSpotTechs([...selecteds])

    console.log(spotTechs)
  }

  return (
    <form onSubmit={handleSubmit}>

      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? 'has-thumbnail' : ''} >

        <input
          type="file"
          name="thumbnail"
          onChange={event => setThumbail(event.target.files[0])} />
        <img src={camera} alt="Select img" />

      </label>


      <label htmlFor="company">EMPRESA *</label>
      <input
        id="company"
        name="company"
        placeholder="Sua empresa incrível"
        value={company}
        onChange={event => setCompany(event.target.value)} />

      <label htmlFor="techs">TECNOLOGIAS *</label>
      <div className="inline align-center">

        <input
          type="checkbox"
          id="relate"
          checked={markedToNew}
          onChange={e => setMarkedToNew(e.target.checked)} />
        <label htmlFor="relate">Novo cadastro?</label>

      </div>
      <div className="inline">

        {
          !markedToNew
            ? <SelectTechs techs={techs} onChange={e => setSelectedTech(e.target.value)} />
            : <CreateTechs techs={createdTechs} onChange={e => setCreatedTechs(e.target.value)} />
        }
        <button type="button" className="success btn w-auto" onClick={handleRelate}>+ tech</button>

      </div>
      <ul className="inline">

        {techs.filter(tech => spotTechs.indexOf(tech.id) !== -1).map(tech => (<li className="tag" key={tech.id}>{tech.name}</li>))}

      </ul>
      <label htmlFor="price">VALOR DA DIÁRIA</label>
      <input
        id="price"
        name="price"
        placeholder="Valor cobrado por dia"
        value={price}
        onChange={event => setPrice(event.target.value)} />
      <button type="submit" className="btn primary">Cadastrar</button>

    </form>
  )
}