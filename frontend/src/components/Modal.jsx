import React from 'react'
export default function Modal({ open, onClose, children }){
  if (!open) return null
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='absolute inset-0 bg-black/60' onClick={onClose}></div>
      <div className='bg-panel rounded-2xl p-6 z-10 w-full max-w-2xl'>
        {children}
      </div>
    </div>
  )
}