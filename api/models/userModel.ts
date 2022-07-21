const mongoose = require('mongoose');
const UserSchema = require('../schemas/userSchema');

export const UsuarioModel = new mongoose.model('users',UserSchema);
//export const UsuarioModel = new mongoose.model('users',UserSchema);

 //export default UsuarioModel;

//**********le comente esto y anda asi********************
// module.exports = {UsuarioModel};


 //module. exports = mongoose.model('users',UserSchem2)
