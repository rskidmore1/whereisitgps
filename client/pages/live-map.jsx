import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class LiveMap extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mapCenter: {
        lat: 40.854885,
        lng: -88.081807
      },
      vehicles: [{
        vehicleId: 1,
        coords: {
          lat: 40.854885,
          lng: -88.081807
        }
      }, {
        vehicleId: 2,
        coords: {
          lat: 40.854885,
          lng: -88.100000
        }
      }]
    };
  }

  render() {

    const containerStyle = {
      position: 'relative',
      width: '100%',
      height: '100%'
    };

    return (
      <div>

        <div className="map-div">
          <Map
            google={this.props.google}
                containerStyle={containerStyle}
            initialCenter={this.state.mapCenter}
            zoom={10}

            onClick={this.onMapClicked}>

            {
              this.state.vehicles.map(item =>

                  <Marker key={item.vehicleId}
                  position={item.coords}
                  />

              )}

          </Map >
        </div>

      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyA9pD-yx8UXTtmNTaIfo8vzomK38m8U5LM')

})(LiveMap);
