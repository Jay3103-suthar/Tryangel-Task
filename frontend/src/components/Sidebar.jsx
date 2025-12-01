import React from 'react'
import { NavLink } from 'react-router-dom'
export default function Sidebar(){
  const links = [
    {to:'/', label:'Dashboard'},
    {to:'/clients', label:'Clients'},
    {to:'/categories', label:'Categories'},
    {to:'/policies', label:'Policies'}
  ]
  return (
    <aside className='w-[var(--sidebar-width)] h-full fixed left-0 top-0 bottom-0 bg-gradient-to-b from-gray-900 to-black text-gray-100 p-6'>
      <div className='mb-8'>
        <div className='text-2xl font-bold flex items-center gap-2'>
          <div className='w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center'>T</div>
          <span>Tryangle</span>
        </div>
        <p className='text-sm text-gray-400 mt-1'>Admin Panel</p>
      </div>
      <nav className='flex flex-col gap-2'>
        {links.map(l => (
          <NavLink key={l.to} to={l.to} className={({isActive})=> isActive ? 'px-3 py-2 rounded-md bg-gradient-to-r from-purple-700 to-indigo-600 text-white' : 'px-3 py-2 rounded-md hover:bg-gray-800'}>
            {l.label}
          </NavLink>
        ))}
      </nav>
      <div className='mt-auto text-sm text-gray-500'>v1.0 · Dark</div>
    </aside>
  )
}