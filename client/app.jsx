import React from 'react';
import Home from './pages/home';
import NavBar from './pages/nav-bar';
import LiveMap from './pages/live-map';
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
      return <Home />;
    }
    if (route.path === 'livemap') {
      // const productId = route.params.get('productId');
      // return <ProductDetails productId={productId} />;
      return <LiveMap />;
    }
    // return <NotFound />;
  }

  render() {

    // return <Home />;
    return (
      <>
      <NavBar />
      { this.renderPage() }
      </>
    );
  }
}
