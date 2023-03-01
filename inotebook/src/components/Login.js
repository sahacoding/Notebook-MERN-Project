import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [credentials, setCredentials] = useState({email:"", password:""})
 let  navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3015/api/auth/login", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
headers: {
        'Content-Type': 'application/json',
       // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhZDQ1NGVmMjAwY2NlZjU3MTBmYjNmIn0sImlhdCI6MTY3MjI5OTg1NH0.R0i5XnCxR6aNVnAb8U3sg0aNGtzhbNrzr1uMpSmgOz4"
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const json = await response.json();
     console.log(json);
    if(json.success){
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      navigate("/")
    }
    else{
      alert("Invalid credential")
    }
  }

  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  
  return (
    <div className='container mt-2'>
      <h1>Login to continue Inotebook</h1>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} name='email' aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name='password'/>
  </div>
 <button type="submit" className="btn btn-primary">Login</button>
    </form>
    </div>
  )
}

export default Login
