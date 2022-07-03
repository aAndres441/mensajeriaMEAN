//'use strict'
//const express = require('express');
//const cors = require('cors');
//const bodyParser = require("body-parser");
//import { Router} from 'express';
//const Router = require('Router');
//import mongoose from 'mongoose';
const mongoose = require('mongoose');
/* const path = require('path');
const router = require('router'); */
import { Schema, model, Document, Types } from 'mongoose';
const IUser = require('./interfaces/Iuser');

//#region mongoose
/* ** MONGOOSE**** */
/* mongoose.connect(mongoUrl, { useNewUrlParser: true });
var db = mongoose.connection;
!db ? console.log("Hubo un error conectandose a la base de datos") : console.log("Conexión a base de datos satisfactoria");
*/
//#endregion

//const url = 'mongodb://localhost/mensajeria';
const url = 'mongodb://localhost/calabrese';
const MONGO_DB = process.env.DATABASE || url;
const passAtlas = ' 1vnsvO5xVhOFGrWp ';
const uriAtlas = 'mongodb+srv://FeniFeni:1vnsvO5xVhOFGrWp@cluster0.vz00u.mongodb.net/mensajesMEAN?retryWrites=true&w=majority';
//#region options conect to BD
 const options2 = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true

    //son opciones deprecadas desde V 6 mongoose, ya n o van
  };
/*  const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  }; */
  //#endregion

//#region init()
const init2 = async () => {
    console.time("Tiempo coneccion a BD");
      try {
         /*const conn = await mongoose.connect(
        MONGO_DB,options2,(er:any)=>{
          if(er) console.log("Error occurred connecting to MongoDB...",er);          
          console.log(`Connected to MongoDB!\nNAME DB: ${mongoose.connection.getClient().options.dbName}`);
        }); */

        /*Si crea una conexión personalizada, use la model()función de esa conexión en su lugar.
        const connection = mongoose.createConnection('mongodb://localhost:27017/test');
        const Tank = connection.model('Tank', yourSchema);*/

       const conn = await mongoose.connect(MONGO_DB,{ serverSelectionTimeoutMS: 5000}) //cuánto tiempo mongoose.connect()se volverá a intentar la conexión inicial antes de fallar.
       //const conn = await mongoose.connect(MONGO_DB, options2)
       
        console.log(`Connected to MongoDB!\nNAME DB: ${mongoose.connection.getClient().options.dbName}`);
        console.timeEnd("Tiempo coneccion a BD");

       // insertarPet();
        //insertarUsus();
        //insertOwner();
        //insertTank().catch(err => console.log(err,'Ta le erro'));
       //findOne();
       //findOneAndUpdate();
      
       }
       catch{
        ()=>{console.log("Error occurred connecting to MongoDB...");}
       }
       
       //manejar los errores después de que se estableció la conexión inicial
       mongoose.connection.on('error',  (err:any)=> {
           console.log(err, 'Error');
         });

         //escuchar el disconnectedevento para informar cuando Mongoose se desconecta de MongoDB.

       /*
    ¡Importante! Si abrió una conexión separada utilizando ´
    mongoose.createConnection()pero intenta acceder al modelo
     a través de mongoose.model('ModelName')él, no funcionará
      como se esperaba, ya que no está conectado a una conexión
       de base de datos activa. En este caso accede a tu modelo
        a través de la conexión que creaste:
     */
    ////const conn = mongoose.createConnection('your connection string');
    
    /////module.exports = db;  //esta ser la requerida con .db desde index o donde sea que este el express(), etc 

}
init2();

//#endregion

//#region Create MODELS Y SCHEMA
///**********  ***************** */
/* import {UserSchema} from './schemas/userSchema';
import {PublicacionSchema} from './schemas/publicacionSchema'; */
const usu = require('./models/userModel');
//import {usuario} from './models/userModel';
//import usuario from './models/userModel';
const pub = require('./models/publicacionModel');

//#endregion

//#region PRUEBA
interface Itank {name?:String,isMayor:boolean}
const yourSchema = new mongoose.Schema(
  { 
  name:String, 
  size: {type:String,required: [true, 'Why no size?'],enum: ['small', 'big']},
  date: { type: Date, default: Math.floor(Date.now() / 1000) },
  cel: {
    type: Number,
    min: [6, 'Must be at least 6, got {VALUE}'],
    max: [32, 'Must be at greater 22, got {VALUE}']
    },  
  },
  {
   timestamp:true,  //crea dato creacion y actualizacion
   versionKey:false, //elimina _v prop version en BD
   currentTime: () => Math.floor(Date.now() / 1000) //no se bien
  }
);
const Tank = new mongoose.model('Tank', yourSchema);

yourSchema.virtual('fullName').get(()=> {  //para devolver info
  return 'first +   +name.last';
});
//2 formas de agregar 
/* Tank.create({name:'Ana',size: 'small11' }, (err:any)=> {
  if (err) return handleError(err);
}) */
const insertTank = async ()=>{
  try {
    await Tank.create({name:'Ana',size: 'small',cel :20 });   
    console.log('saved!');
  } catch (error) {
    //assert.equal(error, null);
    console.log('Not saved!', error);
  }
}
/* //errorresponse
let erro;
erro = Tank.validateSync();
//assert.equal(erro.errors['size'].message,'User size number required');
 */
const Tank2 = new Tank ({name:'manu',size: 'big',cel :27 });   
//findOne
const findOne = async () => {
  const res =  await Tank.findOne({ name: 'Juancito' });
  if (res == null || res instanceof Object) {
    //throw new Error('should be populated');
    console.log('should be populated');
  } else {
    // Works
    console.log('Tank.name.trim();');
  }
  console.log('RES=', res);
}
// `updatedAt`.
const findOneAndUpdate = async ()=>{
const res = await Tank.findOneAndUpdate({ name: 'Mono' }, { name: 'test3' }, {
  new: true,
  timestamps: false
});
console.log('Update-',Tank.updatedAt);
console.log('resres-',res);
}
/* Tank.insertMany([{ name:'Mono',size: 'small',cel:7 },
{ name:'Juancito',size: 'big',cel:10 }], (err:any)=> {
  if (err) return handleError('Error-insertMany');
  // saved!
}); */

//#endregion

//#region OWNER
const ownerSchema=new mongoose.Schema({
  name:String,
  //name:{Type:String,,required: [true, 'Who is Owner?'],
  direcction:{Type:String},
 },
 {
  timestamp:true,  //crea dato creacion y actualizacion
  versionKey:false //elimina _v prop version en BD
 })
 const ownerModel = new mongoose.model('owner',ownerSchema );

 const insertOwner = async () => {
  const own = await ownerModel.create({
    name:'Juancito', 
    direcction: 'Labandera 817'
  })
 }
//#endregion

//#region PETS
const petSchema = new mongoose.Schema({
  name: { type: String},//,required: true 
  color: {
    type: String!,
    enum: {
      values: ['Coffee', 'Tea'],
      message: '{VALUE} is not supported' 
    }
  },
  age: {
    type: Number,
    min: [6, 'Must be at least 6!!, got {VALUE}'],
    max: [33, 'Must be at greater than 33!!, got {VALUE}'],
  },
  owner: {
    type: Types.ObjectId, ref:'owner'
    //type: mongoose.Types.ObjectId, ref:'owner'
  },
},
  { timestamps: true }
)

const petModel = new mongoose.model('pet',petSchema);

const insertarPet = async  ()=>{
     
/* try {
  await petModel.validate({ name: null }, ['name'])
} catch (err:any) {
  err instanceof mongoose.Error.ValidationError; // true
  Object.keys(err.errors); // ['name']
}  */
  const uu = await petModel.create({
    name:'Gardel ',
    color:'grey',
    age:334,
    owner!:''
  });
  console.log(`Insertado el usu- ${uu}`);
}
//#endregion


function handleError(err: string) {  
  console.log(err,'Function dice:');
  throw new Error(err);
}

//export default Database;


