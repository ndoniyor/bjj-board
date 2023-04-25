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
  const [key, setKey] = useState("");
  const [retry, setRetry] = useState(false);

  const createPost = async (event) => {
    await supabase
      .from("posts")
      .insert({ title: title, link: link, skills: skills, category: category, body: body, key: key, upvotes: 0 })
      .select();
    window.location = "/";
  };

  const convertToEmbed = (url) => {
    if (url.includes("youtube")) {
      const embedLink = url.replace("watch?v=", "embed/");
      return embedLink;
    }
    else if (url.includes("vimeo")) {
      const embedLink = url.replace("vimeo.com", "player.vimeo.com/video");
      return embedLink;
    }
    else {
      return url;
    }
  }

  const handleCategory = (event) => {
    setCategory(event.target.id.split("-")[0]);
  };

  const handleSubmit = () => {
    if (!title || !skills || !category) {
      setRetry(true);
    }
    else {
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
              label="Image"
              name="category-select"
              id="Image-post"
              onClick={handleCategory}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="Video"
              name="category-select"
              id="Video-post"
              onClick={handleCategory}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group>
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          id="title-field"
          placeholder="Give your post a name"
        />
      </Form.Group>
      {(category === "Video" || category === "Image") && (
        <Form.Group>
          <Form.Label>Link:</Form.Label>
          <Form.Control
            type="url"
            onChange={(e) => setLink(convertToEmbed(e.target.value))}
            id="link-field"
            placeholder="Specify the link to your image/video"
          />
        </Form.Group>
      )}
      <Form.Group>
        <Form.Label>Skills:</Form.Label>
        <Form.Control
          as="textarea"
          onChange={(e) => setSkills(e.target.value)}
          id="skills-field"
          placeholder="Specify the skills showcased/requested"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Body:</Form.Label>
        <Form.Control
          as="textarea"
          onChange={(e) => setBody(e.target.value)}
          id="body-field"
          placeholder="Spark up some discussion!"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          onChange={(e) => setKey(e.target.value)}
          id="key-field"
          placeholder="Protect your posts with a password"
        />
      </Form.Group>
      <Button variant="outline-light" color='#fffff' className="mt-3" onClick={handleSubmit}>Submit</Button>
      {retry && <h3>Please fill out all forms!</h3>}
    </Form>
  );
}
