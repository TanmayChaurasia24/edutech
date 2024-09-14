import React from 'react'
import { SigninFormDemo } from './SigninForm'
import { HeaderNav } from '../Home/NavbarDemo'

const Signin = () => {
  return (
    <div className='flex flex-col absolute h-screen w-full items-center justify-center'>
      <SigninFormDemo  />
    </div>
  )
}

export default Signin