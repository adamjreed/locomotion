import * as types from "../constants/ActionTypes";
import api from "../api";

const receiveCities = cities => ({
	type: types.RECEIVE_CITIES,
	cities: cities
});

export const getCities = () => dispatch => {
	api.cities(cities => {
		dispatch(receiveCities(cities));
	});
};

const receiveStations = stations => ({
	type: types.RECEIVE_STATIONS,
	stations: stations
});

export const getStations = city => dispatch => {
	if (city) {
		api.stations(city, stations => {
			dispatch(receiveStations(stations));
		});
	} else {
		dispatch(receiveStations([]));
	}
};

export const setCity = city => dispatch => {
	dispatch({
		type: types.SET_CITY,
		city: city
	});

	dispatch(getStations(city ? city.id : null));
};

export const setMap = map => dispatch => {
	dispatch({
		type: types.SET_MAP,
		map: map,
		zoom: map.getZoom()
	});
};

export const setZoom = zoom => dispatch => {
	dispatch({
		type: types.SET_ZOOM,
		zoom: zoom
	});
};
