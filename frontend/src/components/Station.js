import React from "react";
import { Marker } from "@react-google-maps/api";
import stationIcon from "../assets/station.png";

const Station = ({ zoom, lat, lng }) => {
	const getIconSize = () => {
		let size = 0;

		if (zoom > 15) {
			size = zoom * 1.5;
		} else if (zoom > 8) {
			size = zoom;
		}

		return size;
	};

	return (
		<Marker
			icon={{
				url: stationIcon,
				scaledSize: {
					width: getIconSize(),
					height: getIconSize()
				},
				anchor: {
					x: getIconSize() / 2,
					y: getIconSize() / 2
				}
			}}
			position={{
				lat: lat,
				lng: lng
			}}
		/>
	);
};

export default Station;
