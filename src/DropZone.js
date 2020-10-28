import React from "react";

const DropZone = (props) => {
  const {
    isDragInProgress,
    id,
    className = "",
    background = "lightgray"
  } = props;

  const onDrop = (ev) => {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text/plain");
    const elementToDrop = document.getElementById(data);
    ev.target.appendChild(elementToDrop);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const DRAG_IN_PROCESS_STYLE = {
    padding: "50px",
    background,
    border: "2px solid",
    borderStyle: "dashed"
  };

  return (
    <div
      id={id}
      className={className}
      onDrop={onDrop}
      onDragOver={onDragOver}
      style={isDragInProgress ? DRAG_IN_PROCESS_STYLE : {}}
    >
      {props.children}
    </div>
  );
};

export default DropZone;
