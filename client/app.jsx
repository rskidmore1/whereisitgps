import React from 'react';
import NavBar from './pages/nav-bar';
import LiveMap from './pages/live-map';
import VehicleList from './pages/vehicle-list';
import { parseRoute } from './lib';
import Routing from './pages/routing';
import VehicleAlerts from './pages/vehicle-alerts';
import VehicleProfile from './pages/vehicle-profile';
import MobileBar from './pages/components/mobile-bar';
import Settings from './pages/settings';
import StopsList from './pages/stops-list';
import StopProfile from './pages/stop-profile';
import MobileNavBar from './pages/components/mobile-nav';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      mobileTitle: ''
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
    if (route.path === 'vehicleprofile/routing') {
      const vehicleId = route.params.get('vehicleId');
      return <Routing vehicleId={vehicleId}/>;
    }
    if (route.path === 'vehicleprofile/alerts') {
      const vehicleId = route.params.get('vehicleId');
      return <VehicleAlerts vehicleId={vehicleId}/>;
    }
    if (route.path === 'vehicleprofile') {
      const vehicleId = route.params.get('vehicleId');

      return <VehicleProfile vehicleId={vehicleId} />;
    }
    if (route.path === 'settings') {

      return <Settings />;
    }
    if (route.path === 'stops') {

      return <StopsList />;
    }
    if (route.path === 'stopprofile') {
      const stopId = route.params.get('stopId');
      return <StopProfile stopId={stopId} />;
    }
  }

  render() {
    let title = '';
    if (this.state.route.path === '') {
      title = 'Live Map';
    } else if (this.state.route.path === 'vehicleprofile/routing') {
      title = 'Routing';
    } else if (this.state.route.path === 'vehicleprofile/alerts') {
      title = 'Alerts';
    } else if (this.state.route.path === 'vehicle-list') {
      title = 'Vehicles';
    } else if (this.state.route.path === 'vehicleprofile') {
      title = 'Vehicle';
    } else if (this.state.route.path === 'settings') {
      title = 'Settings';
    } else if (this.state.route.path === 'stops') {
      title = 'Stops';
    } else if (this.state.route.path === 'stopprofile') {
      title = 'Stop Details';
    }

    return (
      <>
        <MobileNavBar />
      <div className="container">
        <div className="center">

          <MobileBar title={title} />
        </div>
          <div className="row">
            <div className="one-third border">

              <NavBar />
            </div>

            { this.renderPage() }

        </div>
      </div>
      </>
    );
  }
}
