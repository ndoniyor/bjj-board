import './css/DetailCard.css'
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { supabase } from "../src/client";
import { BiUpvote, BiTrash } from 'react-icons/bi'
import { AiOutlineEdit } from 'react-icons/ai';
import { Image, Button } from 'react-bootstrap';

export default function DetailCard(props) {
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

  const handleDelete = async () => {
    await supabase
      .from("posts")
      .delete()
      .eq('id', props.id);
    window.location = "/";
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h2 className="card-title mb-0">{props.title}</h2>
          <div className="text-muted">{props.category}</div>
        </div>
        {(props.category === "Image") && <Image src={props.link} fluid />}
        {(props.category === "Video") &&
          <iframe
            width="560"
            height="315"
            src={props.link} title="YouTube video player"
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen>
          </iframe>
        }
        <p className="card-text">{props.body}</p>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Button variant="outline-dark" as={Link} to={`/edit/${props.id}`} className="mt-3">
              <AiOutlineEdit />
            </Button>
            <Button variant="outline-dark" onClick={handleDelete} className="mt-3">
              <BiTrash />
            </Button>
          </div>

          <small className="text-muted">{props.skills}</small>
          <div>
            <span className="me-2">{upvotes}</span>
            <Button variant="outline-dark" className="mt-3" onClick={handleUpvote}>
              <BiUpvote />
            </Button>
          </div>
        </div>
      </div>
    </div>

  );
}
