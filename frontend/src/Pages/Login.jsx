import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/user/login', formData, 
      );

      if (response.status === 200) {
        setFormData({
          username: "",
          password: "",
        });

        // Optionally redirect or handle success
        // window.location.replace("/");
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <form onSubmit={login}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            onChange={changeHandler}
            name="username"
            value={formData.username}
          /><br />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={changeHandler}
            name="password"
            value={formData.password}
          /><br />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
