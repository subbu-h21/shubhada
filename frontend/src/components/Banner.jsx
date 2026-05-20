import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <div className='relative flex overflow-hidden bg-gradient-to-r from-primary-dark via-primary to-teal-400 rounded-2xl px-8 sm:px-12 md:px-16 my-20 md:mx-10'>

      {/* Decorative circles */}
      <div className='absolute -top-10 -right-10 w-64 h-64 bg-white/5 rounded-full pointer-events-none' />
      <div className='absolute -bottom-16 right-32 w-48 h-48 bg-white/5 rounded-full pointer-events-none' />

      {/* Left Content */}
      <div className='relative z-10 flex-1 py-10 sm:py-14 md:py-20 lg:py-24'>
        <p className='text-white/70 text-sm font-medium tracking-widest uppercase mb-3'>Start Your Journey</p>
        <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight'>
          Book Appointment <br />
          With <span className='text-emerald-200'>100+ Trusted Doctors</span>
        </h2>
        <p className='text-white/70 text-sm mt-4 mb-8 max-w-xs'>
          Join thousands of patients who trust Shubhada for their healthcare needs.
        </p>
        <button
          onClick={() => { navigate('/login'); scrollTo(0, 0) }}
          className='inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-xl text-sm font-semibold hover:bg-primary-light transition-colors duration-200 shadow-lg'
        >
          Create Account
          <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      {/* Right Image */}
      <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
        <img
          className='w-full absolute bottom-0 right-0 max-w-md drop-shadow-2xl'
          src={assets.appointment_img}
          alt="Doctor appointment"
        />
      </div>
    </div>
  )
}

export default Banner
