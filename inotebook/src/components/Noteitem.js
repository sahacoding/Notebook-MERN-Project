import React, {useContext} from 'react'
import { Alertcontext } from '../context/notes/Alertcontext'
import noteContext from "../context/notes/noteContext"

const Noteitem = (props) => {
  const context = useContext(noteContext)
  const {deleteNote} = context
    const {note, updateNote} = props

    const alertcontext = useContext(Alertcontext);
    const { showAlert } = alertcontext;

  return (
    <div className='col-md-3'>
       <div className="card my-3" >
  <div className="card-body">
    <h5 className="card-title">{note.tittle}</h5>
    <p className="card-text">{note.description}</p>
    <i className="fas fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);
    showAlert("Delete Note Successfuly", " alert-danger");}}></i>
    <i className="fas fa-edit mx-2"
    onClick={()=>{updateNote(note)}}></i>
  </div>
</div>
    </div>
  )
}

export default Noteitem
