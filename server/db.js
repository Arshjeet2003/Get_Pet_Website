const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://arsh_1709:RpzAe2w2SfbbKmMY@practisecluster.kcs8xis.mongodb.net/get_pet";

async function connectToMongo() {
    await mongoose.connect(mongoURI).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
  }

module.exports = connectToMongo;