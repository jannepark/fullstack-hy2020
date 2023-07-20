import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import ShowCountries from './components/ShowCountries'
import ShowDetails from './components/ShowDetails';

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    console.log('Haetaan tietoja palvelimelta')
    if(countries) {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        console.log('Saatu maiden tiedot palvelimelta')
        setCountries(response.data)
      })
    }
  }, [])
 

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setSelectedCountry(null)
  }
  
  const handleShowDetails = (country) => {
    setSelectedCountry(country);
  }
  
  const filterCountries = countries.filter(
    (country) => country.name.common.toString().toLowerCase().includes(newFilter.toLowerCase())
  )

  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} />
      {selectedCountry ? (
        <ShowDetails filterCountries={[selectedCountry]} />
      ) : (
        <ShowCountries
          filterCountries={filterCountries}
          handleShowDetails={handleShowDetails}
        />
      )}
    </div>
  )
}

export default App
