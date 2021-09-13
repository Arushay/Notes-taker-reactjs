import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';
import { useState } from 'react';

const AddNote = () => {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title:"", description:"", tag:""});

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:""});
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div>
             <div className="container my-3">
                <h1>Add Notes</h1>
                <form className="my-3">
                    <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" value={note.title} name="title" onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="description" className="form-label">Detail</label>
                        <input type="text" className="form-control" value={note.description} name="description" onChange={onChange} minLength={5} required id="description" />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" value={note.tag} name="tag" onChange={onChange} minLength={5} required id="tag" />
                    </div>
                    <button type="submit" onClick={handleClick} className="btn btn-primary">Add</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
