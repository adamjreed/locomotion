import React from 'react'
import { connect } from 'react-redux'
import Map from '../components/Map'

const NavBarContainer = ({ currentCity }) => (
	<React.Fragment>
	  <Map currentCity={currentCity} />
  </React.Fragment>
)

const mapStateToProps = state => ({
	currentCity: state.currentCity,
})

export default connect(
  mapStateToProps
)(NavBarContainer)