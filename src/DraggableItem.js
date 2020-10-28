import React, {useEffect} from 'react'

const DraggableItem = (props) => {

    // PROPS
    const {className = '', id, setDragInProgress} = props

    const handleDragStart = (event) => {
        setDragInProgress && setDragInProgress(true)
        event.target.id && event.dataTransfer.setData('text/plain', event.target.id)
    }

    const handleDragEnd = () => {
        setDragInProgress && setDragInProgress(false)
    }

    useEffect(() => {
        const draggableItem = document.getElementById(id)
        if (draggableItem) {
            draggableItem.addEventListener('dragstart', handleDragStart)
            draggableItem.addEventListener('dragend', handleDragEnd)
        }
    }, [])

    return (
        <div className={className} draggable={true} id={id}>
            {props.children}
        </div>
    )
}

export default DraggableItem
