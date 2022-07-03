/* 'use strict' */

const express = require('express');  //import express from 'express';
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
import IUser from './interfaces/Iuser';

function init() { //const init = async () => { //function async(init)

    console.time("Tiempo ejecucion");
    const app = express();
    app.use(cors());
    app.use(express.json());
    //app.use (bodyParser.json()); 
    //app.use(morgan("dev"));

    //settings
    const url = 'mongodb://localhost/mensajeria';
    const MONGO_DB = process.env.DATABASE || url;
    const port = process.env.PORT || 3300;
    app.set('port', process.env.PORT || 2001); //seteamos una variable que inventamos, port, a express para abrir en el puerto del sist operativo o en 3000

    //export app;
    app.get('/home',(req,res) =>{res.send(`status ${res.statusCode} at Home`);})
    //listen va al final
    app.listen(app.get('port'), () => {
        console.log(`Serverrr listening from index.js running on port http://localhost:${app.get('port')}`)

    });

    console.timeEnd("Tiempo ejecucion");
}
init();

//#region mongoose
/* ** MONGOOSE**** */
/* mongoose.connect(mongoUrl, { useNewUrlParser: true });
var db = mongoose.connection;
!db ? console.log("Hubo un error conectandose a la base de datos") : console.log("Conexión a base de datos satisfactoria");
 */
//#endregion
//#region init()
/*
const init2 = async () => {

    const url = 'mongodb://localhost/mensajeria';
    const MONGO_DB = process.env.DATABASE || url;

    try {
        const connection = await mongoose.connect(MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndexe: true
        });
        const db = await mongoose.connection;
        db.once('open', () => console.log.bind(`conectado en puerto ${url}`));
    } catch (error) {
        console.log.bind(error, 'ERROR');
        db.on('error', err => console.error.bind(console, 'Ta le erro'));
    }

    
    /* 
    ¡Importante! Si abrió una conexión separada utilizando ´
    mongoose.createConnection()pero intenta acceder al modelo
     a través de mongoose.model('ModelName')él, no funcionará
      como se esperaba, ya que no está conectado a una conexión
       de base de datos activa. En este caso accede a tu modelo
        a través de la conexión que creaste:
    
        const conn = mongoose.createConnection('your connection string'); 
}
*/