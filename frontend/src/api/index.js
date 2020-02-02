import fetch from "cross-fetch"

const baseUrl = process.env.REACT_APP_API_URL

const cities = (callback) => {
	return fetch(`${baseUrl}/cities/`)
    .then(response => response.json())
    .then(json => callback(json))
}

export default {
	cities: cities
}