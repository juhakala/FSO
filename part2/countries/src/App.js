import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

import { useEffect, useState } from 'react';

function App() {
	const [countries, setCountries] = useState([])
	const [filter, setFilter] = useState('')
	const [weather, setWeather] = useState(
		{ temp: '278', wind_speed: '26'}
	)
	useEffect(() => {
		console.log('effect run')
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then(resp => {
				setCountries(resp.data)
			})
	}, [])
  return (
    <div>
		<Filter filter={filter} setFilter={setFilter} />
		<Countries countries={countries} filter={filter} setFilter={setFilter} weather={weather} setWeather={setWeather}/>
    </div>
  );
}

export default App;
