import close from "../icons/cancel.svg";
export { SaveLocations };

function LocationItem(props) {
  const value = props.value;

  return (
    <div onClick={props.handleClick.bind(this, value)}>
      {value}
      <a onClick={props.handleDeleteLocation.bind(this, value)}>
        <img src={close}></img>
      </a>
    </div>
  );
}

function SaveLocations(props) {
  const locationData = props.cityData;
  const locationItems = locationData.map((item, index) => (
    <LocationItem
      value={item}
      key={index}
      handleClick={props.handleResponse}
      handleDeleteLocation={props.handleUpdates}
    />
  ));

  return (
    <div className="added-location">
      <div className="label-location">
        <p>Added locations: </p>
      </div>
      <div className="save-locations">{locationItems}</div>
    </div>
  );
}
