import React from 'react';

export default function AlertButtonBox(props) {

  return (
    <React.Fragment>
      <div className="mobile-alerts  center">

        <div className="row ">

          <div className='width-50 '>
            <a className="nav-a save-button blue-text rounded-button" href={'#vehicleprofile/routing?vehicleId=' + props.vehicleId}>Route</a>
          </div>

          <div className='width-50  align-right'>
            <a className="nav-a save-button blue-text rounded-button align-right" href={'#vehicleprofile/alerts?vehicleId=' + props.vehicleId}>Alerts</a>
          </div>

        </div>
      </div>

      <div className="blue-box route-alert-box rounted-box">
        <ul>
          <li className=" nav-item  "><a className="nav-a save-button blue-text rounded-button" href={'#vehicleprofile/routing?vehicleId=' + props.vehicleId}>Make Route</a></li>
          <li className=" nav-item alert-button-margin"><a className="nav-a save-button blue-text rounded-button " href={'#vehicleprofile/alerts?vehicleId=' + props.vehicleId}>Alerts</a></li>
        </ul>
      </div>

    </React.Fragment>
  );

}
