import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
const API_BASE_URL = import.meta.env.VITE_API_URL;

const Signup = () => {

    const { login } = useAuth();

    const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    age: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (!res.ok) {
    alert(data.message || "Signup failed");
    return;
  }

    console.log(data);
    login();
    alert(data.message || "Signup successful");
    navigate("/listings")
  };

  return (
    <div className="container py-4">
        <div className="row justify-content-center">
            <div className="col-md-8 col-lg-8 glass-card">
                <h2 className="mb-4" style={{ color: "white" }}>Sign Up</h2>
                <form className="p-4 shadow-sm" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className='form-label'>Username</label>
                        <input type="text" className='form-control' placeholder='Enter a username' name='username' onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className='form-label'>Email</label>
                        <input type="email" className='form-control' placeholder='Enter a email' name='email' onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className='form-label'>Password</label>
                        <input type="password" className='form-control' placeholder='Enter a password' name='password' onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className='form-label'>Age</label>
                        <input type="number" className='form-control' placeholder='Enter your age' name='age' onChange={handleChange} required/>
                    </div>
                    <br />
                    <button type='submit' className='btn btn-sm w-auto'>Signup</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Signup