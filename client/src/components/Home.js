import React, { useContext, useEffect } from 'react';
import PetCard from './PetCard.js';
import petContext from '../context/pets/petContext.js';


//useRef to reference an element

const Home = ()=>{
    
    const context = useContext(petContext);
    const { pets,getPets } = context;

    useEffect(()=>{
      getPets();
    },[])
  return (
    <>
    <div className="row my-3">
      <h2>Pets</h2>
      <div className="container mx-2">
      {pets.length===0 && 'No pets to display'}
      </div>
      {pets.map((pet)=>{
        return <PetCard key={pet._id} pet={pet}/>
      })}
    </div>
    </>
  )
}

export default Home;
