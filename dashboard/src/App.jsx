import React from 'react'
import ProtectedRoute from './Layout/ProtectedRoute'

const App = () => {
  let baseurl = import.meta.env.VITE_API_BASE_URL
  return (
    <div>Dashboard page is here <ProtectedRoute /></div>
  )
}

export default App
