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
      water: false,
      nearestCountry: "Brazil",
    };
  };

  componentDidMount() {

    fetch("http://api.open-notify.org/iss-now.json")
      .then(response => response.json())
      .then(obj => {
        let { latitude, longitude } = obj.iss_position;
        this.setState({ latISS: latitude, lngISS: longitude });

        return fetch(`https://api.onwater.io/api/v1/results/${this.state.latISS},${this.state.lngISS}?access_token=CR7n1ahMU-aEkkxHDdqi`)
          .then(response => response.json())
          .then(obj => {
            this.setState({ water: obj.water })
            if (!obj.water) {
              return fetch(`http://open.mapquestapi.com/geocoding/v1/reverse?key=NVccIGeX6ADtketWYGWm8PvAkoA19U1r&location=${this.state.latISS},${this.state.lngISS}&outFormat=json&includeNearestIntersection=true`)
                .then(response => response.json())
                .then(result => this.setState({ nearestCountry: result.results[0].locations[0].adminArea1 }));
            } else {
              this.setState({ nearestCountry: "XZ" });
              return fetch("https://api.freegeoip.app/json/?apikey=1e223cc0-4277-11ec-b006-850774abd385")
                .then(resp => resp.json())
                .then(obj => {
                  let { latitude, longitude } = obj;
                  this.setState({ latUser: latitude, lngUser: longitude });
                })
            }

          });

      })
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
