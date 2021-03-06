import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Login = () => {
    const [credential, setCredential] = useState({email: "", password: ""})
    let history = useHistory();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        // Api call
    const response = await fetch("http://localhost:5000/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: credential.email, password: credential.password})
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
          // Save the auth token & redirect
          localStorage.setItem('token', json.authtoken);
          props.showAlert('Loged in!', "success");
          history.push("/");
      } else {
        props.showAlert('Invalid info!', "danger");
      }
    }

    const onChange = (e)=>{
        setCredential({...credential, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <h1 className="mt-3">Login to join</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credential.email} onChange={onChange} name="email" id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credential.password} onChange={onChange} name="password" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
