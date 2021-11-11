import Header from '../components/Header';
import Footer from '../components/Footer';
import LocationMap from '../components/LocationMap';
import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      latISS: -5.79448,
      lngISS: -35.211,
      latUser: -5.79448,
      lngUser: -35.211,
    };
  };


  componentDidMount() {
    fetch("http://api.open-notify.org/iss-now.json")
      .then(response => response.json())
      .then(obj => {
        let { latitude, longitude } = obj.iss_position;
        this.setState({ latISS: latitude, lngISS: longitude });

        return fetch("https://api.freegeoip.app/json/?apikey=[ADD API KEY HERE]")
          .then(resp => resp.json())
          .then(obj => {
            let { latitude, longitude } = obj;
            this.setState({ latUser: latitude, lngUser: longitude });
          })
      }

      );
  };


  render() {
    return (
      <div className="tc">
        <Header />
        <LocationMap geoInfo={this.state} />
        <Footer />
      </div>
    );
  }
};

export default App;
