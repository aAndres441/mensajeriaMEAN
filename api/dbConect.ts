
const express = require('express');  //import express from 'express';
const cors = require('cors');
const bodyParser = require("body-parser");
const http = require("http");
import mongoose, { Mongoose } from "mongoose";
//const mongoose = require('mongoose');
const mongoClient = require('mongodb').MongoClient;
const { MongoClient } = require("mongodb");

enum Role { CLIENT, ADMIN };

const uri = 'mongodb://localhost/mensajeria';
const uri2 = 'mongodb://localhost:27017/mensajeria';
const uri3 = 'mongodb://localhost:127.0.0.1/mensajeria';
const uri4 = 'mongodb://127.0.0.1:27017/mensajeria';
const MONGO_DB = process.env.DATABASE || uri;
const passAtlas = ' 1vnsvO5xVhOFGrWp ';
const uriAtlas = 'mongodb+srv://FeniFeni:1vnsvO5xVhOFGrWp@cluster0.vz00u.mongodb.net/mensajesMEAN?retryWrites=true&w=majority';

async function init22() { console.log('otra func asyncrona sin guardar'); }

const init2 = (module.exports = async () => {

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  //#region VER connection
  /* app.post('/users/create', async (req: any, res: any) => {
    const user = req.body;
    const client = new mongoClient(uri);
    await client.connect();
    await client.db('mydb').collection('users').insertOne({
      id: parseInt(user.id),
      fname: user.fname,
      lname: user.lname,
      username: user.username,
      email: user.email,
      avatar: user.avatar
    });
    await client.close();
    res.status(200).send({
      "status": "ok",
      "message": ",vaccine:trueUser with ID = " + user.id + " is created",
      "user": user
    });
  }) */
  //#endregion

  //2 formas de iniciar servidor
  //#region crear server 1) http.createServer
  const createServer = async () => {
    try {
      const port = 3000;
      const hostname = "127.0.0.1"; //= localhost
      const server = http.createServer((req: any, res: any) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end(`Hello World\n status= ${res.statusCode}`);
      });

      server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
      });
    } catch (error) {
      console.log('Ta le erro');
    }
  }
  //createServer();
  //#endregion

  //#region crear server 2) init server   
  try {
    app.set('port', process.env.PORT || 2001); //seteamos una variable que inventamos, port, a express para abrir en el puerto del sist operativo o en 3000

    //export app;
    app.get('/', (req: any, res: any) => {
      if (res.statusCode !== 200) {
        throw new Error(`El usuario no existe-`)
      }
      res.status(200).send({
        "status": `OK  ${res.statusCode}`,
        "message": `,vaccine:trueWell well, Hello My World !!!!`
      });
    })

    app.get('/home', (req: any, res: any) => {
      res.send(`status ${res.statusCode} at Home`);
    })

    //listen va al final
    app.listen(app.get('port'), () => {
      console.log('create', `Serverrr listening  on port http://localhost:${app.get('port')}`);
    });
  } catch (e) {
    console.log('ERRAR');
  };
  //#endregion

  mongooseInit();

});

const mongooseInit = async () => {
  //#region options conect to BD
  const options2 = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndexe: true
  };
  const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  };
  //#endregion

  /********  3 diferentes conecciones mongoose, abajo  *****/

  //#region 1) await mongoose.connect
  /*const conn = await mongoose.connect(uriAtlas, options);
  // const conn = await mongoose.connect(MONGO_DB, options);
  try {
    console.time('demoron');
    //console.log(`Database connected succefully in ${uriAtlas}`);
    
    /// manejar los errores después de que se estableció la conexión inicial
    const resu = await conn.connection.on('error', err => {
      console.log('ERRO');
    });
    console.log('Nombre BD_ ', resu.name)
    const cli = resu.getClient();
    if (cli) {
      console.log('Db:', cli.options.dbName,
        '\nPass:', cli.options.credentials?.password);
      console.timeEnd('demoron')
    }
  } catch (error) {
    console.log('ERROR', error);
  }; */
  //#endregion

  //#region 2) await mongoose.connect
/* 
  const db = await mongoose.connect(uriAtlas, options);
  // const db = await mongoose.connect(MONGO_DB, options);

  //comprueba si hay errores al estar conectado
  const resu = mongoose.connection.on('error', err => {
    console.log('ERRO');
  });

  const cleccion = resu.name;
  //console.log('db',db.Collection('mensajesMEAN').count(), '\nnameDDBB', cleccion);   
  
  console.time('demoron');
  console.log('Nombre BD_ ', resu.name);
  const cli = resu.getClient();
  if (cli) {
    console.log('Db:', cli.options.dbName,
      '\nPass:', cli.options.credentials?.password);
    console.timeEnd('demoron');
  }
  try {
    // Demonstrate the readyState and on event emitters
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting,  4 = invalid credentials 

    console.log(db.connection.readyState); //logs 0
    mongoose.connection.on('connecting', () => {
      console.log('connecting')
      console.log(mongoose.connection.readyState); //logs 2
    });
    mongoose.connection.on('connected', () => {
      console.log('connected');
      console.log(db.connection.readyState); //logs 1
    });
    mongoose.connection.on('disconnecting', () => {
      console.log('disconnecting');
      console.log(db.connection.readyState); // logs 3
    });
    mongoose.connection.on('disconnected', () => {
      console.log('disconnected');
      console.log(db.connection.readyState); //logs 0
    });
    //desconector, si quiero
     setTimeout(() => {
      console.time('desconeccion')
      mongoose.disconnect();
      console.timeEnd('desconeccion');
    }, 10000); 
  } catch (error) {
    console.log(error);
  } finally {
    console.log('finally');
  } */
  //#endregion

  //#region 3) mongoose.createConnection
  /* const conn = await mongoose.createConnection(MONGO_DB, options);
  console.time('demoron');
  if (conn) {
    const resu = conn.on('error', err => {
      console.log('ERRO');
    });
    const dbName = conn.getClient().options.dbName;
    console.log(`NAME DB: ${dbName} \nPass:${conn.getClient().options.credentials?.password}`);
    console.timeEnd('demoron');
  }
  else {
    console.log('NO conecta');
  } */
  //#endregion

  //#region 4) mongoClient.connect
  //const cli = await mongoClient.connect(MONGO_DB);
  ///// const cli = await mongoClient.connect(uriAtlas);
  /*  if (err) console.log("Error occurred connecting to MongoDB..."); 
   console.log("Connected to MongoDB!"); 
   console.log(`NAME DB: ${client.db().databaseName}`);
   console.log("mongoUri",MONGO_DB);  
   }); */
  /*   if (cli.db().isConnected()){
      console.log('**********Database*********');
      console.log(`STATUS: ${cli('ONLINE')}`);
      console.log(`NAME DB: ${cli.db().databaseName}`);            
  }
  else{
      console.log('NO conecta');            
  } */
  // o trycatch
  /*  try {
     console.log('**********Database*********');
     console.log(`NAME DB: ${cli.db().databaseName} \nURL: ${MONGO_DB}`);
     console.log(`NAME DB: ${cli.db().databaseName} \nURL: ${uriAtlas}`);
     if (cli) {
       const dbName = cli.db().databaseName; 
       console.log('Db:', cli.options.dbName,
         '\nPass:', cli.options.credentials?.password,
         '\nPodemos insertar, find, etc await inseertOne(cli.db());');
     }
   } catch (error) {
     console.log('NO conecta', error);
   } */

  //#endregion

  //#region 5) await mongoose.connection
  /*   var db = await mongoose.connection;
    !db ? console.log("Hubo un error conectandose a la base de datos") :
    console.log("Conexión a base de datos satisfactoria !!!\n",`${db.name}`); 
    console.log('estado',mongoose.connection.readyState); */

  //#endregion

  //#region 6) await MongoClient require("mongodb")
 //const uriAtlas = 'mongodb+srv://FeniFeni:1vnsvO5xVhOFGrWp@cluster0.vz00u.mongodb.net/mensajesMEAN?retryWrites=true&w=majority';
  
  const client = new MongoClient(uriAtlas);
  
  async function run() {
    try {
      await client.connect();
  
      const databaseName1 = client.db().databaseName;
      const databaseName2 = client.options.dbName;
      console.log(`Db name: ${databaseName2}\nPass:${client.options.credentials?.password}`);
      console.log(`NAME DB: ${client.db().databaseName} \nURL: ${uriAtlas}`);         
     
    /*   // Query for a movie that has the title 'Back to the Future'
      const query = { title: 'Back to the Future' };
      const movie = await movies.findOne(query);  
      console.log(movie); */
      
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
  //#endregion
}

init2();
/* }
export default Database; */

//#region insertOne
const inseertOne = async (db: any) => {
  const dato = {
    name: "Gardel",
    age: 18,
    vaccine: true
  }
  try {
    //db.db().pet.insertOne(dato);
    //const data = await respuesta.json();
    console.log('Data', dato);
    console.log('DB', db.databaseName);
  } catch (e) {
    //console.log ('error',e);
    console.log('error', e);
  };
}
//#endregion

//#region inseertMany
const inseertMany = async (db: any) => {
  //desestructure
  let a: { name: string, age: number, vaccine: boolean }, b: { name: string, age: number, vaccine: boolean };
  ((a = { name: 'Juancito', age: 33, vaccine: false }), (b = { name: 'Lucas', age: 100, vaccine: true }));
  console.log('**', a, '--', b.name)

  try {
    db.db().collection("pet").insertMany([
      { a }, { b },
      { name: "card", age: 15, vaccine: true },
      { name: "envelope", age: 20, vaccine: false },
      { name: "stamps", age: 30, vaccine: true }
    ]);
  } catch (e) {
    console.log('Err', e);
  }
}
//#endregion

//#region buscaPet
const buscaPet = async (db: any) => {
  const pets = await db.db().collection("pet").find({ name: "Gardel" });
  console.log('Res', pets);
}
//#endregion

  //#region desconectarse
/*   const descon = async () => {
    console.time('desconeccion')
    setTimeout(() => {
      mongoose.disconnect();
      console.log(mongoose.connection.readyState);
      console.timeEnd('desconeccion');
    }, 3000);
  } */
  //descon();
  /// db.close();
  //#endregion

