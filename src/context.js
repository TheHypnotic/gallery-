import React, { useState, useEffect, useContext, useCallback } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("car");
  const [images, setImages] = useState([]);
  const [loading, setIsLoading] = useState(false);

  const url = `https://api.pexels.com/v1/search?query=${searchTerm}&per_page=20`;
  const key = process.env.REACT_APP_PEXELS_API_KEY;

  const getApi = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: key,
        },
      });
      const data = await response.json();
      if (data) {
        setIsLoading(false);
        return setImages(data.photos);
      }
    } catch (err) {
      console.log(`Error: ${err}`);
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if (searchTerm) {
      getApi();
    } else {
      setSearchTerm("sky");
    }
  }, [searchTerm]);
  return (
    <AppContext.Provider
      value={{ loading, images, setSearchTerm, setIsLoading }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider };
