/*
 * viene desde las rutas y sera para usar datos del Mock
* sin conocer a Dominio tiene modelo que envia info a caso Uso no a Servicio
* como no tiene servicio, solo conoce a aplicacion caso de uso, donde crea modelo de BD (ej mongoose)
* aca realiza consultas 
* el async await va en caso de uso, aca lo hice asi
* ademas no hice clase con injeccion de dependenncia, si exporto modulo con metodos.
* si ponemos req res de express
 */

import { Request, Response } from "express";
import { ITask } from "../domain/task.IEntity";
//import TaskModel from "../modelo/taskModelSchema";
const TaskModel = require ('../modelo/taskModelSchema')
//import {MockRepo} from "./repositorios/mockRepo";
//const mock = require('../repositorios/mockRepo');

//#region list
const list = async (req: Request, res: Response):Promise<ITask[]|undefined> => {
    const task_Mock1: ITask = {
        uuid: '001-22',
        name: 'Futbol',
        añoInicio: 1900,
        description: 'ther is a bad match'
      };
      const task_Mock2: ITask  = {
        uuid: '002-44',
        name: 'Fronton',
        añoInicio: 2010,
        description: 'beautyfull ball'
      };
        
    try { 
              
        const lista = await [task_Mock1, task_Mock2];
        //const lista = await MockRepo.listTask;
       
         if (lista) {  
            console.log('lista es',lista, `${JSON.stringify(lista)}`);
            res.status(200).send({Lista : `primer Item: ${JSON.stringify(lista[0])
            }`, masData:`largo array ${lista.length}` });
            return lista;
        }
       /* else {
            console.log({ massage: `Task Listado: Naaada` });

            res.status(500).send({ massage: `Namama Listado:` });
        } */

         if(lista===null) {              
        console.log('null');
        res.status(200).send({ massage: `nulll` });  
        
    }
        else if(lista===undefined) {
            console.log('undefined');
            res.status(200).send({ massage: `undefined` });             
        }
        else{
            console.log({ massage: `Task Listado: Naaada` });
            res.status(500).send({ massage: `Naaa:`, dato:`${lista}` });
        }
    } catch (error) {
        console.log('Error All', error);
        res.status(400).send({ msg: `no hay ` });
    }
};
//#endregion

//#region findById
const findById = async (req: Request, res: Response) => {
    try {
        const id = req.params.codigoId;
    /*const re = await tsk_service.findById(id);
    console.log(re.dato);
      res.status(re.num).send({ masg: re.dato });*/
      console.log('UNDATO');
      res.send({ masg: `UN_DATO: ${id}` });
} catch (error:any) {
    console.log('no existe TASK con ese _id');
    res.status(404).send({ err: error.message, msg: 'no existe TAsk con ese _id' });
    }
};
//#endregion

//#region insertOne
const insertOne = async (req: Request, res: Response) => {
    try {
        console.log('INSERT');
      res.status(200).send({ masg: 'INSERT' });
    } catch (error) {
        console.log('Error All', error);
        res.status(400).send({ msg: `no hay ` });
    }
};
//#endregion

//#region patchOne
const patchOne = async () => {
    return 'PATCH';
};
//#endregion

//#region deleteOne
const deleteOne = async (req: Request, res: Response) => {
    const body = req.body.identificador;
    const param = req.params.identificador;
  
    try {
      console.log('-PARAMS:--\n', 'body', body, 'param', param);
      await res.status(200).send({ massage: 'delete\n ', body: `${body}`, param: `${param}`, Status: `${res.statusCode}` });
    } catch (error) {
      console.log('error delete');
      return await res.status(404).send({ massage: 'delete Error', Status: `${res.statusCode}` });
    }
  }
  //#endregion
  

module.exports = {
    list,
    findById,
    insertOne,
    patchOne,
    deleteOne
}