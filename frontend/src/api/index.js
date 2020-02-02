import fetch from "cross-fetch"

const baseUrl = process.env.REACT_APP_API_URL

const cities = (callback) => {
	return fetch(`${baseUrl}/cities/`)
    .then(response => response.json())
    .then(json => callback(json))
}

const stations = (city, callback) => {
	return fetch(`${baseUrl}/stations/${city}`)
	.then(response => response.json())
	.then(json => callback(json))
}

export default {
	cities: cities,
	stations: stations
}