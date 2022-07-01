'use strict'
//const express = require('express');
//const cors = require('cors');
//const bodyParser = require("body-parser");
//import { Router} from 'express';
//const Router = require('Router');
//import mongoose from 'mongoose';
const mongoose = require('mongoose');
/* const path = require('path');
const router = require('router'); */


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
    //useFindAndModify: false,
    //useCreateIndexe: true
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
 
   /*  const conn = await mongoose.connect(
        MONGO_DB,options2,(er:any)=>{
          if(er) console.log("Error occurred connecting to MongoDB...",er);          
          console.log(`Connected to MongoDB!\nNAME DB: ${mongoose.connection.getClient().options.dbName}`);
        }); */
       const conn = await mongoose.connect(MONGO_DB, options2)
       try {
        console.log(`Connected to MongoDB!\nNAME DB: ${mongoose.connection.getClient().options.dbName}`);
        console.timeEnd("Tiempo coneccion a BD");

        insertarPet();
        //insertarUsus();
       }
       catch{
        ()=>{console.log("Error occurred connecting to MongoDB...");}
       }
      
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

//#region Create
///********** MODELS Y SCKCEMA ***************** */
/* import {UserSchema} from './schemas/userSchema';
import {PublicacionSchema} from './schemas/publicacionSchema'; */
const usu = require('./models/userModel');
//import {usuario} from './models/userModel';
//import usuario from './models/userModel';
const pub = require('./models/publicacionModel');

//PETS
const petSchema = new mongoose.Schema({
  name:{type:String,required:true},
  color:String!,
  cel:Number!
}, { timestamps:true})

const petModel = new mongoose.model('pet',petSchema);

const insertarPet = async  ()=>{
  const uu = await petModel.create({
    name:'Tomasa ',
    color:'blues',
    cel:678
  });
  console.log(`Insertado el usu- ${uu}`);
}
 
//#endregion

//export default Database;


