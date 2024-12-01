import React from 'react';

const Country = ({ country }) => {
    return (
        <div className="country">
            <img src={country.flag} alt={`${country.name} flag`} className="country-flag" />
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <p>Area: {country.area} km²</p>
            <p>Continent: {country.region ? country.region : 'N/A'}</p>
            <p>Sub-region: {country.subregion}</p>
        </div>
    );
};

export default Country;
