import React, { useEffect, useState } from 'react';
import Countries from '../components/Countries';

const Home = () => {
    const [countries, setCountries] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc');
    const [filterContinent, setFilterContinent] = useState('');
    const [filterSubregion, setFilterSubregion] = useState('');
    const [top10, setTop10] = useState(false);
    const [sortAlpha, setSortAlpha] = useState(false);

    useEffect(() => {
        const fetchCountries = async () => {
            const response = await fetch('https://restcountries.com/v2/all');
            const data = await response.json();
            console.log('Fetched countries:', data);  // Debugging statement
            setCountries(data);
        };

        fetchCountries();
    }, []);

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    const handleFilterContinentChange = (event) => {
        setFilterContinent(event.target.value);
        setFilterSubregion(''); // Clear subregion filter
    };

    const handleFilterSubregionChange = (event) => {
        setFilterSubregion(event.target.value);
        setFilterContinent(''); // Clear continent filter
    };

    const handleTop10Change = (event) => {
        setTop10(event.target.checked);
    };

    const handleSortAlphaChange = (event) => {
        setSortAlpha(event.target.checked);
    };

    const sortedCountries = [...countries].sort((a, b) => {
        if (sortAlpha) {
            return a.name.localeCompare(b.name);
        } else if (sortOrder === 'asc') {
            return a.population - b.population;
        } else {
            return b.population - a.population;
        }
    });

    let filteredCountries = sortedCountries;

    if (filterContinent) {
        filteredCountries = filteredCountries.filter(country => country.region && country.region.includes(filterContinent));
    }

    if (filterSubregion) {
        filteredCountries = filteredCountries.filter(country => country.subregion === filterSubregion);
    }

    if (top10) {
        filteredCountries = filteredCountries.slice(0, 10);
    }

    return (
        <div className="app">
            <h1>World Countries</h1>
            <div>
                <label>
                    Sort by Population:
                    <select value={sortOrder} onChange={handleSortChange} disabled={sortAlpha}>
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                    </select>
                </label>
                <label>
                    Filter by Continent:
                    <select value={filterContinent} onChange={handleFilterContinentChange}>
                        <option value="">All</option>
                        <option value="Africa">Africa</option>
                        <option value="Americas">Americas</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </label>
                <label>
                    Filter by Subregion:
                    <input type="text" value={filterSubregion} onChange={handleFilterSubregionChange} placeholder="Enter Subregion" />
                </label>
                <label>
                    Top 10 by Population:
                    <input type="checkbox" checked={top10} onChange={handleTop10Change} />
                </label>
                <label>
                    Sort Alphabetically:
                    <input type="checkbox" checked={sortAlpha} onChange={handleSortAlphaChange} />
                </label>
            </div>
            <Countries countries={filteredCountries} />
        </div>
    );
};

export default Home;
