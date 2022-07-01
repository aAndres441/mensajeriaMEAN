import mongoose from "mongoose";
//const mongoose = require('mongoose');
const mongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://localhost/mensajeria';
const uri2 = 'mongodb://localhost:27017/mensajeria';
const uri3 = 'mongodb://localhost:127.0.0.1/mensajeria';
const uri4 = 'mongodb://127.0.0.1:27017/mensajeria';
const MONGO_DB = process.env.DATABASE || uri;
const passAtlas = ' 1vnsvO5xVhOFGrWp ';
const uriAtlas = 'mongodb+srv://FeniFeni:1vnsvO5xVhOFGrWp@cluster0.vz00u.mongodb.net/mensajeria?retryWrites=true&w=majority';

//const init2 = (module.exports = async () => {todo}
//init2();
//const mongooseInit = async () => { }

class DatabaseMongoose {
  async init() {
    //inicializamos BD, conectamos con variables de entorno .env

    /* const db = client.db();
    return db; */
    //#region options conect to BD
    /*  const options = {
       useNewUrlParser: true,
       useUnifiedTopology: true,
       useFindAndModify: false,
       useCreateIndexe: true
     }; */
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

    //const db =  await mongoose.connect(uriAtlas, options);
    /*  const db = await mongoose.connect(MONGO_DB, options);
     
     //comprueba si hay errores al estar conectado
     const resu = mongoose.connection.on('error', err => {
       console.log('ERRO');
     });
     console.log('Nombre BD_ ', resu.name);
     const cli = resu.getClient();
     if (cli) {
       console.log('Db:', cli.options.dbName,
         '\nPass:', cli.options.credentials?.password);
       console.timeEnd('demoron')
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
       //desconector
       setTimeout(() => {
         console.time('desconeccion')
         mongoose.disconnect();
         console.timeEnd('desconeccion');
       }, 3000);
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
    const client = await mongoClient.connect(MONGO_DB, {  useNewUrlParser:true,useUnifiedTopology: true }, (err: any, cli: any) => {
      if (err) console.log("Error occurred connecting to MongoDB...");
      console.log("Connected to MongoDB!");
      console.log(`NAME DB: ${client.db().databaseName}`);
      console.log("mongoUri", uri);
     try {
      console.log(`NAME DB: ${cli.db().databaseName}`);
     } catch (error) {
      console.log("Error occurred connecting to MongoDB!!!!...");
     }
      return cli;
    });
    // o trycatch
    /*  try {
         console.log('**********Database*********');       
         console.log(`NAME DB: ${client.db().databaseName}`);
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

    //#region devolverUsu
    /* const devolverUsu = async () => {
       const datoUser = await dbName.collection("users").find({name:"Ana"});
       console.log("Dato",)
       } */
    //#endregion

  }


}

export  function fenix(): string {
  console.log("FENIX");
  return 'fenix';
}


export default DatabaseMongoose;