import React from "react";
import { connect } from "react-redux";
import { setCity } from "../actions";
import NavBar from "../components/NavBar";
import CitiesMenu from "../components/CitiesMenu";

const NavBarContainer = ({ currentCity, cities, setCity }) => (
	<NavBar>
		<CitiesMenu currentCity={currentCity} cities={cities} setCity={setCity} />
	</NavBar>
);

const mapStateToProps = state => ({
	currentCity: state.currentCity,
	cities: state.cities
});

export default connect(mapStateToProps, { setCity })(NavBarContainer);
