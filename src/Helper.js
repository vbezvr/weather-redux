export {getTime, getDate}

function getDate(unixTimestamp) {
  const millSecond = unixTimestamp * 1000;
  const dateObj = new Date(millSecond);
  return dateObj.toLocaleString("en-US", { day: "numeric", weekday: "long" });
}

function getTime(unixTimestamp) {
  const millSecond = unixTimestamp * 1000;
  const dateObj = new Date(millSecond);
  return dateObj.toLocaleString("ru", { hour: "numeric", minute: "numeric" });
}