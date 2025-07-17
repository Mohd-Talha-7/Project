import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_URL;

const Index = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const res = await fetch(`${API_BASE_URL}/listings`)
      const data = await res.json()
      setListings(data)
    }
    fetchListings()
  }, [])

  return (
    <div className="container py-4">
      <h1 style={{ color: "white" }}>All Listings</h1>
      <div className="row">
        {listings.map((listing, idx) => (
          <div className="col-md-4 mb-4" key={idx}>
              <NavLink to={`/listings/${listing._id}`} className="text-decoration-none">
              <div className='glass-card h-100 overflow-hidden'>
                <img
                  src={`${API_BASE_URL}/images/uploads/${listing.image}`}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: "cover" }}
                />
                <div className="card-body p-0">
                  <div className="blurred-title p-3">
                  <h5 className="text-white m-0">{listing.title}</h5>
                  </div>
                </div>
                </div>
              </NavLink>
            </div>
        ))}
      </div>
    </div>
  );
}

export default Index