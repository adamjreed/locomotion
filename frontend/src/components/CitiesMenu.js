import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const useStyles = makeStyles(theme => ({
	toolbarButton: {
		margin: theme.spacing(1, 1.5)
	}
}));

const CitiesMenu = ({ currentCity, cities, setCity }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const classes = useStyles();
	const hasCities = cities.length > 0;
	const buttonText = currentCity ? currentCity.name : "Select A City";
	const onMenuItemClick = city => {
		onMenuClose();
		setCity(city);
	};
	const menuItems = hasCities ? (
		[
			<MenuItem key="select" onClick={() => onMenuItemClick(null)}>
				Select A City
			</MenuItem>,
			...cities.map(city => (
				<MenuItem key={city.id} onClick={() => onMenuItemClick(city)}>
					{city.name}
				</MenuItem>
			))
		]
	) : (
		<MenuItem>
			<em>Loading cities...</em>
		</MenuItem>
	);

	const onMenuOpen = event => {
		setAnchorEl(event.currentTarget);
	};

	const onMenuClose = () => {
		setAnchorEl(null);
	};

	return (
		<React.Fragment>
			<Button
				aria-controls="city-menu"
				aria-haspopup="true"
				onClick={onMenuOpen}
				className={classes.toolbarButton}
				color="inherit"
			>
				{buttonText}
				<KeyboardArrowDownIcon />
			</Button>
			<Menu
				id="city-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={onMenuClose}
			>
				{menuItems}
			</Menu>
		</React.Fragment>
	);
};

export default CitiesMenu;
