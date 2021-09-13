import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote } = context;
    const { note, updateNote } = props

    return (
        <div id="card-note" className="col-md-3">
            <div className="card my-3" >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa fa-trash mx-2" aria-hidden="true" onClick={()=>{deleteNote(note._id)}} />
                    <i className="fa fa-edit mx-2" aria-hidden="true" onClick={()=>{updateNote(note)}} />

                </div>
            </div>
        </div>
    )
}

export default NoteItem
