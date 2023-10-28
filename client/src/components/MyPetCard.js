import React, { useContext } from 'react';
import petContext from '../context/pets/petContext.js';

const MyPetCard = (props) => {
    const {pet,updatePet} = props;
    const context = useContext(petContext);
    const {deletePet} = context;

    return (
        <div className='col-md-3'>
            <div className="card my-3">
            <div className="card-body">
                <h5 className="card-title">{pet.name}</h5>
                <p className="card-text">{pet.description}</p>
                <i className="far fa-trash-alt mx-2" onClick={()=>{deletePet(pet._id);
                props.showAlert("Deleted successfully","success");}}></i>
                <i className="far fa-edit mx-2" onClick={()=>{updatePet(pet)}}></i>
            </div>
            </div>
        </div>
    )
}

export default MyPetCard;
