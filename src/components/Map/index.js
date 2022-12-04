import React, { useEffect, useRef } from "react";
import Detail from "../Detail";
import { useMapContext } from "../../context";
import { Box } from "@mui/material";

const Index = () => {
  const {
    data: { data: markerData },
    setMap,
    setDetailData,
    detailData,
  } = useMapContext();
  const ref = useRef();

  useEffect(() => {
    // chcek if the reference element and markerdata was render and exist to use with google map
    if (ref.current && markerData) {
      // init map with reference element and default options
      const googleMap = new window.google.maps.Map(ref.current, {
        center: { lat: markerData[0].lat, lng: markerData[0].long },
        zoom: 15,
        mapId: "be9d882642ccdf0a",
        controlSize: 25,
      });

      // set google map objects to map context, purposed to be consumed in another components
      setMap(googleMap);

      // loop throught marker data to map and init them
      markerData.map((marker) => {
        // set up each marker to google maps with default options
        const markers = new window.google.maps.Marker({
          position: { lat: marker.lat, lng: marker.long },
          title: marker.title,
          map: googleMap,
          icon: {
            url: "https://icons.iconarchive.com/icons/paomedia/small-n-flat/512/map-marker-icon.png",
            scaledSize: new window.google.maps.Size(60, 70),
          },
          label: {
            text: marker.title,
            className: "override-label-style",
          },
        });

        // add click event to each marker
        markers.addListener("click", function (event) {
          // add move interaction to the marker position when the marker clicked
          markers.map.panTo({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          });

          // set map zoom to 17
          googleMap.setZoom(17);

          // set detail data to map context, purposed to be consumed in another components
          setDetailData(marker);
        });

        return null;
      });
    }
    // watch the marker data
  }, [markerData, setDetailData, setMap]);

  return (
    <React.Fragment>
      <Box
        className={detailData ? "map-with-drawer" : "init-map"}
        ref={ref}
        id="map"
      />
      <Detail />
    </React.Fragment>
  );
};

export default Index;
