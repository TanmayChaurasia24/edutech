import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'
import Logo from '../../Assets/Logo.jpeg'
// index.js or App.js



const Navbar = () => {
    return (
        
        <div className='navbar'>
            <div className="nav-logo"> 
                <img src={Logo} alt="" />
                <p>Bright Minds</p>
            </div>
            <ul className='nav-options'>
                <Link to='/' className='nav-option'><li>Home</li></Link>
                <Link to='/' className='nav-option'><li>About</li></Link>
                <Link to='/' className='nav-option'><li>Contact</li></Link>
                <Link to='/' className='nav-option'><li>Courses</li></Link>
            </ul>

            <div className='nav-login'>
                <Link to='/login'><button>Login</button></Link>
                <Link to='/signup'><button>Sign Up</button></Link>
            </div>
        </div>
    )
}

export default Navbar
