import React from 'react'
import './styles.css'
import DragAndDropContainer from './DragAndDropContainer'

const DEFAULT_ORDER_HIERARCHY = {
    'dropzone-1': ['draggable-1'],
    'dropzone-2': ['draggable-2'],
    'dropzone-3': ['draggable-3'],
    'dropzone-4': ['draggable-4'],
    'dropzone-5': [],
    'dropzone-6': [],
    'dropzone-7': [],
    'dropzone-8': [],
}

const Circle = ({children, background}) => (
    <div className="d-flex align-items-center justify-content-center text-white"
         style={{height: 100, background}}>
        {children}
    </div>
)

const MAP_DRAGGABLE_ID_TO_COMPONENT = {
    'draggable-1': <Circle background="#283593"> draggable-1 </Circle>,
    'draggable-2': <Circle background="#455A64"> draggable-2 </Circle>,
    'draggable-3': <Circle background="#9C27B0"> draggable-3 </Circle>,
    'draggable-4': <Circle background="#880E4F"> draggable-4 </Circle>,
}

export default function App() {
    return (
        <div className="App">

            <h1>
                <strong> Drag 'n Drop System </strong>
            </h1>

            {/* FIRST ROW */}
            <div className="mt-4"
                 style={{
                     display: 'grid',
                     gridTemplateColumns: '33% 33% 33%'
                 }}>

                <DragAndDropContainer defaultOrderHierarchy={DEFAULT_ORDER_HIERARCHY}
                                      draggableIdToComponentMapper={MAP_DRAGGABLE_ID_TO_COMPONENT}
                />

            </div>

        </div>
    )
}
