import React from 'react'

const Footer = () => {
  return (
    <div className='bg-indigo-800 w-full h-20 flex flex-col justify-center items-center'>
      <div className='text-white font-bold'>
        <span className='text-white text-xl'>&lt;</span>
        <span className='text-white text-xl'>Pass</span>
        <span className='text-white text-xl'>IQ/&gt;</span>
      </div>

      <div className='font-medium items-center justify-center'>
        <p className='text-indigo-100 text-sm'>2025 PassIQ. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer;
