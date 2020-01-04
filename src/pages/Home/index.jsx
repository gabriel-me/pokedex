import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { updateAllPokemons } from '../../store/actions/pokemonAction'

import api from '../../services/api'

import Header from '../../components/Header'
import Card from '../../components/Card'
import { FixedButton } from '../../components/Button'
import './styles.scss'

export default () => {
  const dispatch = useDispatch()
  const pokemons = useSelector(state => state.pokemons)

  const renderPokemons = pokemons => pokemons.map((pokemon, i) =>
    <Link key={i} to={`/update/${pokemon._id}`}> 
      <Card text={pokemon.name} code={pokemon.number} src={pokemon.avatar_url}/>
    </Link>
  )
  
  useEffect(() => {  
    async function loadPokemons() {
      const response = await api.get('pokemons')
      const pokemons = response.data
      dispatch(updateAllPokemons(pokemons))
    }
    
    loadPokemons()
  }, [dispatch])

  return (
    <div className='home'>
      <Header />
      <Link to='/add'>
        <FixedButton />
      </Link>
      <main>
        {renderPokemons(pokemons)}
      </main>
    </div>
  )
}