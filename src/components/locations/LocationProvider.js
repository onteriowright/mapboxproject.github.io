import React, { useState, useEffect } from "react";

export const LocationContext = React.createContext();

export const LocationProvider = props => {
  const [locations, setLocations] = useState([]);

  const getLocations = () => {
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?client_id=${process.env.REACT_APP_YELP_CLIENT_ID}&term=barbershop&location=Nashville,TN&limit=50`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-requestd-with": "xmlhttprequest",
          "Access-Control-Allow-Origin": "http://localhost:3000/",
          Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`
        }
      }
    )
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
