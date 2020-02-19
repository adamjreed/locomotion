import React from "react";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TrainIcon from "./TrainIcon";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
	toolbar: {
		flexWrap: "wrap"
	},
	toolbarIcon: {
		marginRight: theme.spacing(1)
	},
	toolbarTitle: {
		flexGrow: 1
	}
}));

const NavBar = ({ children, theme }) => {
	const classes = useStyles();

	return (
		<AppBar position="relative">
			<Toolbar className={classes.toolbar}>
				<TrainIcon
					fill="currentColor"
					secondaryFillColor={theme.palette.primary.main}
					strokeWidth={0}
					className={classes.toolbarIcon}
				/>
				<Typography
					variant="h6"
					color="inherit"
					noWrap
					className={classes.toolbarTitle}
				>
					Locomotion
				</Typography>
				{children}
			</Toolbar>
		</AppBar>
	);
};

export default withTheme(NavBar);
