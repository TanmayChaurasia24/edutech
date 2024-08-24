import { Sign } from 'crypto'
import React from 'react'
import { SignupFormDemo } from './SignupForm'
import { HeaderNav, NavbarDemo } from '../Home/NavbarDemo'

const Signup = () => {
  return (
    <div>
      <HeaderNav/>
        <SignupFormDemo />
    </div>
  )
}

export default Signup