import React from 'react'
import "./Card.css";

const  Card = (props) =>{
    console.log("ini props", props);
  return (
    <div className="card">
      <div className="card-header">
        <div className="profile">
          <span className="letter">{props.author}</span>
        </div>
        <div className="card-title-group">
          <h5 className="card-title">{props.title}</h5>
          <div className="card-date">{props.date}</div>
        </div>
      </div>
      <img className="card-image" src={props.img} alt="Logo" />
      <div className="card-text">{props.description}</div>
      <div className="card-like-bar">
        {/* {props.liked ? (
          <img className="card-like-icon" src={heartFill} alt="Logo" />
        ) : (
          <img className="card-like-icon" src={heartOutline} alt="Logo" />
        )} */}
        <div className="like-text">
          <b>{props.likeCount}</b> kişi bu tarifi beğendi.
        </div>
      </div>
    </div>
  )
}

export default Card