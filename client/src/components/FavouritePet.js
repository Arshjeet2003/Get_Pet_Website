import React, { useContext, useEffect } from 'react';
import PetCard from './PetCard.js';
import petContext from '../context/pets/petContext.js';
import { useNavigate } from 'react-router-dom';


//useRef to reference an element

const FavouritePet = ()=>{
    
    const context = useContext(petContext);
    const { favpets,getFavPets } = context;
    let navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('token')){
            getFavPets();
        }
        else{
            navigate("/login");
        }
    },[])
  return (
    <>
    <div className="row my-3">
      <h2>Favourite Pets</h2>
      <div className="container mx-2">
      {favpets.length===0 && 'No pets to display'}
      </div>
      {favpets.map((pet)=>{
        return <PetCard key={pet._id} pet={pet}/>
      })}
    </div>
    </>
  )
}

export default FavouritePet;