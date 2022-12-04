import { createContext, useContext, useEffect, useState } from "react";

const initialValue = {
  map: null,
  setMap: (data) => {},
  data: { loading: false, data: [] },
  setData: (data) => {},
  detailData: null,
  setDetailData: (data) => {},
  centerData: {
    lat: 1.28692,
    lng: 103.85457,
  },
  setCenterData: (data) => {},
};

const MapContext = createContext(initialValue);

const MapProvider = ({ children }) => {
  const [data, setData] = useState(initialValue.data);
  const [detailData, setDetailData] = useState(initialValue.detailData);
  const [centerData, setCenterData] = useState(initialValue.centerData);
  const [map, setMap] = useState(initialValue.map);

  return (
    <MapContext.Provider
      value={{
        map,
        setMap,
        data,
        setData,
        detailData,
        setDetailData,
        centerData,
        setCenterData,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const context = useContext(MapContext);

  return context;
};

export const useMapData = () => {
  const { setData, data } = useMapContext();

  useEffect(() => {
    const doFetchData = async () => {
      setData((prev) => ({ ...prev, loading: true }));
      try {
        const response = await fetch("./index.json");

        const marker = await response.json();

        setData((prev) => ({ ...prev, loading: false, data: marker.data }));
      } catch (err) {
        setData((prev) => ({ ...prev, loading: false, data: [] }));
      }
    };

    doFetchData();
    // eslint-disable-next-line
  }, []);

  return { data, setData };
};

export default MapProvider;
