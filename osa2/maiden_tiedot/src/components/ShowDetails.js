const ShowDetails = ({filterCountries}) => {
    const showCountryInfo = filterCountries[0]
    const languages = showCountryInfo.languages
    console.log("tööt")
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
};

export default ShowDetails