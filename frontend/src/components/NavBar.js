import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const useStyles = makeStyles(theme => ({
	toolbar: {
		flexWrap: "wrap"
	},
	toolbarTitle: {
		flexGrow: 1
	},
	toolbarButton: {
		margin: theme.spacing(1, 1.5)
	}
}));

function NavBar(props) {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [city, setCity] = React.useState("Select A City");

	const onMenuOpen = event => {
		setAnchorEl(event.currentTarget);
	};

	const onMenuClose = () => {
		setAnchorEl(null);
	};

	const onCitySelected = event => {
		const { value } = event.currentTarget.dataset;
		setCity(value);
		onMenuClose();
	};

	return (
		<AppBar position="relative">
			<Toolbar className={classes.toolbar}>
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
					{city}
					<KeyboardArrowDownIcon />
				</Button>
				<Menu
					id="city-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={onMenuClose}
				>
					<MenuItem data-value="Select A City" onClick={onCitySelected}>
						<em>Select A City</em>
					</MenuItem>
					<MenuItem data-value="Chicago" onClick={onCitySelected}>
						Chicago
					</MenuItem>
				</Menu>
			</Toolbar>
		</AppBar>
	);
}

export default NavBar;
