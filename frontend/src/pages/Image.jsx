import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Image = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    image: "",
  })

  const handleChange = (e) => setFormData({ image: e.target.files[0] })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("image", formData.image);

    try {
      fetch(`http://localhost:5000/listings/${id}`, {
        method: "POST",
        body: form
      })
      navigate(`/listings/${id}`)
    } catch (err){
      console.error("Error:", err)
    }
  }
  
  return (
    <div className="container py-5">
    <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5 glass-card"> 
      <h2 style={{ color: "white" }}>Upload Image</h2>
      <form onSubmit={handleSubmit} enctype="multipart/form-data" className='p-4 shadow rounded'>
      <label htmlFor="image" className='form-label'></label>
      <input type="file" name='image' className='form-control text-white' onChange={handleChange}/>
      <button className='btn btn-sm w-auto'>Upload Image</button>
      </form>
    </div>
    </div>
    </div>
  )
}

export default Image