import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiYXV0cmFuYWxleGFuZHJlIiwiYSI6ImNrdnR3cmZ2bTNqaDIycHFndG1yZTQxY3AifQ.5N5RR2hcHUc-2lp4TgPEZQ';

const Map = (obj) => {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(obj.geoInfo.lngISS);
  const [lat, setLat] = useState(obj.geoInfo.latISS);
  const [zoom, setZoom] = useState(3);



  useEffect(() => {
    const lngISS = obj.geoInfo.lngISS;
    const latISS = obj.geoInfo.latISS;
    const lngUser = obj.geoInfo.lngUser;
    const latUser = obj.geoInfo.latUser;
    const allMarkers = [
      {
        description: "ISS",
        coordinates: [lngISS, latISS],
      },
      {
        description: "User",
        coordinates: [lngUser, latUser],
      }
    ];

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/navigation-day-v1',
      center: [lngISS, latISS],
      zoom: zoom
    });

    for (const marker of allMarkers) {
      // create a HTML element for each feature
      const el = document.createElement('div');
      el.className = `marker marker-${marker.description}`;

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el).setLngLat(marker.coordinates).setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(
            `<h3 style="color: black;">${marker.description}</h3><p style="color: black;">Latitude: ${marker.coordinates[1]}<BR>Longitude: ${marker.coordinates[0]}</p>`
          )
      ).addTo(map.current);
    }
  });



  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default Map;