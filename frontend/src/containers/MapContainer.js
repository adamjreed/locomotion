import React from 'react'
import { connect } from 'react-redux'
import { mapSdkLoaded } from '../actions'
import Map from '../components/Map'

const MapContainer = ({ map, currentCity, mapSdkLoaded }) => (
	<React.Fragment>
	  <Map map={map} currentCity={currentCity} onSdkLoaded={mapSdkLoaded} />
  </React.Fragment>
)

const mapStateToProps = state => ({
	map: state.map,
	currentCity: state.currentCity,
})

export default connect(
  mapStateToProps,
  { mapSdkLoaded }
)(MapContainer)