export default (
  state = {
    map: null,
    currentCity: null,
    zoom: 0,
    cities: [],
    routes: [],
    stations: [],
    trains: []
  },
  action
) => {
  switch (action.type) {
    case "RECEIVE_CITIES":
      return {
        ...state,
        cities: action.cities
      };
    case "RECEIVE_STATIONS":
      return {
        ...state,
        stations: action.stations
      };
    case "RECEIVE_TRAINS":
      return {
        ...state,
        trains: action.trains
      };
    case "SET_CITY":
      return {
        ...state,
        currentCity: action.city
      };
    case "SET_MAP":
      return {
        ...state,
        map: action.map,
        zoom: action.map.getZoom()
      };
    case "SET_ZOOM":
      return {
        ...state,
        zoom: action.zoom
      };
    default:
      return state;
  }
};
