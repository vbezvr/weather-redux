import { getDate, getTime } from "../Helper.js";
import { loadIcon } from "../Server.js";
export { Forecast };

function ForecastItem({ data }) {
  return (
    <div className="card">
      <span className="date">{getDate(data.dt)}</span>
      <span className="time">{getTime(data.dt)}</span>
      <span className="temperature">Temperature: {data.temp}°</span>
      <span className="feel_like">Feels like: {data.feels_like}°</span>
      <span className="state">{data.weather[0].main}</span>
      <img
        src={loadIcon(data.weather[0].icon)}
        alt="weather icon"
        className="icon"
        width="28px"
      ></img>
    </div>
  );
}

function Forecast({ data }) {
  if (!data) {
    return (
      <div>
        <p>loading..</p>
      </div>
    )
  } else {
    const hourlyList = data.hourly.map((hourData) => (
      <ForecastItem data={hourData} />
    ));
    return (
      <div className="content">
        <p>{data.name}</p>
        {hourlyList}
      </div>
    );
  }
}
