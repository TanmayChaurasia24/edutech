import { SparklesTextDemo } from '@/components/Magictext'
import { MarqueeDemo } from '@/components/Testimonials'
import React from 'react'

type Props = {}

const Testimonials = (props: Props) => {
  return (
    <div className=' flex flex-col justify-center items-center gap-8'>
        <SparklesTextDemo data="Testimonials"/>
        <MarqueeDemo/> 
    </div>
  )
}

export default Testimonials