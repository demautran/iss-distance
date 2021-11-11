import React from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiYXV0cmFuYWxleGFuZHJlIiwiYSI6ImNrdnR3cmZ2bTNqaDIycHFndG1yZTQxY3AifQ.5N5RR2hcHUc-2lp4TgPEZQ';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: -5.79448,
      lng: -35.211,
      latUser: -5.79448,
      lngUser: -35.211,
      zoom: 1.5
    };
    this.mapContainer = React.createRef();
    console.log(this.mapContainer);
  }

  componentDidMount() {
    const { latISS, lngISS, latUser, lngUser } = this.props.geoInfo;

    this.setState({ lng: lngISS, lat: latISS });

    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [lng, lat],
      zoom: zoom
    });


    const allMarkers = [
      {
        description: "ISS",
        coordinates: [lng, lat],
      },
      {
        description: "User",
        coordinates: [lngUser, latUser],
      }
    ];

    for (const marker of allMarkers) {
      // create a HTML element for each feature
      const el = document.createElement('div');
      el.className = `marker marker-${marker.description}`;

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el).setLngLat(marker.coordinates).setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(
            `<h3>${marker.description}</h3><p>Latitude: ${marker.coordinates[1]}, Longitude: ${marker.coordinates[0]}</p>`
          )
      ).addTo(map);
    }

  }

  render() {
    return (
      <div>
        <div ref={this.mapContainer} className="map-container" />
      </div>
    );
  }
}

export default Map