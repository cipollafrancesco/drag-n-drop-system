import React, { useEffect } from "react";

const DraggableItem = (props) => {
  // PROPS
  const { className = "", id, setDragInProgress } = props;

  const handleDragStart = (event) => {
    console.log(">>> DRAG START", id);
    setDragInProgress && setDragInProgress(true);
    event.target.id &&
      event.dataTransfer.setData("text/plain", event.target.id);
  };

  const handleDragEnd = () => {
    console.log(">>> DRAG END", id);
    setDragInProgress && setDragInProgress(false);
  };

  useEffect(() => {
    const draggableItem = document.getElementById(id);
    console.log(">>> ITEM", draggableItem);

    if (draggableItem) {
      draggableItem.addEventListener("dragstart", handleDragStart);
      draggableItem.addEventListener("dragend", handleDragEnd);
    }
  }, []);

  return (
    <div className={className} draggable={true} id={id}>
      {props.children}
    </div>
  );
};

export default DraggableItem;
