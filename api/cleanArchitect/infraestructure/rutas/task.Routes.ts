/**
 * exporta las rutas
 */
import express from "express";
import { Router, Request, Response } from "express";

const TaskCntr = require('../controlador/taskCtrl');

import { TaskUserCase } from "../../application/taskUseCase";
import { TaskControlador } from "../controlador/taskControlador";
import { MockRepo } from "../repositorios/mockRepo";
import { MongoRepo } from "../repositorios/mongoRepo";

const routerTask = express.Router();
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
const usoMock = new TaskUserCase(mockRep);
const usoMongo = new TaskUserCase(mongoRepo);
/**
 * Iniciamos controlador
 * podria ser con cualquier repo que precise segun el repo
 */
const controlerMock = new TaskControlador(usoMock);
//const controlerMock = new TaskControlador(usoMongo);

//routerTask
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

    .get('/lolo', TaskCntr.list)
    .get('/tasks', TaskCntr.list)

    .get('/taskById/:codigoId?',/*  authh.isAuth, */ TaskCntr.findById)

    .post('/task', TaskCntr.insertOne)

    .patch('/:ident',TaskCntr.patchOne)

    .delete('/:ident',TaskCntr.deleteOne)

    .post('/taskMock',controlerMock.insertCtrl)

    

//export default route;
//export default routerTask;
//module.exports = routerTask;
module.exports = route/*{
    route,
    routerTask
}*/