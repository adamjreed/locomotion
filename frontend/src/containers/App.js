import React from "react";
import MapContainer from "../containers/MapContainer";
import NavBarContainer from "../containers/NavBarContainer.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	"@global": {
		ul: {
			margin: 0,
			padding: 0
		},
		li: {
			listStyle: "none"
		}
	},
	appContainer: {
		display: "flex",
		flexDirection: "column",
		minHeight: "100%"
	}
}));

function App() {
	const classes = useStyles();

	return (
		<React.Fragment>
			<CssBaseline />
			<div className={classes.appContainer}>
				<NavBarContainer />
				<MapContainer />
			</div>
		</React.Fragment>
	);
}

export default App;
