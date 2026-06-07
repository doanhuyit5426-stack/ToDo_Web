import React from 'react'
import { Link } from 'react-router' // <-- Import Link của react-router để chuyển trang mượt mà

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center bg-slate-50'>
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Page Not Found</p>
      <img src="/404_NotFound.png" alt="Not Found" className="max-w-full mb-6 w-66" />
      <Link to="/" className="inline-block px-5 py-3 font-medium text-white transition shadow-md bg-primary rounded-2xl hover:bg-primary-dark">
        Go Home
      </Link>
    </div>
  )
}

export default NotFound