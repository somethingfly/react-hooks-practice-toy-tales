import React, { useEffect, useState } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

// Had to update the database in ./././db.json
// Rex's image does not render properly (Firefox, Chrome)
// https://static.wikia.nocookie.net/pixar/images/a/a8/Rex_%28Toy_Story%29.png/revision/latest/scale-to-width-down/377?cb=20210221010941
// Should be changed to
// https://static.wikia.nocookie.net/pixar/images/a/a8/Rex_%28Toy_Story%29.png
// I could put in code to handle, but outside of scope

// Components Creates, Reads, Updates, Deletes (CRUD) to database
// Create via form on ToyForm
// Reads via UseEffect on App
// Updates via like button on ToyCard
// Deletes via donate button on ToyCard
// Actual changes to the database per CUD happen in aforementioned component
// Then the changes are reflected in the state/array in App and re-rendered

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((r) => r.json())
      .then((toys) => setToys(toys));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleCreateToy(newToy) {
    setToys([...toys, newToy]);
  }

  function handleDonate(donatedToy) {
    const updatedToys = toys.filter((toy) => toy.id !== donatedToy.id);
    setToys(updatedToys);
  }

  function handleLike(likedToy) {
    const updatedToys = toys.map((toy) => {
      if (toy.id === likedToy.id) {
        return likedToy;
      } else {
        return toy;
      }
    });
    setToys(updatedToys);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onCreateToy={handleCreateToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onLike={handleLike}
        onDonate={handleDonate}
      />
    </>
  );
}

export default App;

/*

import React, { useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer />
    </>
  );
}

export default App;

*/
