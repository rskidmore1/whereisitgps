import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MapList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapCenter: {
        lat: 33.91696347,
        lng: -117.88405129
      }
    };
  }

  render() {
    const containerStyle = {
      position: 'relative',
      width: '100%',
      height: '100%'
    };
    return (

     <React.Fragment>
        <div className="list-map-div ">
          <Map

            google={this.props.google}
            containerStyle={containerStyle}
            initialCenter={this.state.mapCenter}
            zoom={8}
            mapTypeControl={false}
            streetViewControl={false}
            zoomControl={false}
            fullscreenControl={false}
            >

            <Marker
              position={{ lat: this.props.coords.lat, lng: this.props.coords.lng }}
              />

          </Map >
        </div>

      </React.Fragment>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: (process.env.GOOGLE_MAPS_TOKEN)

})(MapList);
