import React from 'react'

const NoteItem = (props) => {
    const { note } = props

    return (
        <div className="col-md-3">
            <div class="card my-3" >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa fa-trash mx-2" aria-hidden="true" />
                    <i className="fa fa-edit mx-2" aria-hidden="true" />

                </div>
            </div>
        </div>
    )
}

export default NoteItem
