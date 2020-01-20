import React from 'react';
import { GoogleMap, LoadScript, TransitLayer } from '@react-google-maps/api'

const MapStyles = require("./MapStyles.json");

class Map extends React.Component {
  render = () => {
    return (
      <LoadScript
        id="script-loader"
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
      >
        <GoogleMap
          zoom={12}
          center={{lat: 33.748224, lng: -84.388341}}
          options={{
            styles: MapStyles,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false
          }}
          mapContainerStyle={{
            height: "100%",
            width: "100%"
          }}
        >
          <TransitLayer />
        </GoogleMap>
      </LoadScript>
    )
  }
}

export default Map