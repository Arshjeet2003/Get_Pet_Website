const mongoose = require('mongoose');
const {Schema} = mongoose;

const PetSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        location: String,
        animal_type: String,
        gender: String,
        height: Number,
        age: Number,
        date:{
            type: Date,
            default: Date.now
        }
    }
)
const Pet = mongoose.model('pet',PetSchema);
module.exports = Pet;