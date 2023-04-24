import './css/DetailCard.css'
import {Button} from 'react-bootstrap';
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import { supabase } from "../src/client";

export default function DetailCard(props) {
  const [upvotes, setUpvotes] = useState(0);

  const updateUpvotes = async()=> {
    await supabase
    .from("posts")
    .update({upvotes: upvotes})
    .eq('id',props.id);
  }

  const handleUpvote = async () =>{
    setUpvotes(upvotes+1);
    await updateUpvotes();
  }

  useEffect(()=>{
    if(props.upvotes){
      setUpvotes(Number(props.upvotes));
    }  
  },[props.upvotes])

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h2 className="card-title mb-0">{props.title}</h2>
          <div className="text-muted">{props.category}</div>
        </div>
        <p className="card-text">{props.body}</p>
        <div className="d-flex justify-content-between align-items-center">
          <Button variant="outline-dark" as={Link} to={`/edit/${props.id}`} className="mt-3">Edit Post</Button>
          <small className="text-muted">{props.skills}</small>
          <div>
            <span className="me-2">{upvotes}</span>
            <Button variant="outline-dark" className="mt-3" onClick={handleUpvote}>Upvote</Button>
          </div>
        </div>
      </div>
    </div>

  );
}
