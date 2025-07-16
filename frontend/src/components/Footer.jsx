import React from 'react';

const Footer = () => {
  return (
    <footer className="pt-4 pb-2 foot mt-auto">
      <div className="container text-center text-md-start">
        <div className="row">

          {/* About */}
          <div className="col-md-4 mb-3 text-white">
            <h5 className="text-uppercase">About Us</h5>
            <p>
              We are a team of passionate developers helping the web grow with scalable and smart solutions.
            </p>
          </div>

          {/* Links */}
          <div className="col-md-4 mb-3 text-white">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-decoration-none foot-link">Home</a></li>
              <li><a href="#" className="text-decoration-none foot-link">Projects</a></li>
              <li><a href="#" className="text-decoration-none foot-link">Contact</a></li>
              <li><a href="#" className="text-decoration-none foot-link">Resume</a></li>
            </ul>
          </div>

          {/* Social */}
          <div className="col-md-4 mb-3 text-white">
            <h5 className="text-uppercase">Follow Us</h5>
            <a href="#" className="me-3 foot-link"><i className="fab fa-github fa-lg"></i></a>
            <a href="#" className="me-3 foot-link"><i className="fab fa-linkedin fa-lg"></i></a>
            <a href="#" className="foot-link"><i className="fab fa-twitter fa-lg"></i></a>
          </div>

        </div>
      </div>

      <div className="text-center mt-3 text-white pt-3">
        <p className="mb-0">&copy; 2025 Mohd Talha. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;