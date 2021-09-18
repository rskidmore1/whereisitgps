import React from 'react';

export default function AlertButtonBox(props) {

  return (
    <div className="blue-box route-alert-box rounted-box">
      <ul>
        <li className=" nav-item save-button-margin"><a className="nav-a save-button blue-text rounded-button" href={'#vehicleprofile/routing?vehicleId=' + props.vehicleId}>Make Route</a></li>
        <li className=" nav-item save-button-margin"><a className="nav-a save-button blue-text rounded-button" href={'#vehicleprofile/alerts?vehicleId=' + props.vehicleId}>Alerts</a></li>
      </ul>
    </div>
  );

}
