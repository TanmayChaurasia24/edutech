import React, { useState } from 'react'
import axios from 'axios';
import './Login.css'
const Login = () => {

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const changeHandler = (e) => {
        // console.log(e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const login = async(event) => {
        event.preventDefault();
        console.log(formData);

        try {
            const response = await axios.post('http://localhost:8000/login', formData);

            if (response.status === 200) {
                // If the response is successful
                console.log('Success:', response.data);

                setFormData({
                    username: "",
                    password: "",
                });
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    }

    return (
        <div className="login">
            <div className="login-container">
                <form action="" onSubmit={login}>
                    <label htmlFor="username">Username</label>
                    <input id='username' type="text" placeholder='Username' onChange={changeHandler} name='username' value={formData.username} /><br />

                    <label htmlFor="password">Password</label>
                    <input id='password' type="password" placeholder='Password' onChange={changeHandler} name='password' value={formData.password} /><br />

                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login






/*
import React, {useState} from "react";
import './CSS/LoginSignup.css'
// import { response } from "express";

const LoginSignup = () =>{

    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    })

    const changeHandler = (e)=>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const login = async()=>{
        console.log("Login Function executed",formData);
        let responseData;
        await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then((response)=>response.json()).then((data)=>responseData=data)

        if(responseData.success){
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.errors);
        }
    }
    
    const signup = async()=>{
        console.log("Sign Up Function executed",formData);
        let responseData;
        await fetch('http://localhost:4000/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then((response)=>response.json()).then((data)=>responseData=data)

        if(responseData.success){
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.errors);
        }
    }

    return(
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state==="Sign Up"?<input name="username" value={formData.username} onChange={changeHandler} type="text"  placeholder="Your Name"/>:<></>}
                    <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" />
                    <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password"/>
                </div>
                <button onClick={()=>{state==='Login'?login():signup()}}>Continue</button>
                {state==="Sign Up"?
                <p className="loginsingup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span></p>
                :<p className="loginsingup-login">Create an account? <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}

                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id=''/>
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup
*/