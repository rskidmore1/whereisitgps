import React from 'react';

export default class MobileNavBar extends React.Component {
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
      <React.Fragment>
        <div className="nav-mobile">
          <Drawer />
        </div>
      </React.Fragment>
    );
  }
}

export class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    } else {
      this.setState({ isOpen: true });
    }
  }

  render() {

    return (

      <React.Fragment>

        <div className="banner purple">

            <div className="hamburger-col">
              <i className="fas fa-bars" onClick={this.toggle}></i>
            </div>
            <div className="title-col center ">
              <h2 className="title-text center ">Whereisit</h2>
            </div>

        </div>

        <div className={this.state.isOpen ? 'nav-div ' : 'nav-div hidden'}>
          <h2 className="font-heavy blue-text" onClick={this.toggle}>Navigate</h2>
          <div>

            <ul className="nav-item padding-left-1rem">
              <li><a className="nav-a blue-text " onClick={this.toggle} href="#">Live Map</a></li>
              <li><a className="nav-a blue-text " onClick={this.toggle} href="#vehicle-list">Vehicles</a></li>
              <li><a className="nav-a blue-text " onClick={this.toggle} href="#stops">Stops</a></li>
              <li><a className="nav-a blue-text " onClick={this.toggle} href="#settings">Settings</a></li>

            </ul>

          </div>
        </div>
      </React.Fragment>

    );

  }

}
