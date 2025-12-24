import React from 'react'

export default function Input({ label, name, register, error, placeholder = '', ...props }) {
  return (
    <label className="block">
      {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
      <input
        {...(register ? register(name) : {})}
        name={name}
        placeholder={placeholder}
        className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        {...props}
      />
      {error && <p className="text-sm text-red-600 mt-1">{error.message || error}</p>}
    </label>
  )
}
