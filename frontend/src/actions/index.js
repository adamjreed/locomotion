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

const receiveTrains = trains => ({
	type: types.RECEIVE_TRAINS,
	trains: trains
});

export const getTransitObjects = city => dispatch => {
	if (city) {
		api.stations(city, stations => {
			dispatch(receiveStations(stations));
		});

		api.trains(city, trains => {
			dispatch(receiveTrains(trains.trains));
		});

		dispatch(setRefresh(city, 5000));
	}
};

export const setCity = city => dispatch => {
	dispatch({
		type: types.SET_CITY,
		city: city
	});

	dispatch(getTransitObjects(city ? city.id : null));
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

export const setRefresh = (currentCity, refresh) => dispatch => {
	let interval = null;

	if (refresh != null) {
		interval = setInterval(() => {
			api.trains(currentCity, trains => {
				dispatch(receiveTrains(trains.trains));
			});
		}, refresh);
	}

	dispatch({
		type: types.SET_REFRESH,
		interval: interval
	});
	
}
