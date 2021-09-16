import React from 'react';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    const dId = 2;// Replace this when creating vehicle list feature
    this.state = { driver: {}, driverId: dId };

  }

  render() {

    return (
      <div>
        <div className="one-third border">
          <div className="nav-box purple rounted-box">
            <nav>
              <ul className="nav-ul font-heavy">
                <li className="nav-item">
                  <a className="nav-a" href="">Live Map</a>
                </li >
                <li className="nav-item">
                  <a href="" className="nav-a live-page">Vehicles</a>
                </li>
                <li className="nav-item">
                  <a href="" className="nav-a">Trips</a>
                </li>
                <li className="nav-item">
                  <a href="" className="nav-a">Stops</a>
                </li>
              </ul>

            </nav>
          </div>
        </div>

      </div>
    );
  }
}
