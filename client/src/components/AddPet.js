import React,{useContext,useState} from 'react'
import petContext from '../context/pets/petContext';

const AddPet = (props) => {
    const context = useContext(petContext);
    const {addPet} = context;

    const [pet,setPet] = useState({name: "", description: "",location: "",animal_type: "",
    gender: "",age: "",height: ""})

    const handleClick = (e)=>{
        e.preventDefault(); //So that page does not reload
        addPet(pet.name,pet.description,pet.location,pet.animal_type,pet.gender,pet.age,pet.height);
        setPet({name: "", description: "",location: "",animal_type: "",
        gender: "",age: "",height: ""})
        props.showAlert("Note Added successfully","success");
    }
    const onChange = (e)=>{
        setPet({...pet,[e.target.name]: e.target.value})
    }
  return (
    <div>
      <div className="container my-3">
        <h2>Add a Pet</h2>
        <form className='my-3'>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" minLength={3} value={pet.name} required id="name" name="name" aria-describedby="emailHelp"
             onChange={onChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" minLength={5} value={pet.description} required id="description" name="description"  onChange={onChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="location" className="form-label">Location</label>
            <input type="text" className="form-control" id="location" name="location" value={pet.location}  onChange={onChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="animal_type" className="form-label">Animal</label>
            <input type="text" className="form-control" id="animal_type" name="animal_type" value={pet.animal_type}  onChange={onChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="gender" className="form-label">Gender</label>
            <input type="text" className="form-control" id="gender" name="gender" value={pet.gender}  onChange={onChange}/>
        </div>
        <div className="mb-3">
                <label htmlFor="height" className="form-label">Height</label>
                <input type="text" className="form-control" required id="height" name="height" value={pet.height}  onChange={onChange}/>
            </div>
        <div className="mb-3">
            <label htmlFor="age" className="form-label">Age</label>
            <input type="text" className="form-control" id="age" name="age" value={pet.age}  onChange={onChange}/>
        </div>
            <button disabled={pet.name.length<3 || pet.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Pet</button>
        </form>
      </div>
    </div>
  )
}

export default AddPet
