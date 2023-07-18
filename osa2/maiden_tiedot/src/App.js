import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState({})
  const [country, setShowCountry] = useState(null)

  useEffect(() => {
    console.log('effect run, country is now', country)

    // skip if country is not defined
    if (country) {
      console.log('fetching exchange countries...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${value}`)
        .then(response => {
          console.log('Saatu palvelimelta')
          setCountries(response.data)
        })
    }
  }, [country])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setShowCountry(value)
  }

  return (
    <div>
      <form onSubmit={onSearch}>
        country: <input value={value} onChange={handleChange} />
        <button type="submit">etsi maa</button>
      </form>
      <pre>
        {JSON.stringify(countries, null, 2)}
      </pre>
    </div>
  )
}
export default App
