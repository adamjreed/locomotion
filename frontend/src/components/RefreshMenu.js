import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const menu = [
	{ label: "OFF", interval: null },
	{ label: "5s", interval: 5000 },
	{ label: "10s", interval: 10000 },
	{ label: "30s", interval: 30000 }
];

const RefreshMenu = ({ currentCity, setRefresh }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [buttonText, setButtonText] = React.useState(menu[1]["label"]);
	const onMenuItemClick = menuItem => {
		onMenuClose();
		setButtonText(menuItem.label);
		setRefresh(currentCity.id, menuItem.interval);
	};
	const menuItems = menu.map(item => (
		<MenuItem key={item.label} onClick={() => onMenuItemClick(item)}>
			{item.label}
		</MenuItem>
	));

	const onMenuOpen = event => {
		setAnchorEl(event.currentTarget);
	};

	const onMenuClose = () => {
		setAnchorEl(null);
	};

	return currentCity == null ? (
		""
	) : (
		<React.Fragment>
			<Button
				aria-controls="refresh-menu"
				aria-haspopup="true"
				onClick={onMenuOpen}
				color="inherit"
			>
				<AutorenewIcon />
				{buttonText}
				<KeyboardArrowDownIcon />
			</Button>
			<Menu
				id="refresh-menu"
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

export default RefreshMenu;
