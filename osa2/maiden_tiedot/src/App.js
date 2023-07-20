import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import ShowCountries from './components/ShowCountries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setFilter] = useState('')

  useEffect(() => {
    console.log('Haetaan tietoja palvelimelta')
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        console.log('Saatu tiedot palvelimelta')
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const filterCountries = countries.filter(
    (country) => country.name.common.toString().toLowerCase().includes(newFilter.toLowerCase())
  )

  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} />
      <ShowCountries filterCountries={filterCountries} />
    </div>
  )
}

export default App
