import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, NavLink } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_URL;

const Show = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState([]);

  useEffect(() => {
    const fetchListings = async() => {
      const res = await fetch(`${API_BASE_URL}/listings/${id}`)
      const data = await res.json()
      setListing(data)
    }
    fetchListings()
  }, [id])

  const handleDelete = async() => {
    fetch(`${API_BASE_URL}/listings/${id}`, {
      method: "DELETE"
    })
    navigate("/listings")
  }

  const btn = "btn";

  return (
    <div className='container py-4'>
      <div className='row justify-content-center'>
        <div className='col-md-8 col-lg-6'>
          <h3 class="mb-4 text-center" style={{ color: "white" }}>Listing Details</h3>
      <div className='shadow-lg rounded-4 overflow-hidden glass-card'>
        <img src={`${API_BASE_URL}/images/uploads/${listing.image}`} className='card-img-top object-fit-cover' />
        <div class="card-body">
        <li>{listing.title}</li>
        <li>{listing.description}</li>
        <li>{listing.price}</li>
        <li>{listing.location}</li>
        <li>{listing.country}</li>
      </div>
      </div>
      <br />
      <div className='d-flex justify-content-between'>
      <NavLink to={`/listings/${listing._id}/edit`} className={btn} >Edit</NavLink>
      <NavLink to={`/listings/${listing._id}/image`} className={btn}>Upload Image</NavLink>
      </div>
      <br />
      <button onClick={handleDelete} className='btn w-100'>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default Show