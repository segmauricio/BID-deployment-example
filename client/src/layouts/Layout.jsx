import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="container mt-5">
      <h1> Pet Shelter </h1>
      <div className="mt-2">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout