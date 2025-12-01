import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import API from '../api/api'
import Modal from '../components/Modal'

export default function Policies(){
  const [policies, setPolicies] = useState([])
  const [clients, setClients] = useState([])
  const [categories, setCategories] = useState([])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ clientId:'', categoryId:'', policyName:'', issueDate:'', expiryDate:'', amount:'' })
  const [file, setFile] = useState(null)

  const fetch = async ()=>{
    try{
      const [{data:pol}, {data:cl}, {data:cat}] = await Promise.all([API.get('/policies'), API.get('/clients'), API.get('/categories')])
      setPolicies(pol); setClients(cl); setCategories(cat)
    }catch(err){ alert('Fetch failed') }
  }
  useEffect(()=>{ fetch() },[])

  const openAdd = ()=>{ setEditing(null); setForm({ clientId:'', categoryId:'', policyName:'', issueDate:'', expiryDate:'', amount:'' }); setFile(null); setOpen(true) }

  const submit = async (e)=>{
    e.preventDefault()
    try{
      const fd = new FormData()
      Object.keys(form).forEach(k=>fd.append(k, form[k]))
      if (file) fd.append('attachment', file)
      if (editing) await API.put(`/policies/${editing}`, fd, { headers:{ 'Content-Type':'multipart/form-data' } })
      else await API.post('/policies', fd, { headers:{ 'Content-Type':'multipart/form-data' } })
      setOpen(false); fetch()
    }catch(err){ alert(err.response?.data?.message || 'Save failed') }
  }

  const remove = async (id)=>{ if (!confirm('Delete?')) return; await API.delete(`/policies/${id}`); fetch() }

  const startEdit = (p)=>{
    setEditing(p._id)
    setForm({ clientId:p.clientId?._id||'', categoryId:p.categoryId?._id||'', policyName:p.policyName, issueDate:new Date(p.issueDate).toISOString().slice(0,10), expiryDate:new Date(p.expiryDate).toISOString().slice(0,10), amount:p.amount })
    setOpen(true)
  }

  return (
    <div className='min-h-screen'>
      <Sidebar />
      <Topbar title='Policies' />
      <main className='ml-[var(--sidebar-width)] p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold'>Policies</h2>
          <button onClick={openAdd} className='btn btn-primary'>Add Policy</button>
        </div>
        <div className='card'>
          <div className='overflow-x-auto'>
            <table className='table text-sm'>
              <thead><tr className='text-left text-gray-400'><th>Policy</th><th>Client</th><th>Category</th><th>Expiry</th><th>Amount</th><th>Attachment</th><th>Action</th></tr></thead>
              <tbody>
                {policies.map(p=>(
                  <tr key={p._id}><td>{p.policyName}</td><td>{p.clientId?.name}</td><td>{p.categoryId?.name}</td><td>{new Date(p.expiryDate).toLocaleDateString()}</td><td>{p.amount}</td>
                    <td>{p.attachmentUrl ? <a className='text-sm text-primary' href={`http://localhost:5000${p.attachmentUrl}`} target='_blank' rel='noreferrer'>View</a> : '—'}</td>
                    <td><button className='btn btn-ghost mr-2' onClick={()=>startEdit(p)}>Edit</button><button className='btn btn-ghost' onClick={()=>remove(p._id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Modal open={open} onClose={()=>setOpen(false)}>
        <h3 className='text-lg font-semibold mb-3'>{editing ? 'Edit Policy' : 'Add Policy'}</h3>
        <form onSubmit={submit} className='flex flex-col gap-3'>
          <select required value={form.clientId} onChange={e=>setForm({...form, clientId:e.target.value})} className='p-2 rounded-md bg-gray-800'>
            <option value=''>Select client</option>
            {clients.map(c=><option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          <select required value={form.categoryId} onChange={e=>setForm({...form, categoryId:e.target.value})} className='p-2 rounded-md bg-gray-800'>
            <option value=''>Select category</option>
            {categories.map(c=><option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          <input required value={form.policyName} onChange={e=>setForm({...form, policyName:e.target.value})} className='p-2 rounded-md bg-gray-800' placeholder='Policy name' />
          <div className='flex gap-2'>
            <input required type='date' value={form.issueDate} onChange={e=>setForm({...form, issueDate:e.target.value})} className='p-2 rounded-md bg-gray-800' />
            <input required type='date' value={form.expiryDate} onChange={e=>setForm({...form, expiryDate:e.target.value})} className='p-2 rounded-md bg-gray-800' />
          </div>
          <input required value={form.amount} onChange={e=>setForm({...form, amount:e.target.value})} className='p-2 rounded-md bg-gray-800' placeholder='Amount' />
          <input type='file' onChange={e=>setFile(e.target.files[0])} className='p-2 rounded-md bg-gray-800' />
          <div className='flex gap-2 justify-end'>
            <button type='button' onClick={()=>{ setOpen(false); setEditing(null) }} className='btn btn-ghost'>Cancel</button>
            <button className='btn btn-primary' type='submit'>{editing ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}