import React, { useEffect, useState } from "react";
import { supabase } from "../src/client";
import { useParams } from "react-router-dom";
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
    updatePost();
  };

  const handleDelete = () => {
    deletePost();
  }

  return (
    <div className="EditCard">
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
              checked={category === 'discussion'}
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
              checked={category === 'question'}
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
              checked={category === 'image'}
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
              checked={category === 'video'}
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
            defaultValue={title}
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
              defaultValue={link}
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
          defaultValue={skills}
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
          defaultValue={body}
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
          <button type="submit" onClick={handleDelete}>
            Delete Post
          </button>
        </div>
        {retry ? <h3>Please fill out all forms!</h3> : null}
      </div>
    </div>
  );
}
