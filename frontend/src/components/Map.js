import React from "react";
import { GoogleMap, useLoadScript, TransitLayer } from "@react-google-maps/api";
import StationsContainer from "../containers/StationsContainer";

const MapStyles = require("../data/map_styles.json");

const Map = ({ map, currentCity, setMap, setZoom }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
  });

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
      </GoogleMap>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps...</div>;
  } else if (currentCity) {
    return renderMap(currentCity);
  }

  return <div>Select A City...</div>;
};

export default Map;
