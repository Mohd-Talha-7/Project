import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
const API_BASE_URL = import.meta.env.VITE_API_URL;

const Show = () => {
  const { isLoggedIn } = useAuth();
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
      if (!isLoggedIn) {
        alert("You must be logged in to access this page.");
        navigate("/listings/login");
      }
    }, [isLoggedIn]);

  const [listing, setListing] = useState([]);

  useEffect(() => {
    const fetchListings = async() => {
      const res = await fetch(`${API_BASE_URL}/listings/${id}`, {
      credentials: "include",
    })
      const data = await res.json()
      if (res.ok) {
      setListing(data.listing);
      setCurrentUserId(data.sessionUserId);
    } else {
      alert(data.message || "Something went wrong");
      navigate("/listings");
    }
  };
    fetchListings()
  }, [id])

  const [currentUserId, setCurrentUserId] = useState(null);

  const handleDelete = async() => {
    try {
    const res = await fetch(`${API_BASE_URL}/listings/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    if (res.ok) {
      navigate("/listings");
    } else {
      alert(data.message || "Failed to delete");
    }
  } catch (error) {
    console.error(error);
    alert("Error deleting listing");
  }
  }

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
        {currentUserId === listing.author?._id && (
  <>
  <div className='d-flex justify-content-between gap-2 mb-3'>
    <NavLink to={`/listings/${listing._id}/edit`} className="btn btn-sm btn-primary">Edit</NavLink>
    <NavLink to={`/listings/${listing._id}/image`} className="btn btn-sm btn-secondary">Upload Image</NavLink>
  </div>
    <br />
    <button onClick={handleDelete} className='btn btn-danger w-100'>Delete</button>
  </>
)}
        </div>
      </div>
    </div>
  )
}

export default Show