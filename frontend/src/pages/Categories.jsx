import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import API from '../api/api'
import Modal from '../components/Modal'

export default function Categories(){
  const [categories, setCategories] = useState([])
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')

  const fetch = async ()=>{
    try{ const { data } = await API.get('/categories'); setCategories(data) } catch(err){ alert('Fetch failed') }
  }
  useEffect(()=>{ fetch() },[])

  const add = async (e)=>{
    e.preventDefault(); try{ await API.post('/categories',{ name }); setName(''); setOpen(false); fetch() } catch(err){ alert('Add failed') }
  }

  return (
    <div className='min-h-screen'>
      <Sidebar />
      <Topbar title='Categories' />
      <main className='ml-[var(--sidebar-width)] p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold'>Categories</h2>
          <button onClick={()=>setOpen(true)} className='btn btn-primary'>Add Category</button>
        </div>
        <div className='card'>
          <ul className='space-y-2'>{categories.map(c=>(<li key={c._id} className='p-2 bg-gray-800 rounded-md'>{c.name}</li>))}</ul>
        </div>
      </main>

      <Modal open={open} onClose={()=>setOpen(false)}>
        <h3 className='text-lg font-semibold mb-3'>Add Category</h3>
        <form onSubmit={add} className='flex flex-col gap-3'>
          <input required value={name} onChange={e=>setName(e.target.value)} className='p-2 rounded-md bg-gray-800' placeholder='Category name' />
          <div className='flex gap-2 justify-end'>
            <button type='button' onClick={()=>setOpen(false)} className='btn btn-ghost'>Cancel</button>
            <button className='btn btn-primary' type='submit'>Add</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}