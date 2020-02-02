import React from "react";
import { connect } from "react-redux";
import Station from "../components/Station";

const StationsContainer = ({ map, stations, zoom }) => {
	return stations.map((station, i) => {
		return (
			<Station
				key={i}
				zoom={zoom}
				lat={parseFloat(station.stop_lat)}
				lng={parseFloat(station.stop_lon)}
			/>
		);
	});
};

const mapStateToProps = state => ({
	map: state.map,
	stations: state.stations,
	zoom: state.zoom
});

export default connect(mapStateToProps)(StationsContainer);
