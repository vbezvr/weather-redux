import { useEffect, useState } from "react";
import { MainPage } from "./components/MainPage";
import { SearchForm } from "./components/SearchForm";
import { handleResponseWeather, makeResponseForecast } from "./Server.js";
import "./styles/App.css";
import "./styles/tabs.css";
import { ViewModeContext } from "./context";

function App() {
  const [data, setData] = useState("");
  const [city, setCity] = useState("Bali");
  const [viewMode, setViewMode] = useState("now");

  useEffect(() => {
    const fetchData = async () => {
      if (viewMode == "forecast") {
        const data = await makeResponseForecast(city);
        setData(data);
      } else {
        const data = await handleResponseWeather(city);
        setData(data);
      }
    };

    fetchData();
  }, [city, viewMode]);

  function handleResponse(cityName) {
    setCity(cityName);
  }

  function handleViewMode(mode) {
    setData("");
    setViewMode(mode);
  }

  return (
    <div className="wrapper">
      <ViewModeContext.Provider value={{ viewMode, handleViewMode }}>
        <SearchForm handleResponse={handleResponse} data={data} />
        <MainPage data={data} handleResponse={handleResponse} />
      </ViewModeContext.Provider>
    </div>
  );
}

export default App;
