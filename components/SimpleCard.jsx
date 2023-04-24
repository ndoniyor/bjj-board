import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap';
import './css/SimpleCard.css'

export default function SimpleCard(props) {
  const [text, setText] = useState("");

  useEffect(() => {
    const truncateBody = () => {
      let bodyText = props.body
      if (bodyText.length > 40) {
        bodyText = bodyText.substring(0, 40) + "...";
      }
      setText(bodyText);
    }
    truncateBody();
  }, [])


  return (
    <Card className='SimpleCard'>
      <Card.Header className="w-100">
        <Card.Title>
          <Link to={`/gallery/${props.id}`} className='simple-title'>{props.title}</Link>
          <br></br>
          <small className='simple-category'>{props.category}</small>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <p className='text-truncate simple-body'>{text}</p>

      </Card.Body>
      <Card.Footer className="w-100">
        <Link to={`/edit/${props.id}`}>Edit Post</Link>
      </Card.Footer>


    </Card>
  )
}
