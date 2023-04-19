import React, { useEffect, useState } from "react";
import { supabase } from "../src/client";
import './css/CreateCard.css'

export default function CreateCard() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [body, setBody] = useState("");
  const [skills, setSkills] = useState("");
  const [category, setCategory] = useState("");
  const [retry, setRetry] = useState(false);

  const createPost = async (event) => {
    await supabase
      .from("posts")
      .insert({ title: title, link: link, skills: skills, category: category, body: body })
      .select();

    window.location = "/";
  };

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
    createPost();
  };

  return (
    <div className="CreateCard">
      <div className="form-group">
        <label className="form-check-label" htmlFor="category-select">
          Category:
        </label>
        <div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="category-select"
              id="discussion-post"
              onClick={handleCategory}
            />
            <label className="form-check-label" htmlFor="discussion-post">
              Discussion
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="category-select"
              id="question-post"
              onClick={handleCategory}
            />
            <label className="form-check-label" htmlFor="question-post">
              Question
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="category-select"
              id="image-post"
              onClick={handleCategory}
            />
            <label className="form-check-label" htmlFor="image-post">
              Image
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="category-select"
              id="video-post"
              onClick={handleCategory}
            />
            <label className="form-check-label" htmlFor="video-post">
              Video
            </label>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div>
          <label htmlFor="title-field">Title:</label>
          <input
            className="form-control"
            onChange={handleTitle}
            id="title-field"
            aria-describedby="titleHelp"
          />
        </div>
        <div>
          <small id="titleHelp" class="form-text text-muted">
            Give your post a name
          </small>
        </div>
      {(category === "image" || category === "video") && (
        <div>
          <label htmlFor="link-field">Link: </label>
          <input
            type="url"
            className="form-control"
            onChange={handleLink}
            id="link-field"
          />
          <div>
            <small id="titleHelp" class="form-text text-muted">
              Specify the link to your image/video
            </small>
          </div>
        </div>
      )}
        <label htmlFor="skills-field">Skills:</label>
        <textarea
          className="form-control"
          onChange={handleSkills}
          id="skills-field"
        />
        <div>
          <small id="titleHelp" class="form-text text-muted">
            Specify the skills showcased/requested
          </small>
        </div>
        <label htmlFor="body-field">Body:</label>
        <textarea
          className="form-control"
          onChange={handleBody}
          id="body-field"
        />
        <div>
          <small id="titleHelp" class="form-text text-muted">
            Spark up some discussion!
          </small>
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        {retry ? <h3>Please fill out all forms!</h3> : null}
      </div>
    </div>
  );
}
