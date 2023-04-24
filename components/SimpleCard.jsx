import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineEdit} from 'react-icons/ai'
import {BiUpvote} from 'react-icons/bi'
import { Card, Button } from 'react-bootstrap';
import './css/SimpleCard.css'

export default function SimpleCard(props) {
  const [text, setText] = useState("");
  const [upvotes, setUpvotes] = useState(0);

  const updateUpvotes = async () => {
    await supabase
      .from("posts")
      .update({ upvotes: upvotes })
      .eq('id', props.id);
  }

  const handleUpvote = async () => {
    setUpvotes(upvotes + 1);
    await updateUpvotes();
  }

  useEffect(() => {
    if (props.upvotes) {
      setUpvotes(Number(props.upvotes));
    }
  }, [props.upvotes])

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
          <br/>
          <small className='simple-category'>{props.category}</small>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <p className='text-truncate simple-body'>{text}</p>
      </Card.Body>
      <Card.Footer className="w-100">

        <div className="d-flex justify-content-between align-items-center">
          <Button variant="outline-dark" as={Link} to={`/edit/${props.id}`}>
            <AiOutlineEdit />
          </Button>
          <small class="time-stamp" >{props.created_at}</small>
          <div>
            <span className="me-2">{upvotes}</span>
            <Button variant="outline-dark" onClick={handleUpvote}>
              <BiUpvote />
            </Button>
          </div>

        </div>
      </Card.Footer>


    </Card>
  )
}
