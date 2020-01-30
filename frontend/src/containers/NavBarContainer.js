import React from 'react'
import { connect } from 'react-redux'
import { selectCity } from '../actions'
import NavBar from '../components/NavBar'

const NavBarContainer = ({ currentCity, cities, selectCity }) => (
	<React.Fragment>
	  <NavBar currentCity={currentCity} cities={cities} onCitySelected={selectCity} />
  </React.Fragment>
)

const mapStateToProps = state => ({
	currentCity: state.currentCity,
  cities: state.cities
})

export default connect(
  mapStateToProps,
  { selectCity }
)(NavBarContainer)