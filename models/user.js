const  mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.Mongo_uri);

const userSchema = mongoose.Schema({
    image : String,
    email : String,
    name : String
});

module.exports=mongoose.model('user',userSchema);