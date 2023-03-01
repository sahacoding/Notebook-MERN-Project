//import logo from './logo.svg';
import './App.css';
import React,{useContext} from 'react'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { Alertcontext } from './context/notes/Alertcontext'

function App() {
  const Acontext = useContext(Alertcontext)
  console.log('Acontext is', Acontext)
  const {showAlert, alert} = Acontext
  return (
  <>
  <NoteState>
   <Navbar/>
   <Alert alert= {alert}/>
   <div className='container'>
  <Routes>
 <Route path= '/' element= {<Home/>} />
  <Route path= 'about' element= {<About/>} />
  <Route path= 'login' element= {<Login/>} />
  <Route path= 'signup' element= {<Signup/>} />
  </Routes>
  </div>
  </NoteState>
   </>
  );
}

export default App;
