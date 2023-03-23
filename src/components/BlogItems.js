import React from "react";
import "./css/BlogItems.css";

export default function BlogItems(props) {
  let {
    authorName,
    blogTitle,
    description,
    authorAvatar,
    createdAt,
    imageUrl,
    thumbnailText,
  } = props;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <div className={props.Mode === "light" ? "card" : "darkcard"}>
        <div className="card__header">
          <img
            src={imageUrl}
            alt="card__image"
            className="card__image"
            width="600"
          />
        </div>
        <div className="card__body">
          <span className="tag tag-blue">
            {capitalizeFirstLetter(thumbnailText)}
          </span>
          <h4
            style={{
              display: "inline-block",
            }}
          >
            {capitalizeFirstLetter(blogTitle)}...
          </h4>
          <p>{description}</p>
        </div>
        <div className="card__footer">
          <div className="user">
            <img src={authorAvatar} alt="user__image" className="user__image" />
            <div className="user__info">
              <h5>{capitalizeFirstLetter(authorName)}</h5>
              <small
                style={{ color: props.Mode === "light" ? "black" : "white" }}
              >
                {capitalizeFirstLetter(createdAt)}
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
