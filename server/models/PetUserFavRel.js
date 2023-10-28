const mongoose = require('mongoose');
const {Schema} = mongoose;

const PetUserFavRelSchema = new mongoose.Schema(
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
const PetUserFavRel = mongoose.model('pet_user_fav_rel',PetUserFavRelSchema);
module.exports = PetUserFavRel;