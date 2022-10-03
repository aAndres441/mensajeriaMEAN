/*
* implementa la interface de dominio que pega en BD SQL 
 */

import { ITask } from "../../domain/task.IEntity";
import { ITaskRepo } from "../../domain/task.repository";
import TaskModel from "../modelo/taskModelSchema";

export class MySQLRepo implements ITaskRepo{
    createTask = async (task: ITask) => {
        const resultado = await TaskModel.create(task);
        return resultado;
    }

    findTaskById=async(uuid: string)=> {
        const resultado = await TaskModel.findById(uuid);
        return resultado;
    }

    findOneTask = async(dato: string)=> {
        const resultado = await TaskModel.findOne(dato);
        return resultado;
    }

     deleteTask = async (dato:string)=> {
        const resultado = await TaskModel.deleteTask(dato);
        return resultado;
    }
    
    listTask = async ()=> {
        const resultado = await TaskModel.find();
        return resultado;
    }

}