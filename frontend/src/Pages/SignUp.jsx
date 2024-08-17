import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: "",
    collegeName: "",
    city: "",
    state: "",
    country: "",
    subject: "",
    teachingExperience: "",
  });

  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility

  const changeHandler = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const signup = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    // Check form validity
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/user/signup",
          formData
        );

        if (response.status === 201) {
          console.log("Success:", response.data);

          setFormData({
            username: "",
            name: "",
            phoneNumber: "",
            email: "",
            password: "",
            role: "",
            collegeName: "",
            city: "",
            state: "",
            country: "",
            subject: "",
            teachingExperience: "",
          });
          setError("");
          setShowAlert(false);
          window.location.replace("/");
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
    <div className="container">
      <div className="row mt-3">
        <h1 className="col-6 offset-3">Create your Account</h1>

        {showAlert && (
          <div className="alert alert-danger alert-dismissible fade show col-6 offset-3" role="alert">
            {error}
            <button type="button" className="btn-close" onClick={() => setShowAlert(false)} aria-label="Close"></button>
          </div>
        )}
        <div className="col-6 offset-3">
          <form onSubmit={signup} className={`needs-validation ${validated ? 'was-validated' : ''}`} noValidate>

            <div className="mb-3">
              <label htmlFor="username" className="form-label">Student ID</label>
              <input type="text" name="username" id="username" value={formData.username} onChange={changeHandler} placeholder="Username" className="form-control" required />
              <div className="invalid-feedback">Please enter a username.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={changeHandler} placeholder="Name" className="form-control" required />
              <div className="invalid-feedback">Please enter your name.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">Phone No.</label>
              <input type="text" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} onChange={changeHandler} placeholder="Enter your 10-digit mobile number" className="form-control" required pattern="\d{10}" />
              <div className="invalid-feedback">Please enter a valid 10-digit phone number.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">E-mail</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={changeHandler} placeholder="E-mail" className="form-control" required />
              <div className="invalid-feedback">Please enter a valid email address.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" name="password" id="password" value={formData.password} onChange={changeHandler} placeholder="Password" className="form-control" required minLength="8" />
              <div className="invalid-feedback">Please enter a password with at least 8 characters.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="student" className="form-label">Student</label>
              <input type="radio" name="role" id="student" value="student" onChange={changeHandler} checked={formData.role === "student"} required />
              <label htmlFor="teacher" className="form-label ms-2">Teacher</label>
              <input type="radio" name="role" id="teacher" value="teacher" onChange={changeHandler} checked={formData.role === "teacher"} />
              <div className="invalid-feedback">Please select a role.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="college" className="form-label">College</label>
              <input type="text" name="collegeName" id="college" value={formData.collegeName} onChange={changeHandler} placeholder="Name of College" className="form-control" required />
              <div className="invalid-feedback">Please enter your college name.</div>
            </div>

            <div className="row">
              <div className="mb-3 col-6">
                <label htmlFor="city" className="form-label">City</label>
                <input type="text" name="city" id="city" value={formData.city} onChange={changeHandler} placeholder="City" className="form-control" required />
                <div className="invalid-feedback">Please enter your city.</div>
              </div>
              <div className="mb-3 col-6">
                <label htmlFor="state" className="form-label">State</label>
                <input type="text" name="state" id="state" value={formData.state} onChange={changeHandler} placeholder="State" className="form-control" required />
                <div className="invalid-feedback">Please enter your state.</div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="country" className="form-label">Country</label>
              <select name="country" id="country" value={formData.country} onChange={changeHandler} className="form-select" required>
                <option value="">Select Country</option>
                <option value="USA">United States</option>
                <option value="Canada">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="India">India</option>
                <option value="Australia">Australia</option>
              </select>
              <div className="invalid-feedback">Please select your country.</div>
            </div>

            {formData.role === "teacher" && (
              <>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input type="text" name="subject" id="subject" value={formData.subject} onChange={changeHandler} placeholder="Subject" className="form-control" required />
                  <div className="invalid-feedback">Please enter your subject.</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="experience" className="form-label">Teaching Experience</label>
                  <input type="number" name="teachingExperience" id="experience" value={formData.teachingExperience} onChange={changeHandler} placeholder="Experience" className="form-control" required />
                  <div className="invalid-feedback">Please enter your teaching experience.</div>
                </div>
              </>
            )}

            <button type="submit" className="btn btn-success">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
