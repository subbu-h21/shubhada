import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) navigate('/')
  }, [token])

  return (
    <div className='min-h-[80vh] flex items-center justify-center py-12'>
      <div className='w-full max-w-md'>

        {/* Logo mark */}
        <div className='flex justify-center mb-8'>
          <div className='flex items-center gap-2.5'>
            <div className='w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md'>
              <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C7.2 2 5 4.2 5 7c0 1.8.9 3.4 2.3 4.4L6 17h8l-1.3-5.6C14.1 10.4 15 8.8 15 7c0-2.8-2.2-5-5-5z" fill="white" fillOpacity="0.9"/>
                <circle cx="10" cy="7" r="2" fill="white" fillOpacity="0.5"/>
              </svg>
            </div>
            <span className='text-2xl font-bold text-gray-800'>Shubhada</span>
          </div>
        </div>

        <form onSubmit={onSubmitHandler} className='bg-white rounded-2xl border border-gray-100 shadow-card p-8'>
          <h2 className='text-2xl font-bold text-gray-800 mb-1'>
            {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className='text-gray-500 text-sm mb-7'>
            {state === 'Sign Up' ? 'Sign up to book your first appointment' : 'Login to manage your appointments'}
          </p>

          <div className='flex flex-col gap-4'>
            {state === 'Sign Up' && (
              <div>
                <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1.5'>Full Name</label>
                <input
                  id='name'
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all'
                  type="text"
                  placeholder='John Doe'
                  required
                />
              </div>
            )}

            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1.5'>Email Address</label>
              <input
                id='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all'
                type="email"
                placeholder='you@email.com'
                required
              />
            </div>

            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1.5'>Password</label>
              <div className='relative'>
                <input
                  id='password'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all pr-11'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='••••••••'
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-primary text-white py-3 rounded-xl font-semibold mt-6 hover:bg-primary-dark transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2'
          >
            {loading && (
              <svg className='animate-spin w-4 h-4' fill="none" viewBox="0 0 24 24">
                <circle className='opacity-25' cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className='opacity-75' fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
            )}
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </button>

          <p className='text-center text-sm text-gray-500 mt-5'>
            {state === 'Sign Up' ? (
              <>Already have an account?{' '}
                <span onClick={() => setState('Login')} className='text-primary font-semibold cursor-pointer hover:underline'>Login here</span>
              </>
            ) : (
              <>New to Shubhada?{' '}
                <span onClick={() => setState('Sign Up')} className='text-primary font-semibold cursor-pointer hover:underline'>Create account</span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
