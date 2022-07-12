const mongoose = require('mongoose');
const UserSchema = require('../schemas/userSchema');


//export const UsuarioModel = new mongoose.model('userssss',UserSchema);
export const UsuarioModel = new mongoose.model('users',UserSchema);


 //export default UsuarioModel;
 module.exports = {UsuarioModel};