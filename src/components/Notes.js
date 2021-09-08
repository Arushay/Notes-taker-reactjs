import React,  { useContext }from 'react'
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(NoteContext);
    const {notes, setNotes} = context;
    return (
        <div>
            <div className="row">
                <h1 className="text-center">Your Notes</h1>
                {notes.map((note)=>{
                    return <NoteItem key={note._id} note={note} />
                })}
            </div>
        </div>
    )
}

export default Notes
