import React from 'react'
import Notes from './Notes';


export const Home = () => {
  
    return (
        <>
            <div className="container my-3">
                <h1>Add Notes</h1>
                <form className="my-3">
                    <div className="mb-3">
                        
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

<Notes />
        </>
    )
}


