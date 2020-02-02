import * as types from '../constants/ActionTypes'
import api from '../api'

const receiveCities = cities => ({
  type: types.RECEIVE_CITIES,
  cities: cities
})

export const getCities = () => dispatch => {
	api.cities(cities => {
		dispatch(receiveCities(cities));
	})
}

const setCurrentCity = city => ({
	type: types.SET_CITY,
	city: city
})

export const selectCity = city => (dispatch) => {
  dispatch(setCurrentCity(city))
}

const setMap = map => ({
	type: types.SET_MAP,
	map: map
})

export const mapSdkLoaded = map => (dispatch) => {
  dispatch(setMap(map))
}