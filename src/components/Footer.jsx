import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-white flex justify-between items-center px-8 py-2 border-t-2 border-t-gray-200'>

      <p className='text-sm'>Copyright &copy; {new Date().getFullYear()}. All rights reserved <span className='text-[#4169e1] font-medium'>Emerging Five</span></p>

      <p className='text-sm'>Designed & Developed by <span className='text-[#4169e1] font-medium'>Emerging Five</span> | Version: 1.0</p>
    </footer>
  )
}

export default Footer
