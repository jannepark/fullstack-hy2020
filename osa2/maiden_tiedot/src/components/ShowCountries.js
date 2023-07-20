import ShowDetails from './ShowDetails';
const ShowCountries = ({ filterCountries, handleShowDetails, selectedCountry}) => {

    if (filterCountries.length >= 10) {
        return <div>Too many matches, specify another filter</div>
    }

    if (filterCountries.length === 1) {
        return <ShowDetails filterCountries={filterCountries} />
    }

    return (
        <div>
            {filterCountries.map((country) => (
                <div key={country.name.common}>
                    <span>{country.name.common}</span>
                    <button onClick={() => handleShowDetails(country)}>Show Details</button>
                </div>
            ))}
            {selectedCountry && <ShowDetails filterCountries={[selectedCountry]} />}
        </div>
    )
}

export default ShowCountries;
