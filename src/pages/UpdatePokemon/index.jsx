import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import PokemonForm from '../../components/PokemonForm'
import Modal from '../../components/Modal'
import { ArrowLeft } from '../../components/Icon'
import { replaceNullToEmpty } from '../../utils'
import Button from '../../components/Button'
import './styles.scss'

export default () => {
  const history = useHistory()
  const path = history.location.pathname
  const pokemonId = path.split('update/')[1]

  const [form, setForm] = useState(null)

  async function deletePokemon() {
    const headers = {headers: { Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVkZmU0ZjZjYTJlOTU1MjU1MDViMDYwYSIsIm5hbWUiOiJHYWJyaWVsIiwibGFzdE5hbWUiOiJNYXJxdWVzIiwiZW1haWwiOiJnYWJyaWVsLm1hcnF1ZXNkZXNvdXphMjhAZ21haWwuY29tIiwiY3JlYXRlQXQiOiIyMDE5LTEyLTIxVDE2OjU5OjI0Ljg0OFoiLCJfX3YiOjB9LCJpYXQiOjE1NzY5NDc1OTh9.jnjY3ngaxhgOA4U3PRWblMKPpSBbODju0VE-oAkX7gc' }}
    await api.delete(`pokemons/${pokemonId}`, headers)
    history.push('/')
  }

  async function loadPokemon() {
    const response = await api.get(`pokemons/${pokemonId}`)
    const pokemonData = replaceNullToEmpty(response.data)
    
    setForm(
      <Modal title='Update pokémon'>
        <PokemonForm 
          request='put' 
          endpoint={`pokemons/${pokemonId}`} 
          fieldInitialValues={pokemonData} 
        />
        <span onClick={deletePokemon} className='delete-button'>
          <Button width='100%' class='outline'>
            Delete this pokemon
          </Button>
        </span>
      </Modal>
    )
  }

  useEffect(() => {
    loadPokemon()
  }, [])
  
  return (
    <div className='update-pokemon-page'>
      <Link to='/'>
        <ArrowLeft color='white' />
      </Link>
      {form}
    </div>
  )
}