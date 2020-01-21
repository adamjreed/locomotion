import React from 'react';
import { Marker } from '@react-google-maps/api';
import stationIcon from '../assets/station.png';

function Station(props) {
	return <Marker icon={{url: stationIcon, scaledSize: {width: props.width, height: props.height}, anchor: {x: props.width/2, y: props.height/2}}} position={{lat: props.lat, lng: props.lng}} />;
}

export default Station