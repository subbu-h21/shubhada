import React from 'react'
import { assets } from '../assets/assets'

const ValueCard = ({ icon, title, description }) => (
  <div className='flex-1 border border-gray-100 rounded-2xl px-8 py-10 flex flex-col gap-4 hover:border-primary hover:shadow-card-hover transition-all duration-300 cursor-default group'>
    <div className='w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors duration-300'>
      <span className='text-primary text-xl group-hover:text-white transition-colors duration-300'>{icon}</span>
    </div>
    <b className='text-gray-800 font-semibold'>{title}</b>
    <p className='text-gray-500 text-sm leading-relaxed'>{description}</p>
  </div>
)

const About = () => {
  return (
    <div className='pb-16'>

      <div className='text-center pt-10 mb-12'>
        <p className='text-primary text-sm font-semibold tracking-widest uppercase mb-2'>Who We Are</p>
        <h1 className='text-3xl font-bold text-gray-800'>About <span className='text-primary'>Shubhada</span></h1>
      </div>

      <div className='flex flex-col md:flex-row gap-12 mb-16'>
        <img
          className='w-full md:max-w-[380px] rounded-2xl object-cover shadow-card'
          src={assets.about_image}
          alt="About Shubhada"
        />
        <div className='flex flex-col justify-center gap-6 md:w-1/2 text-gray-600'>
          <p className='leading-relaxed'>
            Welcome to <strong className='text-gray-800'>Shubhada</strong> — your trusted partner in managing your healthcare needs conveniently and efficiently. We understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>
          <p className='leading-relaxed'>
            Shubhada is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Shubhada is here to support you every step of the way.
          </p>
          <div className='bg-primary-light rounded-2xl p-6'>
            <p className='font-semibold text-primary mb-2'>Our Vision</p>
            <p className='text-gray-600 text-sm leading-relaxed'>
              Our vision at Shubhada is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
            </p>
          </div>
        </div>
      </div>

      <div className='mb-10'>
        <p className='text-primary text-sm font-semibold tracking-widest uppercase mb-2'>Our Promise</p>
        <h2 className='text-2xl font-bold text-gray-800'>Why Choose <span className='text-primary'>Us</span></h2>
      </div>

      <div className='flex flex-col md:flex-row gap-5'>
        <ValueCard
          icon='⚡'
          title='Efficiency'
          description='Streamlined appointment scheduling that fits into your busy lifestyle. Book in minutes, not hours.'
        />
        <ValueCard
          icon='🏥'
          title='Convenience'
          description='Access a network of trusted healthcare professionals in your area, available at your fingertips.'
        />
        <ValueCard
          icon='✨'
          title='Personalization'
          description='Tailored recommendations and reminders to help you stay on top of your health journey.'
        />
      </div>
    </div>
  )
}

export default About
