import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Signup = (props) => {
    const [credential, setCredential] = useState({name:"", email: "", password: "", cpassword:""})
    let history = useHistory();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        // Api call
        let {name, email, password} = credential;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password})
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
          // Save the auth token & redirect
          localStorage.setItem('token', json.authtoken);
          history.push("/");
          props.showAlert('Thanks for joining!', "success");
      } else {
          props.showAlert('Invalid info!', "danger");
      }
    }

    const onChange = (e)=>{
        setCredential({...credential, [e.target.name]: e.target.value})
    }

    return (
        <div className="container">
            <h1 className="mt-3">Create an account to join iNotebook</h1>
            <form onSubmit={handleSubmit}>
            <div className="my-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" onChange={onChange} id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={onChange} name="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} name="password" minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" onChange={onChange} name="cpassword" minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
