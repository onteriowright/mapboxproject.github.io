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
    width: "100vw",
    height: "100vh",
    latitude: 36.137698356986476,
    longitude: -86.7755126953125,
    zoom: 10
  });

  const [selectedBarbershop, setSelectedBarbershop] = useState(null);

  let popUpDirections = "";

  const barbershopsArray = locations.businesses;

  if (barbershopsArray === undefined) {
    console.log("Loading...");
    return <h2>Loading Map...</h2>;
  } else {
    return (
      <>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MapboxAccessToken}
          mapStyle={process.env.REACT_APP_MapboxStyle}
          onViewportChange={newViewport => setViewport(newViewport)}
        >
          {barbershopsArray.map(shop => (
            <Marker key={shop.id} latitude={shop.coordinates.latitude} longitude={shop.coordinates.longitude}>
              <button
                className="marker"
                onClick={e => {
                  e.preventDefault();
                  setSelectedBarbershop(shop);
                }}
              >
                <img
                  src="data:image/png;base64,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"
                  alt="barbershop icon"
                />
              </button>
            </Marker>
          ))}

          {selectedBarbershop ? (
            <Popup
              latitude={selectedBarbershop.coordinates.latitude}
              longitude={selectedBarbershop.coordinates.longitude}
              onClose={() => {
                setSelectedBarbershop(null);
              }}
            >
              <div className="popup-info">
                <a
                  href={`https://www.google.com/maps/place/${selectedBarbershop.name}/@${selectedBarbershop.coordinates.latitude},${selectedBarbershop.coordinates.longitude}`}
                  target="_blank"
                >
                  <p>{selectedBarbershop.name}</p>
                  <img src={selectedBarbershop.image_url} alt="picture of shop" />
                  <p>{selectedBarbershop.display_phone}</p>
                </a>
              </div>
            </Popup>
          ) : null}
        </ReactMapGL>
      </>
    );
  }
};
