import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) =>{
  const host = "http://localhost:3015"
    const notesInitial = []
      const [notes, setNotes] = useState(notesInitial)

     // Get all Notes
     const getNote = async () =>{
      
      // API call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem('token')
            },
          });
          const json = await response.json();
         // console.log(json)
          setNotes(json)
        }

      // Add a Note
const addNote = async (tittle, description, tag) =>{
      // API call
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
  
         headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
      body: JSON.stringify({tittle, description, tag}) // body data type must match "Content-Type" header
      });
     

  
  const note =  await response.json()
  setNotes(notes.concat(note))
}

      // Delete a Note
const deleteNote = async (id) =>{
  //API Call
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.

     headers: {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')
    },
  
  });
  const json = response.json(); 
 // console.log(json)
  console.log('Deleting the Note with ', id)
  const newNote = notes.filter((note)=>{return note._id!==id});
  setNotes(newNote)

}
      // Edit a Note
    const editNote = async (id, tittle, description, tag)=>{
  
      // API call
const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.

       headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    body: JSON.stringify({tittle, description, tag}) // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    
    let newNotes = JSON.parse(JSON.stringify(notes)) // atfirst notes array convert into string then parse means again onvert in to
    // object and store in newNotes variable. That means create same copy of the notes array  into newNotes array

      // Logic to edit in client
      for(let index = 0; index < newNotes.length; index++){
        const element = newNotes[index];
       // console.log(element)
        if(element._id === id){
          newNotes[index].tittle = tittle;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      console.log(id, newNotes)
      setNotes(newNotes)

        //logic 2 to edit in client
// const newNotes = notes.map((newnote)=>
// newnote._id === id ? json.note : newnote
// )
// //console.log('newNotes is', newNotes)
// setNotes(newNotes)
    }
    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;