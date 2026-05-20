import React from 'react'
import { assets } from '../assets/assets'

const ContactInfoRow = ({ icon, label, value }) => (
  <div className='flex items-start gap-3'>
    <div className='w-9 h-9 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5'>
      {icon}
    </div>
    <div>
      <p className='text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5'>{label}</p>
      <p className='text-gray-700 text-sm font-medium leading-relaxed'>{value}</p>
    </div>
  </div>
)

const Contact = () => {
  return (
    <div className='pb-20'>

      <div className='text-center pt-10 mb-12'>
        <p className='text-primary text-sm font-semibold tracking-widest uppercase mb-2'>Reach Us</p>
        <h1 className='text-3xl font-bold text-gray-800'>Contact <span className='text-primary'>Us</span></h1>
      </div>

      <div className='flex flex-col md:flex-row gap-12 items-start'>
        <img
          className='w-full md:max-w-[380px] rounded-2xl object-cover shadow-card'
          src={assets.contact_image}
          alt="Contact Shubhada"
        />

        <div className='flex flex-col gap-8 flex-1'>

          <div className='bg-white rounded-2xl border border-gray-100 p-6 shadow-card'>
            <p className='font-bold text-gray-800 text-base mb-5'>Our Office</p>
            <div className='flex flex-col gap-5'>
              <ContactInfoRow
                icon={<svg className='w-4 h-4 text-primary' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                label="Address"
                value={"54709 Willms Station\nSuite 350, Washington, USA"}
              />
              <ContactInfoRow
                icon={<svg className='w-4 h-4 text-primary' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
                label="Phone"
                value="(415) 555-0132"
              />
              <ContactInfoRow
                icon={<svg className='w-4 h-4 text-primary' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                label="Email"
                value="support@shubhada.com"
              />
            </div>
          </div>

          <div className='bg-primary-light rounded-2xl p-6'>
            <p className='font-bold text-gray-800 text-base mb-2'>Careers at Shubhada</p>
            <p className='text-gray-500 text-sm mb-5 leading-relaxed'>
              Join our mission to make healthcare accessible to everyone. Explore open roles across engineering, operations, and clinical partnerships.
            </p>
            <button className='bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors duration-200 shadow-sm'>
              Explore Jobs
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Contact
