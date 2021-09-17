import React from 'react';

export default function AlertButtonBox() {
  return (
    <div className="blue-box route-alert-box rounted-box">
      <ul>
        <li className=" nav-item save-button-margin"><a className="nav-a save-button blue-text rounded-button" href="#vehicle-list/routing">Make Route</a></li>
        <li className=" nav-item save-button-margin"><a className="nav-a save-button blue-text rounded-button" href="#vehicle-list/alerts">Alerts</a></li>
      </ul>
    </div>
  );

}
