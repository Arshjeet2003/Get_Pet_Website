import React, { useContext, useEffect, useRef, useState } from 'react';
import petContext from '../context/pets/petContext';
import { useNavigate } from 'react-router-dom';
import MyPetCard from './MyPetCard';
import AddPet from './AddPet';

//useRef to reference an element

const EditPet = (props)=>{
    
    const context = useContext(petContext);
    const { pets,editPet,getUserPets } = context;

    const ref = useRef(null);
    let navigate = useNavigate();
    const refClose = useRef(null);

    useEffect(()=>{
        if(localStorage.getItem('token')){
            getUserPets();
        }
        else{
            navigate("/login");
        }
    },[])

    const [pet, setPets] = useState({id: "",ename: "", edescription: "",elocation: "",eanimal_type: "",egender: "",eheight: 0,eage: 0}) 

    const updatePet = (currentPet)=>{
        ref.current.click();
        setPets({id: currentPet._id,ename: currentPet.name,edescription: currentPet.description,elocation: currentPet.location,
        eanimal_type: currentPet.animal_type,egender: currentPet.gender,eheight: currentPet.height,eage: currentPet.age});
    }

    const handleClick = (e)=>{
        editPet(pet.id,pet.ename,pet.edescription,pet.elocation,pet.eanimal_type,pet.egender,pet.eheight,pet.eage);
        refClose.current.click();
        props.showAlert("Updated successfully","success");
    }
    const onChange = (e)=>{
        setPets({...pet,[e.target.name]: e.target.value})
    }
  return (
    <>
    {
        localStorage.getItem('token')?<AddPet showAlert={props.showAlert}/>:""
    }
    <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
    Update Pet
    </button>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Pet</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
            <form className='my-3'>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" minLength={3} required id="ename" name="ename" value={pet.ename} aria-describedby="emailHelp"
                onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" minLength={5} required id="edescription" name="edescription" value={pet.edescription}  onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="location" className="form-label">Location</label>
                <input type="text" className="form-control" required id="elocation" name="elocation" value={pet.elocation}  onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="animal_type" className="form-label">Animal</label>
                <input type="text" className="form-control" required id="eanimal_type" name="eanimal_type" value={pet.eanimal_type}  onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="gender" className="form-label">Gender</label>
                <input type="text" className="form-control" required id="egender" name="egender" value={pet.egender}  onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="height" className="form-label">Height</label>
                <input type="text" className="form-control" required id="eheight" name="eheight" value={pet.eheight}  onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="age" className="form-label">Age</label>
                <input type="text" className="form-control" required id="eage" name="eage" value={pet.eage}  onChange={onChange}/>
            </div>
            </form>
        </div>
        <div className="modal-footer">
            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" onClick={handleClick} disabled={pet.ename.length<5 || pet.edescription.length<5} className="btn btn-primary">Update Pet</button>
        </div>
        </div>
    </div>
    </div>
    <div className="row my-3">
      <h2>My Pets</h2>
      <div className="container mx-2">
      {pets.length===0 && 'No pets to display'}
      </div>
      {pets.map((pet)=>{
        return <MyPetCard key={pet._id} updatePet={updatePet} showAlert={props.showAlert} pet={pet}/>
      })}
    </div>
    </>
  )
}

export default EditPet;
