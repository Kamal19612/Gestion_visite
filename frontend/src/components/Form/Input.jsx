import React from 'react'

// Improved Input component that supports two register patterns:
// 1) parent passes the register function from react-hook-form: register
// 2) parent passes the result of register(name, options): registerProps (object)
export default function Input({ label, name, register, options, error, placeholder = '', ...props }) {
  // Determine props to spread onto input
  let regProps = {}

  try {
    if (typeof register === 'function') {
      // Call register with the field name and optional options (safe)
      const r = register(name, options)
      if (r && typeof r === 'object') regProps = r
    } else if (register && typeof register === 'object') {
      // Parent already passed the register props object
      regProps = register
    }
  } catch (e) {
    // Swallow any register call errors to avoid crashing the whole UI
    console.warn('Input register call failed for', name, e)
    regProps = {}
  }

  return (
    <label className="block">
      {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
      <input
        {...regProps}
        name={name}
        placeholder={placeholder}
        className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        {...props}
      />
      {error && <p className="text-sm text-red-600 mt-1">{error.message || error}</p>}
    </label>
  )
}
