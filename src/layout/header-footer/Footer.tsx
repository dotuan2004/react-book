import React from "react";

function Footer(){
  return (
    <div className="container">
      <footer className="py-5" style={{ width:"100%" , backgroundColor: "black", color: "#ffffff" }}>
        <div className="row">
          <div className="col-6 col-md-2 mb-3">
            <h5 style={{ color: "#ffffff" }}>Section</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">Home</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">Features</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">Pricing</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">FAQs</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">About</a>
              </li>
            </ul>
          </div>
  
          <div className="col-6 col-md-2 mb-3">
            <h5 style={{ color: "#ffffff" }}>Section</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">Home</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">Features</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">Pricing</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">FAQs</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">About</a>
              </li>
            </ul>
          </div>
  
          <div className="col-6 col-md-2 mb-3">
            <h5 style={{ color: "#ffffff" }}>Section</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">Home</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">Features</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">Pricing</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">FAQs</a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">About</a>
              </li>
            </ul>
          </div>
  
          <div className="col-md-5 offset-md-1 mb-3">
            <form>
              <h5 style={{ color: "#ffffff" }}>Subscribe to our newsletter</h5>
              <p style={{ color: "#ffffff" }}>Monthly digest of what's new and exciting from us.</p>
              <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                <label htmlFor="newsletter1" className="visually-hidden" style={{ color: "#ffffff" }}>Email address</label>
                <input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
                <button className="btn btn-warning" type="button">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
  
        <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top" style={{ borderTop: "2px solid #ffcc00", width: "100%" }}>
          <p style={{ color: "#ffffff" }}>&copy; 2024 Company, Inc. All rights reserved.</p>
          <ul className="list-unstyled d-flex" style={{ display: "flex", gap: "20px" }}>
            <li><a className="link-body-emphasis" href="#"><i className="fab fa-twitter" style={{ color: "#ffffff" }}></i></a></li>
            <li><a className="link-body-emphasis" href="#"><i className="fab fa-instagram" style={{ color: "#ffffff" }}></i></a></li>
            <li><a className="link-body-emphasis" href="#"><i className="fab fa-facebook" style={{ color: "#ffffff" }}></i></a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
  
  
}
export default Footer;