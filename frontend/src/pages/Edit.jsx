import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Edit = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        country: "",
    })

    useEffect(() => {
        const fetchListing = async () => {
            const res = await fetch(`http://localhost:5000/listings/${id}/edit`)
            const data = await res.json()
            setFormData(data)
        }
        fetchListing()
    }, [id])

    const handleChange = (e) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value})
        )
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        await fetch(`http://localhost:5000/listings/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        navigate(`/listings/${id}`)
    }

  return (
    <div className="container py-4">
    <div className="row justify-content-center">
        <div className="col-md-8 col-lg-8 glass-card">
        <h2 className="mb-4" style={{ color: "white" }}>Edit</h2>
        <form onSubmit={handleSubmit} className="p-4 shadow-sm">
            <div className="mb-3">
            <label htmlFor="title" className='form-label'>Title</label>
            <input type="text" className='form-control' name='title' value={formData.title} onChange={handleChange}/>
            </div>
            <div className="mb-3">
            <label htmlFor="description" className='form-label'>Description</label>
            <textarea type="text" className='form-control' name="description" value={formData.description} onChange={handleChange}></textarea>
            </div>
            <div className="mb-3">
            <label htmlFor="price" className='form-label'>Price</label>
            <input type="number" className='form-control' name='price' value={formData.price} onChange={handleChange}/>
            </div>
            <div className="mb-3">
            <label htmlFor="location" className='form-label'>Location</label>
            <input type="text" className='form-control' name='location' value={formData.location} onChange={handleChange}/>
            </div>
            <div className="mb-3">
            <label htmlFor="country" className='form-label'>Country</label>
            <input type="text" className='form-control' name='country' value={formData.country} onChange={handleChange}/>
            </div>
            <br />
            <button type='submit' className='btn btn-primary btn-sm w-auto'>Update</button>
        </form>
        </div>
    </div>
    </div>
  )
}

export default Edit