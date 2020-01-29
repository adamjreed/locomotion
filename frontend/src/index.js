import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: blue[700]
		}
	}
});

ReactDOM.render(
	<React.Fragment>
		<MuiThemeProvider theme={theme}>
			<App />
		</MuiThemeProvider>
	</React.Fragment>,
	document.getElementById("root")
);
