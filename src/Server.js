export {handleResponseWeather,makeResponseForecast, loadIcon}

const serverUrl = "http://api.openweathermap.org/data/2.5/weather";
const serverUrlForecast = "https://api.openweathermap.org/data/2.5/onecall";
const apiKey = "81ef7d3962516426d5e377aea7aca456";


async function handleResponseWeather(city) {
  const cityName = city;
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
  try {
      const response = await fetch(url);
      if (response.ok) {
          const data = await response.json();
          console.log(data)
          return data;
      } 
      throw new Error("404 Error: There is no such city");

  } catch(err) {
      console.log(err.message + err.stack);
  }

}

async function makeResponseForecast(city) {
  const data = await handleResponseWeather(city);
  const url = `${serverUrlForecast}?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely&appid=${apiKey}&units=metric`;
  
  try {
    const res = await fetch(url);
    if (res.ok) {
      const dataForecast = await res.json();
      dataForecast.name = data.name;
      return dataForecast;
    } else {
      throw new Error("404 error");
    }
  } catch (e) {
    console.log(e.message);
  }
}

function loadIcon(iconId) {
  const url = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
  return url;
}