const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Pet = require('../models/Pet');
const Pet_User_Rel = require('../models/PetUserRelation');
const Pet_User_Fav_Rel = require('../models/PetUserFavRel');
const { body, validationResult } = require('express-validator');
const PetUserRel = require('../models/PetUserRelation');
const PetUserFavRel = require('../models/PetUserFavRel');

// ROUTE 1: Get all the pets of user using: GET "/api/pets/getpets".
router.post('/getpets', fetchuser, async (req, res) => {
    try {
      const user_id = req.user.id;
  
      // Find user-pet relations for the given user
      const userPetRelations = await Pet_User_Rel.find({ user: user_id });
  
      // Extract the pet IDs from user-pet relations
      const petIds = userPetRelations.map(relation => relation.pet);
  
      // Find pets using the extracted pet IDs
      const pets = await Pet.find({ _id: { $in: petIds } });
  
      res.json(pets);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Get all the pets using: GET "/api/pets/getallpets".
router.get('/getallpets', async (req,res)=>{
    try {
        const pets = await Pet.find();
        res.json(pets);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3: Get all the favourite pets of user using: GET "/api/pets/getfavpets".
router.post('/getfavpets', fetchuser, async (req, res) => {
    try {
      const user_id = req.user.id;
  
      // Find user-pet relations for the given user
      const userPetFavRelations = await Pet_User_Fav_Rel.find({ user: user_id });
  
      // Extract the pet IDs from user-pet relations
      const petIds = userPetFavRelations.map(relation => relation.pet);
  
      // Find pets using the extracted pet IDs
      const pets = await Pet.find({ _id: { $in: petIds } });
  
      res.json(pets);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
});

// ROUTE 4: Add a new pet using: POST "/api/pets/addpet".
router.post('/addpet',fetchuser,[
    body('name','Enter a valid name').isLength({min: 3}),
    body('description','Description must be atleast 5 characters').isLength({min: 5})
], async (req,res)=>{
    try {
        const {name,description,location,animal_type,gender,height,age} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const pet = new Pet({
            name,description,location,animal_type,gender,height,age,
        })

        const savedPet = await pet.save();

        res.json(savedPet);
        const pet_id = savedPet._id;

        const pet_user_rel = new Pet_User_Rel({
            user: req.user.id,
            pet: pet_id,
        })
        const savedRel = await pet_user_rel.save();
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 5: Add a favourite pet using: POST "/api/pets/addfavpet".
router.post('/addfavpet/:id',fetchuser, async (req,res)=>{
    try {
        const petid = req.params.id;

        const pet_user_fav_rel = new Pet_User_Fav_Rel({pet: petid,user: req.user.id});

        const savedFavPet = await pet_user_fav_rel.save();

        res.json(savedFavPet);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 6: Delete an existing fav pet using: DELETE "/api/pets/removefavpet".
router.delete('/removefavpet/:id',fetchuser, async (req,res)=>{
    try {

        const userPetFavRelations = await Pet_User_Fav_Rel.findOne({ pet: req.params.id, user: req.user.id });

        temprel = await Pet_User_Fav_Rel.findByIdAndDelete(userPetFavRelations._id);

        res.json({"Success" : "Pet has been unmarked"});
    } 
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 7: Update an existing pet using: PUT "/api/pets/updatepet".
router.put('/updatepet/:id',fetchuser, async (req,res)=>{
    const {name,description,location,animal_type,gender,height,age} = req.body;

    try {
        const newPet = {};
        if(name){newPet.name = name};
        if(description){newPet.description = description};
        if(location){newPet.location = location};
        if(animal_type){newPet.animal_type = animal_type};
        if(gender){newPet.gender = gender};
        if(height){newPet.height = height};
        if(age){newPet.age = age};

        let pet = await Pet.findById(req.params.id);
        if(!pet){return res.status(404).send("Not Found")}

        const userPetRelations = await Pet_User_Rel.findOne({ pet: req.params.id });

        if(userPetRelations.user.toString() !== req.user.id){
            return res.status(404).send("Not Allowed");
        }

        pet = await Pet.findByIdAndUpdate(req.params.id,{$set:newPet},{new:true});
        res.json({pet});
    } 
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 8: Delete an existing pet using: DELETE "/api/pets/deletepet".
router.delete('/deletepet/:id',fetchuser, async (req,res)=>{
    try {
        let pet = await Pet.findById(req.params.id);
        if(!pet){return res.status(404).send("Not Found")}

        const userPetRelations = await Pet_User_Rel.findOne({ pet: req.params.id });

        if(userPetRelations.user.toString() !== req.user.id){
            return res.status(404).send("Not Allowed");
        }
        pet = await Pet.findByIdAndDelete(req.params.id);
        temprel = await PetUserRel.findByIdAndDelete(userPetRelations._id);

        res.json({"Success" : "Pet has been deleted",pet:pet});
    } 
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;

