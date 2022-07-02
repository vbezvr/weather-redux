import { useContext } from "react";
import { ViewModeContext } from "../context";

export { NavigateButtons };

function ButtonItem({name}) {
  const {viewMode, handleViewMode} = useContext(ViewModeContext);
  function getClassName() {
    return viewMode === name ? `${name}-btn button active` : `${name}-btn button`;
  }

  return (
    <div className={getClassName()} onClick={handleViewMode.bind(this,name)}>
      <span className="content">{name}</span>
    </div>
  );
}


function NavigateButtons() {
  const buttons = ["now", "details", "forecast"];
  const buttonsList = buttons.map((elem, index) => (
    <ButtonItem key={index} name={elem} />
  ));


  return (
    <div className="button-display">
      {buttonsList}
    </div>
  );
}
