import React from 'react'

const DropZone = (props) => {

    const {
        isDragInProgress,
        id,
    } = props

    const onDrop = (ev) => {
        ev.preventDefault()
        const data = ev.dataTransfer.getData('text/plain')
        const elementToDrop = document.getElementById(data)
        try {
            ev.target.appendChild(elementToDrop)
        } catch (e) {
            console.error('Unable to append the child')
        }
    }

    const onDragOver = (event) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
    }

    return (
        <div
            id={id}
            className={'drop-zone_active'}
            onDrop={onDrop}
            onDragOver={onDragOver}>
            {props.children}
        </div>
    )
}

export default DropZone
