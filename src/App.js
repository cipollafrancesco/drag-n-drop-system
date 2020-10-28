import React, { useState } from "react";
import "./styles.css";
import DropZone from "./DropZone";
import DraggableItem from "./DraggableItem";

const ORDER_HIERARCHY = {
  "dropzone-1": {
    "draggable-1": {},
    "draggable-2": {}
  },
  "dropzone-2": {}
};

export default function App() {
  const [isDragInProgress, setDragInProgress] = useState(false);

  const saveHierarchy = () => {
    const dropZoneIds = Object.keys(ORDER_HIERARCHY);

    dropZoneIds.forEach((dropZoneId) => {
      document
        .getElementById(dropZoneId)
        .childNodes.forEach(
          (el, index) => (ORDER_HIERARCHY[dropZoneId][index] = el.id)
        );
    });

    console.log(">>> ORDER", ORDER_HIERARCHY);
  };

  const dropzonesIds = Object.keys(ORDER_HIERARCHY);

  return (
    <div className="App">
      <h1>
        <strong> Drag 'n Drop System </strong>
      </h1>

      <div className="d-flex flex-row mt-4">
        {dropzonesIds.map((dropZoneId, index) => (
          <DropZone
            key={dropZoneId}
            id={dropZoneId}
            className="w-50"
            isDragInProgress={true}
          >
            {Object.values(ORDER_HIERARCHY[dropZoneId]).map(
              (draggableItemId, index) => (
                <DraggableItem
                  key={draggableItemId}
                  id={draggableItemId}
                  setDragInProgress={setDragInProgress}
                >
                  Draggable {index}
                </DraggableItem>
              )
            )}
          </DropZone>
        ))}
      </div>

      <div className="w-100 mt-4">
        <button onClick={saveHierarchy}> Save hierarchy</button>
      </div>
    </div>
  );
}
