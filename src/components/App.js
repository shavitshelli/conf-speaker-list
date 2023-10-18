import { useState } from "react";
import "./App.css";

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
  const [addSpeakerVisible, setAddSpeakerVisible] = useState(false);
  const [speakerList, setSpeakerList] = useState(initialSpeakers);
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [selectedDescriptionSpeaker, setSelectedDescriptionSpeaker] =
    useState(null);

  function handleAddSpeakerButton() {
    setAddSpeakerVisible((isVisible) => !isVisible);
  }

  function handleFormAddSpeaker(speaker) {
    setAddSpeakerVisible(false);
    setSpeakerList((speakerArr) => [...speakerArr, speaker]);
  }

  function handleSelectButton(speaker) {
    setAddSpeakerVisible(false);
    setSelectedSpeaker((currSpeaker) =>
      currSpeaker?.id !== speaker.id ? speaker : null
    );
  }

  function handleFormSpeachData(speachData) {
    console.log(speachData.description);
    setSpeakerList((currSpeakerList) =>
      currSpeakerList.map((currSpeaker) =>
        currSpeaker?.id === selectedSpeaker?.id
          ? {
              ...currSpeaker,
              description: speachData.description
                ? speachData.description
                : currSpeaker.description,
              from: speachData.from,
              to: speachData.to,
            }
          : currSpeaker
      )
    );

    setSelectedSpeaker(null);
  }

  return (
    <>
      <Header />
      <div className="app">
        <div className="sidebar">
          <SpeakersList
            listOfSpeakers={speakerList}
            onSelectClicked={handleSelectButton}
            selectedSpeaker={selectedSpeaker}
            selectedDescriptionSpeaker={selectedDescriptionSpeaker}
            setSelectedDescriptionSpeaker={setSelectedDescriptionSpeaker}
          />

          {addSpeakerVisible && (
            <AddSpeakerForm onSpeakerAdd={handleFormAddSpeaker} />
          )}

          <Button onClick={handleAddSpeakerButton}>
            {addSpeakerVisible ? "Close" : "Add Speaker"}
          </Button>
        </div>
        {selectedSpeaker && (
          <DefineSpeachData onSpeachDataSubmit={handleFormSpeachData} />
        )}
      </div>
    </>
  );
}

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
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

function SpeakersList({
  listOfSpeakers,
  onSelectClicked,
  selectedSpeaker,
  selectedDescriptionSpeaker,
  setSelectedDescriptionSpeaker,
}) {
  const speakersList = listOfSpeakers;

  return (
    <ul>
      {speakersList.map((speaker) => (
        <Speaker
          speaker={speaker}
          onSelectClicked={onSelectClicked}
          selectedSpeaker={selectedSpeaker}
          key={speaker.id}
          selectedDescriptionSpeaker={selectedDescriptionSpeaker}
          setSelectedDescriptionSpeaker={setSelectedDescriptionSpeaker}
        />
      ))}
    </ul>
  );
}

function Speaker({
  speaker,
  onSelectClicked,
  selectedSpeaker,
  selectedDescriptionSpeaker,
  setSelectedDescriptionSpeaker,
}) {
  const visibleDiscription = selectedDescriptionSpeaker?.id === speaker?.id;
  const isSameSpeaker = selectedSpeaker?.id === speaker.id;

  function handleListElementClick(e) {
    if (e.target.tagName !== "BUTTON") {
      setSelectedDescriptionSpeaker((currSpeaker) =>
        currSpeaker?.id !== speaker.id ? speaker : null
      );
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
        {visibleDiscription ? "⬆️" : "⬇️"} {speaker.topic}
      </p>
      <span>{speaker.from ? `${speaker.from}:00 - ${speaker.to}:00` : ""}</span>
      <Button onClick={() => onSelectClicked(speaker)}>
        {isSameSpeaker ? "Close" : "Select"}
      </Button>
      {visibleDiscription && <div>{speaker.description}</div>}
    </li>
  );
}

function AddSpeakerForm({ onSpeakerAdd }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  const [topic, setTopic] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image || !topic) return;

    const id = crypto.randomUUID();

    const newSpeaker = {
      id,
      name,
      image: `${image}?=${id}`,
      topic,
      description: "",
      from: null,
      to: null,
    };

    onSpeakerAdd(newSpeaker);

    setName("");
    setImage("https://i.pravatar.cc/48");
    setTopic("");
  }

  return (
    <form className="form-add-speaker" onSubmit={(e) => handleSubmit(e)}>
      <label>🗣️ Speaker Name </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>

      <label>📷 Image url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>

      <label>🔝 Topic</label>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      ></input>

      <Button>Add</Button>
    </form>
  );
}

function DefineSpeachData({ onSpeachDataSubmit }) {
  const [start, setStart] = useState("");
  const [finish, setFinish] = useState("");
  const [description, setDescription] = useState("");

  function handleFormSpeachData(e) {
    e.preventDefault();

    if (!start || !finish) return;

    const speachData = {
      from: start,
      to: finish,
      description: description,
    };

    onSpeachDataSubmit(speachData);
    setStart("");
    setFinish("");
    setDescription("");
  }

  return (
    <form
      className="form-define-hours"
      onSubmit={(e) => handleFormSpeachData(e)}
    >
      <h2>Set your speach data</h2>
      <label>🕛 Start hour </label>
      <input
        type="text"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      ></input>

      <label>🕧 Finish hour </label>
      <input
        type="text"
        value={finish}
        onChange={(e) => setFinish(e.target.value)}
      ></input>

      <label>💬 Description </label>
      <textarea
        id="description"
        name="description"
        rows="4"
        cols="50"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <Button>Set Data</Button>
    </form>
  );
}
