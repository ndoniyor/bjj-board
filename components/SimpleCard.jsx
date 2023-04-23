import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './css/SimpleCard.css'

export default function SimpleCard(props) {
  useEffect(()=>{
    console.log(props)
  })
  return (
    <div className='SimpleCard'>
      <Link to={`/gallery/${props.id}`} className='simple-title'>{props.title}</Link>
      <Link to={`/edit/${props.id}`}>Edit Post</Link>
      <small className='simple-category'>{props.category}</small>
      <p className='simple-body'>{props.body}</p>
    </div>
  )
}
