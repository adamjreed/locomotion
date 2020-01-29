import React, { useState } from "react";
import { GoogleMap, useLoadScript, TransitLayer } from "@react-google-maps/api";
import Station from "./Station.js";

const MapStyles = require("../data/map_styles.json");
const stationData = require("../data/stations.json");

function Map() {
  //set state
  const [iconSize, setIconSize] = useState(21);
  const [map, setMap] = useState(null);

  //build array of stations
  const loadedStations = stationData.map((station, i) => {
    return (
      <Station
        key={i}
        width={iconSize}
        height={iconSize}
        lat={station.lat}
        lng={station.lng}
      />
    );
  });

  //load map
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
  });

  const onLoad = mapInstance => {
    setMap(mapInstance);
  };

  const renderMap = () => {
    const onZoomChanged = () => {
      if (map) {
        const zoomLevel = map.getZoom();
        let resize = 0;

        if (zoomLevel >= 12) {
          resize = zoomLevel * 2 - 5;
        }

        setIconSize(resize);
      }
    };

    return (
      <GoogleMap
        zoom={12}
        center={{ lat: 33.753816, lng: -84.391531 }}
        options={{
          styles: MapStyles,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false
        }}
        mapContainerStyle={{
          flexGrow: 1
        }}
        onLoad={onLoad}
        onZoomChanged={onZoomChanged}
      >
        <TransitLayer />
        {loadedStations}
      </GoogleMap>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap() : "<div>Loading...</div>";
}

export default Map;
