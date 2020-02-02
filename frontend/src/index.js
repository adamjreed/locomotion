import React from "react";
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'
import App from "./containers/App";
import "./index.css";
import { getCities } from './actions'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: blue[700]
		}
	}
});

const middleware = [ thunk ];
if (process.env.REACT_APP_STAGE !== 'prod') {
  middleware.push(createLogger());
}

const store = createStore(
	reducer,
	applyMiddleware(...middleware)
);

store.dispatch(getCities())

render(
	<React.Fragment>
		<MuiThemeProvider theme={theme}>
			<Provider store={store}>
				<App />
			</Provider>
		</MuiThemeProvider>
	</React.Fragment>,
	document.getElementById("root")
);
