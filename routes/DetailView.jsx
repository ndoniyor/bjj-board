import React from "react";
import DetailCard from "../components/DetailCard";
import { supabase } from "../src/client";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap';
import CommentCard from "../components/CommentCard";

export default function DetailView() {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const getComments = async () => {
    const data_pre = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", parseInt(id));
    setComments(data_pre.data);
  }

  const makeComment = async () => {
    console.log(comment);
    await supabase
      .from("comments")
      .insert({ post_id: id, text: comment })
      .select();
    window.location = `/gallery/${id}`
  }

  const getPost = async () => {
    const data_pre = await supabase
      .from("posts")
      .select("*")
      .eq("id", parseInt(id))
      .single();
    setData(data_pre.data);
  };

  useEffect(() => {
    getPost();
    getComments();
  }, []);

  return (
    <div className="DetailView">
      <DetailCard
        id={data.id}
        title={data.title}
        link={data.link}
        category={data.category}
        skills={data.skills}
        upvotes={data.upvotes}
        timestamp={data.created_at}
        body={data.body}
      />
      <Form>
        <Form.Group controlId="comment">
          <Form.Label>Leave a comment:</Form.Label>
          <div className="d-flex mb-5">
            <Form.Control
              as="textarea"
              rows={1}
              onChange={(event) => setComment(event.target.value)}
            />
            <Button className='m-3' variant="outline-light" color='#fffff' onClick={makeComment}>Submit</Button>
          </div>

        </Form.Group>

      </Form>
      {comments && comments.map((mapComment) => (
        <CommentCard
          text={mapComment.text}
          id={mapComment.comment_id}
          post_id={id}
        />
      ))}
    </div>
  );
}
