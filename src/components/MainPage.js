import React, { useContext, useState } from "react";
import {loadIcon} from "../Server.js";
import { SaveLocations } from "./SaveLocations.js";
import { storage } from "../Storage.js";
import { Details } from "./Details.js";
import { Forecast } from "./Forecast.js";
import { NavigateButtons } from "./NavigateButtons.js";
import saved from "../icons/fav_enable.svg";
import unsaved from "../icons/fav_disable.svg";
import { ViewModeContext } from "../context.js";
export { MainPage };

function MainPage({data, handleResponse}) {
  const {viewMode} = useContext(ViewModeContext);
  const [savedCities, setSavedCities] = useState(storage.getFavoriteCities());
  const tabs = {
    now: <Content data={data} handleChosenCity={handleChosenCity} />,
    details: <Details data={data} />,
    forecast: <Forecast data={data} />
  }

  if (!data) {
    if (storage.isEmpty()) {
      storage.saveFavoriteCities("");
    }
  }

  function handleChosenCity(city) {

    if (storage.isCitySaved(city)) {
      storage.deleteFavoriteCitiesItem(city);
    } else {
      storage.addFavoriteCitiesItem(city);
    }

    setSavedCities(storage.getFavoriteCities())

  }

  return (
    <div className="display">
      <div className="now-display">
        {data && tabs[viewMode]}
        <NavigateButtons />
      </div>
      <SaveLocations
        cityData={savedCities}
        handleResponse={handleResponse}
        handleUpdates={handleChosenCity}
      />
    </div>
  );
}

function Content(props) {
  const [temperature, iconId, cityName] = [
    props.data.main.temp + "°",
    props.data.weather[0].icon,
    props.data.name,
  ];

  return (
    <div className="content">
      <span className="degree">{temperature}</span>
      <img className="weather-icon" src={loadIcon(iconId)}></img>
      <div className="city-footer">
        <span id="current-city">{cityName}</span>
        <SaveCityButton
          name={cityName}
          isActive={storage.isCitySaved(cityName)}
          handleChosenCity={props.handleChosenCity}
        />
      </div>
    </div>
  );
}

function SaveCityButton(props) {

  return (
    <a className="like-btn" onClick={props.handleChosenCity.bind(this, props.name)}>
      <img id="like-btn" src= {props.isActive ? saved : unsaved} width="30px"></img>
    </a>
  );
}
