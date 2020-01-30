import * as types from '../constants/ActionTypes'

const receiveCities = cities => ({
  type: types.RECEIVE_CITIES,
  cities: cities
})

export const getCities = () => dispatch => {
	const cities = [{"id": "chicago", "name": "Chicago", "lat": 41.881939, "lng": -87.655529, "zoom": 13}];
  dispatch(receiveCities(cities));
}

const setCurrentCity = city => ({
	type: types.SET_CITY,
	city: city
})

export const selectCity = city => (dispatch) => {
  dispatch(setCurrentCity(city))
}