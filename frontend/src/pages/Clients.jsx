import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import API from '../api/api'
import Modal from '../components/Modal'

export default function Clients() {
  const [clients, setClients] = useState([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '' })

  const fetch = async () => {
    try {
      const { data } = await API.get('/clients')
      setClients(data)
    } catch (err) {
      alert('Fetch failed')
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const add = async (e) => {
    e.preventDefault()
    try {
      await API.post('/clients', form)
      setForm({ name: '', email: '', phone: '' })
      setOpen(false)
      fetch()
    } catch (err) {
      alert(err.response?.data?.message || 'Add failed')
    }
  }

  return (
    <div className='min-h-screen'>
      <Sidebar />
      <Topbar title='Clients' />

      <main className='ml-[var(--sidebar-width)] p-6'>

        {/* Header */}
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold'>Clients</h2>
          <button onClick={() => setOpen(true)} className='btn btn-primary'>
            Add Client
          </button>
        </div>

        {/* Table */}
        <div className='card'>
          <div className='overflow-x-auto'>
            <table className='table text-sm'>
              <thead>
                <tr className='text-left text-gray-400'>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>

              <tbody>
                {clients.map((c) => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <h3 className='text-lg font-semibold mb-3'>Add Client</h3>

        <form onSubmit={add} className='flex flex-col gap-3'>
          <input
            required
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className='p-2 rounded-md bg-gray-800'
            placeholder='Name'
          />

          <input
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className='p-2 rounded-md bg-gray-800'
            placeholder='Email'
          />

          <input
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className='p-2 rounded-md bg-gray-800'
            placeholder='Phone'
          />

          <div className='flex gap-2 justify-end'>
            <button type='button' onClick={() => setOpen(false)} className='btn btn-ghost'>
              Cancel
            </button>

            <button className='btn btn-primary' type='submit'>
              Add
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
