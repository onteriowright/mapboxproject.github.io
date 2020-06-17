import React, { useContext, useEffect } from "react";
import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { LocationContext } from "./LocationProvider";

export default () => {
  const { locations, getLocations } = useContext(LocationContext);

  useEffect(() => {
    getLocations();
  }, []);

  // create map
  const [viewport, setViewport] = useState({
    width: 750,
    height: 750,
    latitude: 36.137698356986476,
    longitude: -86.7755126953125,
    zoom: 8
  });

  // size of icons on map
  const imgSize = {
    width: "40px",
    height: "40px"
  };

  const barbershops = locations.businesses;

  if (barbershops === undefined) {
    console.log("Loading...");
  } else {
    return (
      <>
        <h1>Barber Shops</h1>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MapboxAccessToken}
          mapStyle="mapbox://styles/onteriowright/ckbgugpcg36h51io1trdbtt1n"
          onViewportChange={newViewport => setViewport(newViewport)}
        >
          {barbershops.map(shop => (
            <Marker key={shop.id} latitude={shop.coordinates.latitude} longitude={shop.coordinates.longitude}>
              {shop.image_url === "" ? (
                <img
                  style={imgSize}
                  src="https://i.pinimg.com/originals/b8/5a/40/b85a409cd599f522155a381b38b8875e.jpg"
                />
              ) : (
                <img style={imgSize} src={shop.image_url} />
              )}
            </Marker>
          ))}
        </ReactMapGL>
      </>
    );
  }

  return <></>;
};
