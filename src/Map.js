import React, { useRef, useEffect, useState } from "react";
import * as mapboxgl from "mapbox-gl";
//import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
//import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import "./MapStyles.css";

//Add the access token here
mapboxgl.accessToken =
  "";

const Map = () => {
  const mapContainerRef = useRef(null);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [zoom, setZoom] = useState(5);


  navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true,
  });

  //When the location is fetched successfully.
function successLocation(position) {
    //Mapbox receives longitude and latitude from Geolocation API
    setLongitude(position.coords.longitude)
    setLatitude(position.coords.latitude)
  }
  
  //When there is an error in fetching the location the location with these coordinates is mocked.
  function errorLocation() {
    setLongitude(12.9716)
    setLatitude(77.5946)
  }

  // This gets fired up when the application loads
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [latitude, longitude],
      zoom: zoom,
    });

    //This adds zoom button and compass
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("move", () => {
      setLongitude(map.getCenter().longitude);
      setLatitude(map.getCenter().latitude);
      setZoom(map.getZoom().toFixed(2));
    });

    //This is used to add directions to the map interface
    //This is used to add directions to the map interface
    // const directions = new MapboxDirections({
    // accessToken: mapboxgl.accessToken,
    // unit: 'metric'
    // });
    // map.addControl(directions, "top-left");
    // var directions = new MapboxDirections({
    //     accessToken: mapboxgl.accessToken,
    //     unit: 'metric',
    //     profile: 'cycling'
    //   });
      
    //   map.addControl(directions);

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  

  return (
    <div>
      <div className="map__container" ref={mapContainerRef} />
    </div>
  );
};

export default Map;
