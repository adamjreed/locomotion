import React, { useState } from "react";
import { GoogleMap, useLoadScript, TransitLayer } from "@react-google-maps/api";
import Station from "./Station.js";

const MapStyles = require("../data/map_styles.json");
const stationData = require("../data/stations.json");

const Map = ({ map, currentCity, mapSdkLoaded }) => {
  //set state
  const [iconSize, setIconSize] = useState(21);

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

  const renderMap = () => {
    const onZoomChanged = () => {
      if (map) {
        const zoomLevel = map.getZoom();
        console.log(zoomLevel)
        let resize = 0;

        if (zoomLevel >= 12) {
          resize = zoomLevel * 2 - 5;
        }

        setIconSize(resize);
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
        onLoad={mapSdkLoaded}
        onZoomChanged={onZoomChanged}
      >
        <TransitLayer />
      </GoogleMap>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps...</div>
  } else if (currentCity) {
    return renderMap(currentCity)
  }

  return <div>Select A City...</div>;
}

export default Map;
