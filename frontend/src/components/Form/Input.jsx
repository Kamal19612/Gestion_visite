import React from 'react'

export default function Input({ label, name, register, error, placeholder = '', className = '', ...props }) {
  return (
    <label className="block">
      {label && <span className="text-sm font-medium text-gray-700 mb-1 block">{label}</span>}
      <input
        {...(register ? register(name) : {})}
        name={name}
        placeholder={placeholder}
        className={`mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${error ? 'border-red-300 focus:ring-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-600 mt-1">{error.message || error}</p>}
    </label>
  )
}
