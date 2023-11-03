import './App.css';
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { useState } from 'react';
import Alert from './components/Alert';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import PetState from './context/pets/PetState';
import EditPet from './components/EditPet';
import FavouritePet from './components/FavouritePet';
import Chat from './Chat/Chat.jsx'

function App() {
  const[alert,setAlert] = useState(null);
  
  const showAlert = (message,type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
    <PetState>
    <BrowserRouter>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert}/>}></Route>
          <Route exact path="/about" element={<About/>}></Route>
          <Route exact path="/mypets" element={<EditPet showAlert={showAlert}/>}></Route>
          <Route exact path="/favpets" element={<FavouritePet showAlert={showAlert}/>}></Route>
          <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
          <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}></Route>
          <Route exact path="/chat" element={<Chat />}></Route>
        </Routes>
        </div>
      </BrowserRouter>
    </PetState>
    </>
  );
}

export default App;
