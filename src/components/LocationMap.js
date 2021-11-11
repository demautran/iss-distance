import React from 'react';
import Map from './Map';


const LocationMap = ({ geoInfo }) => {
  let { latISS, lngISS, latUser, lngUser } = geoInfo;


  function getDistance(lat1, lon1, lat2, lon2) {

    function deg2rad(deg) {
      return deg * Math.PI / 180;
    }

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    let rad = 6371;
    let dLat = deg2rad(lat2 - lat1);
    let dLon = deg2rad(lon2 - lon1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = rad * c;
    return `${numberWithCommas(Math.round(d))}km`;
  }


  return (
    <div className="bg-washed-yellow pt4">
      <h1 className="orange">You are approximately {getDistance(latUser, lngUser, latISS, lngISS)} away from the ISS.</h1>
      <p>Use the map below to find yours and the ISS' location on the Globe!</p>
      <div className="bg - washed - yellow pa3 pb5">
        <Map geoInfo={{ latUser, lngUser, latISS, lngISS }} />
      </div>
    </div >
  );

}

export default LocationMap