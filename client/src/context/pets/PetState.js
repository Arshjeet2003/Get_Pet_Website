import { useState } from "react";
import PetContext from './petContext.js';  

const PetState = (props)=>{

    const host = "http://localhost:5003"

    const [pets,setPets] = useState([]);
    const [favpets,setfavPets] = useState([]);

    const getPets = async ()=>{
        const response = await fetch(`${host}/api/pets/getallpets`,{
            method: 'GET',
            headers:{
            }
        });
        const json = await response.json();
        setPets(json);
    }

    const getUserPets = async ()=>{
        const response = await fetch(`${host}/api/pets/getpets`,{
            method: 'POST',
            headers:{
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setPets(json);
    }

    const getFavPets = async ()=>{
        const response = await fetch(`${host}/api/pets/getfavpets`,{
            method: 'POST',
            headers:{
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setfavPets(json);
    }

    const addPet = async (name,description,location,animal_type,gender,height,age)=>{
        const response = await fetch(`${host}/api/pets/addpet`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({name,description,location,animal_type,gender,height,age})
        });

        const pet = await response.json();
        setPets(pets.concat(pet));
    }

    const addFavPet = async (id)=>{
        const response = await fetch(`${host}/api/pets/addfavpet/${id}`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const pet = await response.text();
    }

    const deleteFavPet = async (id)=>{
        const response = await fetch(`${host}/api/pets/removefavpet/${id}`,{
            method: 'DELETE',
            headers:{
                'auth-token': localStorage.getItem('token')
            }
        });
        const json =  await response.text();
        // const newPets = pets.filter((pet)=>{return pet._id!==id})
        // setPets(newPets);
    }

    const deletePet = async (id)=>{
        const response = await fetch(`${host}/api/pets/deletepet/${id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json =  await response.json();
        const newPets = pets.filter((pet)=>{return pet._id!==id})
        setPets(newPets);
    }

    const editPet = async (id,name,description,location,animal_type,gender,height,age)=>{
        const response = await fetch(`${host}/api/pets/updatepet/${id}`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({name,description,location,animal_type,gender,height,age})
        });
        const json =  await response.json();
        let newPets = await JSON.parse(JSON.stringify(pets))
        for(let index=0; index<newPets.length; index++){
            const element = newPets[index];
            if(element._id === id){
                newPets[index].name = name;
                newPets[index].description = description;
                newPets[index].location = location;
                newPets[index].animal_type = animal_type;
                newPets[index].gender = gender;
                newPets[index].gender = gender;
                newPets[index].age = age;
                break;
            }
        }
        setPets(newPets);
    }

    return (
        <PetContext.Provider value={{pets,favpets,addPet,deletePet,editPet,getPets,getUserPets,
            getFavPets,addFavPet,deleteFavPet}}>
            {props.children}
        </PetContext.Provider>
    );
}

export default PetState;