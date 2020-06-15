import React, { useState, useEffect } from "react";

export const LocationContext = React.createContext();

export const LocationProvider = props => {
  const [locations, setLocations] = useState([]);

  // Fetch Locations from yelp
  const getLocations = () => {
    return fetch("http://localhost:5000/businesses")
      .then(res => res.json())
      .then(setLocations);
  };

  // Update locations array on render
  useEffect(() => {}, [locations]);

  // Make avaliable to other components
  return (
    <LocationContext.Provider
      value={{
        locations,
        getLocations
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};
