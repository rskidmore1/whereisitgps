import React from 'react';
import LiveMapComp from './components/live-map-comp';

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
