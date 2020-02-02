import React from "react";
import { connect } from "react-redux";
import { setMap, setZoom } from "../actions";
import Map from "../components/Map";

const MapContainer = ({ map, currentCity, setMap, setZoom }) => (
	<Map map={map} currentCity={currentCity} setMap={setMap} setZoom={setZoom} />
);

const mapStateToProps = state => ({
	map: state.map,
	currentCity: state.currentCity
});

export default connect(mapStateToProps, { setMap, setZoom })(MapContainer);
