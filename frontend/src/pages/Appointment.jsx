import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(false)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [booking, setBooking] = useState(false)

  const navigate = useNavigate()

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSolts = async () => {
    setDocSlots([])
    let today = new Date()
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }
      let timeSlots = []
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()
        const slotDate = day + "_" + month + "_" + year
        const slotTime = formattedTime
        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true
        if (isSlotAvailable) {
          timeSlots.push({ datetime: new Date(currentDate), time: formattedTime })
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warning('Login to book appointment')
      return navigate('/login')
    }
    const date = docSlots[slotIndex][0].datetime
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    const slotDate = day + "_" + month + "_" + year
    setBooking(true)
    try {
      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getDoctosData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setBooking(false)
    }
  }

  useEffect(() => {
    if (doctors.length > 0) fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    if (docInfo) getAvailableSolts()
  }, [docInfo])

  if (!docInfo) return null

  return (
    <div className='pb-16'>

      {/* Doctor Details Card */}
      <div className='flex flex-col sm:flex-row gap-6 mb-8'>
        <div className='sm:w-64 flex-shrink-0'>
          <img
            className='w-full rounded-2xl bg-primary-light object-cover shadow-card'
            src={docInfo.image}
            alt={docInfo.name}
          />
        </div>

        <div className='flex-1 bg-white border border-gray-100 rounded-2xl p-7 shadow-card sm:mt-0 mt-[-40px]'>
          <div className='flex items-center gap-2 mb-1'>
            <h1 className='text-2xl font-bold text-gray-800'>{docInfo.name}</h1>
            <img className='w-5 h-5' src={assets.verified_icon} alt="Verified" />
          </div>

          <div className='flex items-center gap-3 mt-1 text-gray-500 text-sm'>
            <span>{docInfo.degree} — {docInfo.speciality}</span>
            <span className='bg-primary-light text-primary px-2.5 py-0.5 rounded-full text-xs font-medium'>
              {docInfo.experience}
            </span>
          </div>

          <div className='mt-5'>
            <p className='flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-2'>
              <img className='w-3.5' src={assets.info_icon} alt="" />
              About
            </p>
            <p className='text-sm text-gray-500 leading-relaxed max-w-2xl'>{docInfo.about}</p>
          </div>

          <div className='mt-5 flex items-center gap-2'>
            <span className='text-gray-600 text-sm'>Appointment fee:</span>
            <span className='text-primary font-bold text-lg'>{currencySymbol}{docInfo.fees}</span>
          </div>
        </div>
      </div>

      {/* Booking Slots */}
      <div className='bg-white border border-gray-100 rounded-2xl p-7 shadow-card sm:ml-72 sm:pl-8'>
        <h2 className='text-base font-semibold text-gray-800 mb-5'>Select Appointment Slot</h2>

        {/* Day selector */}
        <div className='flex gap-2 overflow-x-auto pb-2'>
          {docSlots.length > 0 && docSlots.map((item, index) => (
            <button
              onClick={() => setSlotIndex(index)}
              key={index}
              className={`flex flex-col items-center py-3 px-4 min-w-[56px] rounded-xl cursor-pointer transition-all duration-200 font-medium text-xs ${slotIndex === index ? 'bg-primary text-white shadow-sm' : 'bg-gray-50 text-gray-600 hover:bg-primary-light hover:text-primary border border-gray-100'}`}
            >
              <span>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</span>
              <span className='text-base font-bold mt-0.5'>{item[0] && item[0].datetime.getDate()}</span>
            </button>
          ))}
        </div>

        {/* Time slots */}
        <div className='flex flex-wrap gap-2 mt-5'>
          {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
            <button
              onClick={() => setSlotTime(item.time)}
              key={index}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${item.time === slotTime ? 'bg-primary text-white shadow-sm' : 'bg-gray-50 text-gray-600 hover:bg-primary-light hover:text-primary border border-gray-100'}`}
            >
              {item.time.toLowerCase()}
            </button>
          ))}
        </div>

        <button
          onClick={bookAppointment}
          disabled={booking || !slotTime}
          className='mt-7 bg-primary text-white px-10 py-3 rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
        >
          {booking && (
            <svg className='animate-spin w-4 h-4' fill="none" viewBox="0 0 24 24">
              <circle className='opacity-25' cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className='opacity-75' fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
          )}
          Confirm Appointment
        </button>
      </div>

      <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
    </div>
  )
}

export default Appointment
