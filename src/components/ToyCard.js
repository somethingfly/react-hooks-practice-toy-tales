import React from "react";

function ToyCard({ toy, onLike, onDonate }) {

  function handleLikeClick() {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: ++toy.likes,
      }),
    })
      .then((r) => r.json())
      .then((likedToy) => onLike(likedToy));
  }

  function handleDonateClick() {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDonate(toy))
  }

  return (
    <div className="card">
      <h2>{toy.name}</h2>
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />
      <p>{toy.likes} Likes </p>
      <button
        className="like-btn"
        onClick={handleLikeClick}
      >Like {"<3"}</button>
      <button
        className="del-btn"
        onClick={handleDonateClick}
      >Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;

/*
import React from "react";

function ToyCard() {
  return (
    <div className="card">
      <h2>{"" ** Toy's Name **}</h2>
      <img
        src={"" ** Toy's Image **}
        alt={"" ** Toy's Name **}
        className="toy-avatar"
      />
      <p>{"" ** Toy's Likes **} Likes </p>
      <button className="like-btn">Like {"<3"}</button>
      <button className="del-btn">Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
*/
