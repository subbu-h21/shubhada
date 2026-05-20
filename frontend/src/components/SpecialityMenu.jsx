import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <section id='speciality' className='py-16 text-gray-800'>
      <div className='text-center mb-10'>
        <p className='text-primary text-sm font-semibold tracking-widest uppercase mb-2'>Our Services</p>
        <h2 className='text-3xl font-bold text-gray-800'>Find by Speciality</h2>
        <p className='text-gray-500 text-sm mt-3 max-w-md mx-auto leading-relaxed'>
          Browse our extensive list of trusted specialists and book your appointment hassle-free.
        </p>
      </div>

      <div className='flex sm:justify-center gap-4 pt-2 w-full overflow-x-auto pb-4'>
        {specialityData.map((item, index) => (
          <Link
            to={`/doctors/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            key={index}
            className='flex flex-col items-center gap-3 cursor-pointer flex-shrink-0 group'
          >
            <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-primary-light flex items-center justify-center group-hover:bg-primary transition-colors duration-300 shadow-sm group-hover:shadow-card-hover'>
              <img
                className='w-12 sm:w-14 group-hover:scale-110 transition-transform duration-300'
                src={item.image}
                alt={item.speciality}
              />
            </div>
            <p className='text-xs font-medium text-gray-600 group-hover:text-primary transition-colors duration-200 text-center max-w-[80px]'>
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default SpecialityMenu
