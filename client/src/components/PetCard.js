import React, { useContext, useState, useEffect } from 'react';
import petContext from '../context/pets/petContext.js';
import { Link } from 'react-router-dom';

const PetCard = (props) => {
    const {pet} = props;
    const context = useContext(petContext);
    const { favpets,getFavPets,addFavPet,deleteFavPet } = context;
    const [marked,setMarked] = useState(false);

    const checkFav = async () => {
        favpets.forEach((element,index,array)=>{
            if(element._id===pet._id){
                setMarked(true);
            }
        });
    }

    useEffect(()=>{
        const getFavValue = async () => {
            await getFavPets();
            await checkFav();
        }
        getFavValue();
    },[])
    
    const handleClick=()=>{
        
        if(marked){
            deleteFavPet(pet._id);
            setMarked(false);
        }
        else{
            addFavPet(pet._id);
            setMarked(true);
        }
    }
    return (
        <div className='col-md-3'>
            <div className="card my-3">
            <div className="card-body">
                <h5 className="card-title">{pet.name}</h5>
                <p className="card-text">{pet.description}</p>

                <i className={`${marked===true?"fa-solid":"fa-regular"} fa-heart mx-2`} onClick={handleClick}></i>
                <Link to = '../chat'><i class="fa-solid fa-comments"></i></Link>
            </div>
            </div>
        </div>
    )
}

export default PetCard;
