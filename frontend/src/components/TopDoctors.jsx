import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const DoctorCard = ({ item, onClick }) => (
  <div
    onClick={onClick}
    className='bg-white rounded-2xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 border border-gray-100'
  >
    <div className='bg-primary-light'>
      <img className='w-full object-cover' src={item.image} alt={item.name} />
    </div>
    <div className='p-4'>
      <div className={`flex items-center gap-1.5 text-xs font-medium mb-1 ${item.available ? 'text-emerald-600' : 'text-gray-400'}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-emerald-500' : 'bg-gray-400'}`} />
        {item.available ? 'Available' : 'Not Available'}
      </div>
      <p className='text-gray-900 font-semibold text-base leading-tight'>{item.name}</p>
      <p className='text-primary text-sm font-medium mt-0.5'>{item.speciality}</p>
    </div>
  </div>
)

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <section className='py-16 md:mx-10'>
      <div className='text-center mb-10'>
        <p className='text-primary text-sm font-semibold tracking-widest uppercase mb-2'>Our Specialists</p>
        <h2 className='text-3xl font-bold text-gray-800'>Top Doctors to Book</h2>
        <p className='text-gray-500 text-sm mt-3 max-w-md mx-auto leading-relaxed'>
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>

      <div className='w-full grid grid-cols-auto gap-5 pt-2 px-3 sm:px-0'>
        {doctors.slice(0, 10).map((item, index) => (
          <DoctorCard
            key={index}
            item={item}
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
          />
        ))}
      </div>

      <div className='text-center mt-12'>
        <button
          onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
          className='inline-flex items-center gap-2 bg-primary-light text-primary px-8 py-3 rounded-xl font-semibold text-sm hover:bg-primary hover:text-white transition-colors duration-200'
        >
          View All Doctors
          <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </section>
  )
}

export { DoctorCard }
export default TopDoctors
