import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div className="washed-yellow bg-near-black pa3" >
        <h4>Alexandre Autran</h4>
        <div className="pt4 f6">
          <p>This page uses the following APIs</p>
          <ul>
            <li><a className="link underline-hover light-blue" href="http://open-notify.org/Open-Notify-API/ISS-Location-Now/" alt="Link to ISS Location Now API">ISS Location Now</a></li>
            <li><a className="link underline-hover light-blue" href="https://freegeoip.app" alt="Link to Free GeoIP">Free GeoIP</a></li>
            <li><a className="link underline-hover light-blue" href="https://www.mapbox.com" alt="Link to mapbox">mapbox</a></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Footer;