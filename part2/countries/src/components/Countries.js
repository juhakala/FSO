import axios from "axios";

const Country = ({country, setFilter}) => {
	return (
		<li>{country.name} <button onClick={() => setFilter(country.name)}>show</button></li>
	)
}

const Weather = ({country, weather, setWeather}) => {
	const req = {
		method: 'GET',
		url: 'https://community-open-weather-map.p.rapidapi.com/weather',
		params: {
			q: country.name,
			lang: 'en',
			units: 'metric'
		},
		headers: {
			'x-rapidapi-key': 'SIGN-UP-FOR-KEY', //not gonna sing up for these 
			'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
		}
	};
	axios.request(req).then(function (response) {
		setWeather(response.data)
	}).catch(function (error) {
		console.error(error);
	});
	return (
		<div>
			<p>temperature: {weather.temp - 273} Celsius</p>
			<p>wind: {weather.wind_speed}</p>
		</div>
	)
}

const Info = ({country, weather, setWeather}) => {
	return (
		<div>
			<h1>{country.name}</h1>
			<p>Capital: {country.capital}</p>
			<p>Population: {country.population}</p>
			<h3>Languages</h3>
			<ul>
				{country.languages.map(language => <li key={language.name}>{language.name}</li>)}
			</ul>
			<img src={country.flag} alt='flag' height='100px'/>
			<Weather country={country.name} weather={weather} setWeather={setWeather}/>
		</div>
	)
}

const Countries = ({countries, filter, setFilter, weather, setWeather}) => {
	const filtered = countries.filter((country => {
		return (country.name.toUpperCase().includes(filter.toUpperCase()))
	}))
	if (filtered.length > 10) {
		return (<p>Too many matches, specify another filter</p>)
	} else if (filtered.length === 1){
		return (<Info country={filtered[0]} weather={weather} setWeather={setWeather}/>)
	} else {
		return (
			<ul>
			{filtered.map(country => <Country key={country.name} country={country} setFilter={setFilter}/>)}
			</ul>
		)
	}
}

export default Countries