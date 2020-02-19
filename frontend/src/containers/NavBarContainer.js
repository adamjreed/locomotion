import React from "react";
import { connect } from "react-redux";
import { setCity, setRefresh } from "../actions";
import NavBar from "../components/NavBar";
import CitiesMenu from "../components/CitiesMenu";
import RefreshMenu from "../components/RefreshMenu";

const NavBarContainer = ({ currentCity, cities, setCity, setRefresh }) => (
	<NavBar>
		<RefreshMenu currentCity={currentCity} setRefresh={setRefresh} />
		<CitiesMenu currentCity={currentCity} cities={cities} setCity={setCity} />
	</NavBar>
);

const mapStateToProps = state => ({
	currentCity: state.currentCity,
	cities: state.cities
});

export default connect(mapStateToProps, { setCity, setRefresh })(NavBarContainer);
