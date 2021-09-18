import React from 'react';

export default class MobileBar extends React.Component {

  render() {
    const title = this.props.title;
    return (

      <div className="mobile-bar blue-text blue-box rounted-box">
        <h2 className="mobile-title">{title}</h2>
      </div>

    );
  }
}
