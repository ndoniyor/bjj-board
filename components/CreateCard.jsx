import React, { useEffect, useState } from "react";
import { supabase } from "../src/client";
import { Form, Row, Col, Button } from 'react-bootstrap';
import './css/CreateCard.css'

export default function CreateCard() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [body, setBody] = useState("");
  const [skills, setSkills] = useState("");
  const [category, setCategory] = useState("");
  const [retry, setRetry] = useState(false);

  const createPost = async (event) => {
    console.log(title,link,body,skills)
    await supabase
      .from("posts")
      .insert({ title: title, link: link, skills: skills, category: category, body: body, upvotes: 0 })
      .select();
    window.location = "/";
  };

  const handleCategory = (event) => {
    setCategory(event.target.id.split("-")[0]);
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
    console.log(title)
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
    console.log("sending")
    if (!title || !skills || !category) {
      setRetry(true);
    }
    else{
      createPost();
    }
  };

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
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="Question"
              name="category-select"
              id="Question-post"
              onClick={handleCategory}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="Media"
              name="category-select"
              id="Media-post"
              onClick={handleCategory}
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
          placeholder="Give your post a name"
        />
      </Form.Group>
      {(category === "Media") && (
        <Form.Group>
          <Form.Label>Link:</Form.Label>
          <Form.Control
            type="url"
            onChange={handleLink}
            id="link-field"
            placeholder="Specify the link to your image/video"
          />
        </Form.Group>
      )}
      <Form.Group>
        <Form.Label>Skills:</Form.Label>
        <Form.Control
          as="textarea"
          onChange={handleSkills}
          id="skills-field"
          placeholder="Specify the skills showcased/requested"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Body:</Form.Label>
        <Form.Control
          as="textarea"
          onChange={handleBody}
          id="body-field"
          placeholder="Spark up some discussion!"
        />
      </Form.Group>
      <Button variant="outline-light" color='#fffff' classnName="mt-3" onClick={handleSubmit}>Submit</Button>
      {retry && <h3>Please fill out all forms!</h3>}
    </Form>
  );
}
