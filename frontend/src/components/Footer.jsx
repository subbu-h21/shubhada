import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()

  return (
    <footer className='md:mx-10 mt-20'>
      <div className='grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-10 pb-10 border-t border-gray-100 pt-12'>

        {/* Brand column */}
        <div>
          <div className='flex items-center gap-2.5 mb-5 cursor-pointer' onClick={() => navigate('/')}>
            <div className='w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-md'>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C7.2 2 5 4.2 5 7c0 1.8.9 3.4 2.3 4.4L6 17h8l-1.3-5.6C14.1 10.4 15 8.8 15 7c0-2.8-2.2-5-5-5z" fill="white" fillOpacity="0.9"/>
                <circle cx="10" cy="7" r="2" fill="white" fillOpacity="0.5"/>
              </svg>
            </div>
            <span className='text-xl font-bold text-gray-800'>Shubhada</span>
          </div>
          <p className='text-gray-500 text-sm leading-7 max-w-sm'>
            Shubhada is your trusted healthcare partner — connecting patients with verified doctors for seamless appointment booking and personalized care.
          </p>
          <div className='flex gap-3 mt-5'>
            {['facebook', 'twitter', 'instagram'].map((s) => (
              <div key={s} className='w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary-light hover:text-primary cursor-pointer transition-colors'>
                <svg className='w-4 h-4 text-gray-500' fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" fillOpacity="0.15" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Company links */}
        <div>
          <p className='text-gray-800 font-semibold mb-5 uppercase tracking-wider text-xs'>Company</p>
          <ul className='flex flex-col gap-3'>
            {[['Home', '/'], ['About Us', '/about'], ['All Doctors', '/doctors'], ['Privacy Policy', '/']].map(([label, path]) => (
              <li
                key={label}
                onClick={() => { navigate(path); scrollTo(0, 0) }}
                className='text-gray-500 text-sm cursor-pointer hover:text-primary transition-colors font-medium'
              >
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className='text-gray-800 font-semibold mb-5 uppercase tracking-wider text-xs'>Get in Touch</p>
          <ul className='flex flex-col gap-3'>
            <li className='flex items-center gap-2 text-gray-500 text-sm'>
              <svg className='w-4 h-4 text-primary flex-shrink-0' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +1-212-456-7890
            </li>
            <li className='flex items-center gap-2 text-gray-500 text-sm'>
              <svg className='w-4 h-4 text-primary flex-shrink-0' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              support@shubhada.com
            </li>
          </ul>
        </div>
      </div>

      <div className='border-t border-gray-100 py-5 flex flex-col sm:flex-row items-center justify-between gap-2'>
        <p className='text-sm text-gray-400'>© 2024 Shubhada. All rights reserved.</p>
        <p className='text-sm text-gray-400'>Made with care for your health</p>
      </div>
    </footer>
  )
}

export default Footer
