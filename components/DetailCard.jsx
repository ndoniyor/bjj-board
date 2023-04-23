import React from "react";
import './css/DetailCard.css'
export default function DetailCard(props) {
  return (
    <div className="DetailCard">
      <div>
        <p>{props.upvotes}</p>
      </div>
      <div>
        <h2>{props.title}</h2>
        <small>{props.category}</small>
        <p>{props.body}</p>
        <small>{props.skills}</small>
      </div>
    </div>
  );
}
