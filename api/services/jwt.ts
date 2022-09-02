const jwt = require('jwt-simple');
const moment = require('moment');

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
   // import dotenv from 'dotenv';
}

const miSecretToken = 'clave red social Angular11';
const tokenKey = process.env.SECRET_TOKEN || miSecretToken;

const mo1 = moment("Jun 14th, 1973", "MMM-DD-YYYY");
const fechaCreacion = moment().unix().toString();

console.log('You are: ' + mo1.fromNow() + ' old, required from jwt.ts');

/*  CREA TOKEN */
//const createtoken = (user:any) => {// si exporo todo el modulo le agrego const
exports.createtoken = (user:any) => {    
    let payload = {
        sub:user._id,
        name:user.name,
        surname:user.surname,
        nick:user.nick,
        email:user.email,
        role:user.rol,
        image:user.image,
        cel:user.cel,
        iat:moment().unix(),//fecha de creacion
        exp:moment().add(30,'days').unix(), //fecha de expiracion
    };

    return jwt.encode(payload,tokenKey);// encode genera un hash con payload y secretKey
};

/* DECODIFICA TOKEN */


/* module.exports = {
    createtoken,
    mo1,
    mensajeIndicador
} */