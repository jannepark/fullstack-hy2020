const ShowCountries = ({ filterCountries }) => {
    console.log(filterCountries.length)
    if (filterCountries.length >= 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    }
    if (filterCountries.length === 1) {
        const showCountryInfo = filterCountries[0]
        const languages = showCountryInfo.languages
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
            </div>
        )
    }
    return (
        filterCountries.map((country) => (
            <div key={country.name.common}>{country.name.common}</div>
        ))
    )
}
export default ShowCountries