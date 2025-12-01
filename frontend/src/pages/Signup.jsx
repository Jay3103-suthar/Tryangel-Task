import React, { useState } from 'react'
import API from '../api/api'
import { useNavigate, Link } from 'react-router-dom'

export default function Signup(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()
  const submit = async (e) =>{
    e.preventDefault()
    try{
      const { data } = await API.post('/auth/signup', { name, email, password })
      localStorage.setItem('token', data.token)
      nav('/')
    }catch(err){ alert(err.response?.data?.message || 'Signup failed') }
  }
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='w-full max-w-md card'>
        <h2 className='text-2xl font-bold mb-4'>Create account</h2>
        <form onSubmit={submit} className='flex flex-col gap-3'>
          <input required value={name} onChange={e=>setName(e.target.value)} className='p-3 rounded-md bg-gray-800 border border-gray-700' placeholder='Full name' />
          <input required value={email} onChange={e=>setEmail(e.target.value)} className='p-3 rounded-md bg-gray-800 border border-gray-700' placeholder='Email' />
          <input required value={password} onChange={e=>setPassword(e.target.value)} className='p-3 rounded-md bg-gray-800 border border-gray-700' placeholder='Password' type='password' />
          <div className='flex justify-between items-center'>
            <button className='btn btn-primary' type='submit'>Sign up</button>
            <Link to='/login' className='text-sm text-gray-400'>Already have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  )
}