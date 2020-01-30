import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import TramIcon from "./TramIcon.js"

const useStyles = makeStyles(theme => ({
	toolbar: {
		flexWrap: "wrap"
	},
	toolbarIcon: {
    marginRight: theme.spacing(1),
  },
	toolbarTitle: {
		flexGrow: 1
	},
	toolbarButton: {
		margin: theme.spacing(1, 1.5)
	}
}));

const NavBar = ({ currentCity, cities, onCitySelected }) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const hasCities = cities.length > 0;
	const buttonText = currentCity ? currentCity.name : "Select A City"
	const onMenuItemClick = (city) => {
		onMenuClose();
		onCitySelected(city);
	}
	const menuItems = hasCities ? (
		[
			<MenuItem key="select" onClick={() => onMenuItemClick(null)}>
				Select A City
			</MenuItem>,
	    ...cities.map(city =>
	      <MenuItem key={city.id} onClick={() => onMenuItemClick(city)}>
					{city.name}
				</MenuItem>
	    )
    ]
  ) : (
    <MenuItem>
			<em>Loading cities...</em>
		</MenuItem>
  )

	const onMenuOpen = event => {
		setAnchorEl(event.currentTarget);
	};

	const onMenuClose = () => {
		setAnchorEl(null);
	};

	return (
		<AppBar position="relative">
			<Toolbar className={classes.toolbar}>
				<TramIcon className={classes.toolbarIcon} />
				<Typography
					variant="h6"
					color="inherit"
					noWrap
					className={classes.toolbarTitle}
				>
					Locomotion
				</Typography>
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
			</Toolbar>
		</AppBar>
	);
}

export default NavBar;
