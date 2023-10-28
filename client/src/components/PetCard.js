import React from "react";

const PetCard = (props) => {
    const {pet} = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
            <div className="card-body">
                <h5 className="card-title">{pet.name}</h5>
                <p className="card-text">{pet.description}</p>
            </div>
            </div>
        </div>
    )
}

export default PetCard;
