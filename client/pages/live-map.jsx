import React from 'react';
import LiveMapComp from './components/live-map-comp';
// import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export default class LiveMap extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };

  }

  render() {

    return (
      <React.Fragment>
      <div className="two-third ">
        <div >
          <LiveMapComp />
        </div>

      </div>
      </React.Fragment>
    );
  }
}
