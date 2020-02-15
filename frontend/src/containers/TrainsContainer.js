import React from "react";
import ReactDOMServer from "react-dom/server";
import { connect } from "react-redux";
import MapIcon from "../components/MapIcon";
import TrainIcon from "../components/TrainIcon";

const TrainsContainer = ({ map, trains, zoom, routes }) => {
	return trains.map((train, i) => {
		const lineColor = routes.find(
			route => route.route_id.toLowerCase() === train.line.toLowerCase()
		).route_color;

		let scale = "1,1";
		let rotate = train.heading

		//if the train is pointing up and left, flip it on the y-axis to keep the wheels left
		if (rotate > 320 && rotate <= 365) {
			scale = "-1,1";
			// rotate = (rotate - (rotate - 365) * 2)
		//if the train is pointing down and left, flip it on the x-axis to keep the wheels down
		} else if (rotate > 180 && rotate <= 320) {
			scale = "1,-1"
			rotate = (rotate - (rotate - 270) * 2)
		}

		return (
			<MapIcon
				key={i}
				icon={
					"data:image/svg+xml," +
					encodeURIComponent(
						ReactDOMServer.renderToString(
							<TrainIcon
								style={{
									fill: "#fff",
									transform: "scale(" + scale + ") rotate(" + (rotate - 90) + "deg)",
									strokeWidth: 1,
									stroke: "#" + lineColor
								}}
							/>
						)
					)
				}
				zoom={zoom}
				lat={parseFloat(train.lat)}
				lng={parseFloat(train.lng)}
				scale={2}
				zIndex={2}
				heading={train.heading}
			/>
		);
	});
};

const mapStateToProps = state => ({
	map: state.map,
	trains: state.trains,
	zoom: state.zoom,
	routes: state.currentCity.routes
});

export default connect(mapStateToProps)(TrainsContainer);
