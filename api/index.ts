'use strict'
//const express = require('express');
//const cors = require('cors');
const bodyParser = require("body-parser");
//import { Router} from 'express';
//const Router = require('Router');
//import mongoose from 'mongoose';
const mongoose = require('mongoose');
/* const path = require('path');
const router = require('router'); */
import { Schema, model, Document, Types,Mongoose } from 'mongoose';
const IUser = require('./interfaces/Iuser');

//const Usuario = require('./models/userModel');
import {UsuarioModel} from './models/userModel';
//const pub = require('./models/publicacionModel');
import {PublicacionModel} from './models/publicationModel';
import {CategoryModel} from './models/categoryModel';
import {FollowModel} from './models/followModel';
import {MessageModel} from './models/messageModel';

//#region mongoose
/* ** MONGOOSE**** */
/* mongoose.connect(mongoUrl, { useNewUrlParser: true });
var db = mongoose.connection;
!db ? console.log("Hubo un error conectandose a la base de datos") : console.log("Conexión a base de datos satisfactoria");
*/
//#endregion

//const url = 'mongodb://localhost/calabrese';
const url = 'mongodb://localhost/mensajeria';
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

    const conn = await mongoose.connect(MONGO_DB, { serverSelectionTimeoutMS: 5000 }) //cuánto tiempo mongoose.connect()se volverá a intentar la conexión inicial antes de fallar.
    //const conn = await mongoose.connect(MONGO_DB, options2)

    console.log(`Connected to MongoDB!\nNAME DB: ${mongoose.connection.getClient().options.dbName}`);

    const state = await conn.connection.readyState; // MongoClient { ... }
    console.log(`-ESTADO- ${state}`);

    //console.log('COUNT',conn.Collection('calabrese').count());

    console.timeEnd("Tiempo coneccion a BD");

    // -------------  DESCONECCION  ------------
    //cerrarConeccion(conn); /*llamo a esta o uso metodo de abajo*/
    /* mongoose.disconnect();
    const state2 = await conn.connection.readyState;
    console.log(`-ESTADO si es 3 => desconectado- ${state2}`); */

    //#region USUARIOS metodos
    //crearUsuarios();
    ////findAllUsus();
    //findByIdUsu();
    //updateOneUsu();
    //deleteOneUsu();    
    //#endregion
   
    //#region CATEGORIES
    //createCat();
    //categoryCount();
    //findAggregateCat();    
    //relCategoryPost(); //todas las categoris con que estan en post
    //#endregion

    //#region PUBLICACIONES metodos
    //crearPosts();
    //findAllPosts();
    //findByIdpost();
    //deleteOnepPost();
    //findAggregate();
    //PROBLEMAS ACA ABAJO
   //findAggregateRelacionUsu();
    //findAggregateRelacioYFiltro();
    //findAggregateCount();

    //relPostCategoryFiltro(); ////relacion desde posts a buscar array category
    //relPostCategorySimple(); // relacion Dos Sentidos Post/Category muestra post con sus categorias
    //#endregion
   
    //#region FOLLOWS
    //createFollow();
    //findAllFollows();
    //countFollowsAggregate();
    //findRelFollowsUsu(); //relacion desde Follow a buscar algo que no hay , Array
    
     //PROBLEMAS ACA ABAJO
    /////////relFollowUsus(); // relacion Dos Sentidos Follows/Usus muestra follow con sus usus
    //#endregion
    
    //#region MESSAGE
    createMessage();
    //getMessage();
    //findAllMessage();
    //countMessageAggregate();
    //deleteMessage();
    //findMessageFiltro();
    //updateOneMessage();
    //#endregion

    //#region PruebaTank metodos
    // insertarPet();
    //insertarUsus();
    //insertOwner();
    //insertTank().catch(err => console.log(err,'Ta le erro'));
    //findOne();
    //findOneAndUpdate();
    //updateOne(); 
    //updateMany();
    //findAll();  
    //findFiltro();  
    /* setTimeout(() =>{ findOne(); },6000); */
    //findById();
    //deleteOne();    
    //#endregion
    
    //dropCollection(conn);
   
    //#endregion
  }
  catch {
    () => { console.log("Error occurred connecting to MongoDB..."); }
  }

  //manejar los errores después de que se estableció la conexión inicial
  mongoose.connection.on('error', (err: any) => {
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

//#region USUARIOS CRUD
//#region create 
const crearUsuarios = async ()=>{
try {
  const res = await UsuarioModel.create([
  {name:'Monica',surname:'Colman',nick:null,email:'moni@gmail.com',password:'1234s',role:'admin',image:null,cel:2564},
  {name:'Kari',surname:'Sandes',nick:null,email:'kari@gmail.com',password:'tt344s',role:'admin',image:null,cel:8964},
  {name:'Ana',surname:'Lavalle',nick:null,email:'ana@gmail.com',password:'aae3',role:'user',image:null,cel:7944},
  {name:'Juancito',surname:'Perez',nick:null,email:'juju@gmail.com',password:'tr44',role:'admin',image:null,cel:6577},
  {name:'Laura',surname:'Menegel',nick:null,email:'laura@gmail.com',password:'7u76',role:'user',image:null,cel:90643},
  {name:'Mono',surname:'Peralta',nick:null,email:'mono@gmail.com',password:'y6w6',role:'user',image:null,cel:38214}
]);
  console.log('Users create succefully');
  
} catch (e) {
  console.log('error al crear Usuario',e);  
}
};
//#endregion 
//#region deleteOne 
const deleteOneUsu = async ()=>{
try {
  const res = await UsuarioModel.deleteOne({name:'Kari'});
  //const res = await UsuarioModel.deleteOne({_id:'62cc6a3dcd2b2fed889c70d4'});
  console.log('Users Delete succefully',res);
  } catch (e) {
  console.log('error al eliminar Usuario',e);  
}
};
//#endregion
//#region findById
const findByIdUsu = async()=>{
  try {
  const res = await UsuarioModel.findById('62cc6a3dcd2b2fed889c70d4');
  console.log('Por ID:',res.name);    
  } catch (error) {
    console.log('No exist this ID usuario');    
  }  
 }
//#endregion
//#region findAll trae array de todos
const findAllUsus = async () => {
 try {
  const res = await UsuarioModel.find();
  res.forEach((element:any) => {
    //element.map((input:any) => input.value)
  console.log(' NAME===>',element.name +'---'+ element._id);
  })
 } catch (error) {
  console.log('Error All', error);  
 }
}
//#endregion
//#region updateOne
const updateOneUsu =async () => {
  try {
    const res = await UsuarioModel.updateOne({ name: 'Juancito' }, { name: 'Jean-Luc Picard'});
    console.log('UPDATE-',res);    
  } catch (error) {
    console.log(error);    
  }
}
//#endregion
//#endregion 

//#region PUBLICACIONES POST CRUD
    //#region crearPosts 
const crearPosts = async () => {
  try {
    const res = await PublicacionModel.create([
      { name: 'Futbol', description: 'ther is a bad match', file: null, userId: '62cc6e8efe33c6d855e60d99', category: ['Sport', 'Tech'] },
      { name: 'F1', description: 'great race', file: null, userId: '62cc6e8efe33c6d855e60d9a', category: ['Tech', 'Sport', 'Game'] },
      { name: 'Muñeca', description: 'lovely place', file: null, userId: '62cc6e8efe33c6d855e60d99', category: ['Tech', 'Sport', 'Game'] },
      { name: 'Cooking', description: 'i hate it', file: null, userId: '62cc6e8efe33c6d855e60d9b', category: ['Health', 'Tech'] },
      { name: 'Golf', description: 'i dont know', file: null, userId: '62cc6e8efe33c6d855e60d9c', category: ['Sport', 'Game', 'Food'] },
      { name: 'Medico', description: 'hello', file: null, userId: '62cc6e8efe33c6d855e60d9d', category: ['Health', 'Game'] },
      { name: 'Dev', description: 'backend', file: null, userId: '62cc6e8efe33c6d855e60d9e', category: ['Tech','Food', 'Game'] },
      { name: 'DevOp', description: 'fron-Back', file: null, userId: '62cc6e8efe33c6d855e60d9e', category: ['Tech','Sport', 'Health'] }
    ]);
    console.log('Posts create succefully');
  } catch (e) {
    console.log('error al crear Post', e);
  }
};
  //#endregion 
    //#region deleteOne 
    const deleteOnepPost = async ()=>{
    try {
      const res = await PublicacionModel.deleteOne({_id:''});
      console.log('Post Delete succefully',res);
      } catch (e) {
      console.log('error al eliminar Post',e);  
    }
    };
    //#endregion
    //#region findById
    const findByIdpost = async()=>{
      try {
      const res = await PublicacionModel.findById('');
      console.log('Por ID:',res.name);    
      } catch (error) {
        console.log('No exist this ID Post');    
      }  
    }
    //#endregion
    //#region findAll trae array de todos
    const findAllPosts = async () => {
    try {
      const res = await PublicacionModel.find();
      console.log(res);
    } catch (error) {
      console.log('Error All', error);    
    }
    }
    //#endregion
    //#region Metodos de aggregate relaciones
      //#region find c / aggregate  agrupa por name
      const findAggregate = async () => {
      try {
        const array = await PublicacionModel.aggregate([{
        $group: { _id: "$name" }}] ) //_id refiere a prop a mostrar de la coleccion 
        console.log(`Aggregate ---${JSON.stringify(array)}`);  
          //Lo copio y veo onLine en cualquier lugar que parsee el resultado    
        }
      catch (error) {
        console.log('Error aggregate', error);
      }
    }
        //#endregion
      //#region lookup $unwind RelacionPostUsu
      const findAggregateRelacionUsu = async () => {
        try {
          const array = await PublicacionModel.aggregate(
            [
              {
                $lookup:
                {
                  from: 'users',  //en Usus
                  localField: 'userId', //en Post
                  foreignField: '_id',//en Usus
                  as: 'usuAuthor'
                },
              },
              {
                $unwind:  //muestra con el array de ususarios
                {
                  path: '$usuAuthor',
                  includeArrayIndex: 'DATA',
                  preserveNullAndEmptyArrays: true
                }
              }]);
          console.log('DATO', array);
          //con for await muestro solo algun dato ..
          /*  for await (let valor of array) {
            for (let dato of valor.usuAuthor) {
              console.log(`Publicacion ${valor.name} del Autor: ${dato.name}`);
            }
          }  */
        } catch (error) {
          console.log('EEEE');
        }
      }
        //#endregion 
      //#region relacion Dos Sentidos Post/Category muestra post con sus categorias
      const relPostCategorySimple = async () => {
        try {
          const res = await PublicacionModel.aggregate(
            [
              {
                $lookup: {
                  from: 'categories', //"otherCollection",
                  localField: 'category',
                  foreignField: 'superName',
                  as: 'laCategoria'
                }
              },
              {
                $unwind: { //relacion unwind es para el ARRAY de categorias en Post
                  path: '$laCategoria',
                  includeArrayIndex: 'Nada',
                  preserveNullAndEmptyArrays: true
                }
              },{$group: { _id: "$name"}} //al agregar esto, solo verer los names de las cat
            ]
          );
          console.log(`OneToMany-${JSON.stringify(res)}`);

          for await(let t of res)  console.log('La Cat name',t._id);   

        } catch (error) {
          console.log('RELACION " sentidos', error);
        }
      }
      //#endregion
      //#region relPostCategory con Filtro de match 
  const relPostCategoryFiltro = async () => {
    try {
      const res = await PublicacionModel.aggregate( [
          { $lookup:
            { from:'categories', //relacion desde posts a buscar category
              let: { aliasCcategory: '$category' }, //prop de post
              pipeline: [//todo dentro de pipeline sera de category y usa el alias de let
                {$match: {
                    $expr: {$in: ['$superName','$$aliasCcategory']}  //segundo arg es el array de cat en posts $category prop de post                  
                  }
                }
              ],  //como filtro segun yo quiera eh $match y condiciones con operadores  $gte $eq, $lt, $lte, $in
              as: 'todasLasPublicacionesConCat'
            }
          },
          //saco el#group asi muestra todo en http://json.parser.online.fr/
          //{$group:{ _id: "$superName"}} //al agregar esto, solo verer los names de las cat}
        ]
      )
      console.log(`Caegorias-->:${res}`);
      //o
      console.log(`ManyCatToMuchPost-${JSON.stringify(res)}`);
      //o
      // for await(let t of res)  console.log(t._id);  
    } catch (error) {
      console.log('RELACION " sentidos', error);
    }
  }
  //#endregion
      //#region lookup $match Filtra consulta
        const findAggregateRelacioYFiltro= async () => {    
          try {
        const dato = await PublicacionModel.aggregate([
          {$lookup:
            { from: 'users',  //en Usus
              localField: 'userId', //en Ppost
              foreignField: '_id',
              as: 'usuAuthor'
            }
          },
          {$unwind: {path: '$usuAuthor'} //prefijar con $
          },
          {$match: { name: 'DevOp' }  //condicion
          }
        ]);
        console.log('dta', dato);
      } catch (error) {console.log('Error aggregate', error);
      }
    }
        //#endregion 
      //#region aggregate COUNT 
    const findAggregateCount= async () => {    
      try {  
      const array = await PublicacionModel.aggregate( [
          { $count: "myCount" }
       ]) 
       for await (let valor of array){
        console.log(`Cantidad Doc ---${JSON.stringify(valor)}`);      
        console.log(`Cantidad Doc ---${valor.myCount}`);      
      } } catch (error) {
        console.log('Error aggregate', error);
      }
    } 
    //aggregate([{ $match: { age: { $gte: 25 } } }]);
    //.lookup({ from: 'users', localField: 'userId', foreignField: '_id', as: 'users' });
    /* for await (let valor of array){
      console.log(`Author ---${valor._id}`);      
    } */
    //#endregion
    //#endregion
//#endregion

//#region CATEGORIA CRUD
//#region createCat
const createCat = async () => {
  try {
     const res = await CategoryModel.create([
      { superName: 'Tech', isEnabled: true },
      { superName: 'Sport', isEnabled: false },
      { superName: 'Game', isEnabled: false },
      { superName: 'Food', isEnabled: true },
      { superName: 'Health', isEnabled: false }
    ]);
    console.log('Categories create succefully', JSON.stringify(res));
  } catch (error) {
    console.log('CAT', error);
  }
}
//#endregion
//#region find c/aggregate muestra nombre de  la cat
const findAggregateCat = async () => {
  try {
    const res = CategoryModel.aggregate(
      [ { $group: { _id: '$superName' } }      //_id refiere a prop a mostrar de la coleccion 
      ]
    )    
    for await (let valor of res){
      console.log(`Supername ---${valor._id}`);      
    } 
  } catch (error) { console.log('CATFind', error); }
}
//#endregion
//#region aggregate COUNT 
const categoryCount= async () => {    
  try {  
  const array = await CategoryModel.aggregate( [
      { $count: "myCount" }
   ]) 
   for await (let valor of array){   
    console.log(`Cant Doc ---${valor.myCount}`);      
  } } catch (error) {
    console.log('Error aggregate', error);
  }
} 
    //aggregate([{ $match: { age: { $gte: 25 } } }]);
    //.lookup({ from: 'users', localField: 'userId', foreignField: '_id', as: 'users' });
    /* for await (let valor of array){
      console.log(`Author ---${valor._id}`);      
    } */
//#endregion
//#region relacion Dos Sentidos Category/Post muestra post con ATRRAY de sus categorias
const relCategoryPost = async () => {
  try {
    const res = await CategoryModel.aggregate( [
        { $lookup:
          { from:'posts', //desde relacion a buscar
            let: { aliasNameEnCat: '$superName' }, //prop de categoria
            pipeline: [//todo dentro de pipeline sera de post y usa el alias de let
              {$match: {
                  $expr: {$in: ['$$aliasNameEnCat', '$category']}  //segundo arg es el array de cat en posts $category prop de post                  
                }
              }
            ],  //como filtro segun yo quiera eh $match y condiciones con operadores  $gte $eq, $lt, $lte, $in
            as: 'todasLasCatConPublicaiones'
          }
        },
        //saco el#group asi muestra todo en http://json.parser.online.fr/
        //{$group:{ _id: "$superName"}} //al agregar esto, solo verer los names de las cat}
      ]
    )
    console.log(`Caegorias-->:${res}`);
    //o
    for await (let re of res)
    console.log('superName en post',re.superName);    
    //o
     console.log(`ManyCatToMuchPost-${JSON.stringify(res)}`);
    //o
    // for await(let t of res)  console.log(t._id);  
  } catch (error) {
    console.log('RELACION " sentidos', error);
  }
}

//#endregion
//#endregion

//#region MESSAGE CRUD
//#region create
const createMessage = async ()=>{
  try {
    
   // mongoose.set('useCreateIndex', true); //para crear unique debo crear inice
//await MessageModel.createIndex({'message':1}, { unique:true })
    const response = await MessageModel.create(
     [ {userEmmiter:'62cc6e8efe33c6d855e60d99',userReciver:'62cc6e8efe33c6d855e60d9c', message:'Holalaaa!!!'},
      {userEmmiter:'62cc6e8efe33c6d855e60d9b',userReciver:'62cc6e8efe33c6d855e60d9d',message:'Estas ahi?'},    
     { userEmmiter:'62cc6e8efe33c6d855e60d9d',userReciver:'62cc6e8efe33c6d855e60d9a',message:'Vmo Feniii!!!'},
     { userEmmiter:'62cc6e8efe33c6d855e60d9d',userReciver:'62cc6e8efe33c6d855e60d9e',message:'Somo los bochincheros'},
     { userEmmiter:'62cc6e8efe33c6d855e60d9b',userReciver:'62cc6e8efe33c6d855e60d99',message:'Acabadabra'},
     { userEmmiter:'62cc6e8efe33c6d855e60d9c',userReciver:'62cc6e8efe33c6d855e60d99',message:'Solo somos instantes'},
     { userEmmiter:'62cc6e8efe33c6d855e60d9a',userReciver:'62cc6e8efe33c6d855e60d99',message:'No somos nada'},
     { userEmmiter:'62cc6e8efe33c6d855e60d9b',userReciver:'62cc6e8efe33c6d855e60d9a',message:'ni un paso atras'},
     { userEmmiter:'62cc6e8efe33c6d855e60d9a',userReciver:'62cc6e8efe33c6d855e60d9b',message:'Nada puede malir sal'},
     { userEmmiter:'62cc6e8efe33c6d855e60d9e',userReciver:'62cc6e8efe33c6d855e60d9c',message:'no pierde las mañas!'},
     { userEmmiter:'62cc6e8efe33c6d855e60d99',userReciver:'62cc6e8efe33c6d855e60d9d',message:'no no pierde las mañas!'}
    ],
    )
    console.log('Message create succefully');
  }catch (err){console.log('Error create message',err);
  }
};
//#endregion
//#region get
const getMessage = async () => {
  try {
    const response = await MessageModel.aggregate([
      {
        $group: { _id: "$userEmmiter" }//_id refiere a prop a mostrar de la coleccion
      }
    ]);
    console.log(`Aggregate ---${JSON.stringify(response)}`);
    console.log(`Los mensagges: ${JSON.stringify(response)}`);

  } catch (error) {
    console.log('Error GET message', error);
  }
};
//#endregion
//#region findAllMessage
const findAllMessage = async () => {
  try {
    const res = await MessageModel.find();
    console.log('ALL Message',JSON.stringify(res));
    for await (const message of res){console.log('Me',message._id);
    }
  } catch (error) {
    console.log('Error All', error);
  }
}
  //#endregion
//#region aggregate COUNT message
      const countMessageAggregate= async () => {    
        try {  
        const array = await MessageModel.aggregate( [
            { $count: "myCount" }
         ]) 
         for await (let valor of array){
          console.log(`Cantidad Doc ---${JSON.stringify(valor)}`);      
          console.log(`Cantidad Doc ---${valor.myCount}`);      
        } } catch (error) {
          console.log('Error aggregate', error);
        }
      } 
      //aggregate([{ $match: { age: { $gte: 25 } } }]);
      //.lookup({ from: 'users', localField: 'userId', foreignField: '_id', as: 'users' });
      /* for await (let valor of array){
        console.log(`Author ---${valor._id}`);      
      } */
      //#endregion
      //#region
      //#region findMessageFiltro
const findMessageFiltro = async()=>{
  try {
   const res = await MessageModel.find( {
    message: /^N/
    //message: "Somo los bochincheros",
    //$or: [ { userReciver: "62cc6e8efe33c6d855e60d99" }, { message: /^n/ } ] //comienza con el caracter n
} );
   //const res = await MessageModel.find({userEmmiter:{$match:'', $lte:9}});//entre esas 
   //db.inventory.find( { status: { $in: [ "A", "D" ] } } ) //status = a o d  
   console.log('ELEM NAME===>',res);
  } catch (error) {
   console.log('ERROR FILTRO');   
  }
 }
 //#endregion
 //#region updateOneMessage 
 const updateOneMessage = async ()=> {
  try {
    const res = await MessageModel.findOneAndUpdate(
      { $and: [ {message: /^n/}/*,{_id: "62cd85d9b08de2a816e21d91"} ,{ cel: 11, size:"big",name:"lalal" } */] 
      },
      {$set: { 'message': 'No somos nada', userReciver: '62cc6e8efe33c6d855e60d99' },
        $currentDate: { lastModified: true }
      }      
       /* new: true,
       timestamps: true
      } */      
    )
  } catch (error) {    
   console.log('ERROR updateOneMessage');
  }
 }
 //#endregion
      //#endregion
      //#region deleteMessage devuelve { "acknowledged" : true, "deletedCount" : 1 }
      const deleteMessage = async () =>{
        try {
          //const res = await MessageModel.deleteOne({_id:'62cd83306cc7fe4a3e33b4e9'});
          const res = await MessageModel.deleteOne({message: "Vmo Feniii!!!"});
          
          if(JSON.stringify(res.deletedCount)==='1'){
          console.log('Deleted OK', JSON.stringify(res.deletedCount));
          }else{
            console.log('No DELETED');
            
          }
        } catch (error) {
          console.log('deleteMessage',error);
          
        }
      }
      //#endregion
//#endregion

//#region FOOLOW CRUD
//#region createFollow
const createFollow = async() =>{
  try {
    const res = await FollowModel.create([
      {userFollower:'62cc6e8efe33c6d855e60d99', userFollowing:'62cc6e8efe33c6d855e60d9d'},
      {userFollower:'62cc6e8efe33c6d855e60d9a', userFollowing:'62cc6e8efe33c6d855e60d9b'},
      {userFollower:'62cc6e8efe33c6d855e60d9e', userFollowing:'62cc6e8efe33c6d855e60d9b'},
      {userFollower:'62cc6e8efe33c6d855e60d9b', userFollowing:'62cc6e8efe33c6d855e60d9a'},
      {userFollower:'62cc6e8efe33c6d855e60d9c', userFollowing:'62cc6e8efe33c6d855e60d9d'},
      {userFollower:'62cc6e8efe33c6d855e60d99', userFollowing:'62cc6e8efe33c6d855e60d99'},
      {userFollower:'62cc6e8efe33c6d855e60d9c', userFollowing:'62cc6e8efe33c6d855e60d9d'},
      {userFollower:'62cc6e8efe33c6d855e60d9d', userFollowing:'62cc6e8efe33c6d855e60d9c'}
    ])
    console.log('Follows create succefully');
  } catch (error) {
    console.log(`Error to CREATE FOLLOW-${error}`);
    
  }
}
//#endregion
//#region findAllFollows()
const findAllFollows = async () => {
  try {
    const res = await FollowModel.find();
    for await (const dato of res)
    console.log('dato',dato);
  } catch (error) {
    console.log('Error All', error);
  }
}
//#endregion
//#region countFollowsAggregate agrupa por userFollower
const countFollowsAggregate = async  ()=>{
  try {
    const array = await FollowModel.aggregate([{
    $group: { _id: "$userFollower" }}] ) //_id refiere a prop a mostrar de la coleccion 
    console.log(`AggregateFollower ---${JSON.stringify(array)}`);  
      //Lo copio y veo onLine en cualquier lugar que parsee el resultado    
    }
  catch (error) {
    console.log('Error aggregate', error);
  }
}
//#endregion
//#region lookup $unwind findRelFollowsUsu
const findRelFollowsUsu = async () => {
  try {   
    const array = await FollowModel.aggregate([
        
    {$lookup: {
      from: 'users',//"otherCollection",
      as: "resultingArray",
      localField: "userFollower",
      foreignField: "name",
      //unwinding: { preserveNullAndEmptyArrays: false }
      }
    } 
      /*{$lookup:
          { from: 'users',  //en Usus
            localField: 'userFollower', //en Follow
            foreignField: '_id',//en Usus
            as: 'seguidor'
          }, 
        },
        { $unwind:  //muestra con el array de ususarios
          { path: '$seguidor',
            includeArrayIndex: 'DATA',
            preserveNullAndEmptyArrays: true
          }
        }*/
      ]);
        console.log(array);        
        /* for await(let usu of array)
    console.log('Seguidor=>', usu.name);
     */
    //con for await muestro solo algun dato ..
     //for await (let valor of array) { console.log(`Seguidor=> ${valor} `);}
  } catch (error) {
    console.log('EEEE');
  }
}
  //#endregion 
  //#region relFollowUsus con Filtro de match 
  const relFollowUsus = async () => {    
    try {
  const dato = await FollowModel.aggregate([
    {$lookup:
      { from: 'users',  //en Usus
        localField: 'userFollower', //en follows
        foreignField: '_id',
        as: 'User_Follower'
      }
    },
    {$unwind: {path: '$User_Follower'}, //prefijar con $
                  includeArrayIndex: 'DATA',
                  preserveNullAndEmptyArrays: true
    }
  ]);
  console.log('dta', dato);
  /*  for await (let d of dato)
  console.log('dta', d.name); */

} catch (error) {console.log('Error aggregate', error);
}
}
  //#endregion 
//#region 
//#endregion
//#endregion

//#region PRUEBA **********Tank  *****************
interface Itank { name?: String, isMayor: boolean }
const yourSchema = new mongoose.Schema(
  {
    name: String,
    size: { type: String, required: [true, 'Why no size?'], enum: ['small', 'big'] },
    //date: { type: Date, default: Math.floor(Date.now() / 1000) },
    cel: {
      type: Number,
      min: [6, 'Must be at least 6, got {VALUE}'],
      max: [32, 'Must be at greater 22, got {VALUE}']
    },
  },
  {
    timestamp: true,  //crea dato creacion y actualizacion
    versionKey: false, //elimina _v prop version en BD
    //currentTime: () => Math.floor(Date.now() / 1000) //no se bien
  }
);
const Tank = new mongoose.model('Tank', yourSchema);

yourSchema.virtual('fullName').get(() => {  //para devolver info
  return 'first +   +name.last';
});

/* //errorresponse
let erro;
erro = Tank.validateSync();
//assert.equal(erro.errors['size'].message,'User size number required');
 */
const Tank2 = new Tank({ name: 'manu', size: 'big', cel: 27 });

//#region Insert 2 formas de agregar 
/* Tank.create({name:'Ana',size: 'small11' }, (err:any)=> {
  if (err) return handleError(err);
}) */
const insertTank = async () => {
  try {
    await Tank.create({ name: 'Ana', size: 'small', cel: 20 });
    console.log('saved!');
  } catch (error) {
    //assert.equal(error, null);
    console.log('Not saved!', error);
  }
}
//#endregion

//#region insertMany
const insertMany = async () => {
  Tank.insertMany([{ name: 'Mono', size: 'small', cel: 7 }, { name: 'Juancito', size: 'big', cel: 10 }], (err: any) => {
    if (err) return handleError('Error-insertMany');
    // saved!
  });
}
//#endregion

//#region findOne por prop
const findOne = async () => {
  const res = await Tank.findOne({ name: 'Juancito' });
  if (res == null || res instanceof Object) {
    //throw new Error('should be populated');
    console.log('should be populated');
    console.log('ONE=', res);
  } else {
    // Works
    console.log('Tank.name.trim();');
  }
}
//#endregion
 
//#region findById
 const findById = async()=>{
  try {
  const res = await Tank.findById('62bf9e35f0d68a0666770d7f');
  console.log('Por ID:',res.name);    
  } catch (error) {
    console.log('No exist this ID usuario');    
  }  
 }
 //#endregion

//#region findAll trae array de todos
const findAll = async () => {
  const res = await Tank.find();
  console.log(res);
}
//#endregion

// #region findOneAndUpdate
const findOneAndUpdate = async () => {
  try {
    const res = await Tank.findOneAndUpdate({ _id: '62c22102e8f250b1e267be6e2' },
   { cel: 11, size:"big",name:"lalal" },
   {
    new: true,
    timestamps: true
   });
  console.log('Update-', Tank.updatedAt);
  console.log('Yes NAME-', res);
  } catch (error) {
    console.log('No Update',error);    
  }
}
//#endregion

//#region updateOne
const updateOne =async () => {
  try {
    const res = await Tank.updateOne({ name: 'Juancito' }, { name: 'Jean-Luc Picard'});
    console.log('UPDATE-',res);    
  } catch (error) {
    console.log(error);    
  }
}
//#endregion

//#region updateMany
const updateMany = async ()=>{
try {
  const res = await Tank.updateMany({name:'Juancito'},{name:'Juan Pablo'});
 console.log('updateMany',res);
} catch (error) {
  console.log('ERROR updateMany');
}}
//#endregion

//#region findFiltro
const findFiltro = async()=>{
 try {
  const res = await Tank.find({cel:{$gte:11, $lte:9}});//entre esas
  res.forEach((element:any) => {
    //element.map((input:any) => input.value)
  console.log('ELEM NAME===>',element.name);
  });
  console.log('mayor===>',res.length);
 } catch (error) {
  console.log('ERROR FILTRO');
  
 }
}
//#endregion

//#region deleteOne
const deleteOne = async()=>{
  try {
    const res = await Tank.deleteOne({_id:'62bf9cca36e9c3e01a5b1425'});
    console.log('IS deleted',res);    
  } catch (e) {
    console.log('Error deleteOne',e);    
  }
}
//#endregion

//#region dropCollection
const dropCollection = async (dato:any) => {
  try {
    //const res = await Tank.dropCollection('ususas');
   const res = await dato.ususas.drop();
     //const res = await dato.tanks.deleteOne( { name: "Mono" } )
    console.log('Ok drop collection!!');
  } catch (error) {
    console.log(error);
  }
}
//#endregion


//#endregion

//#region OWNER
const ownerSchema = new mongoose.Schema({
  name: String,
  //name:{Type:String,,required: [true, 'Who is Owner?'],
  direcction: { Type: String },
},
  {
    timestamps: true,  //crea dato creacion y actualizacion
    versionKey: false //elimina _v prop version en BD
  })
const ownerModel = new mongoose.model('owner', ownerSchema);

const insertOwner = async () => {
  const own = await ownerModel.create({
    name: 'Juancito',
    direcction: 'Labandera 817'
  })
}
//#endregion

//#region PETS
const petSchema = new mongoose.Schema({
  name: { type: String },//,required: true 
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
    type: Types.ObjectId, ref: 'owner'
    //type: mongoose.Types.ObjectId, ref:'owner'
  },
},
  { timestamps: true }
)

const petModel = new mongoose.model('pet', petSchema);

const insertarPet = async () => {

  /* try {
    await petModel.validate({ name: null }, ['name'])
  } catch (err:any) {
    err instanceof mongoose.Error.ValidationError; // true
    Object.keys(err.errors); // ['name']
  }  */
  const uu = await petModel.create({
    name: 'Gardel ',
    color: 'grey',
    age: 334,
    owner!: ''
  });
  console.log(`Insertado el usu- ${uu}`);
}
//#endregion


//#region CerrarConeccion
const cerrarConeccion = async (cone:any) => {
  setTimeout(() => {
    console.time('desconeccion')
    mongoose.disconnect();
    /*mongoose.disconnect();
    const state2 = await conn.connection.readyState;
    console.log(`-ESTADO si es 3 => desconectado- ${state2}`);   */
    const estado = cone.connection.readystate;
    console.timeEnd('desconeccion');
    console.log(`-ESTADO   desconectado <=> ${estado}`);

    /*   const state = await conn.connection.readyState; // MongoClient { ... }
    console.log(`-ESTADO- ${state}`); */
  }, 3000);
}
//#endregion

function handleError(err: string) {
  console.log(err, 'Function dice:');
  throw new Error(err);
}

//export default Database;


