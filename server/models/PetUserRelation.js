const mongoose = require('mongoose');
const {Schema} = mongoose;

const PetUserRelSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        pet:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'pet'
        },
    }
)
const PetUserRel = mongoose.model('pet_user_rel',PetUserRelSchema);
module.exports = PetUserRel;