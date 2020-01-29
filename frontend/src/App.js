import React from "react";
import "./App.css";
import Map from "./components/Map.js";
import NavBar from "./components/NavBar.js";
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
	const [city, setCity] = React.useState("");

	return (
		<React.Fragment>
			<CssBaseline />
			<div className={classes.appContainer}>
				<NavBar />
				<Map />
			</div>
		</React.Fragment>
	);
}

export default App;
