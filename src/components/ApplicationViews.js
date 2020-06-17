import React from "react";
import MainProvider from "./providers/MainProvider";
import LocationList from "./locations/LocationList";
import "./BarbershopLocation.css";

export default props => {
  return (
    <MainProvider>
      <>
        <section>
          <div>
            <LocationList {...props} />
          </div>
        </section>
      </>
    </MainProvider>
  );
};
