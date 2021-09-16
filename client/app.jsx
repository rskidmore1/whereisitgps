import React from 'react';
import NavBar from './pages/nav-bar';
import LiveMap from './pages/live-map';
import VehicleList from './pages/vehicle-list';
import { parseRoute } from './lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {

    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <LiveMap />;
    }

    if (route.path === 'vehicle-list') {

      return <VehicleList />;
    }
  }

  render() {

    return (
      <>
        <div className="row">
          <div className="one-third border">
           <NavBar />
          </div>
          <div className="two-third border ">
                { this.renderPage() }
          </div>

          <div className="one-third ">
          </div>
       </div>
      </>
    );
  }
}
