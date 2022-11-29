import React from "react";

const ButtonWithOnClickAction = ({onClick, styleButton, isActive, title}) => {

  return (
    <div className="button-component">
      <button onClick={onClick} disabled={!isActive}  className={styleButton +  (!isActive ? " btn-default-inactive" : "")}>{title}</button>
    </div>
  );
};

export default ButtonWithOnClickAction;
