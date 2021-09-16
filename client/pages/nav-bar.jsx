import React from 'react';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openIndex: 'livemap'

    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({ openIndex: event.target.id });
  }

  render() {

    return (
      <div>

          <div className="nav-box purple rounted-box">
            <nav>
              <ul className="nav-ul font-heavy">
                <li className="nav-item">
                <a id="livemap" className={this.state.openIndex === 'livemap' ? 'nav-a live-page' : 'nav-a'} href="#" onClick={this.handleClick}>Live Map</a>
                </li >
                <li className="nav-item">
                <a id="vehicle-list" className={this.state.openIndex === 'vehicle-list' ? 'nav-a live-page' : 'nav-a'} href="#vehicle-list" onClick={this.handleClick}>Vehicles</a>
                </li>
              </ul>

            </nav>
          </div>

      </div>
    );
  }
}
