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
		if (rotate > 314 && rotate <= 359) {
			scale = "-1,1";
			rotate = (rotate - (rotate - 359) * 2)
		//if the train is pointing down and left, flip it on the x-axis to keep the wheels down
		} else if (rotate > 179 && rotate <= 314) {
			scale = "1,-1"
			rotate = (rotate - (rotate - 269) * 2)
		}

		return (
			<MapIcon
				key={i}
				icon={
					"data:image/svg+xml," +
					encodeURIComponent(
						ReactDOMServer.renderToString(
							<TrainIcon
								strokeWidth={1}
								highlightFillColor={"#" + lineColor}
								highlightFillOpacity={1}
								style={{
									transform: "scale(" + scale + ") rotate(" + (rotate - 90) + "deg)",
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
