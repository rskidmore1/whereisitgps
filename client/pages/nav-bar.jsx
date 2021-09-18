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
                <a id="livemap" className={this.state.openIndex === 'livemap' ? 'nav-a nav-color live-page' : 'nav-a nav-color'} href="#" onClick={this.handleClick}>Live Map</a>
                </li >
                <li className="nav-item">
                <a id="vehicle-list" className={this.state.openIndex === 'vehicle-list' ? 'nav-a nav-color live-page' : 'nav-a nav-color'} href="#vehicle-list" onClick={this.handleClick}>Vehicles</a>
                </li>
              </ul>

            </nav>
          </div>

        <div className="nav-mobile">

          <Drawer />

        </div>

      </div>
    );
  }
}

export class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    } else {
      this.setState({ isOpen: true });
    }
  }

  render() {

    return (

      <React.Fragment>

        <div className="">

          <i className="fas fa-bars" onClick={this.toggle}></i>

        </div>
        <div className={this.state.isOpen ? 'nav-div' : 'nav-div hidden'}>
          <h2 onClick={this.toggle}>Nav</h2>
          <div>

            <ul>
              <li><a onClick={this.toggle} href="#">Live Map</a></li>
              <li><a onClick={this.toggle} href="#vehicle-list">Vehicles</a></li>
            </ul>

          </div>
        </div>
      </React.Fragment>

    );

  }

}
