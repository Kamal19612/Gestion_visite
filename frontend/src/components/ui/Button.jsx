import React from 'react'

export default function Button({ children, className = '', ...props }) {
  // Si className contient déjà des styles de background, ne pas ajouter le style par défaut
  const hasCustomBg = className.includes('bg-');
  const defaultClasses = hasCustomBg 
    ? 'px-4 py-2 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-all'
    : 'px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all';
  
  return (
    <button
      className={`${defaultClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
