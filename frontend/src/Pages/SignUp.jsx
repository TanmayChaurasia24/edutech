import React, { useState } from 'react'
import axios from 'axios';
import './SignUp.css'

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
        teachingExperience: ""
    });

    const changeHandler = (e) => {
        // console.log(e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const signup = async (event) => {
        event.preventDefault();
        console.log(formData);

        try {
            const response = await axios.post('http://localhost:8000/signup', formData);

            if (response.status === 200) {
                // If the response is successful
                console.log('Success:', response.data);

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
                    teachingExperience: ""
                });
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    }


    return (
        <div className="signup">
            <div className="signup-container">
                <form action="" onSubmit={signup}>
                    <label htmlFor="username">Username</label>
                    <input id='username' type="text" placeholder='Username' onChange={changeHandler} name='username' value={formData.username} /><br />

                    <label htmlFor="name">Name</label>
                    <input id='name' type="text" placeholder='Name' onChange={changeHandler} name='name' value={formData.name} /><br />

                    <label htmlFor="number">Mob. No.</label>
                    <input id='number' type="number" placeholder='Phone Number' onChange={changeHandler} name='phoneNumber' value={formData.phoneNumber} /><br />

                    <label htmlFor="email">Email</label>
                    <input id='email' type="text" placeholder='Email' onChange={changeHandler} name='email' value={formData.email} /><br />

                    <label htmlFor="password">Password</label>
                    <input id='password' type="password" placeholder='Password' onChange={changeHandler} name='password' value={formData.password} /><br />

                    <label htmlFor="student">Student</label>
                    <input id='student' type="radio" name='role' onChange={changeHandler} value="Student" />
                    <label htmlFor="teacher">Teacher</label>
                    <input id='teacher' type="radio" name='role' onChange={changeHandler} value="Teacher" /><br />

                    <label htmlFor="college">College</label>
                    <input id='college' type="text" placeholder='Name of College' onChange={changeHandler} name='collegeName' value={formData.collegeName} /><br />

                    <label htmlFor="city">City</label>
                    <input id='city' type="text" placeholder='City' onChange={changeHandler} name='city' value={formData.city} /><br />

                    <label htmlFor="state">State</label>
                    <input id='state' type="text" placeholder='State' onChange={changeHandler} name='state' value={formData.state} /><br />

                    <label htmlFor="country">Country</label>
                    <select id="country" name="country" onChange={changeHandler}>
                        <option value="usa">United States</option>
                        <option value="canada">Canada</option>
                        <option value="uk">United Kingdom</option>
                        <option value="india">India</option>
                        <option value="australia">Australia</option>
                    </select><br />

                    <label htmlFor="subject">Subject</label>
                    <input id='subject' type="text" placeholder='Subject' onChange={changeHandler} name='subject' value={formData.subject} /><br />

                    <label htmlFor="experience">Teaching Experience</label>
                    <input id='experience' type="number" placeholder='Teaching Experience' onChange={changeHandler} name='teachingExperience' value={formData.teachingExperience} /><br />
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp
