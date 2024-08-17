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
        console.log("Error: ", errorMessage);
        setError(errorMessage);
        setShowAlert(true);
      }
    }

    setValidated(true);
  };

  return (
    <div className="login">
    <div className="login-container">
      <h1>Login to Your Account</h1>   {/*col-6 offset-3*/}

      {/* Error Alert */}
      {showAlert && (
        <div className="alert alert-danger alert-dismissible fade show col-6 offset-3" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setShowAlert(false)} aria-label="Close"></button>
        </div>
      )}

      <form onSubmit={login} className={`form needs-validation ${validated ? 'was-validated' : ''}`} noValidate>
        <div className="login-row">
          <div className="login-col">
            <label htmlFor="username" className="form-label">Username</label>
            <input id="username" type="text" name="username" placeholder='Enter username' onChange={changeHandler} value={formData.username} className="form-control" required />
            <div className="invalid-feedback">Please enter your username.</div>
          </div>
        </div>

        <div className="login-row">
          <div className="login-col">
            <label htmlFor="password" className="form-label">Password</label>
            <input id="password" type="password" name="password" placeholder='Password' onChange={changeHandler} value={formData.password} className="form-control" required />
            <div className="invalid-feedback">Please enter your password.</div>
          </div>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, quisquam. Sed officiis nihil neque? Dolores fugit quas eligendi consectetur quidem unde necessitatibus! Soluta officiis est doloribus molestiae modi, magnam molestias!</p>
        <button type="submit" className="btn btn-success login-button">Login</button>
      </form>
    </div>
    </div>
  );
};

export default Login;
