import React, { useContext, useState } from "react";
import { Alertcontext } from "../context/notes/Alertcontext";
import noteContext from "../context/notes/noteContext";

const Addnote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setnote] = useState({
    tittle: "",
    description: "",
    tag: "",
  });

  const alertcontext = useContext(Alertcontext)
  const {showAlert} = alertcontext
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.tittle, note.description, note.tag);
    setnote({ tittle: "", description: "", tag: ""})
    showAlert("Add Note Successfuly", "alert-success")
  };
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container my-3">
        <h1>Add a Note</h1>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="tittle">Tittle</label>
            <input
              type="text"
              className="form-control"
              id="tittle"
              name="tittle"
              value={note.tittle}
              aria-describedby="emailHelp"
              placeholder="tittle"
              onChange={onChange}
              minLength={4}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              placeholder="description"
              onChange={onChange}
              minLength={4}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag">Tag</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              placeholder="tag"
              onChange={onChange}
              required
            />
          </div>
          <button
          disabled= {note.tittle.length < 4 || note.description.length < 4}
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Notes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addnote;
