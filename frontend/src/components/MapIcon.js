import React from "react";
import { Marker } from "@react-google-maps/api";

const MapIcon = ({ icon, zoom, lat, lng, scale = 1, zIndex = 1 }) => {
	const getIconSize = () => {
		let size = 0;

		if (zoom > 15) {
			size = zoom * 1.5;
		} else if (zoom > 8) {
			size = zoom;
		}

		size = size * scale;

		return size;
	};

	return (
		<Marker
			icon={{
				url: icon,
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
			zIndex={zIndex}
		/>
	);
};

export default MapIcon;
