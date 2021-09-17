import React from 'react';
import NavBar from './pages/nav-bar';
import LiveMap from './pages/live-map';
import VehicleList from './pages/vehicle-list';
import { parseRoute } from './lib';
import Routing from './pages/routing';
import VehicleAlerts from './pages/vehicle-alerts';

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
    if (route.path === 'vehicle-list/routing') {

      return <Routing />;
    }
    if (route.path === 'vehicle-list/alerts') {

      return <VehicleAlerts />;
    }
  }

  render() {

    return (
      <>
        <div className="row">
          <div className="one-third border">
           <NavBar />
          </div>

                { this.renderPage() }

       </div>
      </>
    );
  }
}
