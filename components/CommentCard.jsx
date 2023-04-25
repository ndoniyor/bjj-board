import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { BiTrash } from 'react-icons/bi';
import { supabase } from '../src/client';

export default function CommentCard(props) {
  const handleDelete = async () => {
    console.log(props)
    await supabase
      .from("comments")
      .delete()
      .eq('comment_id', props.id);
    window.location = `/gallery/${props.post_id}`;
  }
  return (
    <Card className="mb-3">
      <Card.Body className="d-flex justify-content-between align-items-start">
        <p className="card-text">{props.text}</p>
        <div className="d-flex align-items-center">
          <Button variant="outline-dark" onClick={handleDelete}>
            <BiTrash />
          </Button>
        </div>
      </Card.Body>
    </Card>

  )
}
