/**
 * implementa la interface de dominio que pega en BD mongo
 */

import { ITask } from "../../domain/task.IEntity";
import { ITaskRepo } from "../../domain/task.repository";
import TaskModel from "../modelo/taskModelSchema";

export class MongoRepo implements ITaskRepo {
    
    listTask = async ():Promise<ITask[]> => {
        const resultado = await TaskModel.find();
        return resultado;
    }

    createTask = async (task: ITask):Promise<ITask> => { 
        const resultado = await TaskModel.create(task);
        return resultado;
    }

    findTaskById=async(uuid: string):Promise<ITask> => { 
        const resultado = await TaskModel.findById(uuid);
        return resultado;
    }

    findOneTask = async(dato: string):Promise<ITask> => { 
        const resultado = await TaskModel.findOne(dato);
        return resultado;
    }

     deleteTask = async (dato:string):Promise<ITask> => { 
        const resultado = await TaskModel.deleteTask(dato);
        return resultado;
    }
    
}