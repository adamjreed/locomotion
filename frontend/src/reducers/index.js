export default (state = {currentCity: null, cities: []}, action) => {
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
    default:
      return state
  }
}