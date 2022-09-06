const {mongoose, model} = require('mongoose');
const UserSchema = require('../schemas/userSchema');

export const UsuarioModel2 = new mongoose.model('users',UserSchema);
export const UsuarioModel = new model('users',UserSchema);
//Se puede requerir e importar de las dos formas, y esta bien;

 //export default UsuarioModel;

//**********le comente esto y anda asi********************
// module.exports = {UsuarioModel};


 //module. exports = mongoose.model('users',UserSchem2)
