import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    // Check form validity
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await axios.post('http://localhost:8000/api/user/login', formData);

        if (response.status === 200) {
          setFormData({
            username: "",
            password: "",
          });
          setError("");  // Clear any previous errors
          setShowAlert(false);
          window.location.replace("/");  // Optionally redirect or handle success
        }
      } catch (error) {
        // Extract the message if error is an object
        const errorMessage = error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message;
        console.log("Error: ",errorMessage);
        setError(errorMessage);
        setShowAlert(true);
      }
    }

    setValidated(true);
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <h1 className="col-6 offset-3">Login to Your Account</h1>
        
        {/* Error Alert */}
        {showAlert && (
          <div className="alert alert-danger alert-dismissible fade show col-6 offset-3" role="alert">
            {error}
            <button type="button" className="btn-close" onClick={() => setShowAlert(false)} aria-label="Close"></button>
          </div>
        )}

        <div className="col-6 offset-3">
          <form onSubmit={login} className={`needs-validation ${validated ? 'was-validated' : ''}`} noValidate>

            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input id="username" type="text" name="username" placeholder='Enter username' onChange={changeHandler} value={formData.username} className="form-control" required />
              <div className="invalid-feedback">Please enter your username.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input id="password" type="password" name="password" placeholder='Password' onChange={changeHandler} value={formData.password} className="form-control" required />
              <div className="invalid-feedback">Please enter your password.</div>
            </div>

            <button type="submit" className="btn btn-success">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
