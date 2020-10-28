import React, {useCallback, useEffect} from 'react'

const DraggableItem = (props) => {

    // PROPS
    const {className = '', id, setDragInProgress} = props

    const handleDragStart = useCallback((event) => {
        setDragInProgress && setDragInProgress(true)
        event.target.id && event.dataTransfer.setData('text/plain', event.target.id)
    }, [setDragInProgress])

    const handleDragEnd = useCallback(() => {
        setDragInProgress && setDragInProgress(false)
    }, [setDragInProgress])

    useEffect(() => {
        const draggableItem = document.getElementById(id)
        if (draggableItem) {
            draggableItem.addEventListener('dragstart', handleDragStart)
            draggableItem.addEventListener('dragend', handleDragEnd)
        }
    }, [handleDragStart, handleDragEnd, id])

    return (
        <div className={className} draggable={true} id={id}>
            {props.children}
        </div>
    )
}

export default DraggableItem
