import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { useMapData } from "./context";
import Map from "./components/Map";
import Layout from "./components/Layout";
import "./App.css";

const App = () => {
  // retrieve the json marker data
  useMapData();

  const render = (status) => {
    return <pre>{status}</pre>;
  };

  return (
    // wrapped with appbar and sidebar.
    <Layout>
      {/* hit google maps api with the api key */}
      <Wrapper render={render} apiKey="AIzaSyCLs8SVRLo8xe9Ov6RkU-UPYSZuCCBohcA">
        <Map />
      </Wrapper>
    </Layout>
  );
};

export default App;
