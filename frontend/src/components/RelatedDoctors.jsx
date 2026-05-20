import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { DoctorCard } from './TopDoctors'

const RelatedDoctors = ({ speciality, docId }) => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  const [relDoc, setRelDoc] = useState([])

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
      setRelDoc(doctorsData)
    }
  }, [doctors, speciality, docId])

  if (relDoc.length === 0) return null

  return (
    <section className='py-16'>
      <div className='text-center mb-10'>
        <h2 className='text-2xl font-bold text-gray-800'>Related Doctors</h2>
        <p className='text-gray-500 text-sm mt-2'>More specialists in the same field.</p>
      </div>
      <div className='w-full grid grid-cols-auto gap-5 pt-2 px-3 sm:px-0'>
        {relDoc.map((item, index) => (
          <DoctorCard
            key={index}
            item={item}
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
          />
        ))}
      </div>
    </section>
  )
}

export default RelatedDoctors
