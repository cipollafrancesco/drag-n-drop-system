import React, {useEffect, useMemo} from 'react'
import DropZone from './DropZone'
import DraggableItem from './DraggableItem'

const ORDER_LOCAL_STORAGE_KEY = 'preferences@order-hierarchy'


const DragAndDropContainer = (props) => {

    const {defaultOrderHierarchy = {}, draggableIdToComponentMapper = {}} = props

    // GETTING PREFERENCES FROM LOCAL STORAGE
    const localStoragePreferences = useMemo(() => JSON.parse(localStorage.getItem(ORDER_LOCAL_STORAGE_KEY)), [])
    let orderHierarchy = localStoragePreferences || defaultOrderHierarchy

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
        // console.log('>>> UPDATED ORDER', orderHierarchy)
        // SAVE ON LOCAL STORAGE
        localStorage.setItem(ORDER_LOCAL_STORAGE_KEY, JSON.stringify(orderHierarchy))
    }

    // COMPONENT UNMOUNT
    useEffect(() => () => saveHierarchy())

    return (
        <>
            {/* DROP-ZONES*/}
            <>
                {
                    Object.keys(orderHierarchy).map(dropZoneId =>
                        <DropZone key={dropZoneId}
                                  id={dropZoneId}
                                  isDragInProgress={true}
                        >
                            {
                                orderHierarchy[dropZoneId].map(draggableItemId => (
                                        <DraggableItem key={draggableItemId}
                                                       id={draggableItemId}>
                                            {draggableIdToComponentMapper[draggableItemId] || draggableItemId}
                                        </DraggableItem>
                                    )
                                )
                            }
                        </DropZone>
                    )
                }
            </>

            {/* SAVE CURRENT DISPOSITION */}
            <div className="w-100 mt-4">
                <button onClick={saveHierarchy}> Save hierarchy</button>
            </div>
        </>
    )
}

export default DragAndDropContainer
