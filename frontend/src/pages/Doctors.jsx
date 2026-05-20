import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
import { DoctorCard } from '../components/TopDoctors'

const specialities = [
  'General physician',
  'Gynecologist',
  'Dermatologist',
  'Pediatricians',
  'Neurologist',
  'Gastroenterologist',
]

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => { applyFilter() }, [doctors, speciality])

  return (
    <div className='pb-16'>
      <div className='pt-8 mb-6'>
        <h1 className='text-2xl font-bold text-gray-800'>Browse Doctors</h1>
        <p className='text-gray-500 text-sm mt-1'>
          {speciality ? `Showing ${speciality} specialists` : 'All available specialists'}
          {filterDoc.length > 0 && <span className='ml-2 text-primary font-medium'>({filterDoc.length} found)</span>}
        </p>
      </div>

      <div className='flex flex-col sm:flex-row gap-6'>

        {/* Sidebar Filter */}
        <div className='sm:w-48 flex-shrink-0'>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`sm:hidden flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-colors mb-3 ${showFilter ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-600'}`}
          >
            <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters {speciality && <span className='w-2 h-2 bg-primary rounded-full' />}
          </button>

          <div className={`flex flex-col gap-1.5 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
            <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1'>Speciality</p>
            {specialities.map((sp) => {
              const isActive = speciality === sp
              return (
                <button
                  key={sp}
                  onClick={() => {
                    isActive ? navigate('/doctors') : navigate(`/doctors/${sp}`)
                    scrollTo(0, 0)
                  }}
                  className={`text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-primary-light hover:text-primary'}`}
                >
                  {sp}
                </button>
              )
            })}

            {speciality && (
              <button
                onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
                className='mt-2 text-xs text-gray-400 hover:text-primary transition-colors px-3 flex items-center gap-1'
              >
                <svg className='w-3 h-3' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear filter
              </button>
            )}
          </div>
        </div>

        {/* Doctor Grid */}
        <div className='flex-1'>
          {filterDoc.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-gray-100'>
              <div className='w-14 h-14 bg-primary-light rounded-2xl flex items-center justify-center mb-4'>
                <svg className='w-7 h-7 text-primary' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p className='text-gray-600 font-semibold'>No doctors found</p>
              <p className='text-gray-400 text-sm mt-1'>Try a different speciality</p>
            </div>
          ) : (
            <div className='grid grid-cols-auto gap-5'>
              {filterDoc.map((item, index) => (
                <DoctorCard
                  key={index}
                  item={item}
                  onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Doctors
