import React from "react";
import { GoogleMap, useLoadScript, TransitLayer } from "@react-google-maps/api";
import StationsContainer from "../containers/StationsContainer";
import TrainsContainer from "../containers/TrainsContainer";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import RoomIcon from '@material-ui/icons/Room';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const MapStyles = require("../data/map_styles.json");
const useStyles = makeStyles({
  contentContainer: {
    display: 'flex',
    height: '100vh',
    padding: 0
  },
  staticContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardRoot: {
    minWidth: 275,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px !important'
  },
  cardIcon: {
    width: '3em',
    height: '3em',
    marginBottom: '10px'
  }
});

const Map = ({ map, currentCity, setMap, setZoom }) => {
  const classes = useStyles();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
  });

  const renderMainContent = () => {
    if (loadError) {
      return renderCardView(<ErrorOutlineIcon className={classes.cardIcon} />, "Couldn't load map. Please try again.")
    } else if(!isLoaded) {
      return renderCardView(<CircularProgress size={'3em'} className={classes.cardIcon} />, "Loading...")
    } else if (currentCity) {
      return renderMap();
    }

    return renderCardView(<RoomIcon className={classes.cardIcon} htmlColor={"#cc0000"} />, "Select a city...");
  }

  const renderMap = () => {
    const onZoomChanged = () => {
      //seems like this gets called before the map actually get initialized,
      //so let's check that it exists to be safe
      if (map) {
        setZoom(map.getZoom());
      }
    };

    return (
      <GoogleMap
        zoom={currentCity.zoom}
        center={{ lat: currentCity.lat, lng: currentCity.lng }}
        options={{
          styles: MapStyles,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false
        }}
        mapContainerStyle={{
          flexGrow: 1
        }}
        onLoad={setMap}
        onZoomChanged={onZoomChanged}
      >
        <TransitLayer />
        <StationsContainer />
        <TrainsContainer />
      </GoogleMap>
    );
  };

  const renderCardView = (icon, text) => {
    return (
      <Container maxWidth="xl" className={classes.contentContainer}>
        <Container className={classes.staticContainer}>
          <Card variant="outlined" className={classes.cardRoot}>
            <CardContent className={classes.cardContent}>
              {icon}
              <Typography variant="h5" component="h2">
                {text}
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Container>
    );
  }

  return renderMainContent(currentCity);
};

export default Map;
