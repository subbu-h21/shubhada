import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext)
  const navigate = useNavigate()

  const [appointments, setAppointments] = useState([])
  const [payment, setPayment] = useState('')

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      setAppointments(data.appointments.reverse())
    } catch (error) {
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } })
          if (data.success) {
            navigate('/my-appointments')
            getUserAppointments()
          }
        } catch (error) {
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
      if (data.success) {
        initPay(data.order)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const appointmentStripe = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { appointmentId }, { headers: { token } })
      if (data.success) {
        window.location.replace(data.session_url)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) getUserAppointments()
  }, [token])

  return (
    <div className='pb-16'>
      <div className='flex items-center gap-3 pb-4 mt-8 mb-6 border-b border-gray-100'>
        <h1 className='text-xl font-bold text-gray-800'>My Appointments</h1>
        <span className='bg-primary-light text-primary text-xs font-semibold px-2.5 py-1 rounded-full'>
          {appointments.length}
        </span>
      </div>

      {appointments.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20 text-center'>
          <div className='w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mb-4'>
            <svg className='w-8 h-8 text-primary' fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className='text-gray-600 font-semibold mb-1'>No appointments yet</p>
          <p className='text-gray-400 text-sm mb-5'>Book your first appointment with a trusted doctor</p>
          <button onClick={() => navigate('/doctors')} className='bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors'>
            Browse Doctors
          </button>
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          {appointments.map((item, index) => (
            <div key={index} className='bg-white border border-gray-100 rounded-2xl shadow-card p-5'>
              <div className='flex flex-col sm:flex-row gap-5'>

                {/* Doctor image */}
                <div className='flex-shrink-0'>
                  <img
                    className='w-28 h-28 rounded-xl object-cover bg-primary-light'
                    src={item.docData.image}
                    alt={item.docData.name}
                  />
                </div>

                {/* Info */}
                <div className='flex-1 min-w-0'>
                  <p className='font-bold text-gray-800 text-base'>{item.docData.name}</p>
                  <p className='text-primary text-sm font-medium mt-0.5'>{item.docData.speciality}</p>

                  <div className='mt-3 flex flex-col gap-1.5 text-sm text-gray-500'>
                    <div className='flex items-start gap-1.5'>
                      <svg className='w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span>{item.docData.address.line1}, {item.docData.address.line2}</span>
                    </div>
                    <div className='flex items-center gap-1.5'>
                      <svg className='w-4 h-4 text-gray-400 flex-shrink-0' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className='font-medium text-gray-700'>{slotDateFormat(item.slotDate)} · {item.slotTime}</span>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className='flex flex-col gap-2 sm:items-end justify-start sm:min-w-[160px]'>
                  {item.isCompleted && (
                    <span className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-semibold'>
                      <svg className='w-3.5 h-3.5' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      Completed
                    </span>
                  )}

                  {item.cancelled && !item.isCompleted && (
                    <span className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-500 text-xs font-semibold'>
                      <svg className='w-3.5 h-3.5' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                      Cancelled
                    </span>
                  )}

                  {item.payment && !item.isCompleted && !item.cancelled && (
                    <span className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-light text-primary text-xs font-semibold'>
                      <svg className='w-3.5 h-3.5' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Paid
                    </span>
                  )}

                  {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                    <button
                      onClick={() => setPayment(item._id)}
                      className='w-full sm:w-auto px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-colors'
                    >
                      Pay Online
                    </button>
                  )}

                  {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                    <>
                      <button
                        onClick={() => appointmentStripe(item._id)}
                        className='w-full sm:w-auto px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center'
                      >
                        <img className='h-4' src={assets.stripe_logo} alt="Stripe" />
                      </button>
                      <button
                        onClick={() => appointmentRazorpay(item._id)}
                        className='w-full sm:w-auto px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center'
                      >
                        <img className='h-4' src={assets.razorpay_logo} alt="Razorpay" />
                      </button>
                    </>
                  )}

                  {!item.cancelled && !item.isCompleted && (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className='w-full sm:w-auto px-4 py-2 rounded-xl border border-gray-200 text-gray-500 text-xs font-medium hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all'
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyAppointments
