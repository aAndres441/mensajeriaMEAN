/*
*DB Mongoose
*/

const mongoose = require('mongoose');
import {Types,Mongoose } from 'mongoose';


//******** MONGOOSE**** *******

const urlMongoose = 'mongodb://localhost/mensajeria';
const passAtlas = ' 1vnsvO5xVhOFGrWp ';
const uriAtlas = 'mongodb+srv://FeniFeni:1vnsvO5xVhOFGrWp@cluster0.vz00u.mongodb.net/mensajesMEAN?retryWrites=true&w=majority';
                
//const MONGO_DB = process.env.DATABASE || urlMongoose;
const MONGO_DBSInComillas = process.env.URI_ATLAS || uriAtlas;
const MONGO_DB = MONGO_DBSInComillas.replace(/['"]+/g,'') || uriAtlas;



/***
 * si lo inicio al final dbInit(), lo puedo llamar de otro modulo sin exportar
 * sino export default dbInit y lo importo de otro  modulo
 * */
 const dbInit = async () => {
  try {
   const conn = await mongoose.connect(MONGO_DB, { serverSelectionTimeoutMS: 5000 }) //cuánto tiempo mongoose.connect()se volverá a intentar la conexión inicial antes de fallar.
   
   const state = await conn.connection.readyState; // MongoClient { ... }

    console.log(`Conectado a base datos de Mongoose!\nNAME DB: ${mongoose.connection.getClient().options.dbName}--🧞  -- `);
    
    console.log(`-Estado de la Coneccion- ${state}`);
    
  }
  catch {
    () => { console.log("Error occurred connecting to MongoDB..."); }
  }

  //manejar los errores después de que se estableció la conexión inicial
  mongoose.connection.on('error', (err: any) => {
    console.log(err, 'Error');
  });
  
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
/* dbInit(); */

export default dbInit;


