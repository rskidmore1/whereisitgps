import React from 'react';

export default class NavBar extends React.Component {

  render() {

    return (
      <div>
        <div className="one-third border">
          <div className="nav-box purple rounted-box">
            <nav>
              <ul className="nav-ul font-heavy">
                <li className="nav-item">
                  <a className="nav-a" href="#livemap">Live Map</a>
                </li >
                <li className="nav-item">
                  <a href="" className="nav-a live-page">Vehicles</a>
                </li>
              </ul>

            </nav>
          </div>
        </div>

      </div>
    );
  }
}
