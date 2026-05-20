import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='relative flex flex-col md:flex-row overflow-hidden bg-gradient-to-br from-primary to-primary-dark rounded-2xl px-8 md:px-12 lg:px-16 min-h-[380px]'>

      {/* Background decoration */}
      <div className='absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none' />
      <div className='absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none' />

      {/* Left Content */}
      <div className='relative z-10 md:w-1/2 flex flex-col items-start justify-center gap-5 py-12 md:py-[8vw] md:mb-[-30px]'>
        <div className='inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full'>
          <span className='w-2 h-2 rounded-full bg-emerald-300 animate-pulse' />
          <span className='text-white/90 text-xs font-medium tracking-wide'>100+ Trusted Doctors</span>
        </div>

        <h1 className='text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight'>
          Book Appointment <br />
          <span className='text-emerald-200'>With Shubhada</span>
        </h1>

        <p className='text-white/75 text-sm leading-relaxed max-w-sm'>
          Your trusted partner for healthcare. Browse verified doctors, book hassle-free appointments, and take control of your health journey.
        </p>

        <div className='flex flex-col sm:flex-row items-center gap-4'>
          <a
            href='#speciality'
            className='flex items-center gap-2 bg-white text-primary px-7 py-3 rounded-xl text-sm font-semibold hover:bg-primary-light transition-colors duration-200 shadow-lg'
          >
            Book Appointment
            <img className='w-3.5' src={assets.arrow_icon} alt="" />
          </a>
          <div className='flex items-center gap-3 text-white/80'>
            <img className='w-24' src={assets.group_profiles} alt="Patient profiles" />
            <span className='text-xs'>Joined by 10,000+ patients</span>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className='md:w-1/2 relative flex items-end justify-center md:justify-end'>
        <img
          className='w-full md:absolute bottom-0 h-auto max-h-[400px] object-contain drop-shadow-2xl'
          src={assets.header_img}
          alt="Doctor"
        />
      </div>
    </div>
  )
}

export default Header
