import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const New = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    country: "",
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      fetch('http://localhost:5000/listings', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      navigate("/listings")
    } catch (err){
      console.error("Error:", err)
    }
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-8 glass-card">
        <h2 className="mb-4" style={{ color: "white" }}>Add New Listing</h2>
      <form onSubmit={handleSubmit} className="p-4 shadow-sm">
        <div className="mb-3">
          <label htmlFor="title" className='form-label'>Title</label>
        <input type="text" className='form-control' placeholder="Enter a Title" name='title' onChange={handleChange} required/>
        </div>
        <div className="mb-3">
        <label htmlFor="description" className='form-label'>Description</label>
        <textarea type="text" className='form-control' placeholder="Description" name='description' onChange={handleChange} required/>
        </div>
        <div className="mb-3">
        <label htmlFor="price" className='form-label'>Price</label>
        <input type="number" className='form-control' placeholder='Enter price' name='price' onChange={handleChange} required/>
        </div>
        <div className="mb-3">
        <label htmlFor="location" className='form-label'>Location</label>
        <input type="text" className='form-control' placeholder="Enter location" name='location' onChange={handleChange} required/>
        </div>
        <div className="mb-3">
        <label htmlFor="country" className='form-label'>Country</label>
        <input type="text" className='form-control' placeholder="Enter country" name='country' onChange={handleChange} required/>
        </div>
        <br />
      <button type='submit' className='btn btn-sm w-auto'>Add</button>
      </form>
        </div>
      </div>
    </div>
  )
}

export default New