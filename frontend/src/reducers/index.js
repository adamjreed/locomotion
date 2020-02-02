export default (state = {map: null, currentCity: null, cities: []}, action) => {
  switch (action.type) {
    case 'RECEIVE_CITIES':
      return {
      	...state,
      	cities: action.cities
      }
    case 'SET_CITY':
    	return {
    		...state,
    		currentCity: action.city
    	}
  	case 'SET_MAP':
    	return {
    		...state,
    		map: action.map
    	}
    default:
      return state
  }
}