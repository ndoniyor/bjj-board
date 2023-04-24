import React, { useEffect, useState } from "react";
import { supabase } from "../src/client";
import { useParams } from "react-router-dom";
import { Form, Row, Col, Button } from 'react-bootstrap';
import './css/EditCard.css'

export default function EditCard() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [body, setBody] = useState("");
  const [skills, setSkills] = useState("");
  const [category, setCategory] = useState("");
  const [retry, setRetry] = useState(false);

  useEffect(() => {
    getPost();
  }, [])

  const getPost = async () => {
    const data = await supabase
      .from("posts")
      .select("*")
      .eq("id", parseInt(id))
      .single();
    setTitle(data.data.title);
    setLink(data.data.link);
    setBody(data.data.body);
    setSkills(data.data.skills);
    setCategory(data.data.category);
  };

  const updatePost = async (event) => {
    await supabase
      .from("posts")
      .update({ title: title, link: link, skills: skills, category: category, body: body })
      .eq('id', id);
    window.location = "/";
  };

  const deletePost = async () => {
    await supabase
      .from("posts")
      .delete()
      .eq('id', id);
    window.location = "/";
  }

  const handleCategory = (event) => {
    setCategory(event.target.id.split("-")[0]);
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleLink = (event) => {
    setLink(event.target.value);
  };

  const handleSkills = (event) => {
    setSkills(event.target.value.toLowerCase());
  };

  const handleBody = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = () => {
    if (!title || !skills || !category) {
      setRetry(true);
    }
    else{
      updatePost();
    }
    
  };

  const handleDelete = () => {
    deletePost();
  }

  return (
    <Form className="CreateCard">
      <Form.Group>
        <Form.Label>Category:</Form.Label>
        <Row>
          <Col>
            <Form.Check
              type="radio"
              label="Discussion"
              name="category-select"
              id="Discussion-post"
              onClick={handleCategory}
              checked={category==='Discussion'}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="Question"
              name="category-select"
              id="Question-post"
              onClick={handleCategory}
              checked={category==='Question'}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="Media"
              name="category-select"
              id="Media-post"
              onClick={handleCategory}
              checked={category==='Media'}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group>
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          onChange={handleTitle}
          id="title-field"
          defaultValue={title}
        />
      </Form.Group>
      {(category === "Media") && (
        <Form.Group>
          <Form.Label>Link:</Form.Label>
          <Form.Control
            type="url"
            onChange={handleLink}
            id="link-field"
            defaultValue={link}
          />
        </Form.Group>
      )}
      <Form.Group>
        <Form.Label>Skills:</Form.Label>
        <Form.Control
          as="textarea"
          onChange={handleSkills}
          id="skills-field"
          defaultValue={skills}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Body:</Form.Label>
        <Form.Control
          as="textarea"
          onChange={handleBody}
          id="body-field"
          defaultValue={body}
        />
      </Form.Group>
      <Button variant="outline-light" color='#fffff' classnName="mt-3" onClick={handleSubmit}>Submit</Button>
      <Button variant="outline-light" color='#fffff' classnName="mt-3" onClick={handleDelete}>Delete</Button>
      {retry && <h3>Please fill out all forms!</h3>}
    </Form>
  );
}
