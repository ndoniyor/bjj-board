import { useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

import React from 'react'

export default function App() {
  return (
    <div>
      <h1>Welcome to the BJJ Board</h1>
      <Link to="/gallery">Begin your journey</Link>
    </div>
  )
}
