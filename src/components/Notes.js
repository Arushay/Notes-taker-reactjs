import React,  { useContext }from 'react'
import noteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(NoteContext);
    const {notes, setNotes} = context;
    return (
        <div>
            <div className="row">
                <h1>Your Notes</h1>
                {notes.map((note)=>{
                    return <NoteItem note={note} />
                })}
            </div>
        </div>
    )
}

export default Notes
