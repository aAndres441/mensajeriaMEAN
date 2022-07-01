const mongoose = require('mongoose');
const UserSchema = require('../schemas/userSchema');


 const  usuario = new mongoose.model('ususa',UserSchema);

 export default usuario;