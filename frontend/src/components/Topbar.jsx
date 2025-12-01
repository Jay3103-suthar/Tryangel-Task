import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function Topbar({ title = '' }){
  const nav = useNavigate()
  const logout = ()=>{ localStorage.removeItem('token'); nav('/login') }
  return (
    <header className='h-16 flex items-center justify-between px-6 bg-transparent border-b border-gray-800 ml-[var(--sidebar-width)]'>
      <h3 className='text-xl font-semibold'>{title}</h3>
      <div className='flex items-center gap-3'>
        <button onClick={logout} className='btn btn-ghost'>Logout</button>
      </div>
    </header>
  )
}