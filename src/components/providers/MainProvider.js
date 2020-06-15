import React from "react";
import { LocationProvider } from "../locations/LocationProvider";

export default props => {
  return <LocationProvider>{props.children}</LocationProvider>;
};
