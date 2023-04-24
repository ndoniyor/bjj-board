import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { GiBlackBelt } from 'react-icons/gi'

import React from 'react'

export default function App() {
  return (
    <div className="text-center">
      <div className="header-text">
        <GiBlackBelt 
        fill="white" 
        size={48}
        />
        <h1>Welcome to the BJJ Board</h1>
      </div>

      <Button variant="outline-light" color='#fffff' as={Link} to="/gallery" className="mt-3">Begin your journey</Button>
    </div>
  )
}
