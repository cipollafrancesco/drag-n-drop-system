import React, {useMemo} from 'react'
import './styles.css'
import DropZone from './DropZone'
import DraggableItem from './DraggableItem'

const DEFAULT_ORDER_HIERARCHY = {
    'dropzone-1': ['draggable-1'],
    'dropzone-2': ['draggable-2'],
    'dropzone-3': ['draggable-3'],
}

const ORDER_LOCAL_STORAGE_KEY = 'preferences@order-hierarchy'

export default function App() {

    // GETTING PREFERENCES FROM LOCAL STORAGE
    const localStoragePreferences = useMemo(() => JSON.parse(localStorage.getItem(ORDER_LOCAL_STORAGE_KEY)), [])
    let orderHierarchy = localStoragePreferences || DEFAULT_ORDER_HIERARCHY

    /**
     * HANDLE SAVE HIERARCHY
     */
    const saveHierarchy = () => {
        orderHierarchy = Object.keys(orderHierarchy).reduce((savedOrder, dropZoneId) => {
            const childrenIds = [...document.getElementById(dropZoneId).children].map(el => el.id)
            return ({
                ...savedOrder,
                [dropZoneId]: childrenIds.length ? childrenIds : []
            })
        }, {})

        console.log('>>> UPDATED ORDER', orderHierarchy)

        // SAVE ON LOCAL STORAGE
        localStorage.setItem(ORDER_LOCAL_STORAGE_KEY, JSON.stringify(orderHierarchy))
    }

    return (
        <div className="App">

            <h1>
                <strong> Drag 'n Drop System </strong>
            </h1>

            <div className="d-flex flex-row mt-4">
                {
                    Object.keys(orderHierarchy).map(dropZoneId =>
                        <DropZone key={dropZoneId} id={dropZoneId} className="w-50" isDragInProgress={true}>
                            {
                                orderHierarchy[dropZoneId].map(draggableItemId => (
                                        <DraggableItem key={draggableItemId}
                                                       id={draggableItemId}>
                                            Draggable: {draggableItemId}
                                        </DraggableItem>
                                    )
                                )
                            }
                        </DropZone>
                    )
                }
            </div>


            {/* SALVA ORDINE */}
            <div className="w-100 mt-4">
                <button onClick={saveHierarchy}> Save hierarchy</button>
            </div>

        </div>
    )
}
