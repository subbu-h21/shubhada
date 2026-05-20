import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const FieldRow = ({ label, children }) => (
  <div className='grid grid-cols-[140px_1fr] gap-2 items-start py-2.5 border-b border-gray-50 last:border-0'>
    <span className='text-sm font-medium text-gray-500'>{label}</span>
    <span className='text-sm'>{children}</span>
  </div>
)

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)
  const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      image && formData.append('image', image)

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  if (!userData) return null

  return (
    <div className='pb-16'>
      <h1 className='text-xl font-bold text-gray-800 mt-8 mb-6'>My Profile</h1>

      <div className='max-w-xl bg-white border border-gray-100 rounded-2xl shadow-card p-7'>

        {/* Avatar section */}
        <div className='flex items-center gap-5 mb-7 pb-6 border-b border-gray-100'>
          {isEdit ? (
            <label htmlFor='image' className='cursor-pointer relative group'>
              <img
                className='w-20 h-20 rounded-2xl object-cover ring-2 ring-primary-light'
                src={image ? URL.createObjectURL(image) : userData.image}
                alt={userData.name}
              />
              <div className='absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                <svg className='w-6 h-6 text-white' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" accept="image/*" hidden />
            </label>
          ) : (
            <img
              className='w-20 h-20 rounded-2xl object-cover ring-2 ring-primary-light'
              src={userData.image}
              alt={userData.name}
            />
          )}

          <div>
            {isEdit ? (
              <input
                className='text-xl font-bold text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'
                type="text"
                onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                value={userData.name}
              />
            ) : (
              <p className='text-xl font-bold text-gray-800'>{userData.name}</p>
            )}
            <p className='text-sm text-gray-400 mt-0.5'>{userData.email}</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className='mb-6'>
          <p className='text-xs font-semibold text-primary uppercase tracking-widest mb-3'>Contact Information</p>
          <div className='rounded-xl bg-gray-50 px-4 py-1'>
            <FieldRow label="Email">
              <span className='text-primary'>{userData.email}</span>
            </FieldRow>
            <FieldRow label="Phone">
              {isEdit ? (
                <input
                  className='bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'
                  type="text"
                  onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                  value={userData.phone}
                />
              ) : (
                <span className='text-gray-700'>{userData.phone || 'Not set'}</span>
              )}
            </FieldRow>
            <FieldRow label="Address">
              {isEdit ? (
                <div className='flex flex-col gap-1.5'>
                  <input
                    className='bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'
                    type="text"
                    placeholder="Line 1"
                    onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                    value={userData.address.line1}
                  />
                  <input
                    className='bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'
                    type="text"
                    placeholder="Line 2"
                    onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                    value={userData.address.line2}
                  />
                </div>
              ) : (
                <span className='text-gray-700'>{userData.address.line1 ? `${userData.address.line1}, ${userData.address.line2}` : 'Not set'}</span>
              )}
            </FieldRow>
          </div>
        </div>

        {/* Basic Information */}
        <div className='mb-7'>
          <p className='text-xs font-semibold text-primary uppercase tracking-widest mb-3'>Basic Information</p>
          <div className='rounded-xl bg-gray-50 px-4 py-1'>
            <FieldRow label="Gender">
              {isEdit ? (
                <select
                  className='bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'
                  onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                  value={userData.gender}
                >
                  <option value="Not Selected">Not Selected</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <span className='text-gray-700'>{userData.gender}</span>
              )}
            </FieldRow>
            <FieldRow label="Date of Birth">
              {isEdit ? (
                <input
                  className='bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'
                  type='date'
                  onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                  value={userData.dob}
                />
              ) : (
                <span className='text-gray-700'>{userData.dob || 'Not set'}</span>
              )}
            </FieldRow>
          </div>
        </div>

        {/* Actions */}
        <div className='flex gap-3'>
          {isEdit ? (
            <>
              <button
                onClick={updateUserProfileData}
                className='bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors'
              >
                Save Changes
              </button>
              <button
                onClick={() => { setIsEdit(false); setImage(false) }}
                className='border border-gray-200 text-gray-600 px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors'
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className='flex items-center gap-2 border border-primary text-primary px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary hover:text-white transition-colors'
            >
              <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyProfile
