import { useState } from "react";
import "./App.css";
import { isVisible } from "@testing-library/user-event/dist/utils";

const initialSpeakers = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    topic: "Bitcoin",
    description:
      "My speech on Bitcoin will focus on its transformative role in modern finance, exploring blockchain technology's potential and the importance of informed decision-making.",
    from: null,
    to: null,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    topic: "Astronomy",
    description:
      "My speech on Astronomy will captivate the audience with celestial wonders, space exploration, and the mysteries of the universe.",
    from: null,
    to: null,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    topic: "Math",
    description:
      "My speech on Math will reveal the practicality and beauty of mathematics, showcasing its relevance in everyday life and the broader world of science.",
    from: null,
    to: null,
  },
];

export default function App() {
  return (
    <>
      <Header />
      <div className="app">
        <div className="sidebar">
          <SpeakersList />

          <AddSpeakerForm />

          <Button>Add Speaker</Button>
        </div>
        <DefineSpeakerHours />
      </div>
    </>
  );
}

function Button({ children }) {
  function handleClick() {
    console.log("shavit");
  }

  return (
    <button className="button" onClick={handleClick}>
      {children}
    </button>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Confrence Speaker List</h1>
    </header>
  );
}

function SpeakersList() {
  const speakersList = initialSpeakers;

  return (
    <ul>
      {speakersList.map((speaker) => (
        <Speaker speaker={speaker} />
      ))}
    </ul>
  );
}

function Speaker({ speaker }) {
  const [visibleDiscription, setVisibleDescription] = useState(false);

  function handleListElementClick(e) {
    if (e.target.tagName !== "BUTTON") {
      setVisibleDescription((isVisible) => !isVisible);
    }
  }

  return (
    <li
      className={visibleDiscription ? "open" : ""}
      onClick={(e) => handleListElementClick(e)}
    >
      <img src={speaker.image} alt={speaker.name} />
      <h3>{speaker.name}</h3>
      <p>
        {speaker.topic} {visibleDiscription ? "⬆️" : "⬇️"}
      </p>
      <span>{speaker.from ? `${speaker.from}:00 - ${speaker.to}:00` : ""}</span>
      <Button>Select</Button>
      {visibleDiscription && <div>{speaker.description}</div>}
    </li>
  );
}

function AddSpeakerForm() {
  return (
    <form className="form-add-speaker">
      <label>🗣️ Speaker Name </label>
      <input type="text"></input>

      <label>📷 image url</label>
      <input type="text"></input>
    </form>
  );
}

function DefineSpeakerHours() {
  return (
    <form className="form-define-hours">
      <h2>Select hours</h2>
      <label>🕛 Start hour </label>
      <input type="text"></input>

      <label>🕧 Finish hour </label>
      <input type="text"></input>
    </form>
  );
}
