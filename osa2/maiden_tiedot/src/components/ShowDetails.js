import axios from 'axios'
import { useState, useEffect } from 'react'

const ShowDetails = ({ filterCountries }) => {
    const showCountryInfo = filterCountries[0]
    const languages = showCountryInfo.languages
    const api_key = process.env.REACT_APP_API_KEY
    const baseIconUrl = "http://openweathermap.org/img/w/"
    console.log("tapahtuu")
    const [weatherForCountry, setWeatherForCountry] = useState(null)

    useEffect(() => {
        console.log("tapahtuu2")
        if (showCountryInfo) {
            axios
                .get(`https://api.openweathermap.org/data/2.5/weather?q=${showCountryInfo.capital[0]}&appid=${api_key}&units=metric`)
                .then(response => {
                    setWeatherForCountry(response.data)
                    console.log('Saatu tiedot palvelimelta')
                    console.log(response.data)
                })
        }
    }, [showCountryInfo])
    return (
        <div>
            <h2>
                {showCountryInfo.name.common}
            </h2>
            <p>Capital: {showCountryInfo.capital}</p>
            <p>Area: {showCountryInfo.area}</p>
            <h3>
                Languages:
            </h3>
            <ul>
                {Object.values(languages).map((lan) => {
                    return <li key={lan}>{lan}</li>
                })}
            </ul>
            <img src={showCountryInfo.flags.png}
                alt={`Flag of ${showCountryInfo.name.common}`}>
            </img>
            {weatherForCountry && (
                <>
                    <h3>Weather in {showCountryInfo.name.common}, {showCountryInfo.capital[0]} </h3>
                    <p>Temperature {weatherForCountry.main.temp} Celsius</p>
                    <img src={`${baseIconUrl}${weatherForCountry.weather[0].icon}.png`} />
                    <p>Wind {weatherForCountry.wind.speed} m/s</p>
                </>
            )}
        </div>
    )
};

export default ShowDetails