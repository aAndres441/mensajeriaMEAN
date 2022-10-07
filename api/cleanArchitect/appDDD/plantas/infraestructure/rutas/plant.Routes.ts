/**
 * exporta las rutas
 */
 import express from "express";
 import { Router, Request, Response } from "express";
import { Create } from "../../application/casosdeUsos/create/create";
import { Searching } from "../../application/casosdeUsos/search/searchings";

import { PlantControlador } from "../controller/plant.controller";
import { MockRepo } from "../repository/mockRepo";
import { MongoRepo } from "../repository/mongoRepo";
 
 ///////const TaskCntr = require('../taskCtrl');
 
 const roterPlant = express.Router();
 //o pude ser como abajo
 const route = Router();
 
 /**
  * Iniciamos repositorios en este caso de Mock y mongo
  */
 const mockRep = new MockRepo();
 const mongoRepo = new MongoRepo();
 /**
  * Iniciamos casos de uso
  */
 const usoMockCreate = new Create(mockRep);
 const usoMockSearching = new Searching(mockRep);
 const usoMongo = new Create(mongoRepo);
 /**
  * Iniciamos controlador
  * podria ser con cualquier repo que precise segun el repo
  */
 const controlerMock = new PlantControlador(usoMockCreate,usoMockSearching);
 //const controlerMock = new TaskControlador(usoMongo);
 
 //roterPlant
 route
 
     .get('/lala',async (req, res) => {
         try {
             let resu = controlerMock.getCtrl(req,res);
             res.status(200).send({message:'OK',data:resu})
         } catch (error) {
             console.log(`ERrror`);
             res.send({msg:'Mamamall'});            
         }
     })
     .get('/momo',controlerMock.listarTask)
     .post('/momo',controlerMock.insertCtrl)
 
     /* .get('/lolo', TaskCntr.list)
     .get('/tasks', TaskCntr.list)
  */
    // .get('/taskById/:codigoId?',/*  authh.isAuth, */ TaskCntr.findById)
 
    /* . post('/task', TaskCntr.insertOne)
 
     .patch('/:ident',TaskCntr.patchOne)
 
     .delete('/:ident',TaskCntr.deleteOne)
  */
     .post('/taskMock',controlerMock.insertCtrl)
 
     
 
 //export default route;
 //export default roterPlant;
 //module.exports = roterPlant;
 module.exports = route;
 /* module.exports = {
     route,
     roterPlant
 } */