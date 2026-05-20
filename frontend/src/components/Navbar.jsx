import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Logo = ({ onClick }) => (
  <div onClick={onClick} className='flex items-center gap-2.5 cursor-pointer select-none'>
    <div className='w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-md'>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2C7.2 2 5 4.2 5 7c0 1.8.9 3.4 2.3 4.4L6 17h8l-1.3-5.6C14.1 10.4 15 8.8 15 7c0-2.8-2.2-5-5-5z" fill="white" fillOpacity="0.9"/>
        <circle cx="10" cy="7" r="2" fill="white" fillOpacity="0.5"/>
      </svg>
    </div>
    <span className='text-xl font-bold tracking-tight text-gray-800'>
      Shubhada
    </span>
  </div>
)

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  const navLinkClass = ({ isActive }) =>
    `relative py-1 text-sm font-medium transition-colors duration-200 ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}`

  return (
    <nav className='flex items-center justify-between py-4 mb-5 border-b border-gray-100'>
      <Logo onClick={() => navigate('/')} />

      <ul className='md:flex items-center gap-8 hidden'>
        <NavLink to='/' className={navLinkClass}>
          {({ isActive }) => (
            <>
              <span>Home</span>
              {isActive && <span className='absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full' />}
            </>
          )}
        </NavLink>
        <NavLink to='/doctors' className={navLinkClass}>
          {({ isActive }) => (
            <>
              <span>All Doctors</span>
              {isActive && <span className='absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full' />}
            </>
          )}
        </NavLink>
        <NavLink to='/about' className={navLinkClass}>
          {({ isActive }) => (
            <>
              <span>About</span>
              {isActive && <span className='absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full' />}
            </>
          )}
        </NavLink>
        <NavLink to='/contact' className={navLinkClass}>
          {({ isActive }) => (
            <>
              <span>Contact</span>
              {isActive && <span className='absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full' />}
            </>
          )}
        </NavLink>
      </ul>

      <div className='flex items-center gap-4'>
        {token && userData ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-9 h-9 rounded-full object-cover ring-2 ring-primary-light' src={userData.image} alt={userData.name} />
            <svg className='w-3 h-3 text-gray-500 transition-transform group-hover:rotate-180' fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            <div className='absolute top-0 right-0 pt-12 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-white rounded-2xl shadow-card-hover border border-gray-100 p-2'>
                <p onClick={() => navigate('/my-profile')} className='px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-light hover:text-primary rounded-xl cursor-pointer transition-colors font-medium'>My Profile</p>
                <p onClick={() => navigate('/my-appointments')} className='px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-light hover:text-primary rounded-xl cursor-pointer transition-colors font-medium'>My Appointments</p>
                <hr className='my-1 border-gray-100' />
                <p onClick={logout} className='px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-xl cursor-pointer transition-colors font-medium'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-semibold hidden md:block hover:bg-primary-dark transition-colors duration-200 shadow-sm'
          >
            Get Started
          </button>
        )}

        <button onClick={() => setShowMenu(true)} className='md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors' aria-label="Open menu">
          <img className='w-5 h-5' src={assets.menu_icon} alt="" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 z-30 transition-all duration-300 ${showMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className='absolute inset-0 bg-black/30 backdrop-blur-sm' onClick={() => setShowMenu(false)} />
        <div className={`absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl transition-transform duration-300 ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className='flex items-center justify-between px-6 py-5 border-b border-gray-100'>
            <Logo onClick={() => { setShowMenu(false); navigate('/') }} />
            <button onClick={() => setShowMenu(false)} className='p-2 rounded-lg hover:bg-gray-100 transition-colors' aria-label="Close menu">
              <img src={assets.cross_icon} className='w-5 h-5' alt="" />
            </button>
          </div>
          <ul className='flex flex-col p-4 gap-1 mt-2'>
            {[['/', 'Home'], ['/doctors', 'All Doctors'], ['/about', 'About'], ['/contact', 'Contact']].map(([path, label]) => (
              <NavLink key={path} onClick={() => setShowMenu(false)} to={path}>
                {({ isActive }) => (
                  <li className={`px-4 py-3 rounded-xl text-base font-medium cursor-pointer transition-colors ${isActive ? 'bg-primary-light text-primary' : 'text-gray-700 hover:bg-gray-50'}`}>
                    {label}
                  </li>
                )}
              </NavLink>
            ))}
          </ul>
          {!token && (
            <div className='px-4 mt-4'>
              <button onClick={() => { setShowMenu(false); navigate('/login') }} className='w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors'>
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
