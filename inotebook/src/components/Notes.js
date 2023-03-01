import React, { useContext, useEffect, useRef, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { Alertcontext } from "../context/notes/Alertcontext";
import noteContext from "../context/notes/noteContext";
import Addnote from "./Addnote";
import Noteitem from "./Noteitem";

export default function Notes() {
  const context = useContext(noteContext);
  let  navigate = useNavigate();
  const { notes, getNote, editNote} = context;

  const alertcontext = useContext(Alertcontext)
  const {showAlert} = alertcontext

  useEffect(() => {
   // const tok = localStorage.getItem('token')
    if(localStorage.getItem('token')){
     // console.log('token is', tok)
    getNote();
    }else{
      navigate("/login")
    }
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setnote] = useState({
    etittle: "",
    edescription: "",
    etag: "default",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({id: currentNote._id, etittle: currentNote.tittle, edescription: currentNote.description, etag: currentNote.tag})
  };

const handleClick = (e) => {
  //  console.log("update the note", note)
    editNote(note.id, note.etittle, note.edescription, note.etag)
   refClose.current.click();
   showAlert("Update Note Successfuly", "alert-warning")
   };
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Addnote />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form className="my-3">
          <div className="mb-3">
            <label htmlFor="tittle">Tittle</label>
            <input
              type="text"
              className="form-control"
              id="etittle"
              name="etittle"
              value={note.etittle}
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
              id="edescription"
              name="edescription"
              value={note.edescription}
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
              id="etag"
              name="etag"
              value={note.etag}
              placeholder="tag"
              onChange={onChange}
              required
            />
          </div>
         
        </form>
            </div>
            <div className="modal-footer">
              <button
              ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container mx-2">
          {notes.length === 0 && 'No notes to Display'}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
}
